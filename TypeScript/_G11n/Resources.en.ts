module go.Resources {

	export class Account {
		 
			static AddUser_Button: string = "Add User";
		 
			static Cancel_Button: string = "Cancel";
		 
			static ContactSales_Dialog_Button_Ok: string = "Ok";
		 
			static ContactSales_Dialog_Title: string = "Contact VMware Sales";
		 
			static CreateNewUser_Dialog_Title: string = "Create New User";
		 
			static LocalizationSettings_Dialog_Button_Cancel: string = "Cancel";
		 
			static LocalizationSettings_Dialog_Button_Save: string = "Save";
		 
			static LocalizationSettings_Dialog_Title: string = "Localization Settings";
			}
	export class AssetManagement {
		 
			static HideUnhideAssets_Dialog_Button_Apply: string = "Apply";
		 
			static HideUnhideAssets_Dialog_Button_Cancel: string = "Cancel";
		 
			static HideUnhideAssets_Dialog_Title: string = "HIDE/UNHIDE ASSETS";
			}
	export class Billing {
		 
			static DeleteUser_Dialog_Button_Cancel: string = "Cancel";
		 
			static DeleteUser_Dialog_Button_Ok: string = "Ok";
		 
			static DeleteUser_Dialog_Description: string = "Are you sure you want to delete this user?";
		 
			static DeleteUser_Dialog_Title: string = "Confirm User Delete";
			}
	export class BlockingOpsCloudJob {
		 
			static FailureNotification_Description: string = "Job timed out.";
		 
			static FailureNotification_Dismiss_Link: string = "Dismiss";
		 
			static FailureNotification_Title: string = "An Error Has Occurred";
			}
	export class CommonDialogs {
		 
			static Add_Dialog_Button_Accept_Default: string = "Add Host";
		 
			static Add_Dialog_Button_Cancel: string = "Cancel";
		 
			static Add_Dialog_Instructions_Default: string = "Enter the address of the host to discover";
		 
			static Add_Dialog_Title_Default: string = "Add Host";
		 
			static ExecuteAndAwaitJob_WaitMessage_Default: string = "Executing...";
			}
	export class Devices {
		 
			static DetectedHardDrives_Dialog_Title: string = "Detected Hard Drives";
		 
			static DetectedNetworkAdapters_Dialog_Title: string = "Detected Network Adapters";
		 
			static DetectedSoftware_Dialog_Title: string = "DETECTED SOFTWARE";
		 
			static MissingPatches_Dialog_Title: string = "Missing Patches";
		 
			static RemoveMachines_Dialog_Button_Cancel: string = "Cancel";
		 
			static RemoveMachines_Dialog_Button_Ok: string = "Remove Machines";
		 
			static RemoveMachines_Dialog_Title: string = "REMOVE MACHINES";
			}
	export class DisasterRecovery {
		 
			static AddHost_Dialog_BandwidthTestRunning: string = "Bandwidth test running...";
		 
			static AddHost_Dialog_EnterIP: string = "Enter the IP address of the ESXi Hypervisor.";
		 
			static AddHost_Dialog_InstructionHtml1: string = "Adding a new ESXi Hypervisor to VMware Go allows you to configure its virtual machines for backup.";
		 
			static AddHost_Dialog_InstructionHtml2: string = "You need to know the location of the ESXi Hypervisor on the network and the administrator account (typically Administrator or root).";
		 
			static AddHost_Dialog_Title: string = "Add ESXi Hypervisor";
		 
			static AddHost_Dialog_WaitMessage: string = "Discovering ESXi Hypervisor Virtual Machines...";
		 
			static AddvCenter_Dialog_EnterIP: string = "Enter the IP address of the vCenter Server.";
		 
			static AddvCenter_Dialog_InstructionHtml1: string = "Adding a new vCenter Server to VMware Go allows you to configure its virtual machines for backup.";
		 
			static AddvCenter_Dialog_InstructionHtml2: string = "You need to know the location of the vCenter on the network and the administrator account (typically Administrator or root).";
		 
			static AddvCenter_Dialog_Title: string = "Add vCenter Server";
		 
			static AddvCenter_Dialog_WaitMessage: string = "Discovering vCenter Server Virtual Machines...";
		 
			static Common_Dialog_CancelText: string = "Cancel";
		 
			static Common_Dialog_ContinueText: string = "Continue";
		 
			static Common_Dialog_DiscoverText: string = "Discover";
		 
			static Common_Dialog_Ok: string = "Ok";
		 
			static Common_Dialog_SaveText: string = "Save";
		 
			static DataShuttleBackup_Dialog_Title: string = "Backup to Data Shuttle";
		 
			static DeleteGroup_Alert_MachineAssignedError: string = "The DR Group cannot be removed because there is 1 machine assigned to it.";
		 
			static DeleteGroup_Alert_MachineAssignedTitle: string = "Error Deleting DR Group";
		 
			static DeleteGroup_Alert_MachinesAssigned_1: string = "The DR Group cannot be removed because there are ";
		 
			static DeleteGroup_Alert_MachinesAssigned_2: string = " machines assigned to it.";
		 
			static RemoveMachines_Dialog_Description: string = "Are you sure you want to remove this machine from backup? This action cannot be undone. If you choose to proceed your backup schedule and data for the selected machine(s) will be lost. <br/><br/> Click the Continue button to review your machines selected for removal.";
		 
			static RemoveMachines_Dialog_Title: string = "REMOVE MACHINES";
			}
	export class Global {
		 
			static OperationDetails_Dialog_Title: string = "Operation Details";
			}
	export class GridText {
		 
			static ExportGridToFileError: string = "There was an unexpected error downloading your document. Please try again later.";
		 
			static ExportGridToFileErrorHeader: string = "Error Exporting Grid";
		 
			static ExportGridToFileSuccess: string = "Check your browser's download location for your file.";
		 
			static ExportGridToFileSuccessHeader: string = "Successfully Exported Grid";
		 
			static GridProcessingRequest: string = "Working...";
			}
	export class GroupDelete {
		 
			static AttachedEntities_Message: string = "If there are entities attached to this group, e.g. a scheduled deploy task, they may fail if this group is deleted.";
		 
			static ConfirmGroupDelete_Dialog_Button_Cancel: string = "Cancel";
		 
			static ConfirmGroupDelete_Dialog_Button_Ok: string = "Ok";
		 
			static ConfirmGroupDelete_Dialog_Message: string = "Are you sure you want to delete this group?";
		 
			static ConfirmGroupDelete_Dialog_Title: string = "Confirm Group Delete";
		 
			static Warning_Heading: string = "WARNING:";
			}
	export class HelpDesk {
		 
			static HD_Dialog_Button_Cancel: string = "Cancel";
		 
			static HD_Dialog_Button_Ok: string = "OK";
		 
			static HD_Portal_DeactivateUser_Dialog_Title: string = "Confirm Deactivate User";
		 
			static HD_Portal_Invite_Dialog_Title: string = "Confirm Cancel Invite";
		 
			static HD_Portal_ReactivateUser_Dialog_Title: string = "Confirm Reactivate User";
		 
			static HD_Portal_Resend_Dialog_Title: string = "Confirm Resend Invite";
		 
			static ImportCSV_Dialog_Button_Close: string = "Close";
		 
			static ImportCSV_Dialog_Button_Import: string = "Import";
		 
			static ImportCSV_Dialog_Title: string = "Import CSV File";
		 
			static Ticket_Description_Validation_Error: string = "The Description field is required.";
		 
			static Ticket_ReplyDescription_Validation_Error: string = "Please enter text in the Reply To Ticket box.";
		 
			static Ticket_Requestor_Dropdown_Default: string = "[Choose or type]";
			}
	export class IPValidation {
		 
			static CorrectIPConfiguration_Button: string = "Correct the IP configuration";
		 
			static InvalidGatewayWarning_Dialog_Paragraph1: string = "The Static IP address at <strong>{0}</strong> does not appear to be on the same network as the Gateway at <strong>{1}</strong>.";
		 
			static InvalidGatewayWarning_Dialog_Paragraph2: string = "You may proceed with these settings, but the ESXi Hypervisor installation is not likely to succeed.";
		 
			static InvalidGatewayWarning_Dialog_Title: string = "Static IP Configuration Warning";
		 
			static InvalidIpAddress_Error: string = "Invalid IP Address";
		 
			static NoIpAddressSpecified_Error: string = "No IP address specified.";
		 
			static NoIpAddressSpecifiedToScan_Error: string = "No IP address specified to scan.";
		 
			static UseThisIPConfiguration_Button: string = "Continue with this IP configuration";
			}
	export class ITAdvisor {
		 
			static AnswerQuestion_Dialog_Button_Answer: string = "Answer Question";
		 
			static AnswerQuestion_Dialog_Button_Cancel: string = "Cancel";
		 
			static AnswerQuestionDialog_Title: string = "IT Advisor Question";
		 
			static Invalid_Action_warning_Alert: string = "We apologize but this action is no longer valid. Click OK to reload the IT Advisor page.";
		 
			static Invalid_Recommendation_warning_Alert: string = "We apologize but this recommendation is no longer valid. Click OK to reload the IT Advisor page.";
			}
	export class LicenseDetail {
		 
			static SupportChart_Dialog_Title: string = "VMware Go License Manager";
			}
	export class OpsCloudDetection {
		 
			static ConfirmOpsCloudInstall_Dialog_Title: string = "VMware Go Installation";
		 
			static OpsCloudInstall_Dialog_Button_Cancel: string = "Cancel";
		 
			static OpsCloudInstall_Dialog_Button_InstallNow: string = "Install Now";
		 
			static OpsCloudInstall_Dialog_Button_Ok: string = "OK";
		 
			static OpsCloudInstall_Dialog_Title: string = "VMware Go Installation";
			}
	export class Patch_PatchDeploy {
		 
			static CreateNewGroup_Dialog_Button_Cancel: string = "Cancel";
		 
			static CreateNewGroup_Dialog_Button_Save: string = "Save";
			}
	export class Patch_ScheduleDeployment {
		 
			static ScheduleDeployment_DeleteDialog_Intro: string = "Are you sure you want to delete this scheduled task?";
		 
			static ScheduleDeployment_DeleteDialog_Title: string = "Confirm Delete Scheduled Task";
		 
			static ScheduleDeployment_DeleteDialogButton_Cancel: string = "Cancel";
		 
			static ScheduleDeployment_DeleteDialogButton_Ok: string = "Ok";
			}
	export class Registration {
		 
			static AccountUpgrade_Dialog_Button_Cancel: string = "Cancel";
		 
			static AccountUpgrade_Dialog_Button_PurchaseGoPro: string = "Purchase Go Pro";
		 
			static AccountUpgrade_Dialog_Button_RunITAdvisor: string = "Run IT Advisor";
		 
			static AccountUpgrade_Dialog_Title: string = "You are not licensed for this feature";
		 
			static FreeTrial_Dialog_Button_Cancel: string = "Cancel";
		 
			static FreeTrial_Dialog_Button_RunITAdvisor: string = "Run IT Advisor";
		 
			static FreeTrial_Dialog_Button_Submit: string = "Submit";
		 
			static FreeTrial_Dialog_Title: string = "Just one more step to your free trial";
		 
			static FreeTrial_Dialog_Title_NotLicensed: string = "You are not licensed for this feature";
			}
	export class ScanOptions {
		 
			static AllowedIpRangeExceeded_Error: string = "The IP range exceeds the maximum allowed size of {0}.";
		 
			static InvalidIpAddress_Error: string = "Invalid IP Address";
		 
			static InvalidIpRange_Error: string = "Invalid IP Address Range";
		 
			static NoIpAddressToScan_Error: string = "No IP address specified to scan.";
			}
	export class SoftwareLicenseManagement {
		 
			static HideUnhideSoftware_Dialog_Button_Cancel: string = "Cancel";
		 
			static HideUnhideSoftware_Dialog_Button_Update: string = "Update";
		 
			static HideUnhideSoftware_Dialog_Title: string = "Hide/Unhide Software";
		 
			static LicenseManager_Dialog_Title: string = "LICENSE MANAGER";
			}
	export class Support {
		 
			static Chart_Dialog_Title: string = "Compare VMware Go Support";
			}
	export class TicketHistory {
		 
			static ConfirmDelete_Dialog_Button_Cancel: string = "Cancel";
		 
			static ConfirmDelete_Dialog_Button_Ok: string = "Ok";
		 
			static ConfirmDelete_Dialog_Content: string = "Are you sure you want to remove this attachment?";
		 
			static ConfirmDelete_Dialog_Title: string = "Confirm Attachment Delete";
		 
			static RemoveAttachmentConfirmation_DeletedBy: string = "Deleted by {0}";
			}
	export class VCenterProtectText {
		 
			static AgentKeyDelete_WaitMessage: string = "Please wait while VMwareGo deletes Agent Key(s).....";
		 
			static AgentKeyDeleteDialog_Description: string = "You are about to expire the selected agent key(s).";
		 
			static AgentKeyDeleteDialog_Title: string = "Delete Agent Key(s)";
		 
			static AreyouSuretoContinue_Text: string = " Are you sure you want to continue?";
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static CreateNewAgentKey_ButtonText: string = "Create Key";
		 
			static CreateNewAgentKeyDialog_Title: string = "Create New Agent Key";
		 
			static No_ButtonText: string = "No";
		 
			static ResendAgentKey_ButtonText: string = "Resend";
		 
			static ResendAgentKey_Title: string = "Resend Agent Key";
		 
			static UnregisterConsoleDialog_Text: string = "You are about to unregister this console from VMware Go. ";
		 
			static UnregisterConsoleDialog_Title: string = "Unregister Console";
		 
			static Yes_ButtonText: string = "Yes";
			}
	export class Virtualization_ActiveDirectoryText {
		 
			static ActiveDirectoryWizard_Title: string = "Setup Active Directory Integration";
			}
	export class Virtualization_BlankVMText {
		 
			static BlankVMWizard_Title: string = "New Virtual Machine";
			}
	export class Virtualization_CompatibilityTestText {
		 
			static CredentialsDialog_Title: string = "Use Current Credentials";
		 
			static IncompatibleHypervisor_DialogTitle: string = "Hardware Compatibility Notice";
		 
			static TryAnotherMachine_ButtonText: string = "Try Another Machine";
			}
	export class Virtualization_DeployVCenterServerApplianceText {
		 
			static DeployAppliance_WizardTitle: string = "Deploy vCenter Server Appliance";
			}
	export class Virtualization_HostsText {
		 
			static AddHypervisorDialog_ConfirmButtonText: string = "Manage";
		 
			static AddHypervisorDialog_Paragraph1: string = "To manage an ESXi Hypervisor, you need to know the location of the host on the network and the administrator account (typically Administrator or root).";
		 
			static AddHypervisorDialog_Paragraph2: string = "Enter the IP address of the host.";
		 
			static AddHypervisorDialog_Title: string = "Manage an Existing ESXi Hypervisor";
		 
			static AddHypervisorDialog_WaitMessage: string = "Discovering ESXi Hypervisor...";
		 
			static EnterMaintenanceMode: string = "Enter Maintenance Mode";
		 
			static EnterMaintenanceMode_DialogTitle: string = "Confirm Enter Maintenance Mode";
		 
			static EnterMaintenanceModeAction_Summary: string = "To complete entry into maintenance mode, all virtual machines must be shut down. VMware Go\u2122 will attempt to shut down all virtual machines that are currently powered on.  If VMware Tools is installed, VMware Go\u2122 will attempt to shut down the guest before powering off.";
		 
			static EnterMaintenanceModeMulti_WaitMessage: string = "Please wait while VMware Go\u2122 enters your selected hosts into maintenance mode...";
		 
			static EnterMaintenanceModeMultiAction_Question: string = "Do you want the selected hosts to enter maintenance mode?";
		 
			static EnterMaintenanceModeSingle_WaitMessage: string = "Please wait while VMware Go\u2122 enters your host into maintenance mode...";
		 
			static EnterMaintenanceModeSingleAction_Question: string = "Do you want this host to enter maintenance mode?";
		 
			static ExitMaintenanceMode: string = "Exit Maintenance Mode";
		 
			static ExitMaintenanceModeDialog_Title: string = "Confirm Exit Maintenance Mode";
		 
			static ExitMaintenanceModeMulti_WaitMessage: string = "Please wait while VMware Go\u2122 takes your selected hosts out of maintenance mode...";
		 
			static ExitMaintenanceModeMultiAction_Question: string = "Do you want the selected hosts to exit maintenance mode?";
		 
			static ExitMaintenanceModeSingle_WaitMessage: string = "Please wait while VMware Go\u2122 takes your host out of maintenance mode...";
		 
			static ExitMaintenanceModeSingleAction_Question: string = "Do you want this host to exit maintenance mode?";
		 
			static Remove_Action: string = "Remove";
		 
			static RemoveDialog_Description: string = "You are about to remove hosts and their virtual machines from VMware Go.  This only removes them from your Virtual Infrastructure in VMware Go.   Removed hosts can be re-added by selecting the Manage an Existing ESXi Hypervisor option.  Do you want the selected hosts to be removed?";
		 
			static RemoveDialog_Title: string = "Confirm Remove";
		 
			static RemoveMulti_WaitMessage: string = "Removing Host(s)...";
		 
			static RemoveMultiAction_Question: string = "Are you sure you want to remove the selected host(s) and their virtual machines from VMware Go\u2122?";
		 
			static RemoveMultiAction_Summary: string = "This only removes the host(s) and their virtual machines from your Virtual Infrastructure in VMware Go\u2122.  The removed host(s) can be re-added by selecting the Manage an Existing ESXi Hypervisor option.";
		 
			static RemoveSingle_WaitMessage: string = "Removing Host.";
		 
			static RemoveSingleAction_Question: string = "Are you sure you want to remove this host?";
		 
			static RemoveSingleAction_Summary: string = "This only removes the host and its virtual machines from your Virtual Infrastructure in VMware Go\u2122.  The removed host can be re-added by selecting the Manage an Existing ESXi Hypervisor option. ";
		 
			static Restart_Action: string = "Restart";
		 
			static RestartDialog_Title: string = "Confirm Restart";
		 
			static RestartMulti_WaitMessage: string = "Please wait while VMware Go\u2122 restarts your selected hosts...";
		 
			static RestartMultiAction_Question: string = "Do you want to restart the selected host(s)?";
		 
			static RestartMultiAction_Summary: string = "VMware Go\u2122 will not power on virtual machines after restart.";
		 
			static RestartSingle_WaitMessage: string = "Please wait while VMware Go\u2122 restarts your host...";
		 
			static RestartSingleAction_Question: string = "Do you want to restart this host?";
		 
			static RestartSingleAction_Summary: string = "VMware Go\u2122 will not power on virtual machines after restart.";
		 
			static Shutdown_Action: string = "Shutdown";
		 
			static ShutdownAction_Summary: string = "To complete a host shutdown, all virtual machines must be shut down.  VMware Go will attempt to shut down all virtual machines that are currently powered on.";
		 
			static ShutdownDialog_Title: string = "Confirm Shutdown";
		 
			static ShutdownMulti_WaitMessage: string = "Please wait while VMware Go\u2122 shuts down selected hosts...";
		 
			static ShutdownMultiAction_Question: string = "Are you sure you want to shutdown these hosts?";
		 
			static ShutdownSingle_WaitMessage: string = "Please wait while VMware Go\u2122 shuts down this host...";
		 
			static ShutdownSingleAction_Question: string = "Are you sure you want to shutdown this host?";
			}
	export class Virtualization_HypervisorPatchText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static InstallPatches_ButtonText: string = "Install";
		 
			static Ok_ButtonText: string = "Ok";
		 
			static PatchInstall_WaitMessage: string = "Please wait while VMware Go\u2122 updates your ESXi Hypervisor...";
		 
			static PatchResultsDialog_Title: string = "Confirm install of missing patches";
		 
			static PatchStatusUpToDateDialog_Title: string = "Patch Status";
		 
			static ScanAction_WaitMessage: string = "Please wait while VMware Go\u2122 scans the host for patches...";
			}
	export class Virtualization_ManageHypervisorText {
		 
			static Close_ButtonText: string = "Close";
		 
			static ConfigInfoDialog_Title: string = "Configuration Information";
		 
			static Refresh_WaitMessage: string = "Refreshing your ESXi Hypervisor's Configuration data. Please wait.";
		 
			static UpdatingHypervisor_WaitMessage: string = "Please wait while VMware Go\u2122 configures your ESXi Hypervisor.";
			}
	export class Virtualization_ManageVMText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Close_ButtonText: string = "Close";
		 
			static ConfigurationDialog_Title: string = "View/Edit Configuration";
		 
			static Delete_ButtonText: string = "Delete";
		 
			static Delete_DialogTitle: string = "Confirm Delete";
		 
			static Delete_WaitMessage: string = "Please wait while VMware Go\u2122 deletes your virtual machine.";
		 
			static LaunchingRemoteConsole_WaitMessage: string = "Launching Remote Console.";
		 
			static PowerOn_ButtonText: string = "Power On";
		 
			static PowerOn_DialogTitle: string = "Power On VM";
		 
			static PowerOn_Question: string = "Are you sure you want to power on <strong>{0}</strong>?";
		 
			static PowerOn_WaitMessage: string = "Please wait while VMware Go\u2122 powers on the virtual machine.";
		 
			static Restart_ButtonText: string = "Restart";
		 
			static Restart_DialogTitle: string = "Confirm Restart";
		 
			static Restart_WaitMessage: string = "Please wait while VMware Go\u2122 restarts the virtual machine.";
		 
			static Shutdown_ButtonText: string = "Shutdown";
		 
			static Shutdown_DialogTitle: string = "Confirm Shutdown";
		 
			static Shutdown_Question: string = "Are you sure you want to shutdown <strong>{0}</strong>?";
		 
			static Shutdown_WaitMessage: string = "Please wait while VMware Go\u2122 shuts down the virtual machine.";
		 
			static Suspend_ButtonText: string = "Suspend";
		 
			static Suspend_DialogTitle: string = "Confirm Suspend";
		 
			static Suspend_WaitMessage: string = "Please wait while VMware Go\u2122 suspends the virtual machine.";
		 
			static Update_ButtonText: string = "Update";
			}
	export class Virtualization_MigrateVMText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Continue_ButtonText: string = "Continue";
		 
			static Migrate_Question: string = "As part of the migration process, VMware Go will power off this virtual machine. Do you want to continue?";
		 
			static MigrateDialog_Title: string = "Virtual Machine Migration";
			}
	export class Virtualization_Physical2VirtualText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static P2VDialog_Title: string = "Convert a Physical Server";
		 
			static P2VLaunch_ButtonText: string = "Launch VMware Converter";
			}
	export class Virtualization_RemoteInstallText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Continue_ButtonText: string = "Continue";
		 
			static Download_ButtonText: string = "Download ISO";
		 
			static DownloadIsoDialog_Title: string = "Install ESXi Hypervisor Software";
		 
			static HostNameDialog_Title: string = "Host Name";
		 
			static Manage_ButtonText: string = "Manage ESXi Hypervisor";
		 
			static WarningDialog_Title: string = "Important";
			}
	export class Virtualization_RenameHypervisorText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Confirm_ButtonText: string = "Confirm";
		 
			static No_ButtonText: string = "No";
		 
			static Rename_ButtonText: string = "Rename";
		 
			static Rename_DialogTitle: string = "Rename Host";
		 
			static Rename_WaitMessage: string = "Please wait while VMware Go\u2122 renames your host.";
		 
			static ValidationError_NameAlreadyExists: string = "A host with that name already exists. Continue renaming your host?";
		 
			static Yes_ButtonText: string = "Yes";
			}
	export class Virtualization_RenameVMText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Rename_DialogTitle: string = "Rename Host";
		 
			static Rename_WaitMessage: string = "Please wait while VMware Go\u2122 renames your host.";
		 
			static Save_ButtonText: string = "Save";
			}
	export class Virtualization_VCenterText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Register_ButtonText: string = "Register";
		 
			static RegisterHosts_WaitMessage: string = "Please wait while VMware Go registers one or more hosts with the vCenter Server.";
		 
			static RegisterHostsDialog_Title: string = "Register Hosts";
		 
			static Remove_ButtonText: string = "Remove";
		 
			static Remove_WaitMessage: string = "Please wait while VMWare Go removes the selected vCenter Server(s) and their children from your Virtual Infrastructure";
		 
			static RemoveMultiAction_DialogTitle: string = "Remove Selected vCenter Server(s)";
		 
			static RemoveMultiAction_Question: string = "Are you sure you want to remove the selected host(s) and their virtual machines from VMware Go\u2122?";
		 
			static RemoveMultiAction_Summary: string = "This only removes the host(s) and their virtual machines from your Virtual Infrastructure in VMware Go\u2122.  The removed host(s) can be re-added by selecting the Manage an Existing ESXi Hypervisor option.";
		 
			static RemoveSingleAction_DialogTitle: string = "Remove vCenter Server";
		 
			static RemoveSingleAction_Question: string = "Are you sure you want to remove this host?";
		 
			static RemoveSingleAction_Summary: string = "This only removes the host and its virtual machines from your Virtual Infrastructure in VMware Go\u2122.  The removed host can be re-added by selecting the Manage an Existing ESXi Hypervisor option. ";
			}
	export class Virtualization_VirtualActionText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Confirm_Question: string = "Are you sure you want to take this action?";
		 
			static Confirm_Title: string = "Confirm";
		 
			static Ok_ButtonText: string = "Ok";
		 
			static PleaseWait_DefaultMessage: string = "VMware Go is processing your request, please wait.";
			}
	export class Virtualization_VirtualRefreshText {
		 
			static RefreshingAllHypervisors_WaitMessage: string = "Refreshing all ESXi Hypervisor Configurations. Please wait.";
		 
			static RefreshingAllInfrastructure_WaitMessage: string = "Refreshing all virtual infrastructure.  Please wait.";
		 
			static RefreshingAllVCenters_WaitMessage: string = "Refreshing all vCenter Server Configurations. Please wait.";
		 
			static RefreshingAllVirtualMachines_WaitMessage: string = "Refreshing all virtual machine Configurations. Please wait.";
		 
			static RefreshingSingleVCenter_WaitMessage: string = "Refreshing vCenter Server Configurations. Please wait.";
			}
	export class Virtualization_VirtualText {
		 
			static DiscoveringvCenter_WaitMessage: string = "Discovering vCenter Server...";
		 
			static ManageExistingvCenter_ButtonText: string = "Manage";
		 
			static ManageExistingvCenterDialog_Description_Part1: string = "To manage a vCenter Server, you need to know the location of the vCenter Server on the network and the administrator account (typically Administrator or root).";
		 
			static ManageExistingvCenterDialog_Description_Part2: string = "Enter the IP address of the vCenter Server.";
		 
			static ManageExistingvCenterDialog_Title: string = "Manage an Existing vCenter Server";
			}
	export class Virtualization_VMGrid {
		 
			static ExportFileName: string = "Virtual Machines Report";
		 
			static HostColumnHeader: string = "Host";
		 
			static NameColumnHeader: string = "Name";
		 
			static NotificationTitleVMAddedToGrid: string = "Virtual Machine Added";
		 
			static NotificationTitleVMRemovedFromGrid: string = "Virtual Machine Removed";
		 
			static OSColumnHeader: string = "Operating System";
		 
			static SummaryAllVMsAboveColumnsInGrid: string = "Showing <span class='results-count'>All {0}</span> Virtual Machines";
		 
			static SummaryCountVMsAboveColumnsInGrid: string = "Showing <span class='results-count'>{0} of {1}</span> Virtual Machines";
		 
			static ToolsColumnHeader: string = "Tools";
			}
	export class Virtualization_VMGridActionsText {
		 
			static Cancel_ButtonText: string = "Cancel";
		 
			static Delete_ButtonText: string = "Delete";
		 
			static Delete_Summary: string = "This removes the guest from inventory and deletes its files from disk.";
		 
			static DeleteMulti_DialogTitle: string = "Delete VM(s)";
		 
			static DeleteMulti_Question: string = "Are you sure you want to delete the selected VM(s)?";
		 
			static DeleteMulti_WaitMessage: string = "Please wait while VMware Go\u2122 deletes the selected virtual machine(s).";
		 
			static PowerOn_ButtonText: string = "Power On";
		 
			static PowerOnMulti_DialogTitle: string = "Power On VM(s)";
		 
			static PowerOnMulti_Question: string = "Are you sure you want to power on the selected VM(s)?";
		 
			static PowerOnMulti_WaitMessage: string = "Please wait while VMware Go\u2122 powers on the selected virtual machine(s).";
		 
			static Restart_ButtonText: string = "Restart";
		 
			static Restart_Summary: string = "If VMware Tools are currently installed on the VM, the VM will be restarted. Otherwise the VM will be powered off and powered on.";
		 
			static RestartMulti_DialogTitle: string = "Restart VM(s)";
		 
			static RestartMulti_Question: string = "Are you sure you want to restart the selected VM(s)?";
		 
			static RestartMulti_WaitMessage: string = "Please wait while VMware Go\u2122 restarts your selected hosts...";
		 
			static Shutdown_ButtonText: string = "Shutdown";
		 
			static Shutdown_Summary: string = "If VMware Tools are currently installed on the VM, the VM will be shutdown. Otherwise the VM will be powered off.";
		 
			static ShutdownMulti_DialogTitle: string = "Shutdown VM(s)";
		 
			static ShutdownMulti_Question: string = "Are you sure you want to shutdown the selected VM(s)?";
		 
			static ShutdownMulti_WaitMessage: string = "Please wait while VMware Go\u2122 shuts down selected hosts...";
		 
			static Suspend_ButtonText: string = "Suspend";
		 
			static SuspendMulti_DialogTitle: string = "Suspend VM(s)";
		 
			static SuspendMulti_Question: string = "Are you sure you want to suspend the selected VM(s)?";
		 
			static SuspendMulti_WaitMessage: string = "Please wait while VMware Go\u2122 suspends the selected virtual machine(s).";
			}
	export class Virtualization_VMRCActionConfirmationsText {
		 
			static PowerOn_ButtonText: string = "Power On";
		 
			static PowerOn_DialogTitle: string = "Power On VM";
		 
			static Restart_ButtonText: string = "Restart";
		 
			static Restart_DialogTitle: string = "Confirm Restart";
		 
			static Shutdown_ButtonText: string = "Shutdown";
		 
			static Shutdown_DialogTitle: string = "Confirm Shutdown";
		 
			static Suspend_ButtonText: string = "Suspend";
		 
			static Suspend_DialogTitle: string = "Confirm Suspend";
			}
	export class Virtualization_VMRCEventHandlersText {
		 
			static GrabHelp: string = "To direct input to this VM, click inside.";
		 
			static ManageCdDvds_WizardTitle: string = "Manage CDs/DVDs";
		 
			static ManageFloppy_WizardTitle: string = "Manage Floppy Drive";
		 
			static UnGrabHelp: string = "To return to your computer, press Ctrl+Alt.";
			}
}
