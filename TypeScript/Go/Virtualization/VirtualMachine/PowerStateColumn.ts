/// <reference path="PowerStates.ts" />
/// <reference path="../../Kg/Column.ts" />

module go {
	export module Virtualization {
		export module VirtualMachine {
			export class PowerStateColumn extends go.kg.Column {
				sortASC(a: any, b: any): number {
					var aVMState = <go.Virtualization.VirtualMachine.PowerState>ko.utils.unwrapObservable(a[this.field]);
					var bVMState = <go.Virtualization.VirtualMachine.PowerState>ko.utils.unwrapObservable(b[this.field]);
					return aVMState.order - bVMState.order;
				}

				sortDESC(a: any, b: any): number {
					var aVMState = <go.Virtualization.VirtualMachine.PowerState>ko.utils.unwrapObservable(a[this.field]);
					var bVMState = <go.Virtualization.VirtualMachine.PowerState>ko.utils.unwrapObservable(b[this.field]);
					return bVMState.order - aVMState.order;
				}
			}
		}
	}
}