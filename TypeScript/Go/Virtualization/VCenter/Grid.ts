/// <reference path="VCenterModel.ts" />
/// <reference path="../../../_Definitions/JobCommands.d.ts" />
/// <reference path="../../../_Definitions/Scripts/Virtualization/P2V.d.ts" />
/// <reference path="../../../_Definitions/Scripts/Virtualization/BlankVM.d.ts" />
/// <reference path="../../Commands/ICommand.d.ts" />
/// <reference path="../../Commands/ConfirmationCommand.ts" />
/// <reference path="../../../_Definitions/_allRefs.d.ts" />
/// <reference path="../../Kg/Column.ts" />
/// <reference path="../../MenuComponent/Item.ts" />
/// <reference path="../../MenuComponent/Group.ts" />
/// <reference path="../../Kg/Grid.ts" />

module go {
	export module Virtualization {
		export module VCenter {
			export class Grid extends go.kg.Grid {

				addNewMenu: go.MenuComponent.Group;

				constructor(public id: string, columns: go.kg.Column[], viewHandle: go.ActiveManagement.IViewHandle,
					itemCountMessageAll: string, itemCountMessagePartial: string,
					powerOnCommandUrl: string, powerOffCommandUrl: string,
					itemAddedToastTitle: string, itemRemovedToastTitle: string, itemFieldForToastBody: string,
						selectable?: bool, exportSettings?: go.kg.ExportSettings, actionsTemplate?: string) {
					super(id, columns, viewHandle,
						itemCountMessageAll, itemCountMessagePartial,
						itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody,
						selectable, exportSettings, actionsTemplate);

					this.addNewMenu = new go.MenuComponent.Group("addNewMenu", [
						new go.MenuComponent.Item(go.BlankVM.OpenWizard, "Virtual Machine"/*"@VirtualMachinesGridText.AddNewVM_MenuItem"*/, "virtual-machine-icon"),
						new go.MenuComponent.Item(go.P2V.ShowDialog, "Convert Physical Machine (P2V)"/*"@VirtualMachinesGridText.AddNewPhysicalMachine_MenuItem"*/, "vmware-converter-icon")
					], "Add New", "Add New", "new-vm-icon", true);
				}
			}
		}
	}
}