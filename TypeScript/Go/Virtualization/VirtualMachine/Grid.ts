/// <reference path="../../ActiveManagement/IViewHandle.d.ts" />
/// <reference path="../../../_Definitions/JobCommands.d.ts" />
/// <reference path="../../../_Definitions/Scripts/Virtualization/P2V.d.ts" />
/// <reference path="../../../_Definitions/Scripts/Virtualization/BlankVM.d.ts" />
/// <reference path="VirtualMachineModel.ts" />
/// <reference path="../../Commands/ICommand.d.ts" />
/// <reference path="../../Commands/ConfirmationCommand.ts" />
/// <reference path="../../../_Definitions/_allRefs.d.ts" />
/// <reference path="../../Kg/Column.ts" />
/// <reference path="../../MenuComponent/Item.ts" />
/// <reference path="../../MenuComponent/Group.ts" />
/// <reference path="../../Kg/Grid.ts" />

module go {
	export module Virtualization {
		export module VirtualMachine {
			export class Grid extends go.kg.Grid {

				addNewMenu: go.MenuComponent.Group;
				PowerOnCommand: go.Commands.ICommand;
				PowerOffCommand: go.Commands.ICommand;

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

					this.PowerOnCommand = new go.Commands.ConfirmationCommand(this.selectedItems, powerOnCommandUrl, go.Resources.Virtualization_ManageVMText.PowerOn_DialogTitle,
						function () {
							var dialogContents = '<div class="content-summary">Are you sure you want to power on the following <span class="vm-count">' + this.filterer().length + '</span> Virtual Machine(s)?</div>'; //$('input[name=PowerOn_Question]').val()
							dialogContents += '<div class="list-of-vms">';
							$.each(this.filterer(), function (i, n) {
								dialogContents += '<div class="vm-in-list">' + n.name() + '</div>'; //TODO add reason why some items might not show up in this list? (i.e. canExecute() is false)
							});
							dialogContents += '</div>';
							return dialogContents;
						},
						function () {
							return ko.utils.arrayFilter(this.targets(), function (vm: go.Virtualization.VirtualMachine.VirtualMachineModel) {
								var disabledMethods = <any[]>ko.utils.unwrapObservable(vm.disabledMethods);
								return $.inArray("PowerOnVM_Task", disabledMethods) === -1;
							})
						});
					this.PowerOffCommand = new go.Commands.ConfirmationCommand(this.selectedItems, powerOffCommandUrl, "Power Off Virtual Machine(s)", //go.Resources.ManageVMText.Shutdown_DialogTitle
						function () {
							var dialogContents = '<div class="content-summary">Are you sure you want to power off the following <span class="vm-count">' + this.filterer().length + '</span> Virtual Machine(s)?</div>'; //$('input[name=PowerOff_Question]').val();
							dialogContents += '<div class="list-of-vms">';
							$.each(this.filterer(), function (i, n) {
								dialogContents += '<div class="vm-in-list">' + n.name() + '</div>'; //TODO add reason why some items might not show up in this list? (i.e. canExecute() is false)
							});
							dialogContents += '</div>';
							return dialogContents;
						},
						function () {
							return ko.utils.arrayFilter(this.targets(), function (vm: go.Virtualization.VirtualMachine.VirtualMachineModel) {
								var disabledMethods = <any[]>ko.utils.unwrapObservable(vm.disabledMethods);
								return $.inArray("PowerOffVM_Task", disabledMethods) === -1;
							})
						});
				}
			}
		}
	}
}