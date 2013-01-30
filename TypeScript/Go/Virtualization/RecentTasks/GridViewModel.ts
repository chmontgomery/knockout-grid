/// <reference path="../../Kg/StringColumn.ts" />
/// <reference path="../../Kg/Grid.ts" />
/// <reference path="../../ActiveManagement/ActiveViewManager.ts" />
/// <reference path="../../../_Definitions/_allRefs.d.ts" />
module go.Virtualization.RecentTasks {
	export class GridViewModel {
		recentTasks: go.kg.Grid;
		constructor() {
			var recentTasksHandle = go.ActiveManagement.ActiveViewManager.getView ("VimTasks",
			[
				"Name",
				go.Subjects.VimTaskProperties.state(),
				go.Subjects.VimTaskProperties.progress(),
				go.Subjects.VimTaskProperties.affectedSubject()
			]);

			this.recentTasks = new go.kg.Grid(
				"recentTasks",
				[
					new go.kg.StringColumn("name", "recentTasksNameColumn", "Name"),
					new go.kg.StringColumn("affectedSubject", "recentTasksTargetColumn", "Target"),
					new go.kg.StringColumn("state", "recentTasksStateColumn", "Status")
				], recentTasksHandle, "", "", "", "", "", false
			)
		}
	}
}