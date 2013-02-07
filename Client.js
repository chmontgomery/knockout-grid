ko.onDemandObservable = function (callback, target) {
    var _value = ko.observable();
    var result = ko.computed({
        read: function () {
            if(!result.loaded()) {
                callback.call(target);
            }
            return _value();
        },
        write: function (newValue) {
            result.loaded(true);
            _value(newValue);
        },
        deferEvaluation: true
    });
    result.loaded = ko.observable();
    result.refresh = function () {
        result.loaded(false);
    };
    return result;
};
var go;
(function (go) {
    var IllegalArgumentError = (function () {
        function IllegalArgumentError(message) {
            this.message = message;
        }
        return IllegalArgumentError;
    })();
    go.IllegalArgumentError = IllegalArgumentError;    
})(go || (go = {}));

var go;
(function (go) {
    var Argument = (function () {
        function Argument() { }
        Argument.notNull = function notNull(arg, argName) {
            if(typeof arg === 'undefined' || arg === null) {
                throw new go.IllegalArgumentError("argument '" + argName + "' cannot be null.");
            }
            return true;
        }
        Argument.boolOrTrue = function boolOrTrue(arg) {
            if(typeof arg === 'undefined' || arg === null) {
                return true;
            }
            return !!arg;
        }
        Argument.boolOrFalse = function boolOrFalse(arg) {
            if(typeof arg === 'undefined' || arg === null) {
                return false;
            }
            return !!arg;
        }
        Argument.stringOrEmptyString = function stringOrEmptyString(arg) {
            return go.Argument.stringOrDefault(arg, "");
        }
        Argument.stringOrDefault = function stringOrDefault(arg, stringDefault) {
            if(typeof arg === 'undefined' || arg === null) {
                return stringDefault;
            }
            return arg + '';
        }
        Argument.objectOrDefault = function objectOrDefault(value, defaultValue) {
            return typeof value === "undefined" ? defaultValue : value;
        }
        return Argument;
    })();
    go.Argument = Argument;    
})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var Column = (function () {
            function Column(field, template, headerText, isSortable, isExportable) {
                if (typeof headerText === "undefined") { headerText = ""; }
                if (typeof isSortable === "undefined") { isSortable = true; }
                if (typeof isExportable === "undefined") { isExportable = true; }
                this.field = field;
                this.template = template;
                this.headerText = headerText;
                this.isSortable = isSortable;
                this.isExportable = isExportable;
                go.Argument.notNull(field, "field");
                go.Argument.notNull(template, "template");
            }
            Column.prototype.sortASC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal < bVal ? -1 : 1;
            };
            Column.prototype.sortDESC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal < bVal ? 1 : -1;
            };
            return Column;
        })();
        kg.Column = Column;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var SelectableState = (function () {
            function SelectableState(id, cssClass) {
                this.id = id;
                this.cssClass = cssClass;
            }
            return SelectableState;
        })();
        kg.SelectableState = SelectableState;        
        var SelectableStates = (function () {
            function SelectableStates() { }
            SelectableStates.SELECTED = new go.kg.SelectableState(0, "check");
            SelectableStates.UNSELECTED = new go.kg.SelectableState(1, "no-check");
            SelectableStates.DISABLED = new go.kg.SelectableState(2, "disabled");
            SelectableStates.PARTIAL = new go.kg.SelectableState(3, "partial-check");
            return SelectableStates;
        })();
        kg.SelectableStates = SelectableStates;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var GridItem = (function () {
            function GridItem() {
                this.fieldsAsString = "";
            }
            GridItem.prototype.toJSON = function () {
                delete this.fieldsAsString;
                return this;
            };
            return GridItem;
        })();
        kg.GridItem = GridItem;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var go;
