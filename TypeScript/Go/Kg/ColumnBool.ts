/// <reference path="Column.ts" />
module go {
	export module kg {
		// for some reason we can't name this BoolColumn because then we get the error "Cannot read property 'prototype' of undefined"
		// no idea why
		export class ColumnBool extends go.kg.Column {
			sortASC(a: any, b: any): number {
				var aVal = <bool>ko.utils.unwrapObservable(a[this.field]);
				var bVal = <bool>ko.utils.unwrapObservable(b[this.field]);
				return aVal === bVal ? 0:
					aVal ? -1 : 1;
			}
			sortDESC(a: any, b: any): number {
				var aVal = <bool>ko.utils.unwrapObservable(a[this.field]);
				var bVal = <bool>ko.utils.unwrapObservable(b[this.field]);
				return aVal === bVal ? 0:
					aVal ? 1 : -1;
			}
		}
	}
}