/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="../Shared/Argument.ts" />
module go {
	export module kg {
		export class Column {
			constructor (public field: string,
				public template: string,
				public headerText: string = "",
				public isSortable: bool = true,
				public isExportable: bool = true) {
				go.Argument.notNull(field, "field");
				go.Argument.notNull(template, "template");
			}

			sortASC(a: any, b: any): number {
				var aVal = <any>ko.utils.unwrapObservable(a[this.field]);
				var bVal = <any>ko.utils.unwrapObservable(b[this.field]);
				return aVal < bVal ? -1 : 1;
			}

			sortDESC(a: any, b: any): number {
				var aVal = <any>ko.utils.unwrapObservable(a[this.field]);
				var bVal = <any>ko.utils.unwrapObservable(b[this.field]);
				return aVal < bVal ? 1 : -1;
			}
		}
	}
}