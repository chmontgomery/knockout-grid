/// <reference path="../ActiveManagement/IViewHandle.d.ts" />
/// <reference path="../Plugins/knockout-ondemand-observable.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="Column.ts" />
/// <reference path="../Shared/Argument.ts" />
/// <reference path="SelectableItem.ts" />
/// <reference path="SelectableStates.ts" />
/// <reference path="../Shared/ObjectManager.ts" />
/// <reference path="ExportSettings.ts" />
/// <reference path="ExportableColumn.ts" />
module go {
	export module kg {
		export var GridManager: goglobal.ObjectManager = new goglobal.ObjectManager();
		export class Grid {

			itemsLengthThreshold: number = 100;
			trNodeType: number = 1;
			columns: KnockoutObservableArray;
			selectable: bool;
			exportSettings: go.kg.ExportSettings;
			items: KnockoutObservableArray;
			actionsTemplate: string;
			filter: KnockoutObservableString;
			filterThrottleTime: KnockoutObservableNumber;
			throttledFilter: KnockoutObservableString;
			allowFade: bool = true;
			filteredItems: KnockoutOnDemandComputed;
			selectedItems: KnockoutComputed; //TODO KnockoutOnDemandComputed
			lastSortedColumn: KnockoutObservableString;
			lastSortOrder: KnockoutObservableString;
			selectAllState: KnockoutObservableAny;
			selectAllClass: KnockoutComputed;
			countText: KnockoutComputed;
			isLoaded: KnockoutObservableBool;
			isLoadedAndEmpty: KnockoutObservableBool;

			constructor (public id: string, columns: go.kg.Column[], viewHandle: go.ActiveManagement.IViewHandle, 
					public itemCountMessageAll?: string, public itemCountMessagePartial?: string, 
					public itemAddedToastTitle?: string, public itemRemovedToastTitle?: string, public itemFieldForToastBody?: string,
					selectable?: bool, exportSettings?: go.kg.ExportSettings, actionsTemplate?: string) {
				go.Argument.notNull(id, "id");
				go.Argument.notNull(columns, "columns");
				this.columns = ko.observableArray(columns);
				this.selectable = go.Argument.boolOrFalse(selectable);
				this.exportSettings = go.Argument.objectOrDefault(exportSettings, new go.kg.ExportSettings("Report", false));
				$.each(this.columns(), $.proxy(this.buildExportSettingsIterator, this));
				this.items = viewHandle.subjects || ko.observableArray([]);
				this.items.subscribe(this.itemsChanged, this);
				viewHandle.status.subscribe(function (newValue) {
					if (newValue === go.ActiveManagement.ViewStatus.Active) {
						this.isLoaded(true);
					}
				}, this);
				this.selectedItems = ko.computed(function () {
					if (!this.selectable) {
						return [];
					}
					return ko.utils.arrayFilter(this.items(), function (item: go.kg.SelectableItem) {
						return item.isSelected();
					});
				}, this);
				this.actionsTemplate = actionsTemplate;

				this.filter = ko.observable("");
				this.filterThrottleTime = ko.computed(() => this.items().length > this.itemsLengthThreshold ? 300 : 0);
				this.throttledFilter = this.filter.throttle(this.filterThrottleTime);
				this.throttledFilter.subscribe(this.filterChange, this);
				this.filteredItems = ko.onDemandObservable(this.setFilteredItems, this);
				this.filteredItems(this.items());

				this.lastSortedColumn = ko.observable();
				this.lastSortOrder = ko.observable();
				this.countText = ko.computed(this.getCountText, this);

				this.selectAllState = ko.computed(this.getSelectAllState, this);
				this.selectAllClass = ko.computed(this.getSelectAllClass, this);

				this.isLoaded = ko.observable(false);
				this.isLoadedAndEmpty = ko.computed(() => this.isLoaded() && this.filteredItems().length === 0 );
				
				return go.kg.GridManager.register(this.id, this);
			}

			private getCountText(): string {
				var countText = "";
				if (this.filteredItems().length === this.items().length) {
					countText = this.itemCountMessageAll ? this.itemCountMessageAll.format(this.filteredItems().length) : "";
				} else {
					countText = this.itemCountMessagePartial ? this.itemCountMessagePartial.format(this.filteredItems().length, this.items().length): "";
				}
				return countText;
			}

			//#region export
			private buildExportSettingsIterator(i: number, col: go.kg.Column) {
				if (col.isExportable) {
					var column = new ExportableColumn(col.field, col.headerText);
					this.exportSettings.columns.push(column);
				}
			}

			private itemPropertyReplacer(key: string, value) {
				var computedValue = ko.utils.unwrapObservable(value);
				if (typeof computedValue === 'undefined') {
					// even if undefined we want to send back all properties
					return "";
				} else if (computedValue instanceof Date) {
					// stringifying a date object will result in "{}" so we need to toString it manually
					return computedValue.toString();
				}
				return computedValue;
 			}

