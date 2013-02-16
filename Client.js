var goglobal;
(function (goglobal) {
    var ObjectManager = (function () {
        function ObjectManager() {
            this.objects = {
            };
            this.isDebug = false;
        }
        ObjectManager.prototype.logger = function (message) {
            if(this.isDebug) {
                console.log(message);
            }
        };
        ObjectManager.prototype.register = function (id, object) {
            if(this.objects[id]) {
                this.logger('go.ObjectManager.Register -> "' + id + '" already registered in manager. The value will now be overridden with your new object.');
            } else {
                this.logger('go.ObjectManager.Register -> registering object "' + id + '"');
            }
            this.objects[id] = object;
            return object;
        };
        ObjectManager.prototype.remove = function (id) {
            this.logger('go.ObjectManager.Remove -> un-registering object "' + id + '"');
            if(this.objects[id]) {
                return delete this.objects[id];
            }
            return false;
        };
        ObjectManager.prototype.get = function (id) {
            if(!(id in this.objects)) {
                return null;
            }
            this.logger('go.ObjectManager.Get -> returning object obj for "' + id + '"');
            return this.objects[id];
        };
        ObjectManager.prototype.contains = function (id) {
            var contains = (id in this.objects);
            this.logger('go.ObjectManager.Contains -> id in manager?: ' + contains);
            return contains;
        };
        ObjectManager.prototype.getAllByRegex = function (regexPattern) {
            var matchedKeys = [];
            var matcher = new RegExp(regexPattern);
            for(var key in this.objects) {
                if(matcher.test(key)) {
                    matchedKeys.push(key);
                }
            }
            return matchedKeys;
        };
        ObjectManager.prototype.getSingleByRegex = function (regexPattern) {
            var matchedKeys = this.getAllByRegex(regexPattern);
            if(matchedKeys.length === 1) {
                return this.objects[matchedKeys[0]];
            } else {
                if(matchedKeys.length > 1) {
                    throw new Error('go.ObjectManager.Register -> found multiple matches in manager for regex "' + regexPattern + '". Matching keys: ' + matchedKeys.toString());
                } else {
                    throw new Error('go.ObjectManager.Register -> object NOT found in manager using regex "' + regexPattern + '"');
                }
            }
        };
        return ObjectManager;
    })();
    goglobal.ObjectManager = ObjectManager;    
})(goglobal || (goglobal = {}));

var go;
(function (go) {
    (function (MenuComponent) {
        (function (Manager) {
            Manager.menus = new goglobal.ObjectManager();
            Manager.activeMenuId = null;
            function setActiveMenu(id) {
                Manager.activeMenuId = id;
            }
            Manager.setActiveMenu = setActiveMenu;
            function getActiveMenu() {
                return go.MenuComponent.Manager.activeMenuId;
            }
            Manager.getActiveMenu = getActiveMenu;
            function closeActiveMenu() {
                if(go.MenuComponent.Manager.activeMenuId === null) {
                    return;
                }
                var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
                menu.close();
            }
            Manager.closeActiveMenu = closeActiveMenu;
            function closeCallbackActiveMenu() {
                if(go.MenuComponent.Manager.activeMenuId === null) {
                    return;
                }
                go.Global.PleaseWait({
                    show: false
                });
                var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
                menu.isClosing = false;
                $(menu.menuId()).trigger('menuclosed');
                go.MenuComponent.Manager.clearActiveMenu();
            }
            Manager.closeCallbackActiveMenu = closeCallbackActiveMenu;
            function openCallbackActiveMenu() {
                if(go.MenuComponent.Manager.activeMenuId === null) {
                    return;
                }
                var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
                menu.isOpening = false;
            }
            Manager.openCallbackActiveMenu = openCallbackActiveMenu;
            function clearActiveMenu() {
                go.MenuComponent.Manager.setActiveMenu(null);
            }
            Manager.clearActiveMenu = clearActiveMenu;
        })(MenuComponent.Manager || (MenuComponent.Manager = {}));
        var Manager = MenuComponent.Manager;

    })(go.MenuComponent || (go.MenuComponent = {}));
    var MenuComponent = go.MenuComponent;

})(go || (go = {}));

