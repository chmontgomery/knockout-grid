/// <reference path="../../../_Definitions/_allRefs.d.ts" />
module go.Virtualization.RecentTasks {
	export class RecentTasksMenu {
		static open() {
			$("#recentTasks").show();
		}
		static close() {
			$("#recentTasks").hide();
		}
	}
}