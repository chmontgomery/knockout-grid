///<reference path='../GoDomain.generated.ts'/>

module go.ActiveManagement {

    export interface IViewSource {
        notificationHandler: (notification: Messages.SubjectsChangedEvent) => void;
        setViewRequests: (viewRequests: Messages.ViewRequest[]) => void;
    }
}
