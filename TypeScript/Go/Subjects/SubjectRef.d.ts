/// <reference path="SubjectViewModel.ts" />
module go.Subjects {

    export interface SubjectRef {
        $subjectRefType: string;
        key: string;
        subject: SubjectViewModel;
    }
}
