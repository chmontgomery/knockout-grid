/// <reference path="Column.ts" />
module go {
	export module kg {
		export class NumberColumn extends go.kg.Column {
			sortASC(a: any, b: any): number {
				// NOTE: + operation will cast null to 0 and undefined to NaN
				var aVal = +<number>ko.utils.unwrapObservable(a[this.field]);
				var bVal = +<number>ko.utils.unwrapObservable(b[this.field]);
				aVal = isNaN(aVal) ? Number.MAX_VALUE : aVal;
				bVal = isNaN(bVal) ? Number.MAX_VALUE : bVal;
				// subtraction is slightly more performant than greater than comparison
				return aVal - bVal;
			}
			sortDESC(a: any, b: any): number {
				var aVal = +<number>ko.utils.unwrapObservable(a[this.field]);
				var bVal = +<number>ko.utils.unwrapObservable(b[this.field]);
				aVal = isNaN(aVal) ? Number.MAX_VALUE : aVal;
				bVal = isNaN(bVal) ? Number.MAX_VALUE : bVal;
				return bVal - aVal;
			}
		}
	}
}