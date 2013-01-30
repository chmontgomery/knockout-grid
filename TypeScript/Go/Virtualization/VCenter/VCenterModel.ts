/// <reference path="../../GoDomain.generated.ts" />
/// <reference path="../../../_Definitions/_allRefs.d.ts" />
module go {
	export module Virtualization {
		export module VCenter {
			export class VCenterModel extends Subjects.VCenterViewModel {

				detailPageUrl: KnockoutComputed;

				constructor(subjectRef: Subjects.SubjectRef, properties?: { [path: string]: any; }) {
					super(subjectRef);
					this.applyProperties(properties);
					this.detailPageUrl = ko.computed(() => "/vSphere/VCenter/Manage/?key=" + this.getKey());
				}
			}
		}
	}
}