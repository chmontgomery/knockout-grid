///<reference path='IViewHandle.d.ts'/>
///<reference path='View.ts'/>

module go.ActiveManagement {

    export class ViewHandle implements IViewHandle {

        constructor (private requiredProperties : string[], public subjects : KnockoutObservableArray, public status : KnockoutObservableViewStatus, private releaseHandle : () => void) {
        }

        public getRequiredProperties() { return this.requiredProperties; }

        public release() {
            this.release = () => { };
            this.releaseHandle();
        }

    }

}
