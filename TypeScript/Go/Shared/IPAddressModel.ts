/// <reference path="../../_Definitions/_allRefs.d.ts" />
module go {
	export class IPAddressModel {
		
		part1: KnockoutObservableAny;
		part2: KnockoutObservableAny;
		part3: KnockoutObservableAny;
		part4: KnockoutObservableAny;
		full: KnockoutComputed;
		
		constructor(fullIP?: string) {
			var part1 = null;
			var part2 = null;
			var part3 = null;
			var part4 = null;
			if (fullIP) {
				var parts = fullIP.split(".");
				if (parts.length === 4) {
					part1 = parts[0];
					part2 = parts[1];
					part3 = parts[2];
					part4 = parts[3];
				}
				//else unable to parse ip address.
			}
			this.part1 = ko.observable(part1);
			this.part2 = ko.observable(part2);
			this.part3 = ko.observable(part3);
			this.part4 = ko.observable(part4);
			this.full = ko.computed(() => [this.part1(), this.part2(), this.part3(), this.part4()].join("."));
		}

		isValid(): bool {
			return (/(\d{1,3}\.){3}\d{1,3}/).test(this.full());
		}

		clear(): void {
			this.part1(null);
			this.part2(null);
			this.part3(null);
			this.part4(null);
		}
	}
}