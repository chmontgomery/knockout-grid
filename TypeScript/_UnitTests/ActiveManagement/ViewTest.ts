/// <reference path="TestSubjectRef.ts" />
/// <reference path="../_testRefs.ts" />
///<reference path='../../go/ActiveManagement/View.ts'/>
///<reference path='../../go/ActiveManagement/ViewHandle.ts'/>

module go.ActiveManagement {

    // creates a test view with tracking of view release and update subscription calls;
    // creates a initial handles for each property set requested in the ctor
    class TestView {
        private static _TEST_SUBJECT_1 = new Subjects.SubjectViewModel(new TestSubjectRef("thing", "thing-subject1"));
        private static _TEST_SUBJECT_2 = new Subjects.SubjectViewModel(new TestSubjectRef("thing", "thing-subject2"));

        public static TEST_KEY() { return "testkey"; }
        public static TEST_PROPERTIES_1() { return ["property1"]; }
        public static TEST_PROPERTIES_2() { return ["property1", "property2"]; }
        public static TEST_SUBJECT_1() { return _TEST_SUBJECT_1; }
        public static TEST_SUBJECT_2() { return _TEST_SUBJECT_2; }
        public static TEST_SUBJECTS_1() { return [_TEST_SUBJECT_1]; }
        public static TEST_SUBJECTS_2() { return [_TEST_SUBJECT_1, _TEST_SUBJECT_2]; }

        public view: View;
        public testHandles: TestHandle[];
        public updateSubscriptionCount = 0;
        public releaseViewCount = 0;

        constructor (...propertySets : string[][]) {
            this.view = new View(TestView.TEST_KEY(), () => this.releaseViewCount++, () => this.updateSubscriptionCount++);
            this.testHandles = <TestHandle[]><any>$.map(propertySets, (propertySet: string[]) => new TestHandle(this.view, propertySet));
            this.updateSubscriptionCount = 0; // reset counts from createHandle calls
        }

        public resetCounts() {
            this.updateSubscriptionCount = 0;
            this.releaseViewCount = 0;
            $.each(this.testHandles, (_, subject: TestHandle) => subject.resetCounts());
        }

        public getTestState() {
            var requirements = this.view.getViewRequest();
            var requiredProperties = null;
            if (requirements)
                requiredProperties = requirements.properties;
            return new TestViewState(requiredProperties, this.updateSubscriptionCount, this.releaseViewCount, this.view.getStatus());
        }
    }

    class TestHandle {
        public handle: ViewHandle;
        private statusNotificationCount = 0;
        private subjectsNotificationCount = 0;

        constructor (view: View, propertySet : string[]) {
            this.handle = view.createHandle(propertySet);
            this.handle.status.subscribe((_) => this.statusNotificationCount++);
            this.handle.subjects.subscribe((_) => this.subjectsNotificationCount++);
        }

        public resetCounts() {
            ko.processAllDeferredUpdates();
            this.statusNotificationCount = 0;
            this.subjectsNotificationCount = 0;
        }

        public getStatusNotificationCount() {
            ko.processAllDeferredUpdates();
            return this.statusNotificationCount;
        }

        public getSubjectsNotificationCount() {
            ko.processAllDeferredUpdates();
            return this.subjectsNotificationCount;
        }
    }

    class TestViewState {
        constructor (public properties: string[], public updateSubscriptionCount: number, public releaseViewCount: number, public status: ViewStatus) {
        }
    }

	QUnit.module("go.ActiveManagement");

