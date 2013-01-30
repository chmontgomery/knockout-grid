/// <reference path="../../_testRefs.ts" />
/// <reference path="../../ActiveManagement/TestSubjectRef.ts" />
/// <reference path="../../../Go/Kg/Grid.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/VirtualMachineModel.ts" />
/// <reference path="../../../Go/Virtualization/VirtualMachine/PowerStateColumn.ts" />

module Virtualization.VirtualMachine.PowerStateColumnTest {

    QUnit.module("go.Virtualization");

    test("verify custom vm power state sorting", () => {

        var vmGridColumns = [
			<go.kg.Column>new go.Virtualization.VirtualMachine.PowerStateColumn("state", "powerStateColumn", null, true, false),
        ];
		var viewHandle = new go.ActiveManagement.ViewHandle(
			[],
			ko.observableArray([
				new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-1"), { powerState: "unknown", name: "I'm not as cool", guestFullName: "dos", memorySize: 2048, cpuCount: 2, lastChangeDate: "2012-10-31 12:56:17.470" }),
				new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-2"), { powerState: "suspended", name: "Test VM", guestFullName: "windows", memorySize: 1024, cpuCount: 1, lastChangeDate: "2012-06-08 16:10:59.203" }),
				new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-3"), { powerState: "wait", name: "I'm cool", guestFullName: "suse", memorySize: 2048, cpuCount: 2, lastChangeDate: "2012-10-31 12:56:17.470"}),
				new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-4"), { powerState: "poweredOn", name: "Prod VM", guestFullName: "linux", cpuCount: 2, lastChangeDate: "2012-06-08 16:11:59.823"}),
				new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-5"), { powerState: "poweredOff", name: "The new hotness", guestFullName: "ubuntu", memorySize: 2048, lastChangeDate: "2012-10-31 12:56:17.470"})
			]),
			ko.observable(1),
			function () { }
		);
		var vmGrid = new go.kg.Grid(
			"vmGrid",
			vmGridColumns,
			viewHandle
		);

		equal(vmGrid.items().length, 5, "grid should have 5 items");

		var ascSortResult = [4, 2, 5, 3, 1];
		vmGrid.sortASC(vmGridColumns[0]);
		for (var i = 0; i < ascSortResult.length; i++) {
			equal(vmGrid.items()[i].getKey(), "vi.vm-" + ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
		}
		equal(vmGrid.lastSortOrder(), "asc", "items should be sorted asc");
		var descSortResult = [1, 3, 5, 2, 4];
		vmGrid.sortDESC(vmGridColumns[0]);
		for (var i = 0; i < descSortResult.length; i++) {
			equal(vmGrid.items()[i].getKey(), "vi.vm-" + descSortResult[i], "item in sorted array should be " + descSortResult[i]);
		}
		equal(vmGrid.lastSortOrder(), "desc", "items should be sorted asc");

	});
}