var go;
(function (go) {
    (function (MenuComponent) {
        var Item = (function () {
            function Item(onClick, displayText, iconCssClass, tooltip, href, target) {
                this.onClick = onClick;
                this.displayText = displayText;
                this.iconCssClass = iconCssClass;
                this.tooltip = tooltip;
                this.href = href;
                this.target = target;
                if(typeof onClick === 'function') {
                    this.itemClick = function () {
                        onClick();
                        go.MenuComponent.Manager.closeActiveMenu();
                    };
                }
                displayText = displayText || "&nbsp;";
                tooltip = tooltip || "";
                iconCssClass = iconCssClass || "";
                href = href || "javascript:void(0);";
                target = target || "_self";
            }
            return Item;
        })();
        MenuComponent.Item = Item;        
    })(go.MenuComponent || (go.MenuComponent = {}));
    var MenuComponent = go.MenuComponent;

})(go || (go = {}));

var go;
(function (go) {
    (function (MenuComponent) {
        var Group = (function () {
            function Group(id, items, displayText, tooltip, iconCssClass, isLargeIcon, closeActiveMenuCallback) {
                this.id = id;
                this.items = items;
                this.displayText = displayText;
                this.tooltip = tooltip;
                this.iconCssClass = iconCssClass;
                this.isLargeIcon = isLargeIcon;
                this.closeActiveMenuCallback = closeActiveMenuCallback;
                this.isOpening = false;
                this.isClosing = false;
                this.closeActiveMenuClick = go.MenuComponent.Manager.closeActiveMenu;
                if(typeof closeActiveMenuCallback === 'function') {
                    this.closeActiveMenuClick = function () {
                        closeActiveMenuCallback();
                        go.MenuComponent.Manager.closeActiveMenu();
                    };
                }
                tooltip = typeof tooltip === 'undefined' ? "" : tooltip;
                go.MenuComponent.Manager.menus.register(this.id, this);
            }
            Group.prototype.menuClasses = function () {
                return this.iconCssClass ? ((this.isLargeIcon ? "menu-icon20x20" : "menu-icon16x16") + " " + this.iconCssClass) : "";
            };
            Group.prototype.buttonId = function () {
                return this.id + "_buttonId";
            };
            Group.prototype.menuId = function () {
                return this.id + "_menuDiv";
            };
            Group.prototype.open = function () {
                var button = $("#" + this.buttonId());
                var x = button.position().left + 10;
                var y = button.position().top + 24;
                this.openAt(x, y);
            };
            Group.prototype.openAt = function (x, y) {
                go.MenuComponent.Manager.setActiveMenu(this.id);
                if(this.isOpening) {
                    return;
                }
                this.isOpening = true;
                go.Global.PleaseWait({
                    show: true,
                    escalateAfterMilleseconds: -1,
                    cursor: "inherit",
                    onCoverClick: this.closeActiveMenuClick,
                    coverOpacity: 0.08,
                    zIndex: 98
                });
                var div = $("#" + this.menuId());
                div.css("left", x);
                div.css("top", y);
                div.css("z-index", 99);
                div.slideToggle(go.Global.DropDownSpeed, go.MenuComponent.Manager.openCallbackActiveMenu);
            };
            Group.prototype.close = function () {
                if(this.isClosing) {
                    return;
                }
                this.isClosing = true;
                $("#" + this.menuId()).slideToggle(go.Global.DropDownSpeed, go.MenuComponent.Manager.closeCallbackActiveMenu);
            };
            return Group;
        })();
        MenuComponent.Group = Group;        
    })(go.MenuComponent || (go.MenuComponent = {}));
    var MenuComponent = go.MenuComponent;

})(go || (go = {}));

