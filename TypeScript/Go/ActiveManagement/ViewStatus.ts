module go.ActiveManagement {

    export enum ViewStatus {
        New,
        Active,
        Inactive
    }

	//TODO move this into .d.ts file so we don't have to reference a .ts from a .d.ts (e.g. IViewHandle.d.ts)
    export interface KnockoutObservableViewStatus extends KnockoutObservableBase {
        (): ViewStatus;
        (value: ViewStatus): void;

        subscribe(callback: (newValue: ViewStatus) => void, target?:any, topic?: string): KnockoutSubscription;
        notifySubscribers(valueToWrite: ViewStatus, topic?: string);
    }
}