    QUnit.test("View.ctor", () => {
        var subject = new TestView();

        QUnit.equal(subject.view.getViewKey(), TestView.TEST_KEY(), "has the same key passed to the ctor");
        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 0, 0, ViewStatus.New),
            "is 'new', has no requirements, does not release view, does not update subscriptions");
    });

    QUnit.test("First View.createHandle", () => {
        var subject = new TestView();

        var handle = subject.view.createHandle(TestView.TEST_PROPERTIES_1());

        QUnit.ok(handle, "returns a view handle");

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 1, 0, ViewStatus.New),
            "remains 'new', has correct requirements, does not release view, updates subscriptions");

        var requirements = subject.view.getViewRequest();
        QUnit.equal(requirements.viewKey, TestView.TEST_KEY(), "getRequiredProperties returns expected view key");
    });

    QUnit.test("Final handle release on View", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.testHandles[0].handle.release();
        
        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 1, 1, ViewStatus.Inactive),
            "becomes 'inactive', has no requirements, releases view, updates subscriptions");
    });

    QUnit.test("View.createHandle with identical request", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        
        subject.view.createHandle(TestView.TEST_PROPERTIES_1());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.New),
            "remains 'new', has correct requirements, does not release view, does not update subscriptions");
    });

    
    QUnit.test("View.createHandle after becoming inactive", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        subject.testHandles[0].handle.release();
        subject.resetCounts();

        subject.view.createHandle(TestView.TEST_PROPERTIES_1());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 0, 0, ViewStatus.Inactive),
            "remains 'inactive', has no requirements, does not release view, does not update subscriptions");
    });

    QUnit.test("Subsequent View.createHandle with new properties", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        var handle2 = subject.view.createHandle(TestView.TEST_PROPERTIES_2());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_2(), 1, 0, ViewStatus.New),
            "remains 'new', has correct requirements, does not release view, updates subscriptions");
    });

    
    QUnit.test("Release handle on View (that does not remove any properties)", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1(), TestView.TEST_PROPERTIES_2());

        subject.testHandles[0].handle.release();

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_2(), 0, 0, ViewStatus.New),
            "remains 'new', has correct requirements, does not release view, does not update subscriptions");
    });

    QUnit.test("View.setStaticSubjects before any handles are created", () => {
        var subject = new TestView();

        subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 1, 0, ViewStatus.Inactive),
            "becomes 'inactive', has no requirements, does not release view, updates subscriptions");
        QUnit.deepEqual(<any>subject.view.createHandle([]).subjects(), <any>TestView.TEST_SUBJECTS_1(), "contains the static subjects");
    });

    QUnit.test("View.setStaticSubjects after handles are created", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 1, 0, ViewStatus.Inactive),
            "becomes 'inactive', has no requirements, does not release view, updates subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>TestView.TEST_SUBJECTS_1(), "contains the static subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
    });

    QUnit.test("View.setStaticSubjects after becoming inactive", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        subject.testHandles[0].handle.release();
        subject.resetCounts();

        subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 0, 0, ViewStatus.Inactive),
            "remains 'inactive', has no requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.view.createHandle([]).subjects(), <any>TestView.TEST_SUBJECTS_1(), "contains the static subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
    });

    QUnit.test("Subsequent View.setStaticSubjects call", () => {
        var subject = new TestView();
        subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());
        subject.resetCounts();

        subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_2());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 0, 0, ViewStatus.Inactive),
            "remains 'inactive', has no requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.view.createHandle([]).subjects(), <any>TestView.TEST_SUBJECTS_2(), "contains the second set of static subjects");
    });

    QUnit.test("View.updateSubjects with nulls", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.updateSubjects(null, null);

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.New),
            "remains 'new', has expected requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[], "contains no subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });

    QUnit.test("View.updateSubjects adding empty list", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.updateSubjects([], null);

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.Active),
            "becomes 'active', has expected requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[], "contains no subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });

    QUnit.test("View.updateSubjects removing empty list", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.updateSubjects(null, []);

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.New),
            "remains 'new', has expected requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[], "contains no subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });
    
    QUnit.test("View.updateSubjects adding and removing empty lists", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.updateSubjects([], []);
        
        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.Active),
            "becomes 'active', has expected requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[], "contains no subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });

    QUnit.test("View.updateSubjects before any handles are created", () => {
        var subject = new TestView();

        subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 0, 0, ViewStatus.Active),
            "becomes 'active', has no requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.view.createHandle([]).subjects(), <any>TestView.TEST_SUBJECTS_1(), "contains expected subjects");
    });

    QUnit.test("View.updateSubjects after handles are created", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.Active),
            "becomes 'active', retains correct requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>TestView.TEST_SUBJECTS_1(), "contains expected subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
    });

    QUnit.test("View.updatesSubjects adding an existing subject", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);
        subject.resetCounts();

        subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ViewStatus.Active),
            "becomes 'active', retains correct requirements, does no release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>TestView.TEST_SUBJECTS_1(), "contains expected subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });

    QUnit.test("View.updateSubjects before any handles are created removing non-existing subject", () => {
        var subject = new TestView();

        subject.view.updateSubjects(null, TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(
            subject.getTestState(),
            new TestViewState(null, 0, 0, ViewStatus.New),
            "remains 'new', has not requirements, does not release view, does not update subscriptions");
        QUnit.deepEqual(<any>subject.view.createHandle([]).subjects(), <any>[], "contains no subjects");
    });

    QUnit.test("View.updateSubjects after handles are created removing non-existing subject", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());

        subject.view.updateSubjects(null, TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[], "contains no subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });
    
    QUnit.test("View.updateSubjects removing an existing subject", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
        subject.resetCounts();

        subject.view.updateSubjects(null, TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[TestView.TEST_SUBJECT_2()], "contains expected subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
    });

    QUnit.test("View.updateSubjects adding multiple non-existing subjects", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        
        subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);

        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>TestView.TEST_SUBJECTS_2(), "contains expected subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes once");
    });
    
    QUnit.test("View.updateSubjects adding multiple existing subjects", () => {
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
        subject.resetCounts();

        subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);

        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>TestView.TEST_SUBJECTS_2(), "contains expected subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
    });
    
    QUnit.test("View.updateSubjects adding and removing subjects", () => {
        var testSubject3 = new Subjects.SubjectViewModel({ $subjectRefType: "thing", key: "thing-subject3" });
        var subject = new TestView(TestView.TEST_PROPERTIES_1());
        subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
        subject.resetCounts();

        subject.view.updateSubjects([testSubject3], TestView.TEST_SUBJECTS_1());

        QUnit.deepEqual(<any>subject.testHandles[0].handle.subjects(), <any>[TestView.TEST_SUBJECT_2(), testSubject3], "contains expected subjects");
        QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes once");
    });
}
