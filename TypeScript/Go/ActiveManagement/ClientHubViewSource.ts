///<reference path='../GoDomain.generated.ts'/>
/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="IViewSource.d.ts" />

module go.ActiveManagement {

    export interface IClientHubServer {
        setViewRequests: (viewRequests: Messages.ViewRequest[]) => JQueryPromise;
    }

    export interface IClientHubConnection extends HubConnection {
        server: IClientHubServer;
        client: any;
        state: any;
    }

    export class ClientHubViewSource implements IViewSource {

        constructor(private connection: IClientHubConnection) {
            connection.client.updateViews = data => this.onViewNotification(data);
        }

        private onViewNotification(data: string) {
            if (this.notificationHandler) {
                this.notificationHandler(JSON.parse(data));
            }
        }

        public notificationHandler: (notification: Messages.SubjectsChangedEvent) => void;
        
        public setViewRequests(viewRequests: Messages.ViewRequest[]) {
            this.connection.server.setViewRequests(viewRequests);
        }
    }
}