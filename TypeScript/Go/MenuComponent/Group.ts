/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="../../_Definitions/Scripts/Shared/Global.d.ts" />
/// <reference path="Manager.ts" />

module go {
	export module MenuComponent {
		export class Group {

			private isOpening: bool = false;
			private isClosing: bool = false;
			public closeActiveMenuClick: () => void = go.MenuComponent.Manager.closeActiveMenu;

			constructor (private id: string,
				public items: Array,
				public displayText: string,
				public tooltip?: string,
				private iconCssClass?: string,
				private isLargeIcon?: bool,
				private closeActiveMenuCallback?: () => void) {
				if (typeof closeActiveMenuCallback === 'function') {
					this.closeActiveMenuClick = function () {
						closeActiveMenuCallback();
						go.MenuComponent.Manager.closeActiveMenu();
					}
				}
				tooltip = typeof tooltip === 'undefined' ? "" : tooltip;
				go.MenuComponent.Manager.menus.register(this.id, this);
			}

			menuClasses(): string {
				return this.iconCssClass ? ((this.isLargeIcon ? "menu-icon20x20" : "menu-icon16x16") + " " + this.iconCssClass) : "";
			}

			buttonId(): string {
				return this.id + "_buttonId";
			}

			menuId(): string {
				return this.id + "_menuDiv";
			}

			open(): void {
				var button = $("#" + this.buttonId());
				var x = button.position().left + 10;
				var y = button.position().top + 24;
				this.openAt(x, y);
			}

			openAt(x: number, y: number): void {

				go.MenuComponent.Manager.setActiveMenu(this.id);

				// prevent messed-up states from fast clicking
				if (this.isOpening) {
					return;
				}
				this.isOpening = true;

				// block the page behind, keeping the open dropdown on top
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

				// called on open and close
				div.slideToggle(go.Global.DropDownSpeed, go.MenuComponent.Manager.openCallbackActiveMenu);
			}

			close(): void {
				// prevent messed-up states from fast clicking
				if (this.isClosing) {
					return;
				}
				this.isClosing = true;

				$("#" + this.menuId()).slideToggle(go.Global.DropDownSpeed, go.MenuComponent.Manager.closeCallbackActiveMenu);
			}
		}
	}
}