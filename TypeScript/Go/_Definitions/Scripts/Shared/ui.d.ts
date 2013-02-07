module go {
	export class ui {
		static ShowConfirmationDialog:(headerText: string,
				content: string,
				confirmButtonText: string,
				cancelButtonText: string,
				confirmButtonAction: () => void,
				confirmationButtonParameter?: any[],
				width?: number,
				cancelButtonAction?: () => void,
				closeAction?: () => void,
				confirmAction?: () => void,
				onDialogLoaded?: () => void) => JQuery;

		static ShowAlertDialog:(headerText: string,
			content: string,
			okButtonText: string) => JQuery;
	}
}