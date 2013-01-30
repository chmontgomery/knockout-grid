/// <reference path="../../GoDomain.generated.ts" />
/// <reference path="../../../_Definitions/_allRefs.d.ts" />
module go {
	export module Virtualization {
		export module Hypervisor {
			export class HypervisorModel extends Subjects.HostSystemViewModel {

				detailPageUrl: KnockoutComputed;

				constructor(subjectRef: Subjects.SubjectRef, properties?: { [path: string]: any; }) {
					super(subjectRef);
					this.applyProperties(properties);
					this.detailPageUrl = ko.computed(() => "/vSphere/Hypervisor/Manage/?key=" + this.getKey());
				}
			}
		}
	}
}