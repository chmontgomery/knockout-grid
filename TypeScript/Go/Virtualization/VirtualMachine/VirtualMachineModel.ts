/// <reference path="../Hypervisor/HypervisorModel.ts" />
/// <reference path="../../../_Definitions/_allRefs.d.ts" />
/// <reference path="../../Shared/Argument.ts" />
/// <reference path="ToolsVersionStatusFactory.ts" />
/// <reference path="PowerStatesFactory.ts" />
/// <reference path="PowerStates.ts" />
/// <reference path="../../Kg/SelectableItem.ts" />
/// <reference path="OS.ts" />
/// <reference path="OSFactory.ts" />
/// <reference path="../VimTask.ts" />

module go {
	export module Virtualization {
		export module VirtualMachine {
			export class VirtualMachineModel extends Subjects.VirtualMachineViewModel {

				state: KnockoutComputed;
				detailPageUrl: KnockoutComputed;
				os: KnockoutComputed;
				toolsVersionStatus: KnockoutComputed;
				toolsVersionStatusText: KnockoutComputed;
				hostName: KnockoutComputed;
				myHost: KnockoutComputed;

				constructor(subjectRef: Subjects.SubjectRef, properties?: { [path: string]: any; }) {
					super(subjectRef);
					this.applyProperties(properties);

					this.state = ko.computed(() => go.Virtualization.VirtualMachine.PowerStatesFactory.get(this.powerState()));
					this.detailPageUrl = ko.computed(() => "/vSphere/VirtualMachine/Manage/?key=" + this.getKey());
					this.os = ko.computed(() => go.OSFactory.get(this.operatingSystem()));
					this.toolsVersionStatus = ko.computed(() => go.Virtualization.VirtualMachine.ToolsVersionStatusFactory.get(this.toolsStatus()));
					this.toolsVersionStatusText = ko.computed(() => this.toolsVersionStatus().text); //TODO
					this.hostName = ko.computed(function () {
						if (this.host() && this.host().subject.name) {
							return this.host().subject.name();
						}
						return "";
					}, this);
				}

				toJSON(): any {
					delete this.fieldsAsString;
					delete this.selectState;
					delete this.selectClass;
					//	delete this.tasks;
					delete this.detailPageUrl;
					delete this.os;
					delete this.state;
					return this;
				}
			}
		}
	}
}