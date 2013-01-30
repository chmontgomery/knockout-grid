/// <reference path="ViewStatus.ts" />
///<reference path='../../_Definitions/_allRefs.d.ts'/>

module go.ActiveManagement {

    export interface IViewHandle {
        subjects: KnockoutObservableArray;
        status: KnockoutObservableViewStatus;
        release: () => void;
    }

}
