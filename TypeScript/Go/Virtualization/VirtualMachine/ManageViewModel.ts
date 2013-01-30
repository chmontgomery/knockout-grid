/// <reference path="../../Commands/ConfirmationCommand.ts" />
/// <reference path="VirtualMachineModel.ts" />
/// <reference path="../../ActiveManagement/ActiveViewManager.ts" />
/// <reference path="../../ActiveManagement/ViewHandle.ts" />
module go.Virtualization.VirtualMachine {
	export class ManageViewModel {

		vm: go.Virtualization.VirtualMachine.VirtualMachineModel;
		PowerOnCommand: go.Commands.ICommand;
		PowerOffCommand: go.Commands.ICommand;

		constructor(subjectRefString: string) {
			var vmHandle = go.ActiveManagement.ActiveViewManager.getSubjectView("VirtualMachine", subjectRefString,
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

			this.vm = <go.Virtualization.VirtualMachine.VirtualMachineModel>vmHandle.subject;
			this.vm.name.subscribe(function (newValue) {
				document.title = newValue;
			});

			// TODO b4 signlr returns the actual vm, the dummy one has an empty disabled methods array, meaning you can take a command on an empty obj...

			this.PowerOnCommand = new go.Commands.ConfirmationCommand(vmHandle.subjects, go.Routes.vSphere.VirtualMachine.PowerOn(),
				go.Resources.Virtualization_ManageVMText.PowerOn_DialogTitle,
				function () {
					var dialogContents = "";
					if (this.filterer().length > 0) {
						dialogContents = go.Resources.Virtualization_ManageVMText.PowerOn_Question.format(this.filterer()[0].name());
					}
					return dialogContents;
				},
				function () {
					return ko.utils.arrayFilter(this.targets(), function (vm: go.Virtualization.VirtualMachine.VirtualMachineModel) {
						var disabledMethods = <any[]>ko.utils.unwrapObservable(vm.disabledMethods);
						return $.inArray("PowerOnVM_Task", disabledMethods) === -1;
					})
				});
			this.PowerOffCommand = new go.Commands.ConfirmationCommand(vmHandle.subjects, go.Routes.vSphere.VirtualMachine.PowerOff(), 
				go.Resources.Virtualization_ManageVMText.Shutdown_DialogTitle,
				function () {
					var dialogContents = "";
					if (this.filterer().length > 0) {
						dialogContents = go.Resources.Virtualization_ManageVMText.Shutdown_Question.format(this.filterer()[0].name());
					}
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