			static exportToFileErrorMessage() {
				toastr.error("There was an unexpected error downloading your document. Please try again later.", "Error Exporting Grid");
			}

			static exportToFileSuccessMessage() {
				toastr.success("Check your browser's download location for your file.", "Successfully Exported Grid");
			}

			private exportToFile(type: string) {
				go.Argument.notNull(type, "type");
				
				var settingsJSON = ko.toJSON(this.exportSettings);
				var itemsJSON = ko.toJSON(this.filteredItems(), this.itemPropertyReplacer);

				$.ajax({
					type: 'POST',
					url: "/Grid/SaveExportFile",
					data: {
						type: type,
						items: itemsJSON,
						settings: settingsJSON
					},
					success: function (data, textStatus, jqXHR) {
						if (data && data.fileKey) {
							window.location.href = "/Grid/GetExportFile?fileKey=" + data.fileKey;
							go.kg.Grid.exportToFileSuccessMessage();
						} else {
							go.kg.Grid.exportToFileErrorMessage();
						}
					},
					error: go.kg.Grid.exportToFileErrorMessage
				});
			}

			exportAsPDF() {
				this.exportToFile("pdf");
			}

			exportAsCSV() {
				this.exportToFile("csv");
			}

			exportAsXLS() {
				this.exportToFile("xls");
			}

			exportAsXLSX() {
				this.exportToFile("xlsx");
			}
			//#endregion

			//#region sorting
			private isAsc(col: string) {
				if (this.lastSortedColumn() === col) {
					return this.lastSortOrder() === "asc";
				}
				return false;
			}

			private isDesc(col: string) {
				if (this.lastSortedColumn() === col) {
					return this.lastSortOrder() === "desc";
				}
				return false;
			}

			private sortASC(column: go.kg.Column) {
				this.items.sort($.proxy(column.sortASC, column));
				this.lastSortOrder("asc");
			}

			private sortDESC(column: go.kg.Column) {
				this.items.sort($.proxy(column.sortDESC, column));
				this.lastSortOrder("desc");
			}

			private enableAllowFade() {
				this.allowFade = true;
			}

			private disableAllowFade() {
				this.allowFade = false;
			}

			private doSort(column: go.kg.Column) {
				if (column.field === this.lastSortedColumn()) {
					if (this.lastSortOrder() === "desc") {
						this.sortASC(column);
					} else {
						this.sortDESC(column);
					}
				} else {
					this.sortASC(column);
				}
				this.lastSortedColumn(column.field);
				this.filteredItems.refresh();
				this.unblockUI($.proxy(this.enableAllowFade, this));
			}

			sort(column: go.kg.Column) {
				if (this.filteredItems().length > this.itemsLengthThreshold) {
					if (column.isSortable) {
						this.disableAllowFade();
						this.blockUI(this.doSort.bind(this, column));
					}
				} else {
					this.doSort(column)
				}
			}
			//#endregion

			//#region select states
			private getSelectAllState(): go.kg.SelectableState {
				var itemsChecked = 0;
				if (this.selectable) {
					$.each(this.filteredItems(), function (i, o: go.kg.SelectableItem) {
						if (o.selectState() === go.kg.SelectableStates.SELECTED) {
							itemsChecked++;
						}
					});
				}
				if (itemsChecked === this.filteredItems().length) {
					return go.kg.SelectableStates.SELECTED;
				} else if (itemsChecked > 0) {
					return go.kg.SelectableStates.PARTIAL;
				} else {
					return go.kg.SelectableStates.UNSELECTED;
				}
			}

			private getSelectAllClass(): string {
				return "grid-checkbox-select-all kogrid-checkbox " + this.selectAllState().cssClass;
			}

			selectAllClick(): void {
				if (this.selectAllState() === go.kg.SelectableStates.SELECTED) {
					this.unselectAllItems();
				} else {
					// partial and unchecked scenario. check all
					this.selectAllItems();
				}
			}

			unselectAllItems(): void {
				// unselect ALL items (even non-visible ones) just in case we got into a weird case where some are rows are
				// selected but filtered
				if (this.selectable) {
					$.each(this.items(), function (i, o: go.kg.SelectableItem) {
						o.selectState(go.kg.SelectableStates.UNSELECTED);
					});
				}
			}

			selectAllItems(): void {
				if (this.selectable) {
					$.each(this.filteredItems(), function (i, o: go.kg.SelectableItem) {
						o.selectState(go.kg.SelectableStates.SELECTED);
					});
				}
			}
			//#endregion

			//#region filter
						
			private setFilteredItems(): void {
				var newFilteredItems = ko.utils.arrayFilter(this.items(), $.proxy(this.filterItem, this));
				this.filteredItems(newFilteredItems);
			}

