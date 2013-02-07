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
