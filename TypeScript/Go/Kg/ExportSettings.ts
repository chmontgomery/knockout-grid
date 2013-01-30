module go {
	export module kg {
		export class ExportSettings {
			columns = [];
			constructor (public fileName: string, public enabled: bool) { }
			toJSON() {
				delete this.enabled;
				return this;
			}
		}
	}
}