			// TODO can we put this on go.kg.GridItem?
			private cacheItemFieldsAsString(item: go.kg.GridItem) {
				item.fieldsAsString = "";
				$.each(this.columns(), function (i, col: go.kg.Column) {
					var field = ko.utils.unwrapObservable(item[col.field]);
					// custom logic would be needed to filter on columns containing objects
					var typeOfField = typeof field; // only typeof works with primative types, not instanceof
					if (typeOfField === 'string' ||
						typeOfField === 'number' ||
						typeOfField === 'boolean' ||
						field instanceof Date) { // Since dates are typeof 'object', need to use instanceof
						var fieldAsString = (field + " ").toLowerCase();
						item.fieldsAsString += fieldAsString;
					}
				});
			}

			defaultFilterItem(item: go.kg.GridItem) {
				var loweredFilter = this.filter().toLowerCase();
				var allFilters = loweredFilter.split(" ");

				//TODO only do this when needed, i.e. when a row changes
				//if (!item.fieldsAsString) {
				this.cacheItemFieldsAsString(item);
				//}

				var allFiltersFoundInRow = true;
				
				$.each(allFilters, function (i, filter: string) {
					if (item.fieldsAsString.indexOf(filter) === -1) {
						allFiltersFoundInRow = false;
						return false;
					}
				});

				return allFiltersFoundInRow;
			}

			filterItem(item: go.kg.GridItem) {
				/// <summary>
				/// filters an individual item out of the visible items in the grid. This function can be overridden with a custom
				/// filter func. New custom logic could also be coupled with the default behavior in "defaultFilterItem"
				///</summary>
				/// <param name="item">single item from this.items()</param>
				/// <returns type="Boolean">true if item should stay in array</returns>
				return this.defaultFilterItem(item);
			}

			filterChange(newValue: string) {
				/// <summary>
				/// Fires on filter change
				///</summary>
				/// <returns type="Boolean">always return true to allow the browser event to bubble up</returns>
				this.disableAllowFade();
				if (this.items().length > this.itemsLengthThreshold) {
					this.blockUI(this.filteredItems.refresh);
				} else {
					this.filteredItems.refresh();
				}

				// don't try to uncheck if this grid doesn't have checkboxes enabled
				if (this.selectable) {
					// anytime we filter, clear the check state so as not to confuse things
					this.unselectAllItems();
				}

				this.unblockUI($.proxy(this.enableAllowFade, this));

				return true; // allow browser event to bubble up
			}
			//#endregion

			private itemsChanged(value) {
				/// <summary>
				/// refresh the watching filtered items whenever items changes
				///</summary>
				this.filteredItems.refresh();
			}

			private fadeIn(element: any, index: number, data: any) {
				// afterAdd called 3 times. We only want to fade once
				if (element.nodeType === this.trNodeType) {
					if (this.allowFade) {
						//TODO only do this on add/remove
						//toastr.info(ko.utils.unwrapObservable(data[this.itemFieldForToastBody]), this.itemAddedToastTitle);
						$(element).filter("tr").effect("highlight", {}, 2000);
					}
				}
 			}

			private fadeOutCallback(element: any) {
				$(element).remove();
			}
 
 			private fadeOut(element: any, index: number, data: any) {
				// beforeRemove called 3 times. We only want to fade once
 				if (element.nodeType === this.trNodeType) {
 					if (this.allowFade) {
						//TODO only do this on add/remove
						//toastr.info(ko.utils.unwrapObservable(data[this.itemFieldForToastBody]), this.itemRemovedToastTitle);
 						$(element).css("background-color", "#fcefa1");
 						$(element).fadeOut('slow', this.fadeOutCallback.bind(this, element));
 					} else {
 						this.fadeOutCallback(element);
 					}
 				}
			}

			blockUI(onBlock?: Function) {
				/// <summary>gives both the appearance and behavior of blocking user interaction with the grid</summary>
				/// <param name="onBlock" type="Function">callback method invoked when fadeIn has completed and blocking message is visible</param>
				var msg = "<span class='working'>Working...</span>";
				$("#" + this.id).block({
					message: msg,
					centerY: 0,
					overlayCSS: {
						opacity: 0,
						borderRadius: '4px'
					},
					css: {
						border: 'none',
						background: 'transparent',
						top: '6px'
					},
					onBlock: onBlock
				});
			}

			unblockUI(onUnblock?: Function) {
				/// <summary>removed a current grid block, if any</summary>
				/// <param name="onUnblock" type="Function">callback method invoked when unblocking has completed</param>
				$("#" + this.id).unblock({
					onUnblock: onUnblock
				});
			}

			numOfColumns() {
				return this.selectable ? this.columns().length + 1 : this.columns().length;
			}
		}
	}
}