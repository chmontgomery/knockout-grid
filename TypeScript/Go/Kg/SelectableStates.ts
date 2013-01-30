module go {
	export module kg {
		export class SelectableState {
			constructor (public id: number, public cssClass: string) { }
		}
		export class SelectableStates {
			static SELECTED = new go.kg.SelectableState(0, "check");
			static UNSELECTED = new go.kg.SelectableState(1, "no-check");
			static DISABLED = new go.kg.SelectableState(2, "disabled");
			static PARTIAL = new go.kg.SelectableState(3, "partial-check");
		}
	}
}