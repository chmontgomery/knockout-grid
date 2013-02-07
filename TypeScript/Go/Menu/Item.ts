/// <reference path="Manager.ts" />

module go {
	export module MenuComponent {
		export class Item {

			public itemClick: () => void;

			constructor (public onClick?: () => void,
				public displayText?: string,
				public iconCssClass?: string,
				public tooltip?: string,
				public href?: string,
				public target?: string) {
				if (typeof onClick === 'function') {
					this.itemClick = function () {
						onClick();
						go.MenuComponent.Manager.closeActiveMenu();
					}
				}
				displayText = displayText || "&nbsp;";
				tooltip = tooltip || "";
				iconCssClass = iconCssClass || "";
				href = href || "javascript:void(0);";
				target = target || "_self";
			}
		}
	}
}