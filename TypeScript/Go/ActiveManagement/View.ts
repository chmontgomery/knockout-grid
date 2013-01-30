/// <reference path="SubjectViewHandle.ts" />
///<reference path="../../_Definitions/_allRefs.d.ts"/>
///<reference path='../GoDomain.generated.ts'/>
///<reference path='../Subjects/SubjectViewModel.ts'/>
///<reference path='ViewHandle.ts'/>
///<reference path='ViewStatus.ts'/>
///<reference path='ViewRequest.ts'/>

module go.ActiveManagement {

    export class View {

		private subjects : KnockoutObservableArray = ko.observableArray();
		private status : KnockoutObservableViewStatus = ko.observable(ViewStatus.New);
		private referenceCount = 0;
        private requiredProperties: { [key: string]: number; } = {};

		constructor (private viewKey: string, private releaseView : () => void, private updateSubscription: () => void) {
        }

        public getViewKey() { return this.viewKey; }
        public getStatus() { return this.status(); }
        public setStaticSubjects(staticSubjects: Subjects.SubjectViewModel[]) {
		    this.subjects(staticSubjects);
		    this.deactivate(true);
        }
        public updateSubjects(addSubjects: Subjects.SubjectViewModel[], removeSubjects: Subjects.SubjectViewModel[]) {
            var existingSubjects = this.subjects();
            var changed = false;
            if (addSubjects) {
                $.each(addSubjects, (_, subject: Subjects.SubjectViewModel) => {
                    var index = existingSubjects.indexOf(subject);
                    if (index < 0) {
                        existingSubjects.push(subject);
                        changed = true;
                    }
                });
                this.activate();
            }
            if (removeSubjects) {
                $.each(removeSubjects || [], (_, subject: Subjects.SubjectViewModel) => {
                    var index = existingSubjects.indexOf(subject);
                    if (index >= 0) {
                        existingSubjects.splice(index, 1);
                        changed = true;
                    }
                });
            }
            if (changed) {
                try {
                    this.subjects.valueHasMutated();
                } catch (e) {
                    console.log("Binding error updating view '" + this.viewKey + "': " + e.message);
                }
            }
        }

        public getViewRequest() : Messages.ViewRequest {
            if (this.status() == ViewStatus.Inactive)
                return null;
            var properties = [];
            for (var property in this.requiredProperties) {
                if (this.requiredProperties.hasOwnProperty(property))
                    properties.push(property);
            }
            return properties.length == 0
                ? null
                : new ViewRequest(this.viewKey, properties);
        }

        private hasRequiredProperties() {
            for (var k in this.requiredProperties)
                if (this.requiredProperties.hasOwnProperty(k))
                    return true;
            return false;
        }

        public createHandle(requiredProperties : string[]) : ViewHandle {
            var handle = new ViewHandle(requiredProperties, this.subjects, this.status, () => this.releaseHandle(handle));
            this.referenceCount++; 
            this.applyRequiredProperties(requiredProperties);
            return handle;
        }

        public createSubjectHandle(requiredProperties : string[], subject: Subjects.SubjectViewModel) : SubjectViewHandle {
            var handle = new SubjectViewHandle(requiredProperties, subject, this.status, () => this.releaseHandle(handle));
            this.referenceCount++; 
            this.applyRequiredProperties(requiredProperties);
            return handle;
        }

        private applyRequiredProperties(properties : string[]) {
            var propertiesChanged = false;
            $.each(properties, (_: number, property: string) => {
                var count = this.requiredProperties[property];
                if (!count) {
                    this.requiredProperties[property] = 1;
                    propertiesChanged = true;
                } else {
                    this.requiredProperties[property] = count + 1;
                }
            });
            if (propertiesChanged)
                this.updateSubscription();
        }

        private releaseHandle(handle: ViewHandle) {
            this.removeRequiredProperties(handle.getRequiredProperties());
            if (--this.referenceCount == 0) {
                this.deactivate();
                this.releaseView();
                this.releaseView = View.noOp;
            }
        }

        private removeRequiredProperties(properties : string[]) {
            var propertiesChanged = false;
            $.each(properties, (_: number, property: string) => {
                var count = this.requiredProperties[property];
                if (count) {
                    count--;
                    if (count <= 0) {
                        delete this.requiredProperties[property];
                        propertiesChanged = true;
                    } else {
                        this.requiredProperties[property] = count;
                    }
                }
            });
            if (propertiesChanged)
                this.updateSubscription();
        }

        private deactivate(updateSubscriptions = false) {
            this.activate = View.noOp;
            this.deactivate = View.noOp;
            if (updateSubscriptions)
                this.updateSubscription();
            this.updateSubscription = View.noOp;
            this.status(ViewStatus.Inactive);
        }

        private activate() {
            this.activate = View.noOp;
            this.status(ViewStatus.Active);
        }

        private static noOp() { };

    }

}
