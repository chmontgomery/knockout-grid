/// <reference path="../../_Definitions/Scripts/Shared/ui.d.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="Command.ts" />
module go.Commands {
	export class ConfirmationCommand extends go.Commands.Command {

		content: KnockoutComputed;

		constructor(targets: KnockoutObservableAny, url: string, public headerText: string, contentEvaluator: () => string, filterer?: () => any[]) {
			super(targets, url, filterer);
			this.content = ko.computed(contentEvaluator, this);
			var defaultExecute = this.execute;
			this.execute = function () {
				if (this.canExecute()) {
					/*go.ui.ShowConfirmationDialog(
						this.headerText,
						this.content(),
						"Ok",
						"Cancel",
						defaultExecute.bind(this)
					);*/
					// show confirmation
				}
			};
		}
	}
}