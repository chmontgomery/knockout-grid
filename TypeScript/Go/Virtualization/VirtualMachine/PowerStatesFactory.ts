/// <reference path="PowerStates.ts" />
module go {
	export module Virtualization {
		export module VirtualMachine {
			export class PowerStatesFactory {
				static get (state: string): go.Virtualization.VirtualMachine.PowerState {
					var stateObject = go.Virtualization.VirtualMachine.PowerStates[state];
					if (!stateObject) {
						stateObject = go.Virtualization.VirtualMachine.PowerStates.unknown;
					}
					return stateObject;
				}
			}
		}
	}
}