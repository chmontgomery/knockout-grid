///<reference path='../Subjects/SubjectViewModel.ts'/>
///<reference path='../GoDomain.generated.ts'/>
///<reference path='View.ts'/>
///<reference path='IViewSource.d.ts'/>

module go.ActiveManagement {

	// typescript won't allow us to make this private and return a public pointer to it so need to make this public as well
    export class _ActiveViewManager {
        private subjects: { [key: string]: Subjects.SubjectViewModel; } = {};
        private views: { [key: string]: View; } = {};
        private dataSource: IViewSource;

        public addStaticView(viewKey: string, staticSubjects: Subjects.SubjectViewModel[]) {
            var view = this.views[viewKey];
            if (!view) {
                view = new View(viewKey, () => { }, this.updateSubscriptions);
                view.setStaticSubjects(staticSubjects);
                this.views[viewKey] = view;
            } else {
                view.setStaticSubjects(staticSubjects);
            }
        }

        public getView(viewKey: string, properties: string[]) : ViewHandle {
            var view = this.views[viewKey];
            if (!view) {
                view = new View(viewKey, () => this.releaseView(view), this.updateSubscriptions);
                this.views[viewKey] = view;
            }
            return view.createHandle(properties);
        }

        public getSubjectView(viewName: string, subjectRefString: string, properties: string[]) : SubjectViewHandle {

        	var type = subjectRefString.split('-', 2);
			var subject = this.EnsureSubject(<Subjects.SubjectRef>{ $subjectRefType: type[0], key: subjectRefString });
        	var viewKey = viewName + "|" + subjectRefString; // TODO: hide  all of the above

            var view = this.views[viewKey];
            if (!view) {
                view = new View(viewKey, () => this.releaseView(view), this.updateSubscriptions);
                this.views[viewKey] = view;
            }
            return view.createSubjectHandle(properties, subject);
        }

        public connect(dataSource: IViewSource) {
            if (this.dataSource) {
                this.dataSource.notificationHandler = null;
                this.dataSource.setViewRequests([]);
            }
            this.dataSource = dataSource;
            if (this.dataSource) {
                this.dataSource.notificationHandler = note => this.onActiveViewNotification(note);
                this.updateSubscriptions();
            }
        }

        private releaseView(view: View) {
            delete this.views[view.getViewKey()];
            this.updateSubscriptions();
        }

        private updateSubscriptions() {
            if (this.dataSource) {
                var currentRequirements : Messages.ViewRequest[] = $.map(this.views, (view: View) => view.getViewRequest());
                this.dataSource.setViewRequests(currentRequirements);
            }
        }

        private onActiveViewNotification(notification: Messages.SubjectsChangedEvent) {
            this.applyChangeEvents(notification.subjectChanges);
        }

        private applyChangeEvents(changeEvents: Messages.SubjectChangedEvent[]) {

            var changes = $.map(changeEvents, (event: Messages.SubjectChangedEvent) => new EventAndSubject(event, this.subjects[event.affectedSubject.key]));

            // first pass: create or remove subjects
            $.each(changes, (_, change: EventAndSubject) => this.updateSubjects(change));

            // second pass: update remaining subject state
            $.each(changes, (_, change: EventAndSubject) => this.updateSubjectProperties(change));

            // final pass: update views
            // (pivot view updates to minimize notification churn)
            var affectedViews: { [viewKey: string]: ViewChangeAndSubject[]; } = {};
            $.each(changes, (_, change: EventAndSubject) => {
                $.each(change.event.associatedViews, (_, viewChange: Messages.AssociatedView) => {
                    var changeList = affectedViews[viewChange.viewKey];
                    if (!changeList) {
                        changeList = [];
                        affectedViews[viewChange.viewKey] = changeList;
                    }
                    changeList.push(new ViewChangeAndSubject(viewChange, change.subject));
                });
            });
            $.each(affectedViews, (key, changes) => this.updateView(key, changes));

            // voila!
        };

        private updateSubjects(change: EventAndSubject): bool {
            // find, create or delete the subject
            var subjectRef = change.event.affectedSubject;
            var reason = change.event.changeReason;
            var subject = this.subjects[subjectRef.key];
            if (!subject && reason == Messages.SubjectDeltaReason.Entered()) {
                subject = this.EnsureSubject(subjectRef);
                change.subject = subject;
                return true;
            } else if (reason == Messages.SubjectDeltaReason.Left() || reason == Messages.SubjectDeltaReason.Missing()) {
                delete this.subjects[subjectRef.key];
                return true;
            }
            return false;
        };

        private updateSubjectProperties(change: EventAndSubject) {
            if (change.subject) {
                $.each(change.event.changedProperties, (_, propertyChange: Messages.PropertyDelta) => {
                    if (propertyChange.reason == Messages.PropertyDeltaReason.Assigned()) {
                        var finalValue = propertyChange.value;
                        if (go.Subjects.SubjectViewModel.isSubjectRef(propertyChange.value)) {
                            finalValue = this.ResolveSubjectRef(propertyChange.value);
                        } else if ($.isArray(propertyChange.value)) {
                            var array = <any[]>propertyChange.value;
                            var finalValue = $.map(array, item => {
                                if (go.Subjects.SubjectViewModel.isSubjectRef(item))
                                    return this.ResolveSubjectRef(<Subjects.SubjectRef>item);
                                return item;
                            });
                        }
                        change.subject.applyPropertyChange(propertyChange.path, finalValue);
                    }
                });
            }
        }

        private ResolveSubjectRef(subjectRef: Subjects.SubjectRef): Subjects.SubjectRef {
            subjectRef.subject = this.EnsureSubject(subjectRef);
            return subjectRef;
        }

        private EnsureSubject(subjectRef: Subjects.SubjectRef): Subjects.SubjectViewModel {
            var subject = this.subjects[subjectRef.key];
            if (!subject) {
                subject = Subjects.ViewModelFactory.create(subjectRef) || new Subjects.SubjectViewModel(subjectRef);
                this.subjects[subjectRef.key] = subject;
            }
            return subject;
        }

        private updateView(viewKey: string, changes: ViewChangeAndSubject[]) {
            var view = this.views[viewKey];
            var adds: Subjects.SubjectViewModel[] = [];
            var removes: Subjects.SubjectViewModel[] = [];

            if (view && view.getStatus() != ViewStatus.Inactive) {
                $.each(changes, (_, change: ViewChangeAndSubject) => {
                    switch (change.viewChange.memberStatus) {
                        case Messages.ViewMemberStatus.Entered():
                        case Messages.ViewMemberStatus.Abode():
                            adds.push(change.subject);
                            break;
                        case Messages.ViewMemberStatus.Left():
                            removes.push(change.subject);
                            break;
                    }
                });
            }
            if (adds.length > 0 || removes.length > 0) {
                view.updateSubjects(adds, removes);
            }
        }
    }
    
    // These types are really private, but TS won't allow them on private function signatures, so they are
    //  exported until that issues is resolved   
    export class EventAndSubject {
        constructor (public event: Messages.SubjectChangedEvent, public subject: Subjects.SubjectViewModel) {
        }
    }

    export class ViewChangeAndSubject {
        constructor (public viewChange: Messages.AssociatedView, public subject: Subjects.SubjectViewModel) {
        }
    }

	// this needs to be at the bottom otherwise go.ActiveManagement._ActiveViewManager won't exist before trying to use it
	export var ActiveViewManager: go.ActiveManagement._ActiveViewManager = new go.ActiveManagement._ActiveViewManager();
}