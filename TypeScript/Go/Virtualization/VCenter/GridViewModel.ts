/// <reference path="../../ActiveManagement/ActiveViewManager.ts" />
/// <reference path="../../ActiveManagement/ViewHandle.ts" />
/// <reference path="../../Kg/StringColumn.ts" />
/// <reference path="Grid.ts" />
module go.Virtualization.VCenter {
	export class GridViewModel {

	    vcentersGrid: go.Virtualization.VCenter.Grid;

		constructor() {
			var vcentersHandle = go.ActiveManagement.ActiveViewManager.getView("VCenters",
			[
				"Name", // TODO: find a way around the issue where the function has "name" defined as a property
                go.Subjects.VCenterProperties.disabledMethods(),
                go.Subjects.VCenterProperties.primaryServerIpAddress()
			]);

			this.vcentersGrid = new go.Virtualization.VCenter.Grid(
                "vcentersGrid",
				[
					new go.kg.StringColumn("name", "nameColumn", "Name")
				],
                vcentersHandle,
				"Showing <span class='results-count'>All {0}</span> VCenters",
				"Showing <span class='results-count'>{0} of {1}</span> VCenters",
				go.Routes.vSphere.VirtualMachine.PowerOn(),
				go.Routes.vSphere.VirtualMachine.PowerOff(),
				"Virtual Machine Added",
				"Virtual Machine Removed",
				"name",
				true,
				new go.kg.ExportSettings("Virtual Machines Report", true),
				"vmGridActionsTemplate"
			);
		}
	}
}