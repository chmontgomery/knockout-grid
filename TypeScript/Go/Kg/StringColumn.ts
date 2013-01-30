/// <reference path="Column.ts" />
module go {
	export module kg {
		export class StringColumn extends go.kg.Column {
			sortASC(a: any, b: any): number {
				// TODO perhaps needs more thought for diff locals??
				// IE appears to use the system locale
				// v8 uses the raw UTF16 values
				var aVal = <string>ko.utils.unwrapObservable(a[this.field]);
				var bVal = <string>ko.utils.unwrapObservable(b[this.field]);
				return aVal.toLowerCase().localeCompare(bVal.toLowerCase());
			}

			sortDESC(a: any, b: any): number {
				var aVal = <string>ko.utils.unwrapObservable(a[this.field]);
				var bVal = <string>ko.utils.unwrapObservable(b[this.field]);
				return bVal.toLowerCase().localeCompare(aVal.toLowerCase());
			}
		}
	}
}