/// <reference path="../Shared/IPAddressModel.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />
module go.ActiveManagement {
	export class Connection {
		type: string = "host-icon"; //TODO wrap this with class and factory to support different types
		ip: go.IPAddressModel;
		constructor(public name: string, ip?: go.IPAddressModel) {
			this.ip = ip ? ip : new go.IPAddressModel();
		}
	}
}