var go;
(function (go) {
    var NotImplementedError = (function () {
        function NotImplementedError(message) {
            this.message = message;
        }
        return NotImplementedError;
    })();
    go.NotImplementedError = NotImplementedError;    
})(go || (go = {}));

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
    var IPAddressModel = (function () {
        function IPAddressModel(fullIP) {
            var _this = this;
            var part1 = null;
            var part2 = null;
            var part3 = null;
            var part4 = null;
            if(fullIP) {
                var parts = fullIP.split(".");
                if(parts.length === 4) {
                    part1 = parts[0];
                    part2 = parts[1];
                    part3 = parts[2];
                    part4 = parts[3];
                }
            }
            this.part1 = ko.observable(part1);
            this.part2 = ko.observable(part2);
            this.part3 = ko.observable(part3);
            this.part4 = ko.observable(part4);
            this.full = ko.computed(function () {
                return [
                    _this.part1(), 
                    _this.part2(), 
                    _this.part3(), 
                    _this.part4()
                ].join(".");
            });
        }
        IPAddressModel.prototype.isValid = function () {
            return (/(\d{1,3}\.){3}\d{1,3}/).test(this.full());
        };
        IPAddressModel.prototype.clear = function () {
            this.part1(null);
            this.part2(null);
            this.part3(null);
            this.part4(null);
        };
        return IPAddressModel;
    })();
    go.IPAddressModel = IPAddressModel;    
})(go || (go = {}));

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
    (function (Commands) {
        var Command = (function () {
            function Command(targets, url, filterer) {
                this.targets = targets;
                this.url = url;
                this.filterer = filterer || this.filterer;
            }
            Command.prototype.execute = function () {
            };
            Command.prototype.canExecute = function () {
                return this.filterer().length > 0;
            };
            Command.prototype.filterer = function () {
                return this.targets();
            };
            return Command;
        })();
        Commands.Command = Command;        
    })(go.Commands || (go.Commands = {}));
    var Commands = go.Commands;

})(go || (go = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var go;
(function (go) {
    (function (Commands) {
        var ConfirmationCommand = (function (_super) {
            __extends(ConfirmationCommand, _super);
            function ConfirmationCommand(targets, url, headerText, contentEvaluator, filterer) {
                        _super.call(this, targets, url, filterer);
                this.headerText = headerText;
                this.content = ko.computed(contentEvaluator, this);
                var defaultExecute = this.execute;
                this.execute = function () {
                    if(this.canExecute()) {
                    }
                };
            }
            return ConfirmationCommand;
        })(go.Commands.Command);
        Commands.ConfirmationCommand = ConfirmationCommand;        
    })(go.Commands || (go.Commands = {}));
    var Commands = go.Commands;

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
                this.filteredItems = ko.computed(function () {
                    return ko.utils.arrayFilter(_this.items(), $.proxy(_this.filterItem, _this));
                });
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
            };
            Grid.prototype.sort = function (column) {
                if(this.filteredItems().length > this.itemsLengthThreshold) {
                    if(column.isSortable) {
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
            Grid.prototype.itemsChanged = function (value) {
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

var go;
(function (go) {
    (function (kg) {
        var GridOptions = (function () {
            function GridOptions(id) {
                this.id = id;
            }
            return GridOptions;
        })();
        kg.GridOptions = GridOptions;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var DateColumn = (function (_super) {
            __extends(DateColumn, _super);
            function DateColumn() {
                _super.apply(this, arguments);

            }
            return DateColumn;
        })(go.kg.Column);
        kg.DateColumn = DateColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var ColumnBool = (function (_super) {
            __extends(ColumnBool, _super);
            function ColumnBool() {
                _super.apply(this, arguments);

            }
            ColumnBool.prototype.sortASC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal === bVal ? 0 : aVal ? -1 : 1;
            };
            ColumnBool.prototype.sortDESC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal === bVal ? 0 : aVal ? 1 : -1;
            };
            return ColumnBool;
        })(go.kg.Column);
        kg.ColumnBool = ColumnBool;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var StringColumn = (function (_super) {
            __extends(StringColumn, _super);
            function StringColumn() {
                _super.apply(this, arguments);

            }
            StringColumn.prototype.sortASC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal.toLowerCase().localeCompare(bVal.toLowerCase());
            };
            StringColumn.prototype.sortDESC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return bVal.toLowerCase().localeCompare(aVal.toLowerCase());
            };
            return StringColumn;
        })(go.kg.Column);
        kg.StringColumn = StringColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

var go;
(function (go) {
    (function (kg) {
        var NumberColumn = (function (_super) {
            __extends(NumberColumn, _super);
            function NumberColumn() {
                _super.apply(this, arguments);

            }
            NumberColumn.prototype.sortASC = function (a, b) {
                var aVal = +ko.utils.unwrapObservable(a[this.field]);
                var bVal = +ko.utils.unwrapObservable(b[this.field]);
                aVal = isNaN(aVal) ? Number.MAX_VALUE : aVal;
                bVal = isNaN(bVal) ? Number.MAX_VALUE : bVal;
                return aVal - bVal;
            };
            NumberColumn.prototype.sortDESC = function (a, b) {
                var aVal = +ko.utils.unwrapObservable(a[this.field]);
                var bVal = +ko.utils.unwrapObservable(b[this.field]);
                aVal = isNaN(aVal) ? Number.MAX_VALUE : aVal;
                bVal = isNaN(bVal) ? Number.MAX_VALUE : bVal;
                return bVal - aVal;
            };
            return NumberColumn;
        })(go.kg.Column);
        kg.NumberColumn = NumberColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;

})(go || (go = {}));

