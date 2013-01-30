module go {
	export module Virtualization {
		export module VirtualMachine {
			export class PowerState {
				constructor(public order: number, public key: string, public displayText: string, public imgUrl: string) { }
			}
			export class PowerStates {
				static poweredOn = new go.Virtualization.VirtualMachine.PowerState(0, "poweredOn", "Powered On", "/Bundles/Styles/Images/virtual-machine/virtual-machine-poweredon-icon.png");
				static poweredOff = new go.Virtualization.VirtualMachine.PowerState(2, "poweredOff", "Powered Off", "/Bundles/Styles/Images/virtual-machine/virtual-machine-poweredoff-icon.png");
				static suspended = new go.Virtualization.VirtualMachine.PowerState(1, "suspended", "Suspended", "/Bundles/Styles/Images/virtual-machine/virtual-machine-suspended-icon.png");
				static wait = new go.Virtualization.VirtualMachine.PowerState(3, "wait", "Working...", "/Bundles/Styles/Images/virtual-machine/virtual-machine-waiting-icon.png");
				static unknown = new go.Virtualization.VirtualMachine.PowerState(4, "unknown", "Unknown", "/Bundles/Styles/Images/virtual-machine/virtual-machine-unknown-icon.png");
			}
		}
	}
}