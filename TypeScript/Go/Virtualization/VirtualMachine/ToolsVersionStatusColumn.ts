/// <reference path="ToolsVersionStatus.ts" />
/// <reference path="../../Kg/Column.ts" />

module go.Virtualization.VirtualMachine {
	export class ToolsVersionStatusColumn extends go.kg.Column {
		sortASC(a: any, b: any): number {
			var aToolsStatus = <go.Virtualization.VirtualMachine.ToolsVersionStatus>ko.utils.unwrapObservable(a[this.field]);
			var bToolsStatus = <go.Virtualization.VirtualMachine.ToolsVersionStatus>ko.utils.unwrapObservable(b[this.field]);
			return aToolsStatus.order - bToolsStatus.order;
		}

		sortDESC(a: any, b: any): number {
			var aToolsStatus = <go.Virtualization.VirtualMachine.ToolsVersionStatus>ko.utils.unwrapObservable(a[this.field]);
			var bToolsStatus = <go.Virtualization.VirtualMachine.ToolsVersionStatus>ko.utils.unwrapObservable(b[this.field]);
			return bToolsStatus.order - aToolsStatus.order;
		}
	}
}