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
