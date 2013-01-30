/// <reference path="../Shared/NotImplementedError.ts" />
/// <reference path="../Subjects/SubjectViewModel.ts" />
/// <reference path="../../_Definitions/_allRefs.d.ts" />
/// <reference path="ICommand.d.ts" />
module go.Commands {
	export class Command implements go.Commands.ICommand {

		constructor(public targets: KnockoutObservableAny, public url: string, filterer?: () => any[]) {
			this.filterer = filterer || this.filterer;
		}

		execute(): void {
			$.ajax({
				type: "POST",
				url: this.url,
				data: $.map(this.filterer(), function (x: go.Subjects.SubjectViewModel) {
					return "subjects=" + x.getKey();
				}).join("&"),
				error: go.Global.HandleAjaxFailure
			});
		}

		canExecute(): bool {
			return this.filterer().length > 0;
		}

		filterer(): any[] {
			return this.targets();
		}
	}
}