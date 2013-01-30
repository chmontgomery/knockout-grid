/// <reference path="../../ActiveManagement/ActiveViewManager.ts" />
/// <reference path="../../ActiveManagement/ViewHandle.ts" />
/// <reference path="ToolsVersionStatusColumn.ts" />
/// <reference path="../../Kg/StringColumn.ts" />
/// <reference path="PowerStateColumn.ts" />
/// <reference path="Grid.ts" />
module go.Virtualization.VirtualMachine {
	export class GridViewModel {

		vmGrid: go.Virtualization.VirtualMachine.Grid;

		constructor() {
			var vmsHandle = go.ActiveManagement.ActiveViewManager.getView("VirtualMachines",
			[
				"Name", // TODO: find a way around the issue where the function has "name" defined as a property
				go.Subjects.VirtualMachineProperties.powerState(),
				go.Subjects.VirtualMachineProperties.disabledMethods(),
				go.Subjects.VirtualMachineProperties.operatingSystem(),
				go.Subjects.VirtualMachineProperties.memorySize(),
				go.Subjects.VirtualMachineProperties.cpuCount(),
				go.Subjects.VirtualMachineProperties.host(),
				go.Subjects.VirtualMachineProperties.toolsStatus(),
				go.Subjects.VirtualMachineProperties.activeTasks()
			]);

			go.ActiveManagement.ActiveViewManager.getView("HostSystems",
				[
					"Name"
				]);

			go.ActiveManagement.ActiveViewManager.getView("VimTasks",
				[
					"Name",
					go.Subjects.VimTaskProperties.state(),
					go.Subjects.VimTaskProperties.progress()
				]);

			this.vmGrid = new go.Virtualization.VirtualMachine.Grid(
				"vmGrid",
				[
					new go.Virtualization.VirtualMachine.PowerStateColumn("state", "powerStateColumn", null, true, false),
					new go.kg.StringColumn("name", "nameColumn", go.Resources.Virtualization_VMGrid.NameColumnHeader),
					new go.kg.StringColumn("hostName", "hostColumn", go.Resources.Virtualization_VMGrid.HostColumnHeader),
					new go.kg.StringColumn("operatingSystem", "osRender", go.Resources.Virtualization_VMGrid.OSColumnHeader),
					new go.Virtualization.VirtualMachine.ToolsVersionStatusColumn("toolsVersionStatusText", "toolsVersionStatusColumn", go.Resources.Virtualization_VMGrid.ToolsColumnHeader)
				],
				vmsHandle,
				go.Resources.Virtualization_VMGrid.SummaryAllVMsAboveColumnsInGrid,
				go.Resources.Virtualization_VMGrid.SummaryCountVMsAboveColumnsInGrid,
				go.Routes.vSphere.VirtualMachine.PowerOn(),
				go.Routes.vSphere.VirtualMachine.PowerOff(),
				go.Resources.Virtualization_VMGrid.NotificationTitleVMAddedToGrid,
				go.Resources.Virtualization_VMGrid.NotificationTitleVMRemovedFromGrid,
				"name",
				true,
				new go.kg.ExportSettings(go.Resources.Virtualization_VMGrid.ExportFileName, true),
				"vmGridActionsTemplate"
			);
		}
	}
}