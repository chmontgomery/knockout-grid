///<reference path='Subjects/SubjectRef.d.ts' />
///<reference path='Subjects/SubjectViewModel.ts' />
///<reference path='../_Definitions/Scripts/Shared/CommonTypes.d.ts' />

module go.Subjects {
  export class VirtualMachineViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
    public name = ko.observable();
    public operatingSystem = ko.observable();
    public cpuCount = ko.observable();
    public powerState = ko.observable();
    public toolsStatus = ko.observable();
    public host = ko.observable();
    public instanceUuid = ko.observable();
    public memorySize = ko.observable();
    public changeTrackingEnabled = ko.observable();
    public uuid = ko.observable();
    public cpuAllocationLevel = ko.observable();
    public cpuAllocationReservation = ko.observable();
    public cpuAllocationLimit = ko.observable();
    public memoryAllocationLevel = ko.observable();
    public memoryAllocationReservation = ko.observable();
    public memoryAllocationLimit = ko.observable();
    public memoryAllocationShares = ko.observable();
    public powerOnBootDelay = ko.observable();
    public virtualDiskCount = ko.observable();
    public accelerationEnabled = ko.observable();
    public loggingEnabled = ko.observable();
    public debuggingEnabled = ko.observable();
    public syncTimeWithHost = ko.observable();
    public activeTasks = ko.observable();
    public disabledMethods = ko.observable();
    public companyId = ko.observable();
  }
  export class VirtualMachineProperties{
    public static name() { return "Name"; }
    public static operatingSystem() { return "OperatingSystem"; }
    public static cpuCount() { return "CpuCount"; }
    public static powerState() { return "PowerState"; }
    public static toolsStatus() { return "ToolsStatus"; }
    public static host() { return "Host"; }
    public static instanceUuid() { return "InstanceUuid"; }
    public static memorySize() { return "MemorySize"; }
    public static changeTrackingEnabled() { return "ChangeTrackingEnabled"; }
    public static uuid() { return "Uuid"; }
    public static cpuAllocationLevel() { return "CpuAllocationLevel"; }
    public static cpuAllocationReservation() { return "CpuAllocationReservation"; }
    public static cpuAllocationLimit() { return "CpuAllocationLimit"; }
    public static memoryAllocationLevel() { return "MemoryAllocationLevel"; }
    public static memoryAllocationReservation() { return "MemoryAllocationReservation"; }
    public static memoryAllocationLimit() { return "MemoryAllocationLimit"; }
    public static memoryAllocationShares() { return "MemoryAllocationShares"; }
    public static powerOnBootDelay() { return "PowerOnBootDelay"; }
    public static virtualDiskCount() { return "VirtualDiskCount"; }
    public static accelerationEnabled() { return "AccelerationEnabled"; }
    public static loggingEnabled() { return "LoggingEnabled"; }
    public static debuggingEnabled() { return "DebuggingEnabled"; }
    public static syncTimeWithHost() { return "SyncTimeWithHost"; }
    public static activeTasks() { return "ActiveTasks"; }
    public static disabledMethods() { return "DisabledMethods"; }
    public static companyId() { return "CompanyId"; }
  }
  export class HostSystemViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
    public name = ko.observable();
    public virtualMachines = ko.observable();
    public productName = ko.observable();
    public productVersion = ko.observable();
    public isInMaintenanceMode = ko.observable();
    public cpuCores = ko.observable();
    public memorySize = ko.observable();
    public cpuSpeed = ko.observable();
    public manufacturer = ko.observable();
    public model = ko.observable();
    public licenseName = ko.observable();
    public licenseType = ko.observable();
    public licenseExpireDate = ko.observable();
    public licensedSockets = ko.observable();
    public primaryServerIpAddress = ko.observable();
    public alternativeServerIpAddress = ko.observable();
    public defaultGateway = ko.observable();
    public ipv6Enabled = ko.observable();
    public autoDnsEnabled = ko.observable();
    public timezone = ko.observable();
    public ntpServer = ko.observable();
    public cpuAllocationLevel = ko.observable();
    public cpuAllocationReservation = ko.observable();
    public cpuAllocationLimit = ko.observable();
    public memoryAllocationLevel = ko.observable();
    public memoryAllocationShares = ko.observable();
    public memoryAllocationReservation = ko.observable();
    public memoryAllocationLimit = ko.observable();
    public subnet = ko.observable();
    public usesDhcp = ko.observable();
    public vMotionEnabled = ko.observable();
    public faultToleranceEnabled = ko.observable();
    public screenshotsSupported = ko.observable();
    public activeTasks = ko.observable();
    public disabledMethods = ko.observable();
    public companyId = ko.observable();
  }
  export class HostSystemProperties{
    public static name() { return "Name"; }
    public static virtualMachines() { return "VirtualMachines"; }
    public static productName() { return "ProductName"; }
    public static productVersion() { return "ProductVersion"; }
    public static isInMaintenanceMode() { return "IsInMaintenanceMode"; }
    public static cpuCores() { return "CpuCores"; }
    public static memorySize() { return "MemorySize"; }
    public static cpuSpeed() { return "CpuSpeed"; }
    public static manufacturer() { return "Manufacturer"; }
    public static model() { return "Model"; }
    public static licenseName() { return "LicenseName"; }
    public static licenseType() { return "LicenseType"; }
    public static licenseExpireDate() { return "LicenseExpireDate"; }
    public static licensedSockets() { return "LicensedSockets"; }
    public static primaryServerIpAddress() { return "PrimaryServerIpAddress"; }
    public static alternativeServerIpAddress() { return "AlternativeServerIpAddress"; }
    public static defaultGateway() { return "DefaultGateway"; }
    public static ipv6Enabled() { return "Ipv6Enabled"; }
    public static autoDnsEnabled() { return "AutoDnsEnabled"; }
    public static timezone() { return "Timezone"; }
    public static ntpServer() { return "NtpServer"; }
    public static cpuAllocationLevel() { return "CpuAllocationLevel"; }
    public static cpuAllocationReservation() { return "CpuAllocationReservation"; }
    public static cpuAllocationLimit() { return "CpuAllocationLimit"; }
    public static memoryAllocationLevel() { return "MemoryAllocationLevel"; }
    public static memoryAllocationShares() { return "MemoryAllocationShares"; }
    public static memoryAllocationReservation() { return "MemoryAllocationReservation"; }
    public static memoryAllocationLimit() { return "MemoryAllocationLimit"; }
    public static subnet() { return "Subnet"; }
    public static usesDhcp() { return "UsesDhcp"; }
    public static vMotionEnabled() { return "VMotionEnabled"; }
    public static faultToleranceEnabled() { return "FaultToleranceEnabled"; }
    public static screenshotsSupported() { return "ScreenshotsSupported"; }
    public static activeTasks() { return "ActiveTasks"; }
    public static disabledMethods() { return "DisabledMethods"; }
    public static companyId() { return "CompanyId"; }
  }
  export class VimTaskViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
    public name = ko.observable();
    public state = ko.observable();
    public progress = ko.observable();
    public queuedTime = ko.observable();
    public affectedSubject = ko.observable();
    public completedTime = ko.observable();
    public activeTasks = ko.observable();
    public disabledMethods = ko.observable();
    public companyId = ko.observable();
  }
  export class VimTaskProperties{
    public static name() { return "Name"; }
    public static state() { return "State"; }
    public static progress() { return "Progress"; }
    public static queuedTime() { return "QueuedTime"; }
    public static affectedSubject() { return "AffectedSubject"; }
    public static completedTime() { return "CompletedTime"; }
    public static activeTasks() { return "ActiveTasks"; }
    public static disabledMethods() { return "DisabledMethods"; }
    public static companyId() { return "CompanyId"; }
  }
  export class AlarmStateViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
    public alarm = ko.observable();
    public entity = ko.observable();
    public lastTriggeredTime = ko.observable();
    public acknowledgedTime = ko.observable();
    public acknowledgedUser = ko.observable();
    public activeTasks = ko.observable();
    public disabledMethods = ko.observable();
    public companyId = ko.observable();
  }
  export class AlarmStateProperties{
    public static alarm() { return "Alarm"; }
    public static entity() { return "Entity"; }
    public static lastTriggeredTime() { return "LastTriggeredTime"; }
    public static acknowledgedTime() { return "AcknowledgedTime"; }
    public static acknowledgedUser() { return "AcknowledgedUser"; }
    public static activeTasks() { return "ActiveTasks"; }
    public static disabledMethods() { return "DisabledMethods"; }
    public static companyId() { return "CompanyId"; }
  }
  export class AlarmViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
    public description = ko.observable();
    public name = ko.observable();
    public alarmKey = ko.observable();
    public lastModifiedDate = ko.observable();
    public activeTasks = ko.observable();
    public disabledMethods = ko.observable();
    public companyId = ko.observable();
  }
  export class AlarmProperties{
    public static description() { return "Description"; }
    public static name() { return "Name"; }
    public static alarmKey() { return "AlarmKey"; }
    public static lastModifiedDate() { return "LastModifiedDate"; }
    public static activeTasks() { return "ActiveTasks"; }
    public static disabledMethods() { return "DisabledMethods"; }
    public static companyId() { return "CompanyId"; }
  }
  export class VCenterViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
    public primaryServerIpAddress = ko.observable();
    public name = ko.observable();
    public buildDetails = ko.observable();
    public hostCount = ko.observable();
    public vMCount = ko.observable();
    public activeTasks = ko.observable();
    public disabledMethods = ko.observable();
    public companyId = ko.observable();
  }
  export class VCenterProperties{
    public static primaryServerIpAddress() { return "PrimaryServerIpAddress"; }
    public static name() { return "Name"; }
    public static buildDetails() { return "BuildDetails"; }
    public static hostCount() { return "HostCount"; }
    public static vMCount() { return "VMCount"; }
    public static activeTasks() { return "ActiveTasks"; }
    public static disabledMethods() { return "DisabledMethods"; }
    public static companyId() { return "CompanyId"; }
  }
  export class SentinelScopeViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
  }
  export class SentinelScopeProperties{
  }
  export class OpViewModel extends SubjectViewModel{
    constructor(subjectRef: Subjects.SubjectRef, properties?: any){
      super(subjectRef);
      this.applyProperties(properties);
    }
    
  }
  export class OpProperties{
  }
  export interface ViewModelFactoryMethod{
    (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) : SubjectViewModel;
  }
  export class ViewModelFactory{
    static constructors: { [typeName: string]: ViewModelFactoryMethod; } = {
      "vi.vm" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new VirtualMachineViewModel(subjectRef, properties),
      "vi.hs" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new HostSystemViewModel(subjectRef, properties),
      "vi.task" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new VimTaskViewModel(subjectRef, properties),
      "vi.alarmstate" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new AlarmStateViewModel(subjectRef, properties),
      "vi.alarm" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new AlarmViewModel(subjectRef, properties),
      "vi.vc" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new VCenterViewModel(subjectRef, properties),
      "ss" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new SentinelScopeViewModel(subjectRef, properties),
      "op" : (subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new OpViewModel(subjectRef, properties),
    }
    public static create(subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap){
      var factory = ViewModelFactory.constructors[subjectRef["$subjectRefType"]];
      return factory
        ? factory(subjectRef, properties)
        : new SubjectViewModel(subjectRef, properties);
    }
    public static setVirtualMachineFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["vi.vm"] = method;
    }
    public static setHostSystemFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["vi.hs"] = method;
    }
    public static setVimTaskFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["vi.task"] = method;
    }
    public static setAlarmStateFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["vi.alarmstate"] = method;
    }
    public static setAlarmFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["vi.alarm"] = method;
    }
    public static setVCenterFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["vi.vc"] = method;
    }
    public static setSentinelScopeFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["ss"] = method;
    }
    public static setOpFactory(method: ViewModelFactoryMethod){
      ViewModelFactory.constructors["op"] = method;
    }
  }
}


