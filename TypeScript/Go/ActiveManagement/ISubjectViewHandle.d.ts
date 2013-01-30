/// <reference path="IViewHandle.d.ts" />
/// <reference path='../../_Definitions/_allRefs.d.ts'/>
module go.ActiveManagement {

    export interface ISubjectViewHandle extends IViewHandle {
        subject: Subjects.SubjectViewModel;
    }

}
