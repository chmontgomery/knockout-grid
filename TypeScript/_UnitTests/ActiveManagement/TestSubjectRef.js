var go;
(function (go) {
    (function (ActiveManagement) {
        var TestSubjectRef = (function () {
            function TestSubjectRef($subjectRefType, key, subject) {
                this.$subjectRefType = $subjectRefType;
                this.key = key;
                this.subject = subject;
            }
            return TestSubjectRef;
        })();
        ActiveManagement.TestSubjectRef = TestSubjectRef;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