module go.ActiveManagement.Messages{
  export interface SubjectChangedEvent{
    changeReason : string;
    affectedSubject : Subjects.SubjectRef;
    changedProperties : PropertyDelta[];
    associatedViews : AssociatedView[];
  }
  
  export interface PropertyDelta{
    path : string;
    reason : string;
    value : any;
  }
  
  export interface SubjectsChangedEvent{
    subjectChanges : SubjectChangedEvent[];
    isRefresh : bool;
  }
  
  export interface AssociatedView{
    memberStatus : string;
    viewKey : string;
  }
  
  export class ViewMemberStatus{
    public static Entered(){
      return "Entered";
    }
    public static Abode(){
      return "Abode";
    }
    public static Left(){
      return "Left";
    }
  }
  export class PropertyDeltaReason{
    public static Added(){
      return "Added";
    }
    public static Removed(){
      return "Removed";
    }
    public static Assigned(){
      return "Assigned";
    }
    public static RemovedIndirectly(){
      return "RemovedIndirectly";
    }
    public static Missing(){
      return "Missing";
    }
  }
  export class SubjectDeltaReason{
    public static Missing(){
      return "Missing";
    }
    public static Entered(){
      return "Entered";
    }
    public static Left(){
      return "Left";
    }
    public static Changed(){
      return "Changed";
    }
  }
  export interface ViewRequest{
    viewKey : string;
    properties : string[];
  }
  
}
