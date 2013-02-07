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

