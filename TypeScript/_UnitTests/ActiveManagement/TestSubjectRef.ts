/// <reference path="../_testRefs.ts" />
///<reference path='../../go/ActiveManagement/View.ts'/>
///<reference path='../../go/ActiveManagement/ViewHandle.ts'/>

module go.ActiveManagement {
    export class TestSubjectRef implements Subjects.SubjectRef {
        constructor(public $subjectRefType: string, public key: string, public subject?: Subjects.SubjectViewModel) {
        }
    }
}
