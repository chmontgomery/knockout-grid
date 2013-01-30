/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="SelectableStates.ts" />
module go {
	export module kg {
		export class GridItem {
			fieldsAsString: string = "";

			toJSON(): any {
				/// <summary>
				/// used by ko.toJSON. Makes a copy of this object and then you remove all properties you don't want included in json string.
				/// to send the least amount of data possible down to server when exporting make sure to override toJSON on your item object
				/// </summary>
				/// <returns type="go.kg.GridItem"></returns>
				delete this.fieldsAsString;
				return this;
			}
		}
	}
}