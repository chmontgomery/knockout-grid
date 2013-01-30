/// <reference path="../Shared/ObjectManager.ts" />
/// <reference path="../../_Definitions/Scripts/Shared/Global.d.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />

module go {
	export module MenuComponent {
		export module Manager {

			export var menus = new goglobal.ObjectManager();

			export var activeMenuId: string = null;

			export function setActiveMenu(id: string) {
				activeMenuId = id;
			}

			export function getActiveMenu(): string {
				return go.MenuComponent.Manager.activeMenuId;
			}

			export function closeActiveMenu() {
				if (go.MenuComponent.Manager.activeMenuId === null) {
					return;
				}
				var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
				menu.close();
			}

			export function closeCallbackActiveMenu() {
				if (go.MenuComponent.Manager.activeMenuId === null) {
					return;
				}
				// TODO: When menu actions want to display the please wait, this causes it to go away.
				go.Global.PleaseWait({ show: false });
				var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
				menu.isClosing = false;
				$(menu.menuId()).trigger('menuclosed');
				go.MenuComponent.Manager.clearActiveMenu();
			}

			export function openCallbackActiveMenu() {
				if (go.MenuComponent.Manager.activeMenuId === null) {
					return;
				}
				var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
				menu.isOpening = false;
			}

			export function clearActiveMenu() {
				go.MenuComponent.Manager.setActiveMenu(null);
			}
		}
	}
}