/// <reference path="../GoDomain.generated.ts" />
/// <reference path="../Subjects/SubjectViewModel.ts" />
/// <reference path="../../_Definitions/Scripts/Shared/CommonTypes.d.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />

module go {
	export module Virtualization {
		export class VimTask extends Subjects.VimTaskViewModel {

			public percentage: KnockoutComputed;
			public styleAttr: KnockoutComputed;
			public displayName: KnockoutComputed;
			public target: KnockoutComputed;
			public targetImageUrl: KnockoutComputed;

			constructor (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) {
			    super(subjectRef);
			    this.applyProperties(properties);

				this.percentage = ko.computed(function () {
					return (this.progress() ? this.progress() : 0) + "%";
				}, this);
				this.styleAttr = ko.computed(function () {
					return "width:" + this.percentage() + ";";
				}, this);
				this.displayName = ko.computed(() => (properties || {})["displayName"] || "<unknown>");
				this.target = ko.computed(function () {
					if (this.affectedSubject() && this.affectedSubject().subject) {
						return this.affectedSubject().subject.name();
					}
					return "Unknown";
				}, this);
				// TODO refactor me!
				this.targetImageUrl = ko.computed(function () {
					if (this.affectedSubject() && this.affectedSubject().subject) {
						var targetImgHtml = '<img src="';
						if (this.affectedSubject().subject.subjectRef.$subjectRefType === "vi.hs") {
							targetImgHtml += '/Bundles/Styles/Images/host/host.png';
						} else { //vi.vm
							targetImgHtml += '/Bundles/Styles/Images/virtual-machine/virtual-machine.png';
						}
						targetImgHtml += '" />';
						return targetImgHtml;
					}
				},this);
			}
		}
	}
}