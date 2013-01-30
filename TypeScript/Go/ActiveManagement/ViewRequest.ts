///<reference path='../GoDomain.generated.ts'/>

module go.ActiveManagement {

    export class ViewRequest implements Messages.ViewRequest {

        constructor (public viewKey: string, public properties : string[]) {
        }
    }

}
