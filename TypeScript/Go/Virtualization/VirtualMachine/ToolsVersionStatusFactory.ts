/// <reference path="ToolsVersionStatusFactory.ts" />
/// <reference path="ToolsVersionStatus.ts" />
module go.Virtualization.VirtualMachine {
	export class ToolsVersionStatusFactory {
		static Map = {
			guestToolsBlacklisted: new go.Virtualization.VirtualMachine.ToolsVersionStatus(0, "guestToolsBlacklisted", "tools-alert", "Out of Date"/*ToolsVersionStatusModelText.Status_OutOfDate*/, ""/*ToolsVersionStatusModelText.ToolsBlacklisted_Tooltip*/),
			guestToolsCurrent: new go.Virtualization.VirtualMachine.ToolsVersionStatus(1, "guestToolsCurrent", "tools-current", "Up to Date"/*ToolsVersionStatusModelText.Status_UpToDate*/, ""/*ToolsVersionStatusModelText.ToolsCurrent_Tooltip*/),
			guestToolsNeedUpgrade: new go.Virtualization.VirtualMachine.ToolsVersionStatus(2, "guestToolsNeedUpgrade", "tools-warning", "Out of Date"/*ToolsVersionStatusModelText.Status_OutOfDate*/, ""/*ToolsVersionStatusModelText.ToolsNeedUpgrade_Tooltip*/),
			guestToolsNotInstalled: new go.Virtualization.VirtualMachine.ToolsVersionStatus(3, "guestToolsNotInstalled", "tools-not-installed", "Not Installed"/*ToolsVersionStatusModelText.Status_NotInstalled*/, ""/*ToolsVersionStatusModelText.ToolsNotInstalled_Tooltip*/),
			guestToolsSupportedNew: new go.Virtualization.VirtualMachine.ToolsVersionStatus(4, "guestToolsSupportedNew", "tools-current", "Up to Date"/*ToolsVersionStatusModelText.Status_UpToDate*/, ""/*ToolsVersionStatusModelText.ToolsSupportedNew_Tooltip*/),
			guestToolsSupportedOld: new go.Virtualization.VirtualMachine.ToolsVersionStatus(5, "guestToolsSupportedOld", "tools-warning", "Out of Date"/*ToolsVersionStatusModelText.Status_OutOfDate*/, ""/*ToolsVersionStatusModelText.ToolsSupportedOld_Tooltip*/),
			guestToolsTooNew: new go.Virtualization.VirtualMachine.ToolsVersionStatus(6, "guestToolsTooNew", "tools-warning", "Too New"/*ToolsVersionStatusModelText.Status_TooNew*/, ""/*ToolsVersionStatusModelText.ToolsTooNew_Tooltip*/),
			guestToolsTooOld: new go.Virtualization.VirtualMachine.ToolsVersionStatus(7, "guestToolsTooOld", "tools-warning", "Out of Date"/*ToolsVersionStatusModelText.Status_OutOfDate*/, ""/*ToolsVersionStatusModelText.ToolsTooOld_Tooltip*/),
			guestToolsUnmanaged: new go.Virtualization.VirtualMachine.ToolsVersionStatus(8, "guestToolsUnmanaged", "tools-warning", "Unmanaged"/*ToolsVersionStatusModelText.Status_Unmanaged*/, ""/*ToolsVersionStatusModelText.ToolsUnmanaged_Tooltip*/),
			unknown: new go.Virtualization.VirtualMachine.ToolsVersionStatus(9, "Unknown", "tools-alert", "Unknown"/*ToolsVersionStatusModelText.Status_Unknown*/, ""/*ToolsVersionStatusModelText.ToolsUnknown_Tooltip*/),
		};

		static get(toolsVersionStatus: string): go.Virtualization.VirtualMachine.ToolsVersionStatus {
		    toolsVersionStatus = toolsVersionStatus || "unknown";
			var resolved = go.Virtualization.VirtualMachine.ToolsVersionStatusFactory.Map[toolsVersionStatus];
			return resolved || go.Virtualization.VirtualMachine.ToolsVersionStatusFactory.Map["unknown"];
		}
	}
}