/// <reference path="../Subjects/SubjectRef.d.ts" />
/// <reference path="../Kg/SelectableItem.ts" />
/// <reference path='../../_Definitions/_allRefs.d.ts'/>

module go.Subjects {

    export class SubjectViewModel extends kg.SelectableItem {
        public static isSubjectRef(candidate: any): bool {
            return typeof candidate === 'object' && ("$subjectRefType" in candidate);
        }

        lastChangeDate: KnockoutObservableDate = ko.observable();

        constructor (private subjectRef: Subjects.SubjectRef, properties?: { [path: string]: any; }) {
            super();
            this.applyProperties(properties);
        }

        public getKey() {
            return this.subjectRef.key;
        }

        public applyProperties(properties: { [path: string]: any; }) {
            if (properties) {
                for (var path in properties) {
                    this.applyPropertyChange(path, properties[path])
                }
            }
        }

        public applyPropertyChange(path: string, value: any) {
			var currentItem = this;
			var paths = path.split(".");
			while (paths.length > 1) {
				var property = SubjectViewModel.toJsCase(paths.shift());
				var childItem = currentItem[property] || {};
				currentItem[property] = childItem;
				currentItem = childItem;
			}
            var finalProperty = SubjectViewModel.toJsCase(paths[0]);
			if (currentItem[finalProperty]) {
			    try {
			        currentItem[finalProperty](value);
			    } catch (e) {
			        console.log("Binding error writing property '" + finalProperty + "' of subject '" + this.getKey() + "': " + e.message);
			    }
			}
			else {
		        console.log("Update error writing property '" + finalProperty + "' of subject '" + this.getKey() + "': property is not defined");
			}
		    return true;
	    }

        private static toJsCase(name: string) {
	        return name.charAt(0).toLowerCase() + name.substr(1);
        }
    }

}
