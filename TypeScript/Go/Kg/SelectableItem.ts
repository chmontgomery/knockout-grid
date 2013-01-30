/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="GridItem.ts" />
/// <reference path="SelectableStates.ts" />
module go {
	export module kg {
		export class SelectableItem extends go.kg.GridItem {

			selectState: KnockoutObservableAny;
			selectClass: KnockoutComputed;

			constructor () {
				super();
				this.selectState = ko.observable(go.kg.SelectableStates.UNSELECTED);
				this.selectClass = ko.computed(function () {
					return "kogrid-checkbox " + this.selectState().cssClass;
				}, this);
			}

			selectClick() {
				if (this.selectState() !== go.kg.SelectableStates.DISABLED) {
					if (this.selectState() === go.kg.SelectableStates.UNSELECTED) {
						this.selectState(go.kg.SelectableStates.SELECTED);
					} else {
						this.selectState(go.kg.SelectableStates.UNSELECTED);
					}
				}
			}

			isSelected(): bool {
				return this.selectState() === go.kg.SelectableStates.SELECTED;
			}

			toJSON(): any {
				delete this.selectState;
				delete this.selectClass;
				return this;
			}
		}
	}
}