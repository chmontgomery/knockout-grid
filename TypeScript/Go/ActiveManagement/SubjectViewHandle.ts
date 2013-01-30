/// <reference path="ViewHandle.ts" />
/// <reference path="ISubjectViewHandle.d.ts" />
///<reference path='View.ts'/>

module go.ActiveManagement {

    export class SubjectViewHandle extends ViewHandle implements ISubjectViewHandle {

        constructor (private requiredProperties : string[], public subject : Subjects.SubjectViewModel, public status : KnockoutObservableViewStatus, private releaseHandle : () => void) {
        	super(requiredProperties, ko.observableArray([subject]), status, releaseHandle);
        }

        public getRequiredProperties() { return this.requiredProperties; }

        public release() {
            this.release = () => { };
            this.releaseHandle();
        }

    }

}