(function (go) {
    (function (kg) {
        var SelectableItem = (function (_super) {
            __extends(SelectableItem, _super);
            function SelectableItem() {
                        _super.call(this);
                this.selectState = ko.observable(go.kg.SelectableStates.UNSELECTED);
                this.selectClass = ko.computed(function () {
                    return "kogrid-checkbox " + this.selectState().cssClass;
                }, this);
            }
            SelectableItem.prototype.selectClick = function () {
                if(this.selectState() !== go.kg.SelectableStates.DISABLED) {
                    if(this.selectState() === go.kg.SelectableStates.UNSELECTED) {
                        this.selectState(go.kg.SelectableStates.SELECTED);
                    } else {
                        this.selectState(go.kg.SelectableStates.UNSELECTED);
                    }
                }
            };
            SelectableItem.prototype.isSelected = function () {
                return this.selectState() === go.kg.SelectableStates.SELECTED;
            };
            SelectableItem.prototype.toJSON = function () {
                delete this.selectState;
                delete this.selectClass;
                return this;
            };
            return SelectableItem;
        })(go.kg.GridItem);
        kg.SelectableItem = SelectableItem;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var ExportSettings = (function () {
            function ExportSettings(fileName, enabled) {
                this.fileName = fileName;
                this.enabled = enabled;
                this.columns = [];
            }
            ExportSettings.prototype.toJSON = function () {
                delete this.enabled;
                return this;
            };
            return ExportSettings;
        })();
        kg.ExportSettings = ExportSettings;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var ExportableColumn = (function () {
            function ExportableColumn(field, headerText) {
                this.field = field;
                this.headerText = headerText;
            }
            return ExportableColumn;
        })();
        kg.ExportableColumn = ExportableColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var Grid = (function () {
            function Grid(id, columns, items, itemCountMessageAll, itemCountMessagePartial, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody, selectable, exportSettings, actionsTemplate) {
                this.id = id;
                this.itemCountMessageAll = itemCountMessageAll;
                this.itemCountMessagePartial = itemCountMessagePartial;
                this.itemAddedToastTitle = itemAddedToastTitle;
                this.itemRemovedToastTitle = itemRemovedToastTitle;
                this.itemFieldForToastBody = itemFieldForToastBody;
                var _this = this;
                this.itemsLengthThreshold = 100;
                this.trNodeType = 1;
                this.allowFade = true;
                go.Argument.notNull(id, "id");
                go.Argument.notNull(columns, "columns");
                this.columns = ko.observableArray(columns);
                this.selectable = go.Argument.boolOrFalse(selectable);
                this.exportSettings = go.Argument.objectOrDefault(exportSettings, new go.kg.ExportSettings("Report", false));
                $.each(this.columns(), $.proxy(this.buildExportSettingsIterator, this));
                this.items = items || ko.observableArray([]);
                this.items.subscribe(this.itemsChanged, this);
                this.selectedItems = ko.computed(function () {
                    if(!this.selectable) {
                        return [];
                    }
                    return ko.utils.arrayFilter(this.items(), function (item) {
                        return item.isSelected();
                    });
                }, this);
                this.actionsTemplate = actionsTemplate;
                this.filter = ko.observable("");
                this.filterThrottleTime = ko.computed(function () {
                    return _this.items().length > _this.itemsLengthThreshold ? 300 : 0;
                });
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
                this.isLoadedAndEmpty = ko.computed(function () {
                    return _this.isLoaded() && _this.filteredItems().length === 0;
                });
            }
            Grid.prototype.getCountText = function () {
                var countText = "";
                if(this.filteredItems().length === this.items().length) {
                    countText = this.itemCountMessageAll ? this.itemCountMessageAll.format(this.filteredItems().length) : "";
                } else {
                    countText = this.itemCountMessagePartial ? this.itemCountMessagePartial.format(this.filteredItems().length, this.items().length) : "";
                }
                return countText;
            };
            Grid.prototype.buildExportSettingsIterator = function (i, col) {
                if(col.isExportable) {
                    var column = new kg.ExportableColumn(col.field, col.headerText);
                    this.exportSettings.columns.push(column);
                }
            };
            Grid.prototype.itemPropertyReplacer = function (key, value) {
                var computedValue = ko.utils.unwrapObservable(value);
                if(typeof computedValue === 'undefined') {
                    return "";
                } else {
                    if(computedValue instanceof Date) {
                        return computedValue.toString();
                    }
                }
                return computedValue;
            };
            Grid.exportToFileErrorMessage = function exportToFileErrorMessage() {
                toastr.error("There was an unexpected error downloading your document. Please try again later.", "Error Exporting Grid");
            }
            Grid.exportToFileSuccessMessage = function exportToFileSuccessMessage() {
                toastr.success("Check your browser's download location for your file.", "Successfully Exported Grid");
            }
            Grid.prototype.exportToFile = function (type) {
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
                        if(data && data.fileKey) {
                            window.location.href = "/Grid/GetExportFile?fileKey=" + data.fileKey;
                            go.kg.Grid.exportToFileSuccessMessage();
                        } else {
                            go.kg.Grid.exportToFileErrorMessage();
                        }
                    },
                    error: go.kg.Grid.exportToFileErrorMessage
                });
            };
            Grid.prototype.exportAsPDF = function () {
                this.exportToFile("pdf");
            };
            Grid.prototype.exportAsCSV = function () {
                this.exportToFile("csv");
            };
            Grid.prototype.exportAsXLS = function () {
                this.exportToFile("xls");
            };
            Grid.prototype.exportAsXLSX = function () {
                this.exportToFile("xlsx");
            };
            Grid.prototype.isAsc = function (col) {
                if(this.lastSortedColumn() === col) {
                    return this.lastSortOrder() === "asc";
                }
                return false;
            };
            Grid.prototype.isDesc = function (col) {
                if(this.lastSortedColumn() === col) {
                    return this.lastSortOrder() === "desc";
                }
                return false;
            };
            Grid.prototype.sortASC = function (column) {
                this.items.sort($.proxy(column.sortASC, column));
                this.lastSortOrder("asc");
            };
            Grid.prototype.sortDESC = function (column) {
                this.items.sort($.proxy(column.sortDESC, column));
                this.lastSortOrder("desc");
            };
            Grid.prototype.enableAllowFade = function () {
                this.allowFade = true;
            };
            Grid.prototype.disableAllowFade = function () {
                this.allowFade = false;
            };
            Grid.prototype.doSort = function (column) {
                if(column.field === this.lastSortedColumn()) {
                    if(this.lastSortOrder() === "desc") {
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
            };
            Grid.prototype.sort = function (column) {
                if(this.filteredItems().length > this.itemsLengthThreshold) {
                    if(column.isSortable) {
                        this.disableAllowFade();
                        this.blockUI(this.doSort.bind(this, column));
                    }
                } else {
                    this.doSort(column);
                }
            };
            Grid.prototype.getSelectAllState = function () {
                var itemsChecked = 0;
                if(this.selectable) {
                    $.each(this.filteredItems(), function (i, o) {
                        if(o.selectState() === go.kg.SelectableStates.SELECTED) {
                            itemsChecked++;
                        }
                    });
                }
                if(itemsChecked === this.filteredItems().length) {
                    return go.kg.SelectableStates.SELECTED;
                } else {
                    if(itemsChecked > 0) {
                        return go.kg.SelectableStates.PARTIAL;
                    } else {
                        return go.kg.SelectableStates.UNSELECTED;
                    }
                }
            };
            Grid.prototype.getSelectAllClass = function () {
                return "grid-checkbox-select-all kogrid-checkbox " + this.selectAllState().cssClass;
            };
            Grid.prototype.selectAllClick = function () {
                if(this.selectAllState() === go.kg.SelectableStates.SELECTED) {
                    this.unselectAllItems();
                } else {
                    this.selectAllItems();
                }
            };
            Grid.prototype.unselectAllItems = function () {
                if(this.selectable) {
                    $.each(this.items(), function (i, o) {
                        o.selectState(go.kg.SelectableStates.UNSELECTED);
                    });
                }
            };
            Grid.prototype.selectAllItems = function () {
                if(this.selectable) {
                    $.each(this.filteredItems(), function (i, o) {
                        o.selectState(go.kg.SelectableStates.SELECTED);
                    });
                }
            };
            Grid.prototype.setFilteredItems = function () {
                var newFilteredItems = ko.utils.arrayFilter(this.items(), $.proxy(this.filterItem, this));
                this.filteredItems(newFilteredItems);
            };
            Grid.prototype.cacheItemFieldsAsString = function (item) {
                item.fieldsAsString = "";
                $.each(this.columns(), function (i, col) {
                    var field = ko.utils.unwrapObservable(item[col.field]);
                    var typeOfField = typeof field;
                    if(typeOfField === 'string' || typeOfField === 'number' || typeOfField === 'boolean' || field instanceof Date) {
                        var fieldAsString = (field + " ").toLowerCase();
                        item.fieldsAsString += fieldAsString;
                    }
                });
            };
            Grid.prototype.defaultFilterItem = function (item) {
                var loweredFilter = this.filter().toLowerCase();
                var allFilters = loweredFilter.split(" ");
                this.cacheItemFieldsAsString(item);
                var allFiltersFoundInRow = true;
                $.each(allFilters, function (i, filter) {
                    if(item.fieldsAsString.indexOf(filter) === -1) {
                        allFiltersFoundInRow = false;
                        return false;
                    }
                });
                return allFiltersFoundInRow;
            };
            Grid.prototype.filterItem = function (item) {
                return this.defaultFilterItem(item);
            };
            Grid.prototype.filterChange = function (newValue) {
                this.disableAllowFade();
                if(this.items().length > this.itemsLengthThreshold) {
                    this.blockUI(this.filteredItems.refresh);
                } else {
                    this.filteredItems.refresh();
                }
                if(this.selectable) {
                    this.unselectAllItems();
                }
                this.unblockUI($.proxy(this.enableAllowFade, this));
                return true;
            };
            Grid.prototype.itemsChanged = function (value) {
                this.filteredItems.refresh();
            };
            Grid.prototype.fadeIn = function (element, index, data) {
                if(element.nodeType === this.trNodeType) {
                    if(this.allowFade) {
                        $(element).filter("tr").effect("highlight", {
                        }, 2000);
                    }
                }
            };
            Grid.prototype.fadeOutCallback = function (element) {
                $(element).remove();
            };
            Grid.prototype.fadeOut = function (element, index, data) {
                if(element.nodeType === this.trNodeType) {
                    if(this.allowFade) {
                        $(element).css("background-color", "#fcefa1");
                        $(element).fadeOut('slow', this.fadeOutCallback.bind(this, element));
                    } else {
                        this.fadeOutCallback(element);
                    }
                }
            };
            Grid.prototype.blockUI = function (onBlock) {
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
            };
            Grid.prototype.unblockUI = function (onUnblock) {
                $("#" + this.id).unblock({
                    onUnblock: onUnblock
                });
            };
            Grid.prototype.numOfColumns = function () {
                return this.selectable ? this.columns().length + 1 : this.columns().length;
            };
            return Grid;
        })();
        kg.Grid = Grid;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

