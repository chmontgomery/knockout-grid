/// <reference path="../../_testRefs.ts" />
/// <reference path="../../../Go/Kg/StringColumn.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/PowerStateColumn.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/PowerStates.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/VirtualMachineModel.ts" />

// overrides go.BlankVM.OpenWizard and go.P2V.ShowDialog methods
(function (go) {
    (function (BlankVM) {
        var OpenWizard = (function () {
            function OpenWizard() { }
            return OpenWizard;
        })();
        BlankVM.OpenWizard = OpenWizard;        
    })(go.BlankVM || (go.BlankVM = {}));
    var BlankVM = go.BlankVM;
})(go);
(function (go) {
    (function (P2V) {
        var ShowDialog = (function () {
            function ShowDialog() { }
            return ShowDialog;
        })();
        P2V.ShowDialog = ShowDialog;        
    })(go.P2V || (go.P2V = {}));
    var P2V = go.P2V;
})(go);

module Virtualization.VirtualMachine.CanExecutePowerCommandTest {

	QUnit.module("go.Virtualization");

	test("vm commands can execute", () => {

		var vm = new go.Virtualization.VirtualMachine.VirtualMachineModel(
			{
				$subjectRefType: "vi.vm", key: "vi.vm-1"
			},
			{
				powerState: "poweredOff",
				name: "new hotness",
				// real list of possible disable methods. Means this vm is powered off
				disabledMethods: ["CreateSecondaryVM_Task","TurnOffFaultToleranceForVM_Task","MakePrimaryVM_Task","TerminateFaultTolerantVM_Task","DisableSecondaryVM_Task","EnableSecondaryVM_Task","MakePrimaryVM_Task","TerminateFaultTolerantVM_Task","Rename_Task","Destroy_Task","ReconfigVM_Task","MigrateVM_Task","RevertToCurrentSnapshot_Task","RemoveAllSnapshots_Task","CreateSnapshot_Task","ConsolidateVMDisks_Task","ResetVM_Task","UnmountToolsInstaller","MountToolsInstaller","RebootGuest","StandbyGuest","ShutdownGuest","PowerOffVM_Task","ExtractOvfEnvironment","SuspendVM_Task","AcquireMksTicket","AnswerVM","UpgradeVM_Task","UpgradeTools_Task","CreateSecondaryVM_Task","TurnOffFaultToleranceForVM_Task","MakePrimaryVM_Task","TerminateFaultTolerantVM_Task","DisableSecondaryVM_Task","EnableSecondaryVM_Task","StartRecording_Task","StopRecording_Task","StartReplaying_Task","StopReplaying_Task","TurnOffFaultToleranceForVM_Task","MakePrimaryVM_Task","TerminateFaultTolerantVM_Task","DisableSecondaryVM_Task","EnableSecondaryVM_Task","StopRecording_Task","StopReplaying_Task","CustomizeVM_Task","MarkAsTemplate","ResetGuestInformation","CloneVM_Task","ExportVm","MarkAsVirtualMachine"]
			});

		var viewHandle = new go.ActiveManagement.ViewHandle(
			[],
			ko.observableArray([
				vm
			]),
			ko.observable(1),
			function () { }
		);

		var vmGrid = new go.Virtualization.VirtualMachine.Grid(
			"vmGrid",
			[
				<go.kg.Column>new go.Virtualization.VirtualMachine.PowerStateColumn("state", "powerStateColumn", null, true, false),
				<go.kg.Column>new go.kg.StringColumn("name", "nameColumn", "Name")
			],
			viewHandle,
			"Showing <span class='results-count'>All</span> Virtual Machines",
			"Showing <span class='results-count'>{0} of {1}</span> Virtual Machines",
			"~/Virtualization/VirtualMachine/PowerOn",
			"~/Virtualization/VirtualMachine/PowerOff",
			"Virtual Machine Added",
			"Virtual Machine Removed",
			"name",
			true,
			new go.kg.ExportSettings("Virtual Machines Report", true),
			"vmGridActionsTemplate",
			250
		);

		ok(!vmGrid.PowerOnCommand.canExecute(), "to start we shouldn't be able to power anything on or off b/c nothing is selected");
		ok(!vmGrid.PowerOffCommand.canExecute(), "to start we shouldn't be able to power anything on or off b/c nothing is selected");

		vmGrid.items()[0].selectState(go.kg.SelectableStates.SELECTED);

		ok(vmGrid.PowerOnCommand.canExecute(), "should be able to power on");
		ok(!vmGrid.PowerOffCommand.canExecute(), "should NOT be able to power off since it's already off");
	});

}