// ==UserScript==
// @name		vLaunch Active Test Data
// @description	loads data into active management pages via a button click
// @require		https://golocal.vmware.com/Bundles/CDN/jquery-ui-1.8.18.js
// @match		https://golocal.vmware.com/vSphere/*
// @match		https://goqa.vmware.com/vSphere/*
// @match		http://golocal.vmware.com/vSphere/*
// @match		http://goqa.vmware.com/vSphere/*
// @version		0.7
// ==/UserScript==

loadVMGridDataMain = function () {

	$("body").on("click", ".add-5-vcenters", function () {
		//TODO
	});
	$("body").on("click", ".add-5-hosts", function () {
		ko.utils.arrayPushAll(go.ActiveManagement.ActiveViewManager.views.HostSystems.subjects, [
			new go.Virtualization.Hypervisor.HypervisorModel({ $subjectRefType: "vi.hs", key: "vi.hs-1" }, { name: "Darth" }),
			new go.Virtualization.Hypervisor.HypervisorModel({ $subjectRefType: "vi.hs", key: "vi.hs-2" }, { name: "Luke" }),
			new go.Virtualization.Hypervisor.HypervisorModel({ $subjectRefType: "vi.hs", key: "vi.hs-3" }, { name: "Han" }),
			new go.Virtualization.Hypervisor.HypervisorModel({ $subjectRefType: "vi.hs", key: "vi.hs-4" }, { name: "Chewy" }),
			new go.Virtualization.Hypervisor.HypervisorModel({ $subjectRefType: "vi.hs", key: "vi.hs-5" }, { name: "Leia" })
		]);
	});
	$("body").on("click", ".add-vm", function () {
		var key = $.url().param("key");
		go.ActiveManagement.ActiveViewManager.onActiveViewNotification({
			subjectChanges:
			[
				{
					changeReason: "Entered",
					affectedSubject: { $subjectRefType: "vi.vm", key: key },
					changedProperties:
					[
						{
							path: "name",
							reason: "Assigned",
							value: "My Test VM"
						},
						{
							path: "powerState",
							reason: "Assigned",
							value: "poweredOn"
						},
						{
							path: "operatingSystem",
							reason: "Assigned",
							value: "linux"
						},
						{
							path: "toolsStatus",
							reason: "Assigned",
							value: "guestToolsNeedUpgrade"
						},
						{
							path: "disabledMethods",
							reason: "Assigned",
							value: ["PowerOnVM_Task"]
						},
						{
							path: "cpuCount",
							reason: "Assigned",
							value: 2
						}
					],
					associatedViews:
					[
						{
							memberStatus: "Entered",
							viewKey: "VirtualMachines"
						}
					]
				}
			]
		});
	});
	$("body").on("click", ".add-3-vms", function () {
		go.ActiveManagement.ActiveViewManager.onActiveViewNotification({
			subjectChanges:
			[
				{
					changeReason: "Entered",
					affectedSubject: { $subjectRefType: "vi.vm", key: "vi.vm-1" },
					changedProperties:
					[
						{
							path: "name",
							reason: "Assigned",
							value: "My Test VM"
						},
						{
							path: "powerState",
							reason: "Assigned",
							value: "poweredOff"
						},
						{
							path: "operatingSystem",
							reason: "Assigned",
							value: "linux"
						},
						{
							path: "toolsStatus",
							reason: "Assigned",
							value: "guestToolsNeedUpgrade"
						},
						{
							path: "disabledMethods",
							reason: "Assigned",
							value: ["PowerOffVM_Task"]
						},
						{
							path: "cpuCount",
							reason: "Assigned",
							value: 2
						}
					],
					associatedViews:
					[
						{
							memberStatus: "Entered",
							viewKey: "VirtualMachines"
						}
					]
				},
				{
					changeReason: "Entered",
					affectedSubject: { $subjectRefType: "vi.vm", key: "vi.vm-2" },
					changedProperties:
					[
						{
							path: "name",
							reason: "Assigned",
							value: "My Prod VM"
						},
						{
							path: "powerState",
							reason: "Assigned",
							value: "poweredOn"
						},
						{
							path: "operatingSystem",
							reason: "Assigned",
							value: "ubuntu"
						},
						{
							path: "toolsStatus",
							reason: "Assigned",
							value: "guestToolsCurrent"
						},
						{
							path: "disabledMethods",
							reason: "Assigned",
							value: ["PowerOnVM_Task"]
						},
						{
							path: "cpuCount",
							reason: "Assigned",
							value: 2
						}
					],
					associatedViews:
					[
						{
							memberStatus: "Entered",
							viewKey: "VirtualMachines"
						}
					]
				},
				{
					changeReason: "Entered",
					affectedSubject: { $subjectRefType: "vi.vm", key: "vi.vm-3" },
					changedProperties:
					[
						{
							path: "name",
							reason: "Assigned",
							value: "another machine on my network"
						},
						{
							path: "powerState",
							reason: "Assigned",
							value: "suspended"
						},
						{
							path: "operatingSystem",
							reason: "Assigned",
							value: "windows"
						},
						{
							path: "toolsStatus",
							reason: "Assigned",
							value: "guestToolsBlacklisted"
						},
						{
							path: "disabledMethods",
							reason: "Assigned",
							value: []
						},
						{
							path: "cpuCount",
							reason: "Assigned",
							value: 2
						}
					],
					associatedViews:
					[
						{
							memberStatus: "Entered",
							viewKey: "VirtualMachines"
						}
					]
				}
			]
		});

		/*ko.utils.arrayPushAll(go.ActiveManagement.ActiveViewManager.views.VirtualMachines.subjects, [
			new go.Virtualization.VirtualMachine.VirtualMachineModel({ $subjectRefType: "vi.vm", key: "vi.vm-1" }, { powerState: "unknown", name: "my cool vm", toolsStatus: "guestToolsCurrent", operatingSystem: "dos", host: { subject: { name: function () { return "Grawp"; } }}, memorySize: 2048, cpuCount: 2, lastChangeDate: "2012-10-31 12:56:17.470", disabledMethods: ["PowerOffVM_Task", "PowerOnVM_Task"] }),
			new go.Virtualization.VirtualMachine.VirtualMachineModel({ $subjectRefType: "vi.vm", key: "vi.vm-2" }, { powerState: "suspended", name: "Test VM", toolsStatus: "guestToolsBlacklisted", operatingSystem: "windows", host: { subject: { name: function () { return "Grawp"; } }}, memorySize: 1024, cpuCount: 1, lastChangeDate: "2012-06-08 16:10:59.203", disabledMethods: [] }),
			new go.Virtualization.VirtualMachine.VirtualMachineModel({ $subjectRefType: "vi.vm", key: "vi.vm-3" }, { powerState: "wait", name: "my not cool vm", toolsStatus: "guestToolsNotInstalled", operatingSystem: "suse", host: { subject: { name: function () { return "Booya"; } }}, memorySize: 2048, cpuCount: 2, lastChangeDate: "2012-10-31 12:56:17.470", disabledMethods: ["PowerOffVM_Task", "PowerOnVM_Task"] }),
			new go.Virtualization.VirtualMachine.VirtualMachineModel({ $subjectRefType: "vi.vm", key: "vi.vm-4" }, { powerState: "poweredOn", name: "Prod VM", toolsStatus: "guestToolsNeedUpgrade", operatingSystem: "linux", host: { subject: { name: function () { return "Grawp"; } }}, cpuCount: 2, lastChangeDate: "2012-06-08 16:11:59.823", disabledMethods: ["PowerOnVM_Task"] }),
			new go.Virtualization.VirtualMachine.VirtualMachineModel({ $subjectRefType: "vi.vm", key: "vi.vm-5" }, { powerState: "poweredOff", name: "The new hotness", toolsStatus: "guestToolsTooOld", operatingSystem: "ubuntu", host: { subject: { name: function () { return "Booya"; } }}, memorySize: 2048, lastChangeDate: "2012-10-31 12:56:17.470", disabledMethods: ["PowerOffVM_Task"] })
		]);*/
	});

	var availablePowerStates = ["unknown", "suspended", "wait", "poweredOn", "poweredOff"];

	randomPowerState = function () {
		return availablePowerStates[Math.floor((Math.random()*availablePowerStates.length))];
	};

	var availableToolsVersionStatus = ["guestToolsBlacklisted","guestToolsCurrent","guestToolsNeedUpgrade","guestToolsNotInstalled","guestToolsSupportedNew","guestToolsSupportedOld","guestToolsTooNew","guestToolsTooOld","guestToolsUnmanaged","Unknown"];

	randomToolsVersionStatus = function () {
		return availableToolsVersionStatus[Math.floor((Math.random()*availableToolsVersionStatus.length))];
	};

	$("body").on("click", ".add-500-vms", function () {
		var vmGridItemsLength = go.ActiveManagement.ActiveViewManager.views.VirtualMachines.subjects().length;
		for (var i = vmGridItemsLength; i < vmGridItemsLength + 500; i++) {
			go.ActiveManagement.ActiveViewManager.onActiveViewNotification({
				subjectChanges:
				[
					{
						changeReason: "Entered",
						affectedSubject: { $subjectRefType: "vi.vm", key: "vi.vm-" + i },
						changedProperties:
						[
							{
								path: "name",
								reason: "Assigned",
								value: "my vm " + i
							},
							{
								path: "powerState",
								reason: "Assigned",
								value: randomPowerState()
							},
							{
								path: "operatingSystem",
								reason: "Assigned",
								value: "linux"
							},
							{
								path: "toolsStatus",
								reason: "Assigned",
								value: randomToolsVersionStatus()
							},
							{
								path: "disabledMethods",
								reason: "Assigned",
								value: ["PowerOnVM_Task"]
							},
							{
								path: "cpuCount",
								reason: "Assigned",
								value: 2
							}
						],
						associatedViews:
						[
							{
								memberStatus: "Entered",
								viewKey: "VirtualMachines"
							}
						]
					}
				]
			});
		}

		/*var vmGridItemsLength = go.ActiveManagement.ActiveViewManager.views.VirtualMachines.subjects().length;
		for (var i = vmGridItemsLength; i < vmGridItemsLength + 500; i++) {
			go.ActiveManagement.ActiveViewManager.views.VirtualMachines.subjects.push(new go.Virtualization.VirtualMachine.VirtualMachineModel({ $subjectRefType: "vi.vm", key: "vi.vm-" + i }, { powerState: "poweredOn", name: "VM #" + i, toolsStatus: "guestToolsNotInstalled", host: { subject: { name: function () { return "Host #" + i; } }}, operatingSystem: "windows", memorySize: 512 + i, cpuCount: i, lastChangeDate: "2012-10-31 12:56:17." + i, disabledMethods: ["PowerOffVM_Task","PowerOnVM_Task"] }));
		}*/
	});
	$("body").on("click", ".add-3-tasks", function () {
		recentTasksHandle.subjects.push(new go.Virtualization.VimTask(
			{ $subjectRefType: "vi.task", key: "vi.task-vikey.moref-Task-task-1300" },
			{
				affectedSubject: {
					subject: {
						subjectRef: { 
							$subjectRefType: "vi.hs"
						},
						name: function() {
							return "Grawp";
						}
					}
				},
				name: "Enter Maintenance Mode",
				state: "success"
			}
		));
		recentTasksHandle.subjects.push(new go.Virtualization.VimTask(
			{ $subjectRefType: "vi.task", key: "vi.task-vikey.moref-Task-task-1400" },
			{
				affectedSubject: {
					subject: {
						subjectRef: { 
							$subjectRefType: "vi.vm"
						},
						name: function() {
							return "Test VM";
						}
					}
				},
				name: "Power On Virtual Machine",
				state: "error"
			}
		));
		recentTasksHandle.subjects.push(new go.Virtualization.VimTask(
			{ $subjectRefType: "vi.task", key: "vi.task-vikey.moref-Task-task-1500" },
			{
				affectedSubject: {
					subject: {
						subjectRef: { 
							$subjectRefType: "vi.vm"
						},
						name: function() {
							return "my vm";
						}
					}
				},
				name: "Power Off Virtual Machine",
				state: "running",
				progress: 60
			}
		));
	});

	var pathname = window.location.pathname;
	var buttonHtml = '<div>';
	if (pathname === "/vSphere/VirtualMachine") {
		buttonHtml += '<button class="add-3-vms">Add 3</button><button class="add-500-vms">Add 500</button>';
	} else if (pathname.indexOf("/vSphere/VirtualMachine/Manage") !== -1) {
		buttonHtml += '<button class="add-vm">Add vm</button>';
		isManagePage = true;
	} else if (pathname === "/vSphere/Hypervisor") {
		buttonHtml += '<button class="add-5-hosts">Add 5</button>';
	}  else if (pathname === "/vSphere/VCenter") {
		buttonHtml += '<button class="add-5-vcenters">Add 5</button>';
	}
	buttonHtml += '</div>';
	
	$('#page-body').prepend(buttonHtml);
	
	$('#recentTasks .recent-tasks-header').append('<button class="add-3-tasks">Add 3 Tasks</button>')
};

addJQuery = function(callback) {
	if (window.jQuery) {
		//console.log('jquery loaded already by @require declaration');
		callback();
	} else {
		//console.log('unable to load jquery via @require so loading manually...');
		var script = document.createElement("script");
		var currentUrl = document.URL;
		var jqueryUIUrl = location.protocol;
		if (currentUrl.indexOf("goqa.vmware.com") !== -1) {
			jqueryUIUrl += "//goqa.vmware.com/";
		} else {
			jqueryUIUrl += "//golocal.vmware.com/";
		}
		//needed, otherwise effect won't work
		jqueryUIUrl += "Bundles/CDN/jquery-ui-1.8.18.js";
		script.setAttribute("src", jqueryUIUrl);
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
};

addJQuery(loadVMGridDataMain);