/// <reference path="../Shared/IPAddressModel.ts" />
/// <reference path="Connection.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />
module go.ActiveManagement {
	export class ConnectionManager {

		workingIP: go.IPAddressModel;
		validationMessage: KnockoutObservableString;
		lastRemovedIP: go.IPAddressModel;
		
		constructor(public connections: KnockoutObservableArray) {
			this.workingIP = new go.IPAddressModel();
			this.validationMessage = ko.observable();
		}

		addWorkingIP(): void {
			// is there a way to re-write all this dom interaction using ko instead?
			// I tried but all the IPValidation.js code would need to be rewritten too...
			this.workingIP.part1($("#manageConnectionsList .add-ip-address .part1").val());
			this.workingIP.part2($("#manageConnectionsList .add-ip-address .part2").val());
			this.workingIP.part3($("#manageConnectionsList .add-ip-address .part3").val());
			this.workingIP.part4($("#manageConnectionsList .add-ip-address .part4").val());
			
			if (this.workingIP.isValid()) {
				this.validationMessage(null);
				var clone = ko.mapping.fromJS(ko.mapping.toJS(this.workingIP));
				this.connections.push(new go.ActiveManagement.Connection("Unknown", clone));
				this.workingIP.clear();
				$("#manageConnectionsList .add-ip-address .part1").val("");
				$("#manageConnectionsList .add-ip-address .part2").val("");
				$("#manageConnectionsList .add-ip-address .part3").val("");
				$("#manageConnectionsList .add-ip-address .part4").val("");
			} else {
				this.validationMessage('Valid IP address required, e.g. "123.123.123.123"');
			}
		}

		removeIP(ip: go.IPAddressModel): void {
			this.lastRemovedIP = ip;
			this.connections.remove(ip);
			$("#undoLastRemovedIP").show();
		}

		undoLastRemovedIP(): void {
			if (this.lastRemovedIP) {
				this.connections.push(this.lastRemovedIP);
				this.lastRemovedIP = null;
			}
			$("#undoLastRemovedIP").hide();
		}

		liNodeType: number = 1;

		private fadeIn(element: any, index: number, data: any) {
			// afterAdd called 3 times. We only want to fade once
			if (element.nodeType === this.liNodeType) {
				$(element).filter("li").effect("highlight", {}, 2000);
			}
 		}

		private fadeOutCallback() {
			$(this).remove();
		}

		private fadeOut(element: any, index: number, data: any) {
			// beforeRemove called 3 times. We only want to fade once
 			if (element.nodeType === this.liNodeType) {
 				$(element).css("background-color", "#fcefa1");
 				$(element).fadeOut('slow', this.fadeOutCallback.bind(element));
 			}
		}
	}
}