var go;
(function (go) {
    (function (kg) {
        var SelectableState = (function () {
            function SelectableState(id, cssClass) {
                this.id = id;
                this.cssClass = cssClass;
            }
            return SelectableState;
        })();
        kg.SelectableState = SelectableState;        
        var SelectableStates = (function () {
            function SelectableStates() { }
            SelectableStates.SELECTED = new go.kg.SelectableState(0, "check");
            SelectableStates.UNSELECTED = new go.kg.SelectableState(1, "no-check");
            SelectableStates.DISABLED = new go.kg.SelectableState(2, "disabled");
            SelectableStates.PARTIAL = new go.kg.SelectableState(3, "partial-check");
            return SelectableStates;
        })();
        kg.SelectableStates = SelectableStates;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var GridItem = (function () {
            function GridItem() {
                this.fieldsAsString = "";
            }
            GridItem.prototype.toJSON = function () {
                delete this.fieldsAsString;
                return this;
            };
            return GridItem;
        })();
        kg.GridItem = GridItem;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var go;
(function (go) {
    (function (kg) {
        var SelectableItem = (function (_super) {
            __extends(SelectableItem, _super);
            function SelectableItem() {
                        _super.call(this);
                this.selectState = ko.observable(go.kg.SelectableStates.UNSELECTED);
                this.selectClass = ko.computed(function () {
                    return "kogrid-checkbox " + this.selectState().cssClass;
                }, this);
            }
            SelectableItem.prototype.selectClick = function () {
                if(this.selectState() !== go.kg.SelectableStates.DISABLED) {
                    if(this.selectState() === go.kg.SelectableStates.UNSELECTED) {
                        this.selectState(go.kg.SelectableStates.SELECTED);
                    } else {
                        this.selectState(go.kg.SelectableStates.UNSELECTED);
                    }
                }
            };
            SelectableItem.prototype.isSelected = function () {
                return this.selectState() === go.kg.SelectableStates.SELECTED;
            };
            SelectableItem.prototype.toJSON = function () {
                delete this.selectState;
                delete this.selectClass;
                return this;
            };
            return SelectableItem;
        })(go.kg.GridItem);
        kg.SelectableItem = SelectableItem;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (Subjects) {
        var SubjectViewModel = (function (_super) {
            __extends(SubjectViewModel, _super);
            function SubjectViewModel(subjectRef, properties) {
                        _super.call(this);
                this.subjectRef = subjectRef;
                this.lastChangeDate = ko.observable();
                this.applyProperties(properties);
            }
            SubjectViewModel.isSubjectRef = function isSubjectRef(candidate) {
                return typeof candidate === 'object' && ("$subjectRefType" in candidate);
            }
            SubjectViewModel.prototype.getKey = function () {
                return this.subjectRef.key;
            };
            SubjectViewModel.prototype.applyProperties = function (properties) {
                if(properties) {
                    for(var path in properties) {
                        this.applyPropertyChange(path, properties[path]);
                    }
                }
            };
            SubjectViewModel.prototype.applyPropertyChange = function (path, value) {
                var currentItem = this;
                var paths = path.split(".");
                while(paths.length > 1) {
                    var property = SubjectViewModel.toJsCase(paths.shift());
                    var childItem = currentItem[property] || {
                    };
                    currentItem[property] = childItem;
                    currentItem = childItem;
                }
                var finalProperty = SubjectViewModel.toJsCase(paths[0]);
                if(currentItem[finalProperty]) {
                    try  {
                        currentItem[finalProperty](value);
                    } catch (e) {
                        console.log("Binding error writing property '" + finalProperty + "' of subject '" + this.getKey() + "': " + e.message);
                    }
                } else {
                    console.log("Update error writing property '" + finalProperty + "' of subject '" + this.getKey() + "': property is not defined");
                }
                return true;
            };
            SubjectViewModel.toJsCase = function toJsCase(name) {
                return name.charAt(0).toLowerCase() + name.substr(1);
            }
            return SubjectViewModel;
        })(go.kg.SelectableItem);
        Subjects.SubjectViewModel = SubjectViewModel;        
    })(go.Subjects || (go.Subjects = {}));
    var Subjects = go.Subjects;
})(go || (go = {}));
var go;
(function (go) {
    (function (Subjects) {
        var VirtualMachineViewModel = (function (_super) {
            __extends(VirtualMachineViewModel, _super);
            function VirtualMachineViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.name = ko.observable();
                this.operatingSystem = ko.observable();
                this.cpuCount = ko.observable();
                this.powerState = ko.observable();
                this.toolsStatus = ko.observable();
                this.host = ko.observable();
                this.instanceUuid = ko.observable();
                this.memorySize = ko.observable();
                this.changeTrackingEnabled = ko.observable();
                this.uuid = ko.observable();
                this.cpuAllocationLevel = ko.observable();
                this.cpuAllocationReservation = ko.observable();
                this.cpuAllocationLimit = ko.observable();
                this.memoryAllocationLevel = ko.observable();
                this.memoryAllocationReservation = ko.observable();
                this.memoryAllocationLimit = ko.observable();
                this.memoryAllocationShares = ko.observable();
                this.powerOnBootDelay = ko.observable();
                this.virtualDiskCount = ko.observable();
                this.accelerationEnabled = ko.observable();
                this.loggingEnabled = ko.observable();
                this.debuggingEnabled = ko.observable();
                this.syncTimeWithHost = ko.observable();
                this.activeTasks = ko.observable();
                this.disabledMethods = ko.observable();
                this.companyId = ko.observable();
                this.applyProperties(properties);
            }
            return VirtualMachineViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.VirtualMachineViewModel = VirtualMachineViewModel;        
        var VirtualMachineProperties = (function () {
            function VirtualMachineProperties() { }
            VirtualMachineProperties.name = function name() {
                return "Name";
            }
            VirtualMachineProperties.operatingSystem = function operatingSystem() {
                return "OperatingSystem";
            }
            VirtualMachineProperties.cpuCount = function cpuCount() {
                return "CpuCount";
            }
            VirtualMachineProperties.powerState = function powerState() {
                return "PowerState";
            }
            VirtualMachineProperties.toolsStatus = function toolsStatus() {
                return "ToolsStatus";
            }
            VirtualMachineProperties.host = function host() {
                return "Host";
            }
            VirtualMachineProperties.instanceUuid = function instanceUuid() {
                return "InstanceUuid";
            }
            VirtualMachineProperties.memorySize = function memorySize() {
                return "MemorySize";
            }
            VirtualMachineProperties.changeTrackingEnabled = function changeTrackingEnabled() {
                return "ChangeTrackingEnabled";
            }
            VirtualMachineProperties.uuid = function uuid() {
                return "Uuid";
            }
            VirtualMachineProperties.cpuAllocationLevel = function cpuAllocationLevel() {
                return "CpuAllocationLevel";
            }
            VirtualMachineProperties.cpuAllocationReservation = function cpuAllocationReservation() {
                return "CpuAllocationReservation";
            }
            VirtualMachineProperties.cpuAllocationLimit = function cpuAllocationLimit() {
                return "CpuAllocationLimit";
            }
            VirtualMachineProperties.memoryAllocationLevel = function memoryAllocationLevel() {
                return "MemoryAllocationLevel";
            }
            VirtualMachineProperties.memoryAllocationReservation = function memoryAllocationReservation() {
                return "MemoryAllocationReservation";
            }
            VirtualMachineProperties.memoryAllocationLimit = function memoryAllocationLimit() {
                return "MemoryAllocationLimit";
            }
            VirtualMachineProperties.memoryAllocationShares = function memoryAllocationShares() {
                return "MemoryAllocationShares";
            }
            VirtualMachineProperties.powerOnBootDelay = function powerOnBootDelay() {
                return "PowerOnBootDelay";
            }
            VirtualMachineProperties.virtualDiskCount = function virtualDiskCount() {
                return "VirtualDiskCount";
            }
            VirtualMachineProperties.accelerationEnabled = function accelerationEnabled() {
                return "AccelerationEnabled";
            }
            VirtualMachineProperties.loggingEnabled = function loggingEnabled() {
                return "LoggingEnabled";
            }
            VirtualMachineProperties.debuggingEnabled = function debuggingEnabled() {
                return "DebuggingEnabled";
            }
            VirtualMachineProperties.syncTimeWithHost = function syncTimeWithHost() {
                return "SyncTimeWithHost";
            }
            VirtualMachineProperties.activeTasks = function activeTasks() {
                return "ActiveTasks";
            }
            VirtualMachineProperties.disabledMethods = function disabledMethods() {
                return "DisabledMethods";
            }
            VirtualMachineProperties.companyId = function companyId() {
                return "CompanyId";
            }
            return VirtualMachineProperties;
        })();
        Subjects.VirtualMachineProperties = VirtualMachineProperties;        
        var HostSystemViewModel = (function (_super) {
            __extends(HostSystemViewModel, _super);
            function HostSystemViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.name = ko.observable();
                this.virtualMachines = ko.observable();
                this.productName = ko.observable();
                this.productVersion = ko.observable();
                this.isInMaintenanceMode = ko.observable();
                this.cpuCores = ko.observable();
                this.memorySize = ko.observable();
                this.cpuSpeed = ko.observable();
                this.manufacturer = ko.observable();
                this.model = ko.observable();
                this.licenseName = ko.observable();
                this.licenseType = ko.observable();
                this.licenseExpireDate = ko.observable();
                this.licensedSockets = ko.observable();
                this.primaryServerIpAddress = ko.observable();
                this.alternativeServerIpAddress = ko.observable();
                this.defaultGateway = ko.observable();
                this.ipv6Enabled = ko.observable();
                this.autoDnsEnabled = ko.observable();
                this.timezone = ko.observable();
                this.ntpServer = ko.observable();
                this.cpuAllocationLevel = ko.observable();
                this.cpuAllocationReservation = ko.observable();
                this.cpuAllocationLimit = ko.observable();
                this.memoryAllocationLevel = ko.observable();
                this.memoryAllocationShares = ko.observable();
                this.memoryAllocationReservation = ko.observable();
                this.memoryAllocationLimit = ko.observable();
                this.subnet = ko.observable();
                this.usesDhcp = ko.observable();
                this.vMotionEnabled = ko.observable();
                this.faultToleranceEnabled = ko.observable();
                this.screenshotsSupported = ko.observable();
                this.activeTasks = ko.observable();
                this.disabledMethods = ko.observable();
                this.companyId = ko.observable();
                this.applyProperties(properties);
            }
            return HostSystemViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.HostSystemViewModel = HostSystemViewModel;        
        var HostSystemProperties = (function () {
            function HostSystemProperties() { }
            HostSystemProperties.name = function name() {
                return "Name";
            }
            HostSystemProperties.virtualMachines = function virtualMachines() {
                return "VirtualMachines";
            }
            HostSystemProperties.productName = function productName() {
                return "ProductName";
            }
            HostSystemProperties.productVersion = function productVersion() {
                return "ProductVersion";
            }
            HostSystemProperties.isInMaintenanceMode = function isInMaintenanceMode() {
                return "IsInMaintenanceMode";
            }
            HostSystemProperties.cpuCores = function cpuCores() {
                return "CpuCores";
            }
            HostSystemProperties.memorySize = function memorySize() {
                return "MemorySize";
            }
            HostSystemProperties.cpuSpeed = function cpuSpeed() {
                return "CpuSpeed";
            }
            HostSystemProperties.manufacturer = function manufacturer() {
                return "Manufacturer";
            }
            HostSystemProperties.model = function model() {
                return "Model";
            }
            HostSystemProperties.licenseName = function licenseName() {
                return "LicenseName";
            }
            HostSystemProperties.licenseType = function licenseType() {
                return "LicenseType";
            }
            HostSystemProperties.licenseExpireDate = function licenseExpireDate() {
                return "LicenseExpireDate";
            }
            HostSystemProperties.licensedSockets = function licensedSockets() {
                return "LicensedSockets";
            }
            HostSystemProperties.primaryServerIpAddress = function primaryServerIpAddress() {
                return "PrimaryServerIpAddress";
            }
            HostSystemProperties.alternativeServerIpAddress = function alternativeServerIpAddress() {
                return "AlternativeServerIpAddress";
            }
            HostSystemProperties.defaultGateway = function defaultGateway() {
                return "DefaultGateway";
            }
            HostSystemProperties.ipv6Enabled = function ipv6Enabled() {
                return "Ipv6Enabled";
            }
            HostSystemProperties.autoDnsEnabled = function autoDnsEnabled() {
                return "AutoDnsEnabled";
            }
            HostSystemProperties.timezone = function timezone() {
                return "Timezone";
            }
            HostSystemProperties.ntpServer = function ntpServer() {
                return "NtpServer";
            }
            HostSystemProperties.cpuAllocationLevel = function cpuAllocationLevel() {
                return "CpuAllocationLevel";
            }
            HostSystemProperties.cpuAllocationReservation = function cpuAllocationReservation() {
                return "CpuAllocationReservation";
            }
            HostSystemProperties.cpuAllocationLimit = function cpuAllocationLimit() {
                return "CpuAllocationLimit";
            }
            HostSystemProperties.memoryAllocationLevel = function memoryAllocationLevel() {
                return "MemoryAllocationLevel";
            }
            HostSystemProperties.memoryAllocationShares = function memoryAllocationShares() {
                return "MemoryAllocationShares";
            }
            HostSystemProperties.memoryAllocationReservation = function memoryAllocationReservation() {
                return "MemoryAllocationReservation";
            }
            HostSystemProperties.memoryAllocationLimit = function memoryAllocationLimit() {
                return "MemoryAllocationLimit";
            }
            HostSystemProperties.subnet = function subnet() {
                return "Subnet";
            }
            HostSystemProperties.usesDhcp = function usesDhcp() {
                return "UsesDhcp";
            }
            HostSystemProperties.vMotionEnabled = function vMotionEnabled() {
                return "VMotionEnabled";
            }
            HostSystemProperties.faultToleranceEnabled = function faultToleranceEnabled() {
                return "FaultToleranceEnabled";
            }
            HostSystemProperties.screenshotsSupported = function screenshotsSupported() {
                return "ScreenshotsSupported";
            }
            HostSystemProperties.activeTasks = function activeTasks() {
                return "ActiveTasks";
            }
            HostSystemProperties.disabledMethods = function disabledMethods() {
                return "DisabledMethods";
            }
            HostSystemProperties.companyId = function companyId() {
                return "CompanyId";
            }
            return HostSystemProperties;
        })();
        Subjects.HostSystemProperties = HostSystemProperties;        
        var VimTaskViewModel = (function (_super) {
            __extends(VimTaskViewModel, _super);
            function VimTaskViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.name = ko.observable();
                this.state = ko.observable();
                this.progress = ko.observable();
                this.queuedTime = ko.observable();
                this.affectedSubject = ko.observable();
                this.completedTime = ko.observable();
                this.activeTasks = ko.observable();
                this.disabledMethods = ko.observable();
                this.companyId = ko.observable();
                this.applyProperties(properties);
            }
            return VimTaskViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.VimTaskViewModel = VimTaskViewModel;        
        var VimTaskProperties = (function () {
            function VimTaskProperties() { }
            VimTaskProperties.name = function name() {
                return "Name";
            }
            VimTaskProperties.state = function state() {
                return "State";
            }
            VimTaskProperties.progress = function progress() {
                return "Progress";
            }
            VimTaskProperties.queuedTime = function queuedTime() {
                return "QueuedTime";
            }
            VimTaskProperties.affectedSubject = function affectedSubject() {
                return "AffectedSubject";
            }
            VimTaskProperties.completedTime = function completedTime() {
                return "CompletedTime";
            }
            VimTaskProperties.activeTasks = function activeTasks() {
                return "ActiveTasks";
            }
            VimTaskProperties.disabledMethods = function disabledMethods() {
                return "DisabledMethods";
            }
            VimTaskProperties.companyId = function companyId() {
                return "CompanyId";
            }
            return VimTaskProperties;
        })();
        Subjects.VimTaskProperties = VimTaskProperties;        
        var AlarmStateViewModel = (function (_super) {
            __extends(AlarmStateViewModel, _super);
            function AlarmStateViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.alarm = ko.observable();
                this.entity = ko.observable();
                this.lastTriggeredTime = ko.observable();
                this.acknowledgedTime = ko.observable();
                this.acknowledgedUser = ko.observable();
                this.activeTasks = ko.observable();
                this.disabledMethods = ko.observable();
                this.companyId = ko.observable();
                this.applyProperties(properties);
            }
            return AlarmStateViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.AlarmStateViewModel = AlarmStateViewModel;        
        var AlarmStateProperties = (function () {
            function AlarmStateProperties() { }
            AlarmStateProperties.alarm = function alarm() {
                return "Alarm";
            }
            AlarmStateProperties.entity = function entity() {
                return "Entity";
            }
            AlarmStateProperties.lastTriggeredTime = function lastTriggeredTime() {
                return "LastTriggeredTime";
            }
            AlarmStateProperties.acknowledgedTime = function acknowledgedTime() {
                return "AcknowledgedTime";
            }
            AlarmStateProperties.acknowledgedUser = function acknowledgedUser() {
                return "AcknowledgedUser";
            }
            AlarmStateProperties.activeTasks = function activeTasks() {
                return "ActiveTasks";
            }
            AlarmStateProperties.disabledMethods = function disabledMethods() {
                return "DisabledMethods";
            }
            AlarmStateProperties.companyId = function companyId() {
                return "CompanyId";
            }
            return AlarmStateProperties;
        })();
        Subjects.AlarmStateProperties = AlarmStateProperties;        
        var AlarmViewModel = (function (_super) {
            __extends(AlarmViewModel, _super);
            function AlarmViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.description = ko.observable();
                this.name = ko.observable();
                this.alarmKey = ko.observable();
                this.lastModifiedDate = ko.observable();
                this.activeTasks = ko.observable();
                this.disabledMethods = ko.observable();
                this.companyId = ko.observable();
                this.applyProperties(properties);
            }
            return AlarmViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.AlarmViewModel = AlarmViewModel;        
        var AlarmProperties = (function () {
            function AlarmProperties() { }
            AlarmProperties.description = function description() {
                return "Description";
            }
            AlarmProperties.name = function name() {
                return "Name";
            }
            AlarmProperties.alarmKey = function alarmKey() {
                return "AlarmKey";
            }
            AlarmProperties.lastModifiedDate = function lastModifiedDate() {
                return "LastModifiedDate";
            }
            AlarmProperties.activeTasks = function activeTasks() {
                return "ActiveTasks";
            }
            AlarmProperties.disabledMethods = function disabledMethods() {
                return "DisabledMethods";
            }
            AlarmProperties.companyId = function companyId() {
                return "CompanyId";
            }
            return AlarmProperties;
        })();
        Subjects.AlarmProperties = AlarmProperties;        
        var VCenterViewModel = (function (_super) {
            __extends(VCenterViewModel, _super);
            function VCenterViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.primaryServerIpAddress = ko.observable();
                this.name = ko.observable();
                this.buildDetails = ko.observable();
                this.hostCount = ko.observable();
                this.vMCount = ko.observable();
                this.activeTasks = ko.observable();
                this.disabledMethods = ko.observable();
                this.companyId = ko.observable();
                this.applyProperties(properties);
            }
            return VCenterViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.VCenterViewModel = VCenterViewModel;        
        var VCenterProperties = (function () {
            function VCenterProperties() { }
            VCenterProperties.primaryServerIpAddress = function primaryServerIpAddress() {
                return "PrimaryServerIpAddress";
            }
            VCenterProperties.name = function name() {
                return "Name";
            }
            VCenterProperties.buildDetails = function buildDetails() {
                return "BuildDetails";
            }
            VCenterProperties.hostCount = function hostCount() {
                return "HostCount";
            }
            VCenterProperties.vMCount = function vMCount() {
                return "VMCount";
            }
            VCenterProperties.activeTasks = function activeTasks() {
                return "ActiveTasks";
            }
            VCenterProperties.disabledMethods = function disabledMethods() {
                return "DisabledMethods";
            }
            VCenterProperties.companyId = function companyId() {
                return "CompanyId";
            }
            return VCenterProperties;
        })();
        Subjects.VCenterProperties = VCenterProperties;        
        var SentinelScopeViewModel = (function (_super) {
            __extends(SentinelScopeViewModel, _super);
            function SentinelScopeViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.applyProperties(properties);
            }
            return SentinelScopeViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.SentinelScopeViewModel = SentinelScopeViewModel;        
        var SentinelScopeProperties = (function () {
            function SentinelScopeProperties() { }
            return SentinelScopeProperties;
        })();
        Subjects.SentinelScopeProperties = SentinelScopeProperties;        
        var OpViewModel = (function (_super) {
            __extends(OpViewModel, _super);
            function OpViewModel(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.applyProperties(properties);
            }
            return OpViewModel;
        })(Subjects.SubjectViewModel);
        Subjects.OpViewModel = OpViewModel;        
        var OpProperties = (function () {
            function OpProperties() { }
            return OpProperties;
        })();
        Subjects.OpProperties = OpProperties;        
        var ViewModelFactory = (function () {
            function ViewModelFactory() { }
            ViewModelFactory.constructors = {
                "vi.vm": function (subjectRef, properties) {
                    return new VirtualMachineViewModel(subjectRef, properties);
                },
                "vi.hs": function (subjectRef, properties) {
                    return new HostSystemViewModel(subjectRef, properties);
                },
                "vi.task": function (subjectRef, properties) {
                    return new VimTaskViewModel(subjectRef, properties);
                },
                "vi.alarmstate": function (subjectRef, properties) {
                    return new AlarmStateViewModel(subjectRef, properties);
                },
                "vi.alarm": function (subjectRef, properties) {
                    return new AlarmViewModel(subjectRef, properties);
                },
                "vi.vc": function (subjectRef, properties) {
                    return new VCenterViewModel(subjectRef, properties);
                },
                "ss": function (subjectRef, properties) {
                    return new SentinelScopeViewModel(subjectRef, properties);
                },
                "op": function (subjectRef, properties) {
                    return new OpViewModel(subjectRef, properties);
                }
            };
            ViewModelFactory.create = function create(subjectRef, properties) {
                var factory = ViewModelFactory.constructors[subjectRef["$subjectRefType"]];
                return factory ? factory(subjectRef, properties) : new Subjects.SubjectViewModel(subjectRef, properties);
            }
            ViewModelFactory.setVirtualMachineFactory = function setVirtualMachineFactory(method) {
                ViewModelFactory.constructors["vi.vm"] = method;
            }
            ViewModelFactory.setHostSystemFactory = function setHostSystemFactory(method) {
                ViewModelFactory.constructors["vi.hs"] = method;
            }
            ViewModelFactory.setVimTaskFactory = function setVimTaskFactory(method) {
                ViewModelFactory.constructors["vi.task"] = method;
            }
            ViewModelFactory.setAlarmStateFactory = function setAlarmStateFactory(method) {
                ViewModelFactory.constructors["vi.alarmstate"] = method;
            }
            ViewModelFactory.setAlarmFactory = function setAlarmFactory(method) {
                ViewModelFactory.constructors["vi.alarm"] = method;
            }
            ViewModelFactory.setVCenterFactory = function setVCenterFactory(method) {
                ViewModelFactory.constructors["vi.vc"] = method;
            }
            ViewModelFactory.setSentinelScopeFactory = function setSentinelScopeFactory(method) {
                ViewModelFactory.constructors["ss"] = method;
            }
            ViewModelFactory.setOpFactory = function setOpFactory(method) {
                ViewModelFactory.constructors["op"] = method;
            }
            return ViewModelFactory;
        })();
        Subjects.ViewModelFactory = ViewModelFactory;        
    })(go.Subjects || (go.Subjects = {}));
    var Subjects = go.Subjects;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        (function (Messages) {
            var ViewMemberStatus = (function () {
                function ViewMemberStatus() { }
                ViewMemberStatus.Entered = function Entered() {
                    return "Entered";
                }
                ViewMemberStatus.Abode = function Abode() {
                    return "Abode";
                }
                ViewMemberStatus.Left = function Left() {
                    return "Left";
                }
                return ViewMemberStatus;
            })();
            Messages.ViewMemberStatus = ViewMemberStatus;            
            var PropertyDeltaReason = (function () {
                function PropertyDeltaReason() { }
                PropertyDeltaReason.Added = function Added() {
                    return "Added";
                }
                PropertyDeltaReason.Removed = function Removed() {
                    return "Removed";
                }
                PropertyDeltaReason.Assigned = function Assigned() {
                    return "Assigned";
                }
                PropertyDeltaReason.RemovedIndirectly = function RemovedIndirectly() {
                    return "RemovedIndirectly";
                }
                PropertyDeltaReason.Missing = function Missing() {
                    return "Missing";
                }
                return PropertyDeltaReason;
            })();
            Messages.PropertyDeltaReason = PropertyDeltaReason;            
            var SubjectDeltaReason = (function () {
                function SubjectDeltaReason() { }
                SubjectDeltaReason.Missing = function Missing() {
                    return "Missing";
                }
                SubjectDeltaReason.Entered = function Entered() {
                    return "Entered";
                }
                SubjectDeltaReason.Left = function Left() {
                    return "Left";
                }
                SubjectDeltaReason.Changed = function Changed() {
                    return "Changed";
                }
                return SubjectDeltaReason;
            })();
            Messages.SubjectDeltaReason = SubjectDeltaReason;            
        })(ActiveManagement.Messages || (ActiveManagement.Messages = {}));
        var Messages = ActiveManagement.Messages;
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (Hypervisor) {
            var HypervisorModel = (function (_super) {
                __extends(HypervisorModel, _super);
                function HypervisorModel(subjectRef, properties) {
                    var _this = this;
                                _super.call(this, subjectRef);
                    this.applyProperties(properties);
                    this.detailPageUrl = ko.computed(function () {
                        return "/vSphere/Hypervisor/Manage/?key=" + _this.getKey();
                    });
                }
                return HypervisorModel;
            })(go.Subjects.HostSystemViewModel);
            Hypervisor.HypervisorModel = HypervisorModel;            
        })(Virtualization.Hypervisor || (Virtualization.Hypervisor = {}));
        var Hypervisor = Virtualization.Hypervisor;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VCenter) {
            var VCenterModel = (function (_super) {
                __extends(VCenterModel, _super);
                function VCenterModel(subjectRef, properties) {
                    var _this = this;
                                _super.call(this, subjectRef);
                    this.applyProperties(properties);
                    this.detailPageUrl = ko.computed(function () {
                        return "/vSphere/VCenter/Manage/?key=" + _this.getKey();
                    });
                }
                return VCenterModel;
            })(go.Subjects.VCenterViewModel);
            VCenter.VCenterModel = VCenterModel;            
        })(Virtualization.VCenter || (Virtualization.VCenter = {}));
        var VCenter = Virtualization.VCenter;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        (function (ViewStatus) {
            ViewStatus._map = [];
            ViewStatus._map[0] = "New";
            ViewStatus.New = 0;
            ViewStatus._map[1] = "Active";
            ViewStatus.Active = 1;
            ViewStatus._map[2] = "Inactive";
            ViewStatus.Inactive = 2;
        })(ActiveManagement.ViewStatus || (ActiveManagement.ViewStatus = {}));
        var ViewStatus = ActiveManagement.ViewStatus;
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var ViewHandle = (function () {
            function ViewHandle(requiredProperties, subjects, status, releaseHandle) {
                this.requiredProperties = requiredProperties;
                this.subjects = subjects;
                this.status = status;
                this.releaseHandle = releaseHandle;
            }
            ViewHandle.prototype.getRequiredProperties = function () {
                return this.requiredProperties;
            };
            ViewHandle.prototype.release = function () {
                this.release = function () {
                };
                this.releaseHandle();
            };
            return ViewHandle;
        })();
        ActiveManagement.ViewHandle = ViewHandle;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var SubjectViewHandle = (function (_super) {
            __extends(SubjectViewHandle, _super);
            function SubjectViewHandle(requiredProperties, subject, status, releaseHandle) {
                        _super.call(this, requiredProperties, ko.observableArray([
            subject
        ]), status, releaseHandle);
                this.requiredProperties = requiredProperties;
                this.subject = subject;
                this.status = status;
                this.releaseHandle = releaseHandle;
            }
            SubjectViewHandle.prototype.getRequiredProperties = function () {
                return this.requiredProperties;
            };
            SubjectViewHandle.prototype.release = function () {
                this.release = function () {
                };
                this.releaseHandle();
            };
            return SubjectViewHandle;
        })(ActiveManagement.ViewHandle);
        ActiveManagement.SubjectViewHandle = SubjectViewHandle;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var ViewRequest = (function () {
            function ViewRequest(viewKey, properties) {
                this.viewKey = viewKey;
                this.properties = properties;
            }
            return ViewRequest;
        })();
        ActiveManagement.ViewRequest = ViewRequest;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var View = (function () {
            function View(viewKey, releaseView, updateSubscription) {
                this.viewKey = viewKey;
                this.releaseView = releaseView;
                this.updateSubscription = updateSubscription;
                this.subjects = ko.observableArray();
                this.status = ko.observable(ActiveManagement.ViewStatus.New);
                this.referenceCount = 0;
                this.requiredProperties = {
                };
            }
            View.prototype.getViewKey = function () {
                return this.viewKey;
            };
            View.prototype.getStatus = function () {
                return this.status();
            };
            View.prototype.setStaticSubjects = function (staticSubjects) {
                this.subjects(staticSubjects);
                this.deactivate(true);
            };
            View.prototype.updateSubjects = function (addSubjects, removeSubjects) {
                var existingSubjects = this.subjects();
                var changed = false;
                if(addSubjects) {
                    $.each(addSubjects, function (_, subject) {
                        var index = existingSubjects.indexOf(subject);
                        if(index < 0) {
                            existingSubjects.push(subject);
                            changed = true;
                        }
                    });
                    this.activate();
                }
                if(removeSubjects) {
                    $.each(removeSubjects || [], function (_, subject) {
                        var index = existingSubjects.indexOf(subject);
                        if(index >= 0) {
                            existingSubjects.splice(index, 1);
                            changed = true;
                        }
                    });
                }
                if(changed) {
                    try  {
                        this.subjects.valueHasMutated();
                    } catch (e) {
                        console.log("Binding error updating view '" + this.viewKey + "': " + e.message);
                    }
                }
            };
            View.prototype.getViewRequest = function () {
                if(this.status() == ActiveManagement.ViewStatus.Inactive) {
                    return null;
                }
                var properties = [];
                for(var property in this.requiredProperties) {
                    if(this.requiredProperties.hasOwnProperty(property)) {
                        properties.push(property);
                    }
                }
                return properties.length == 0 ? null : new ActiveManagement.ViewRequest(this.viewKey, properties);
            };
            View.prototype.hasRequiredProperties = function () {
                for(var k in this.requiredProperties) {
                    if(this.requiredProperties.hasOwnProperty(k)) {
                        return true;
                    }
                }
                return false;
            };
            View.prototype.createHandle = function (requiredProperties) {
                var _this = this;
                var handle = new ActiveManagement.ViewHandle(requiredProperties, this.subjects, this.status, function () {
                    return _this.releaseHandle(handle);
                });
                this.referenceCount++;
                this.applyRequiredProperties(requiredProperties);
                return handle;
            };
            View.prototype.createSubjectHandle = function (requiredProperties, subject) {
                var _this = this;
                var handle = new ActiveManagement.SubjectViewHandle(requiredProperties, subject, this.status, function () {
                    return _this.releaseHandle(handle);
                });
                this.referenceCount++;
                this.applyRequiredProperties(requiredProperties);
                return handle;
            };
            View.prototype.applyRequiredProperties = function (properties) {
                var _this = this;
                var propertiesChanged = false;
                $.each(properties, function (_, property) {
                    var count = _this.requiredProperties[property];
                    if(!count) {
                        _this.requiredProperties[property] = 1;
                        propertiesChanged = true;
                    } else {
                        _this.requiredProperties[property] = count + 1;
                    }
                });
                if(propertiesChanged) {
                    this.updateSubscription();
                }
            };
            View.prototype.releaseHandle = function (handle) {
                this.removeRequiredProperties(handle.getRequiredProperties());
                if(--this.referenceCount == 0) {
                    this.deactivate();
                    this.releaseView();
                    this.releaseView = View.noOp;
                }
            };
            View.prototype.removeRequiredProperties = function (properties) {
                var _this = this;
                var propertiesChanged = false;
                $.each(properties, function (_, property) {
                    var count = _this.requiredProperties[property];
                    if(count) {
                        count--;
                        if(count <= 0) {
                            delete _this.requiredProperties[property];
                            propertiesChanged = true;
                        } else {
                            _this.requiredProperties[property] = count;
                        }
                    }
                });
                if(propertiesChanged) {
                    this.updateSubscription();
                }
            };
            View.prototype.deactivate = function (updateSubscriptions) {
                if (typeof updateSubscriptions === "undefined") { updateSubscriptions = false; }
                this.activate = View.noOp;
                this.deactivate = View.noOp;
                if(updateSubscriptions) {
                    this.updateSubscription();
                }
                this.updateSubscription = View.noOp;
                this.status(ActiveManagement.ViewStatus.Inactive);
            };
            View.prototype.activate = function () {
                this.activate = View.noOp;
                this.status(ActiveManagement.ViewStatus.Active);
            };
            View.noOp = function noOp() {
            }
            return View;
        })();
        ActiveManagement.View = View;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var _ActiveViewManager = (function () {
            function _ActiveViewManager() {
                this.subjects = {
                };
                this.views = {
                };
            }
            _ActiveViewManager.prototype.addStaticView = function (viewKey, staticSubjects) {
                var view = this.views[viewKey];
                if(!view) {
                    view = new ActiveManagement.View(viewKey, function () {
                    }, this.updateSubscriptions);
                    view.setStaticSubjects(staticSubjects);
                    this.views[viewKey] = view;
                } else {
                    view.setStaticSubjects(staticSubjects);
                }
            };
            _ActiveViewManager.prototype.getView = function (viewKey, properties) {
                var _this = this;
                var view = this.views[viewKey];
                if(!view) {
                    view = new ActiveManagement.View(viewKey, function () {
                        return _this.releaseView(view);
                    }, this.updateSubscriptions);
                    this.views[viewKey] = view;
                }
                return view.createHandle(properties);
            };
            _ActiveViewManager.prototype.getSubjectView = function (viewName, subjectRefString, properties) {
                var _this = this;
                var type = subjectRefString.split('-', 2);
                var subject = this.EnsureSubject({
                    $subjectRefType: type[0],
                    key: subjectRefString
                });
                var viewKey = viewName + "|" + subjectRefString;
                var view = this.views[viewKey];
                if(!view) {
                    view = new ActiveManagement.View(viewKey, function () {
                        return _this.releaseView(view);
                    }, this.updateSubscriptions);
                    this.views[viewKey] = view;
                }
                return view.createSubjectHandle(properties, subject);
            };
            _ActiveViewManager.prototype.connect = function (dataSource) {
                var _this = this;
                if(this.dataSource) {
                    this.dataSource.notificationHandler = null;
                    this.dataSource.setViewRequests([]);
                }
                this.dataSource = dataSource;
                if(this.dataSource) {
                    this.dataSource.notificationHandler = function (note) {
                        return _this.onActiveViewNotification(note);
                    };
                    this.updateSubscriptions();
                }
            };
            _ActiveViewManager.prototype.releaseView = function (view) {
                delete this.views[view.getViewKey()];
                this.updateSubscriptions();
            };
            _ActiveViewManager.prototype.updateSubscriptions = function () {
                if(this.dataSource) {
                    var currentRequirements = $.map(this.views, function (view) {
                        return view.getViewRequest();
                    });
                    this.dataSource.setViewRequests(currentRequirements);
                }
            };
            _ActiveViewManager.prototype.onActiveViewNotification = function (notification) {
                this.applyChangeEvents(notification.subjectChanges);
            };
            _ActiveViewManager.prototype.applyChangeEvents = function (changeEvents) {
                var _this = this;
                var changes = $.map(changeEvents, function (event) {
                    return new EventAndSubject(event, _this.subjects[event.affectedSubject.key]);
                });
                $.each(changes, function (_, change) {
                    return _this.updateSubjects(change);
                });
                $.each(changes, function (_, change) {
                    return _this.updateSubjectProperties(change);
                });
                var affectedViews = {
                };
                $.each(changes, function (_, change) {
                    $.each(change.event.associatedViews, function (_, viewChange) {
                        var changeList = affectedViews[viewChange.viewKey];
                        if(!changeList) {
                            changeList = [];
                            affectedViews[viewChange.viewKey] = changeList;
                        }
                        changeList.push(new ViewChangeAndSubject(viewChange, change.subject));
                    });
                });
                $.each(affectedViews, function (key, changes) {
                    return _this.updateView(key, changes);
                });
            };
            _ActiveViewManager.prototype.updateSubjects = function (change) {
                var subjectRef = change.event.affectedSubject;
                var reason = change.event.changeReason;
                var subject = this.subjects[subjectRef.key];
                if(!subject && reason == ActiveManagement.Messages.SubjectDeltaReason.Entered()) {
                    subject = this.EnsureSubject(subjectRef);
                    change.subject = subject;
                    return true;
                } else {
                    if(reason == ActiveManagement.Messages.SubjectDeltaReason.Left() || reason == ActiveManagement.Messages.SubjectDeltaReason.Missing()) {
                        delete this.subjects[subjectRef.key];
                        return true;
                    }
                }
                return false;
            };
            _ActiveViewManager.prototype.updateSubjectProperties = function (change) {
                var _this = this;
                if(change.subject) {
                    $.each(change.event.changedProperties, function (_, propertyChange) {
                        if(propertyChange.reason == ActiveManagement.Messages.PropertyDeltaReason.Assigned()) {
                            var finalValue = propertyChange.value;
                            if(go.Subjects.SubjectViewModel.isSubjectRef(propertyChange.value)) {
                                finalValue = _this.ResolveSubjectRef(propertyChange.value);
                            } else {
                                if($.isArray(propertyChange.value)) {
                                    var array = propertyChange.value;
                                    var finalValue = $.map(array, function (item) {
                                        if(go.Subjects.SubjectViewModel.isSubjectRef(item)) {
                                            return _this.ResolveSubjectRef(item);
                                        }
                                        return item;
                                    });
                                }
                            }
                            change.subject.applyPropertyChange(propertyChange.path, finalValue);
                        }
                    });
                }
            };
            _ActiveViewManager.prototype.ResolveSubjectRef = function (subjectRef) {
                subjectRef.subject = this.EnsureSubject(subjectRef);
                return subjectRef;
            };
            _ActiveViewManager.prototype.EnsureSubject = function (subjectRef) {
                var subject = this.subjects[subjectRef.key];
                if(!subject) {
                    subject = go.Subjects.ViewModelFactory.create(subjectRef) || new go.Subjects.SubjectViewModel(subjectRef);
                    this.subjects[subjectRef.key] = subject;
                }
                return subject;
            };
            _ActiveViewManager.prototype.updateView = function (viewKey, changes) {
                var view = this.views[viewKey];
                var adds = [];
                var removes = [];
                if(view && view.getStatus() != ActiveManagement.ViewStatus.Inactive) {
                    $.each(changes, function (_, change) {
                        switch(change.viewChange.memberStatus) {
                            case ActiveManagement.Messages.ViewMemberStatus.Entered():
                            case ActiveManagement.Messages.ViewMemberStatus.Abode(): {
                                adds.push(change.subject);
                                break;

                            }
                            case ActiveManagement.Messages.ViewMemberStatus.Left(): {
                                removes.push(change.subject);
                                break;

                            }
                        }
                    });
                }
                if(adds.length > 0 || removes.length > 0) {
                    view.updateSubjects(adds, removes);
                }
            };
            return _ActiveViewManager;
        })();
        ActiveManagement._ActiveViewManager = _ActiveViewManager;        
        var EventAndSubject = (function () {
            function EventAndSubject(event, subject) {
                this.event = event;
                this.subject = subject;
            }
            return EventAndSubject;
        })();
        ActiveManagement.EventAndSubject = EventAndSubject;        
        var ViewChangeAndSubject = (function () {
            function ViewChangeAndSubject(viewChange, subject) {
                this.viewChange = viewChange;
                this.subject = subject;
            }
            return ViewChangeAndSubject;
        })();
        ActiveManagement.ViewChangeAndSubject = ViewChangeAndSubject;        
        ActiveManagement.ActiveViewManager = new go.ActiveManagement._ActiveViewManager();
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var ToolsVersionStatus = (function () {
                function ToolsVersionStatus(order, key, cssClass, text, title) {
                    this.order = order;
                    this.key = key;
                    this.cssClass = cssClass;
                    this.text = text;
                    this.title = title;
                }
                return ToolsVersionStatus;
            })();
            VirtualMachine.ToolsVersionStatus = ToolsVersionStatus;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    var IllegalArgumentError = (function () {
        function IllegalArgumentError(message) {
            this.message = message;
        }
        return IllegalArgumentError;
    })();
    go.IllegalArgumentError = IllegalArgumentError;    
})(go || (go = {}));
var go;
(function (go) {
    var Argument = (function () {
        function Argument() { }
        Argument.notNull = function notNull(arg, argName) {
            if(typeof arg === 'undefined' || arg === null) {
                throw new go.IllegalArgumentError("argument '" + argName + "' cannot be null.");
            }
            return true;
        }
        Argument.boolOrTrue = function boolOrTrue(arg) {
            if(typeof arg === 'undefined' || arg === null) {
                return true;
            }
            return !!arg;
        }
        Argument.boolOrFalse = function boolOrFalse(arg) {
            if(typeof arg === 'undefined' || arg === null) {
                return false;
            }
            return !!arg;
        }
        Argument.stringOrEmptyString = function stringOrEmptyString(arg) {
            return go.Argument.stringOrDefault(arg, "");
        }
        Argument.stringOrDefault = function stringOrDefault(arg, stringDefault) {
            if(typeof arg === 'undefined' || arg === null) {
                return stringDefault;
            }
            return arg + '';
        }
        Argument.objectOrDefault = function objectOrDefault(value, defaultValue) {
            return typeof value === "undefined" ? defaultValue : value;
        }
        return Argument;
    })();
    go.Argument = Argument;    
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var Column = (function () {
            function Column(field, template, headerText, isSortable, isExportable) {
                if (typeof headerText === "undefined") { headerText = ""; }
                if (typeof isSortable === "undefined") { isSortable = true; }
                if (typeof isExportable === "undefined") { isExportable = true; }
                this.field = field;
                this.template = template;
                this.headerText = headerText;
                this.isSortable = isSortable;
                this.isExportable = isExportable;
                go.Argument.notNull(field, "field");
                go.Argument.notNull(template, "template");
            }
            Column.prototype.sortASC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal < bVal ? -1 : 1;
            };
            Column.prototype.sortDESC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal < bVal ? 1 : -1;
            };
            return Column;
        })();
        kg.Column = Column;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var ToolsVersionStatusColumn = (function (_super) {
                __extends(ToolsVersionStatusColumn, _super);
                function ToolsVersionStatusColumn() {
                    _super.apply(this, arguments);

                }
                ToolsVersionStatusColumn.prototype.sortASC = function (a, b) {
                    var aToolsStatus = ko.utils.unwrapObservable(a[this.field]);
                    var bToolsStatus = ko.utils.unwrapObservable(b[this.field]);
                    return aToolsStatus.order - bToolsStatus.order;
                };
                ToolsVersionStatusColumn.prototype.sortDESC = function (a, b) {
                    var aToolsStatus = ko.utils.unwrapObservable(a[this.field]);
                    var bToolsStatus = ko.utils.unwrapObservable(b[this.field]);
                    return bToolsStatus.order - aToolsStatus.order;
                };
                return ToolsVersionStatusColumn;
            })(go.kg.Column);
            VirtualMachine.ToolsVersionStatusColumn = ToolsVersionStatusColumn;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var StringColumn = (function (_super) {
            __extends(StringColumn, _super);
            function StringColumn() {
                _super.apply(this, arguments);

            }
            StringColumn.prototype.sortASC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal.toLowerCase().localeCompare(bVal.toLowerCase());
            };
            StringColumn.prototype.sortDESC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return bVal.toLowerCase().localeCompare(aVal.toLowerCase());
            };
            return StringColumn;
        })(go.kg.Column);
        kg.StringColumn = StringColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var PowerState = (function () {
                function PowerState(order, key, displayText, imgUrl) {
                    this.order = order;
                    this.key = key;
                    this.displayText = displayText;
                    this.imgUrl = imgUrl;
                }
                return PowerState;
            })();
            VirtualMachine.PowerState = PowerState;            
            var PowerStates = (function () {
                function PowerStates() { }
                PowerStates.poweredOn = new go.Virtualization.VirtualMachine.PowerState(0, "poweredOn", "Powered On", "/Bundles/Styles/Images/virtual-machine/virtual-machine-poweredon-icon.png");
                PowerStates.poweredOff = new go.Virtualization.VirtualMachine.PowerState(2, "poweredOff", "Powered Off", "/Bundles/Styles/Images/virtual-machine/virtual-machine-poweredoff-icon.png");
                PowerStates.suspended = new go.Virtualization.VirtualMachine.PowerState(1, "suspended", "Suspended", "/Bundles/Styles/Images/virtual-machine/virtual-machine-suspended-icon.png");
                PowerStates.wait = new go.Virtualization.VirtualMachine.PowerState(3, "wait", "Working...", "/Bundles/Styles/Images/virtual-machine/virtual-machine-waiting-icon.png");
                PowerStates.unknown = new go.Virtualization.VirtualMachine.PowerState(4, "unknown", "Unknown", "/Bundles/Styles/Images/virtual-machine/virtual-machine-unknown-icon.png");
                return PowerStates;
            })();
            VirtualMachine.PowerStates = PowerStates;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var PowerStateColumn = (function (_super) {
                __extends(PowerStateColumn, _super);
                function PowerStateColumn() {
                    _super.apply(this, arguments);

                }
                PowerStateColumn.prototype.sortASC = function (a, b) {
                    var aVMState = ko.utils.unwrapObservable(a[this.field]);
                    var bVMState = ko.utils.unwrapObservable(b[this.field]);
                    return aVMState.order - bVMState.order;
                };
                PowerStateColumn.prototype.sortDESC = function (a, b) {
                    var aVMState = ko.utils.unwrapObservable(a[this.field]);
                    var bVMState = ko.utils.unwrapObservable(b[this.field]);
                    return bVMState.order - aVMState.order;
                };
                return PowerStateColumn;
            })(go.kg.Column);
            VirtualMachine.PowerStateColumn = PowerStateColumn;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var ToolsVersionStatusFactory = (function () {
                function ToolsVersionStatusFactory() { }
                ToolsVersionStatusFactory.Map = {
                    guestToolsBlacklisted: new go.Virtualization.VirtualMachine.ToolsVersionStatus(0, "guestToolsBlacklisted", "tools-alert", "Out of Date", ""),
                    guestToolsCurrent: new go.Virtualization.VirtualMachine.ToolsVersionStatus(1, "guestToolsCurrent", "tools-current", "Up to Date", ""),
                    guestToolsNeedUpgrade: new go.Virtualization.VirtualMachine.ToolsVersionStatus(2, "guestToolsNeedUpgrade", "tools-warning", "Out of Date", ""),
                    guestToolsNotInstalled: new go.Virtualization.VirtualMachine.ToolsVersionStatus(3, "guestToolsNotInstalled", "tools-not-installed", "Not Installed", ""),
                    guestToolsSupportedNew: new go.Virtualization.VirtualMachine.ToolsVersionStatus(4, "guestToolsSupportedNew", "tools-current", "Up to Date", ""),
                    guestToolsSupportedOld: new go.Virtualization.VirtualMachine.ToolsVersionStatus(5, "guestToolsSupportedOld", "tools-warning", "Out of Date", ""),
                    guestToolsTooNew: new go.Virtualization.VirtualMachine.ToolsVersionStatus(6, "guestToolsTooNew", "tools-warning", "Too New", ""),
                    guestToolsTooOld: new go.Virtualization.VirtualMachine.ToolsVersionStatus(7, "guestToolsTooOld", "tools-warning", "Out of Date", ""),
                    guestToolsUnmanaged: new go.Virtualization.VirtualMachine.ToolsVersionStatus(8, "guestToolsUnmanaged", "tools-warning", "Unmanaged", ""),
                    unknown: new go.Virtualization.VirtualMachine.ToolsVersionStatus(9, "Unknown", "tools-alert", "Unknown", "")
                };
                ToolsVersionStatusFactory.get = function get(toolsVersionStatus) {
                    toolsVersionStatus = toolsVersionStatus || "unknown";
                    var resolved = go.Virtualization.VirtualMachine.ToolsVersionStatusFactory.Map[toolsVersionStatus];
                    return resolved || go.Virtualization.VirtualMachine.ToolsVersionStatusFactory.Map["unknown"];
                }
                return ToolsVersionStatusFactory;
            })();
            VirtualMachine.ToolsVersionStatusFactory = ToolsVersionStatusFactory;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var PowerStatesFactory = (function () {
                function PowerStatesFactory() { }
                PowerStatesFactory.get = function get(state) {
                    var stateObject = go.Virtualization.VirtualMachine.PowerStates[state];
                    if(!stateObject) {
                        stateObject = go.Virtualization.VirtualMachine.PowerStates.unknown;
                    }
                    return stateObject;
                }
                return PowerStatesFactory;
            })();
            VirtualMachine.PowerStatesFactory = PowerStatesFactory;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    var OS = (function () {
        function OS(pattern, cssClass) {
            this.pattern = pattern;
            this.cssClass = cssClass;
        }
        return OS;
    })();
    go.OS = OS;    
})(go || (go = {}));
var go;
(function (go) {
    var OSFactory = (function () {
        function OSFactory() { }
        OSFactory.Map = [
            new go.OS("DOS", "ms-dos"), 
            new go.OS("Windows", "windows"), 
            new go.OS("Mac OS", "macos"), 
            new go.OS("Red Hat", "redhat"), 
            new go.OS("Solaris", "solaris"), 
            new go.OS("FreeBSD", "freebsd"), 
            new go.OS("CentOS", "centos"), 
            new go.OS("Ubuntu", "ubuntu"), 
            new go.OS("Debian", "debian"), 
            new go.OS("OpenBSD", "openbsd"), 
            new go.OS("Novell", "novell"), 
            new go.OS("Open Enterprise Server", "novell"), 
            new go.OS("Suse", "suse"), 
            new go.OS("Darwin", "darwin"), 
            new go.OS("Linux", "linux"), 
            new go.OS("", "virtualmachine")
        ];
        OSFactory.get = function get(osString) {
            osString = osString || "";
            for(var i = 0; i < go.OSFactory.Map.length; i++) {
                if(osString.toLowerCase().indexOf(go.OSFactory.Map[i].pattern.toLowerCase()) > -1) {
                    return go.OSFactory.Map[i];
                }
            }
        }
        return OSFactory;
    })();
    go.OSFactory = OSFactory;    
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        var VimTask = (function (_super) {
            __extends(VimTask, _super);
            function VimTask(subjectRef, properties) {
                        _super.call(this, subjectRef);
                this.applyProperties(properties);
                this.percentage = ko.computed(function () {
                    return (this.progress() ? this.progress() : 0) + "%";
                }, this);
                this.styleAttr = ko.computed(function () {
                    return "width:" + this.percentage() + ";";
                }, this);
                this.displayName = ko.computed(function () {
                    return (properties || {
                    })["displayName"] || "<unknown>";
                });
                this.target = ko.computed(function () {
                    if(this.affectedSubject() && this.affectedSubject().subject) {
                        return this.affectedSubject().subject.name();
                    }
                    return "Unknown";
                }, this);
                this.targetImageUrl = ko.computed(function () {
                    if(this.affectedSubject() && this.affectedSubject().subject) {
                        var targetImgHtml = '<img src="';
                        if(this.affectedSubject().subject.subjectRef.$subjectRefType === "vi.hs") {
                            targetImgHtml += '/Bundles/Styles/Images/host/host.png';
                        } else {
                            targetImgHtml += '/Bundles/Styles/Images/virtual-machine/virtual-machine.png';
                        }
                        targetImgHtml += '" />';
                        return targetImgHtml;
                    }
                }, this);
            }
            return VimTask;
        })(go.Subjects.VimTaskViewModel);
        Virtualization.VimTask = VimTask;        
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var VirtualMachineModel = (function (_super) {
                __extends(VirtualMachineModel, _super);
                function VirtualMachineModel(subjectRef, properties) {
                    var _this = this;
                                _super.call(this, subjectRef);
                    this.applyProperties(properties);
                    this.state = ko.computed(function () {
                        return go.Virtualization.VirtualMachine.PowerStatesFactory.get(_this.powerState());
                    });
                    this.detailPageUrl = ko.computed(function () {
                        return "/vSphere/VirtualMachine/Manage/?key=" + _this.getKey();
                    });
                    this.os = ko.computed(function () {
                        return go.OSFactory.get(_this.operatingSystem());
                    });
                    this.toolsVersionStatus = ko.computed(function () {
                        return go.Virtualization.VirtualMachine.ToolsVersionStatusFactory.get(_this.toolsStatus());
                    });
                    this.toolsVersionStatusText = ko.computed(function () {
                        return _this.toolsVersionStatus().text;
                    });
                    this.hostName = ko.computed(function () {
                        if(this.host() && this.host().subject.name) {
                            return this.host().subject.name();
                        }
                        return "";
                    }, this);
                }
                VirtualMachineModel.prototype.toJSON = function () {
                    delete this.fieldsAsString;
                    delete this.selectState;
                    delete this.selectClass;
                    delete this.detailPageUrl;
                    delete this.os;
                    delete this.state;
                    return this;
                };
                return VirtualMachineModel;
            })(go.Subjects.VirtualMachineViewModel);
            VirtualMachine.VirtualMachineModel = VirtualMachineModel;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    var NotImplementedError = (function () {
        function NotImplementedError(message) {
            this.message = message;
        }
        return NotImplementedError;
    })();
    go.NotImplementedError = NotImplementedError;    
})(go || (go = {}));
var go;
(function (go) {
    (function (Commands) {
        var Command = (function () {
            function Command(targets, url, filterer) {
                this.targets = targets;
                this.url = url;
                this.filterer = filterer || this.filterer;
            }
            Command.prototype.execute = function () {
                $.ajax({
                    type: "POST",
                    url: this.url,
                    data: $.map(this.filterer(), function (x) {
                        return "subjects=" + x.getKey();
                    }).join("&"),
                    error: go.Global.HandleAjaxFailure
                });
            };
            Command.prototype.canExecute = function () {
                return this.filterer().length > 0;
            };
            Command.prototype.filterer = function () {
                return this.targets();
            };
            return Command;
        })();
        Commands.Command = Command;        
    })(go.Commands || (go.Commands = {}));
    var Commands = go.Commands;
})(go || (go = {}));
var go;
(function (go) {
    (function (Commands) {
        var ConfirmationCommand = (function (_super) {
            __extends(ConfirmationCommand, _super);
            function ConfirmationCommand(targets, url, headerText, contentEvaluator, filterer) {
                        _super.call(this, targets, url, filterer);
                this.headerText = headerText;
                this.content = ko.computed(contentEvaluator, this);
                var defaultExecute = this.execute;
                this.execute = function () {
                    if(this.canExecute()) {
                        go.ui.ShowConfirmationDialog(this.headerText, this.content(), "Ok", "Cancel", defaultExecute.bind(this));
                    }
                };
            }
            return ConfirmationCommand;
        })(go.Commands.Command);
        Commands.ConfirmationCommand = ConfirmationCommand;        
    })(go.Commands || (go.Commands = {}));
    var Commands = go.Commands;
})(go || (go = {}));
var goglobal;
(function (goglobal) {
    var ObjectManager = (function () {
        function ObjectManager() {
            this.objects = {
            };
            this.isDebug = false;
        }
        ObjectManager.prototype.logger = function (message) {
            if(this.isDebug) {
                console.log(message);
            }
        };
        ObjectManager.prototype.register = function (id, object) {
            if(this.objects[id]) {
                this.logger('go.ObjectManager.Register -> "' + id + '" already registered in manager. The value will now be overridden with your new object.');
            } else {
                this.logger('go.ObjectManager.Register -> registering object "' + id + '"');
            }
            this.objects[id] = object;
            return object;
        };
        ObjectManager.prototype.remove = function (id) {
            this.logger('go.ObjectManager.Remove -> un-registering object "' + id + '"');
            if(this.objects[id]) {
                return delete this.objects[id];
            }
            return false;
        };
        ObjectManager.prototype.get = function (id) {
            if(!(id in this.objects)) {
                return null;
            }
            this.logger('go.ObjectManager.Get -> returning object obj for "' + id + '"');
            return this.objects[id];
        };
        ObjectManager.prototype.contains = function (id) {
            var contains = (id in this.objects);
            this.logger('go.ObjectManager.Contains -> id in manager?: ' + contains);
            return contains;
        };
        ObjectManager.prototype.getAllByRegex = function (regexPattern) {
            var matchedKeys = [];
            var matcher = new RegExp(regexPattern);
            for(var key in this.objects) {
                if(matcher.test(key)) {
                    matchedKeys.push(key);
                }
            }
            return matchedKeys;
        };
        ObjectManager.prototype.getSingleByRegex = function (regexPattern) {
            var matchedKeys = this.getAllByRegex(regexPattern);
            if(matchedKeys.length === 1) {
                return this.objects[matchedKeys[0]];
            } else {
                if(matchedKeys.length > 1) {
                    throw new Error('go.ObjectManager.Register -> found multiple matches in manager for regex "' + regexPattern + '". Matching keys: ' + matchedKeys.toString());
                } else {
                    throw new Error('go.ObjectManager.Register -> object NOT found in manager using regex "' + regexPattern + '"');
                }
            }
        };
        return ObjectManager;
    })();
    goglobal.ObjectManager = ObjectManager;    
})(goglobal || (goglobal = {}));
var go;
(function (go) {
    (function (MenuComponent) {
        (function (Manager) {
            Manager.menus = new goglobal.ObjectManager();
            Manager.activeMenuId = null;
            function setActiveMenu(id) {
                Manager.activeMenuId = id;
            }
            Manager.setActiveMenu = setActiveMenu;
            function getActiveMenu() {
                return go.MenuComponent.Manager.activeMenuId;
            }
            Manager.getActiveMenu = getActiveMenu;
            function closeActiveMenu() {
                if(go.MenuComponent.Manager.activeMenuId === null) {
                    return;
                }
                var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
                menu.close();
            }
            Manager.closeActiveMenu = closeActiveMenu;
            function closeCallbackActiveMenu() {
                if(go.MenuComponent.Manager.activeMenuId === null) {
                    return;
                }
                go.Global.PleaseWait({
                    show: false
                });
                var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
                menu.isClosing = false;
                $(menu.menuId()).trigger('menuclosed');
                go.MenuComponent.Manager.clearActiveMenu();
            }
            Manager.closeCallbackActiveMenu = closeCallbackActiveMenu;
            function openCallbackActiveMenu() {
                if(go.MenuComponent.Manager.activeMenuId === null) {
                    return;
                }
                var menu = go.MenuComponent.Manager.menus.get(go.MenuComponent.Manager.activeMenuId);
                menu.isOpening = false;
            }
            Manager.openCallbackActiveMenu = openCallbackActiveMenu;
            function clearActiveMenu() {
                go.MenuComponent.Manager.setActiveMenu(null);
            }
            Manager.clearActiveMenu = clearActiveMenu;
        })(MenuComponent.Manager || (MenuComponent.Manager = {}));
        var Manager = MenuComponent.Manager;
    })(go.MenuComponent || (go.MenuComponent = {}));
    var MenuComponent = go.MenuComponent;
})(go || (go = {}));
var go;
(function (go) {
    (function (MenuComponent) {
        var Item = (function () {
            function Item(onClick, displayText, iconCssClass, tooltip, href, target) {
                this.onClick = onClick;
                this.displayText = displayText;
                this.iconCssClass = iconCssClass;
                this.tooltip = tooltip;
                this.href = href;
                this.target = target;
                if(typeof onClick === 'function') {
                    this.itemClick = function () {
                        onClick();
                        go.MenuComponent.Manager.closeActiveMenu();
                    };
                }
                displayText = displayText || "&nbsp;";
                tooltip = tooltip || "";
                iconCssClass = iconCssClass || "";
                href = href || "javascript:void(0);";
                target = target || "_self";
            }
            return Item;
        })();
        MenuComponent.Item = Item;        
    })(go.MenuComponent || (go.MenuComponent = {}));
    var MenuComponent = go.MenuComponent;
})(go || (go = {}));
var go;
(function (go) {
    (function (MenuComponent) {
        var Group = (function () {
            function Group(id, items, displayText, tooltip, iconCssClass, isLargeIcon, closeActiveMenuCallback) {
                this.id = id;
                this.items = items;
                this.displayText = displayText;
                this.tooltip = tooltip;
                this.iconCssClass = iconCssClass;
                this.isLargeIcon = isLargeIcon;
                this.closeActiveMenuCallback = closeActiveMenuCallback;
                this.isOpening = false;
                this.isClosing = false;
                this.closeActiveMenuClick = go.MenuComponent.Manager.closeActiveMenu;
                if(typeof closeActiveMenuCallback === 'function') {
                    this.closeActiveMenuClick = function () {
                        closeActiveMenuCallback();
                        go.MenuComponent.Manager.closeActiveMenu();
                    };
                }
                tooltip = typeof tooltip === 'undefined' ? "" : tooltip;
                go.MenuComponent.Manager.menus.register(this.id, this);
            }
            Group.prototype.menuClasses = function () {
                return this.iconCssClass ? ((this.isLargeIcon ? "menu-icon20x20" : "menu-icon16x16") + " " + this.iconCssClass) : "";
            };
            Group.prototype.buttonId = function () {
                return this.id + "_buttonId";
            };
            Group.prototype.menuId = function () {
                return this.id + "_menuDiv";
            };
            Group.prototype.open = function () {
                var button = $("#" + this.buttonId());
                var x = button.position().left + 10;
                var y = button.position().top + 24;
                this.openAt(x, y);
            };
            Group.prototype.openAt = function (x, y) {
                go.MenuComponent.Manager.setActiveMenu(this.id);
                if(this.isOpening) {
                    return;
                }
                this.isOpening = true;
                go.Global.PleaseWait({
                    show: true,
                    escalateAfterMilleseconds: -1,
                    cursor: "inherit",
                    onCoverClick: this.closeActiveMenuClick,
                    coverOpacity: 0.08,
                    zIndex: 98
                });
                var div = $("#" + this.menuId());
                div.css("left", x);
                div.css("top", y);
                div.css("z-index", 99);
                div.slideToggle(go.Global.DropDownSpeed, go.MenuComponent.Manager.openCallbackActiveMenu);
            };
            Group.prototype.close = function () {
                if(this.isClosing) {
                    return;
                }
                this.isClosing = true;
                $("#" + this.menuId()).slideToggle(go.Global.DropDownSpeed, go.MenuComponent.Manager.closeCallbackActiveMenu);
            };
            return Group;
        })();
        MenuComponent.Group = Group;        
    })(go.MenuComponent || (go.MenuComponent = {}));
    var MenuComponent = go.MenuComponent;
})(go || (go = {}));
ko.onDemandObservable = function (callback, target) {
    var _value = ko.observable();
    var result = ko.computed({
        read: function () {
            if(!result.loaded()) {
                callback.call(target);
            }
            return _value();
        },
        write: function (newValue) {
            result.loaded(true);
            _value(newValue);
        },
        deferEvaluation: true
    });
    result.loaded = ko.observable();
    result.refresh = function () {
        result.loaded(false);
    };
    return result;
};
var go;
(function (go) {
    (function (kg) {
        var ExportSettings = (function () {
            function ExportSettings(fileName, enabled) {
                this.fileName = fileName;
                this.enabled = enabled;
                this.columns = [];
            }
            ExportSettings.prototype.toJSON = function () {
                delete this.enabled;
                return this;
            };
            return ExportSettings;
        })();
        kg.ExportSettings = ExportSettings;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var ExportableColumn = (function () {
            function ExportableColumn(field, headerText) {
                this.field = field;
                this.headerText = headerText;
            }
            return ExportableColumn;
        })();
        kg.ExportableColumn = ExportableColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        kg.GridManager = new goglobal.ObjectManager();
        var Grid = (function () {
            function Grid(id, columns, viewHandle, itemCountMessageAll, itemCountMessagePartial, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody, selectable, exportSettings, actionsTemplate) {
                this.id = id;
                this.itemCountMessageAll = itemCountMessageAll;
                this.itemCountMessagePartial = itemCountMessagePartial;
                this.itemAddedToastTitle = itemAddedToastTitle;
                this.itemRemovedToastTitle = itemRemovedToastTitle;
                this.itemFieldForToastBody = itemFieldForToastBody;
                var _this = this;
                this.itemsLengthThreshold = 100;
                this.trNodeType = 1;
                this.allowFade = true;
                go.Argument.notNull(id, "id");
                go.Argument.notNull(columns, "columns");
                this.columns = ko.observableArray(columns);
                this.selectable = go.Argument.boolOrFalse(selectable);
                this.exportSettings = go.Argument.objectOrDefault(exportSettings, new go.kg.ExportSettings("Report", false));
                $.each(this.columns(), $.proxy(this.buildExportSettingsIterator, this));
                this.items = viewHandle.subjects || ko.observableArray([]);
                this.items.subscribe(this.itemsChanged, this);
                viewHandle.status.subscribe(function (newValue) {
                    if(newValue === go.ActiveManagement.ViewStatus.Active) {
                        this.isLoaded(true);
                    }
                }, this);
                this.selectedItems = ko.computed(function () {
                    if(!this.selectable) {
                        return [];
                    }
                    return ko.utils.arrayFilter(this.items(), function (item) {
                        return item.isSelected();
                    });
                }, this);
                this.actionsTemplate = actionsTemplate;
                this.filter = ko.observable("");
                this.filterThrottleTime = ko.computed(function () {
                    return _this.items().length > _this.itemsLengthThreshold ? 300 : 0;
                });
                this.throttledFilter = this.filter.throttle(this.filterThrottleTime);
                this.throttledFilter.subscribe(this.filterChange, this);
                this.filteredItems = ko.onDemandObservable(this.setFilteredItems, this);
                this.filteredItems(this.items());
                this.lastSortedColumn = ko.observable();
                this.lastSortOrder = ko.observable();
                this.countText = ko.computed(this.getCountText, this);
                this.selectAllState = ko.computed(this.getSelectAllState, this);
                this.selectAllClass = ko.computed(this.getSelectAllClass, this);
                this.isLoaded = ko.observable(false);
                this.isLoadedAndEmpty = ko.computed(function () {
                    return _this.isLoaded() && _this.filteredItems().length === 0;
                });
                return go.kg.GridManager.register(this.id, this);
            }
            Grid.prototype.getCountText = function () {
                var countText = "";
                if(this.filteredItems().length === this.items().length) {
                    countText = this.itemCountMessageAll ? this.itemCountMessageAll.format(this.filteredItems().length) : "";
                } else {
                    countText = this.itemCountMessagePartial ? this.itemCountMessagePartial.format(this.filteredItems().length, this.items().length) : "";
                }
                return countText;
            };
            Grid.prototype.buildExportSettingsIterator = function (i, col) {
                if(col.isExportable) {
                    var column = new kg.ExportableColumn(col.field, col.headerText);
                    this.exportSettings.columns.push(column);
                }
            };
            Grid.prototype.itemPropertyReplacer = function (key, value) {
                var computedValue = ko.utils.unwrapObservable(value);
                if(typeof computedValue === 'undefined') {
                    return "";
                } else {
                    if(computedValue instanceof Date) {
                        return computedValue.toString();
                    }
                }
                return computedValue;
            };
            Grid.exportToFileErrorMessage = function exportToFileErrorMessage() {
                toastr.error("There was an unexpected error downloading your document. Please try again later.", "Error Exporting Grid");
            }
            Grid.exportToFileSuccessMessage = function exportToFileSuccessMessage() {
                toastr.success("Check your browser's download location for your file.", "Successfully Exported Grid");
            }
            Grid.prototype.exportToFile = function (type) {
                go.Argument.notNull(type, "type");
                var settingsJSON = ko.toJSON(this.exportSettings);
                var itemsJSON = ko.toJSON(this.filteredItems(), this.itemPropertyReplacer);
                $.ajax({
                    type: 'POST',
                    url: "/Grid/SaveExportFile",
                    data: {
                        type: type,
                        items: itemsJSON,
                        settings: settingsJSON
                    },
                    success: function (data, textStatus, jqXHR) {
                        if(data && data.fileKey) {
                            window.location.href = "/Grid/GetExportFile?fileKey=" + data.fileKey;
                            go.kg.Grid.exportToFileSuccessMessage();
                        } else {
                            go.kg.Grid.exportToFileErrorMessage();
                        }
                    },
                    error: go.kg.Grid.exportToFileErrorMessage
                });
            };
            Grid.prototype.exportAsPDF = function () {
                this.exportToFile("pdf");
            };
            Grid.prototype.exportAsCSV = function () {
                this.exportToFile("csv");
            };
            Grid.prototype.exportAsXLS = function () {
                this.exportToFile("xls");
            };
            Grid.prototype.exportAsXLSX = function () {
                this.exportToFile("xlsx");
            };
            Grid.prototype.isAsc = function (col) {
                if(this.lastSortedColumn() === col) {
                    return this.lastSortOrder() === "asc";
                }
                return false;
            };
            Grid.prototype.isDesc = function (col) {
                if(this.lastSortedColumn() === col) {
                    return this.lastSortOrder() === "desc";
                }
                return false;
            };
            Grid.prototype.sortASC = function (column) {
                this.items.sort($.proxy(column.sortASC, column));
                this.lastSortOrder("asc");
            };
            Grid.prototype.sortDESC = function (column) {
                this.items.sort($.proxy(column.sortDESC, column));
                this.lastSortOrder("desc");
            };
            Grid.prototype.enableAllowFade = function () {
                this.allowFade = true;
            };
            Grid.prototype.disableAllowFade = function () {
                this.allowFade = false;
            };
            Grid.prototype.doSort = function (column) {
                if(column.field === this.lastSortedColumn()) {
                    if(this.lastSortOrder() === "desc") {
                        this.sortASC(column);
                    } else {
                        this.sortDESC(column);
                    }
                } else {
                    this.sortASC(column);
                }
                this.lastSortedColumn(column.field);
                this.filteredItems.refresh();
                this.unblockUI($.proxy(this.enableAllowFade, this));
            };
            Grid.prototype.sort = function (column) {
                if(this.filteredItems().length > this.itemsLengthThreshold) {
                    if(column.isSortable) {
                        this.disableAllowFade();
                        this.blockUI(this.doSort.bind(this, column));
                    }
                } else {
                    this.doSort(column);
                }
            };
            Grid.prototype.getSelectAllState = function () {
                var itemsChecked = 0;
                if(this.selectable) {
                    $.each(this.filteredItems(), function (i, o) {
                        if(o.selectState() === go.kg.SelectableStates.SELECTED) {
                            itemsChecked++;
                        }
                    });
                }
                if(itemsChecked === this.filteredItems().length) {
                    return go.kg.SelectableStates.SELECTED;
                } else {
                    if(itemsChecked > 0) {
                        return go.kg.SelectableStates.PARTIAL;
                    } else {
                        return go.kg.SelectableStates.UNSELECTED;
                    }
                }
            };
            Grid.prototype.getSelectAllClass = function () {
                return "grid-checkbox-select-all kogrid-checkbox " + this.selectAllState().cssClass;
            };
            Grid.prototype.selectAllClick = function () {
                if(this.selectAllState() === go.kg.SelectableStates.SELECTED) {
                    this.unselectAllItems();
                } else {
                    this.selectAllItems();
                }
            };
            Grid.prototype.unselectAllItems = function () {
                if(this.selectable) {
                    $.each(this.items(), function (i, o) {
                        o.selectState(go.kg.SelectableStates.UNSELECTED);
                    });
                }
            };
            Grid.prototype.selectAllItems = function () {
                if(this.selectable) {
                    $.each(this.filteredItems(), function (i, o) {
                        o.selectState(go.kg.SelectableStates.SELECTED);
                    });
                }
            };
            Grid.prototype.setFilteredItems = function () {
                var newFilteredItems = ko.utils.arrayFilter(this.items(), $.proxy(this.filterItem, this));
                this.filteredItems(newFilteredItems);
            };
            Grid.prototype.cacheItemFieldsAsString = function (item) {
                item.fieldsAsString = "";
                $.each(this.columns(), function (i, col) {
                    var field = ko.utils.unwrapObservable(item[col.field]);
                    var typeOfField = typeof field;
                    if(typeOfField === 'string' || typeOfField === 'number' || typeOfField === 'boolean' || field instanceof Date) {
                        var fieldAsString = (field + " ").toLowerCase();
                        item.fieldsAsString += fieldAsString;
                    }
                });
            };
            Grid.prototype.defaultFilterItem = function (item) {
                var loweredFilter = this.filter().toLowerCase();
                var allFilters = loweredFilter.split(" ");
                this.cacheItemFieldsAsString(item);
                var allFiltersFoundInRow = true;
                $.each(allFilters, function (i, filter) {
                    if(item.fieldsAsString.indexOf(filter) === -1) {
                        allFiltersFoundInRow = false;
                        return false;
                    }
                });
                return allFiltersFoundInRow;
            };
            Grid.prototype.filterItem = function (item) {
                return this.defaultFilterItem(item);
            };
            Grid.prototype.filterChange = function (newValue) {
                this.disableAllowFade();
                if(this.items().length > this.itemsLengthThreshold) {
                    this.blockUI(this.filteredItems.refresh);
                } else {
                    this.filteredItems.refresh();
                }
                if(this.selectable) {
                    this.unselectAllItems();
                }
                this.unblockUI($.proxy(this.enableAllowFade, this));
                return true;
            };
            Grid.prototype.itemsChanged = function (value) {
                this.filteredItems.refresh();
            };
            Grid.prototype.fadeIn = function (element, index, data) {
                if(element.nodeType === this.trNodeType) {
                    if(this.allowFade) {
                        $(element).filter("tr").effect("highlight", {
                        }, 2000);
                    }
                }
            };
            Grid.prototype.fadeOutCallback = function (element) {
                $(element).remove();
            };
            Grid.prototype.fadeOut = function (element, index, data) {
                if(element.nodeType === this.trNodeType) {
                    if(this.allowFade) {
                        $(element).css("background-color", "#fcefa1");
                        $(element).fadeOut('slow', this.fadeOutCallback.bind(this, element));
                    } else {
                        this.fadeOutCallback(element);
                    }
                }
            };
            Grid.prototype.blockUI = function (onBlock) {
                var msg = "<span class='working'>Working...</span>";
                $("#" + this.id).block({
                    message: msg,
                    centerY: 0,
                    overlayCSS: {
                        opacity: 0,
                        borderRadius: '4px'
                    },
                    css: {
                        border: 'none',
                        background: 'transparent',
                        top: '6px'
                    },
                    onBlock: onBlock
                });
            };
            Grid.prototype.unblockUI = function (onUnblock) {
                $("#" + this.id).unblock({
                    onUnblock: onUnblock
                });
            };
            Grid.prototype.numOfColumns = function () {
                return this.selectable ? this.columns().length + 1 : this.columns().length;
            };
            return Grid;
        })();
        kg.Grid = Grid;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var Grid = (function (_super) {
                __extends(Grid, _super);
                function Grid(id, columns, viewHandle, itemCountMessageAll, itemCountMessagePartial, powerOnCommandUrl, powerOffCommandUrl, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody, selectable, exportSettings, actionsTemplate) {
                                _super.call(this, id, columns, viewHandle, itemCountMessageAll, itemCountMessagePartial, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody, selectable, exportSettings, actionsTemplate);
                    this.id = id;
                    this.addNewMenu = new go.MenuComponent.Group("addNewMenu", [
                        new go.MenuComponent.Item(go.BlankVM.OpenWizard, "Virtual Machine", "virtual-machine-icon"), 
                        new go.MenuComponent.Item(go.P2V.ShowDialog, "Convert Physical Machine (P2V)", "vmware-converter-icon")
                    ], "Add New", "Add New", "new-vm-icon", true);
                    this.PowerOnCommand = new go.Commands.ConfirmationCommand(this.selectedItems, powerOnCommandUrl, go.Resources.Virtualization_ManageVMText.PowerOn_DialogTitle, function () {
                        var dialogContents = '<div class="content-summary">Are you sure you want to power on the following <span class="vm-count">' + this.filterer().length + '</span> Virtual Machine(s)?</div>';
                        dialogContents += '<div class="list-of-vms">';
                        $.each(this.filterer(), function (i, n) {
                            dialogContents += '<div class="vm-in-list">' + n.name() + '</div>';
                        });
                        dialogContents += '</div>';
                        return dialogContents;
                    }, function () {
                        return ko.utils.arrayFilter(this.targets(), function (vm) {
                            var disabledMethods = ko.utils.unwrapObservable(vm.disabledMethods);
                            return $.inArray("PowerOnVM_Task", disabledMethods) === -1;
                        });
                    });
                    this.PowerOffCommand = new go.Commands.ConfirmationCommand(this.selectedItems, powerOffCommandUrl, "Power Off Virtual Machine(s)", function () {
                        var dialogContents = '<div class="content-summary">Are you sure you want to power off the following <span class="vm-count">' + this.filterer().length + '</span> Virtual Machine(s)?</div>';
                        dialogContents += '<div class="list-of-vms">';
                        $.each(this.filterer(), function (i, n) {
                            dialogContents += '<div class="vm-in-list">' + n.name() + '</div>';
                        });
                        dialogContents += '</div>';
                        return dialogContents;
                    }, function () {
                        return ko.utils.arrayFilter(this.targets(), function (vm) {
                            var disabledMethods = ko.utils.unwrapObservable(vm.disabledMethods);
                            return $.inArray("PowerOffVM_Task", disabledMethods) === -1;
                        });
                    });
                }
                return Grid;
            })(go.kg.Grid);
            VirtualMachine.Grid = Grid;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var GridViewModel = (function () {
                function GridViewModel() {
                    var vmsHandle = go.ActiveManagement.ActiveViewManager.getView("VirtualMachines", [
                        "Name", 
                        go.Subjects.VirtualMachineProperties.powerState(), 
                        go.Subjects.VirtualMachineProperties.disabledMethods(), 
                        go.Subjects.VirtualMachineProperties.operatingSystem(), 
                        go.Subjects.VirtualMachineProperties.memorySize(), 
                        go.Subjects.VirtualMachineProperties.cpuCount(), 
                        go.Subjects.VirtualMachineProperties.host(), 
                        go.Subjects.VirtualMachineProperties.toolsStatus(), 
                        go.Subjects.VirtualMachineProperties.activeTasks()
                    ]);
                    go.ActiveManagement.ActiveViewManager.getView("HostSystems", [
                        "Name"
                    ]);
                    go.ActiveManagement.ActiveViewManager.getView("VimTasks", [
                        "Name", 
                        go.Subjects.VimTaskProperties.state(), 
                        go.Subjects.VimTaskProperties.progress()
                    ]);
                    this.vmGrid = new go.Virtualization.VirtualMachine.Grid("vmGrid", [
                        new go.Virtualization.VirtualMachine.PowerStateColumn("state", "powerStateColumn", null, true, false), 
                        new go.kg.StringColumn("name", "nameColumn", go.Resources.Virtualization_VMGrid.NameColumnHeader), 
                        new go.kg.StringColumn("hostName", "hostColumn", go.Resources.Virtualization_VMGrid.HostColumnHeader), 
                        new go.kg.StringColumn("operatingSystem", "osRender", go.Resources.Virtualization_VMGrid.OSColumnHeader), 
                        new go.Virtualization.VirtualMachine.ToolsVersionStatusColumn("toolsVersionStatusText", "toolsVersionStatusColumn", go.Resources.Virtualization_VMGrid.ToolsColumnHeader)
                    ], vmsHandle, go.Resources.Virtualization_VMGrid.SummaryAllVMsAboveColumnsInGrid, go.Resources.Virtualization_VMGrid.SummaryCountVMsAboveColumnsInGrid, go.Routes.vSphere.VirtualMachine.PowerOn(), go.Routes.vSphere.VirtualMachine.PowerOff(), go.Resources.Virtualization_VMGrid.NotificationTitleVMAddedToGrid, go.Resources.Virtualization_VMGrid.NotificationTitleVMRemovedFromGrid, "name", true, new go.kg.ExportSettings(go.Resources.Virtualization_VMGrid.ExportFileName, true), "vmGridActionsTemplate");
                }
                return GridViewModel;
            })();
            VirtualMachine.GridViewModel = GridViewModel;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VirtualMachine) {
            var ManageViewModel = (function () {
                function ManageViewModel(subjectRefString) {
                    var vmHandle = go.ActiveManagement.ActiveViewManager.getSubjectView("VirtualMachine", subjectRefString, [
                        "Name", 
                        go.Subjects.VirtualMachineProperties.powerState(), 
                        go.Subjects.VirtualMachineProperties.disabledMethods(), 
                        go.Subjects.VirtualMachineProperties.operatingSystem(), 
                        go.Subjects.VirtualMachineProperties.memorySize(), 
                        go.Subjects.VirtualMachineProperties.cpuCount(), 
                        go.Subjects.VirtualMachineProperties.host(), 
                        go.Subjects.VirtualMachineProperties.toolsStatus(), 
                        go.Subjects.VirtualMachineProperties.activeTasks()
                    ]);
                    this.vm = vmHandle.subject;
                    this.vm.name.subscribe(function (newValue) {
                        document.title = newValue;
                    });
                    this.PowerOnCommand = new go.Commands.ConfirmationCommand(vmHandle.subjects, go.Routes.vSphere.VirtualMachine.PowerOn(), go.Resources.Virtualization_ManageVMText.PowerOn_DialogTitle, function () {
                        var dialogContents = "";
                        if(this.filterer().length > 0) {
                            dialogContents = go.Resources.Virtualization_ManageVMText.PowerOn_Question.format(this.filterer()[0].name());
                        }
                        return dialogContents;
                    }, function () {
                        return ko.utils.arrayFilter(this.targets(), function (vm) {
                            var disabledMethods = ko.utils.unwrapObservable(vm.disabledMethods);
                            return $.inArray("PowerOnVM_Task", disabledMethods) === -1;
                        });
                    });
                    this.PowerOffCommand = new go.Commands.ConfirmationCommand(vmHandle.subjects, go.Routes.vSphere.VirtualMachine.PowerOff(), go.Resources.Virtualization_ManageVMText.Shutdown_DialogTitle, function () {
                        var dialogContents = "";
                        if(this.filterer().length > 0) {
                            dialogContents = go.Resources.Virtualization_ManageVMText.Shutdown_Question.format(this.filterer()[0].name());
                        }
                        return dialogContents;
                    }, function () {
                        return ko.utils.arrayFilter(this.targets(), function (vm) {
                            var disabledMethods = ko.utils.unwrapObservable(vm.disabledMethods);
                            return $.inArray("PowerOffVM_Task", disabledMethods) === -1;
                        });
                    });
                }
                return ManageViewModel;
            })();
            VirtualMachine.ManageViewModel = ManageViewModel;            
        })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
        var VirtualMachine = Virtualization.VirtualMachine;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VCenter) {
            var Grid = (function (_super) {
                __extends(Grid, _super);
                function Grid(id, columns, viewHandle, itemCountMessageAll, itemCountMessagePartial, powerOnCommandUrl, powerOffCommandUrl, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody, selectable, exportSettings, actionsTemplate) {
                                _super.call(this, id, columns, viewHandle, itemCountMessageAll, itemCountMessagePartial, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody, selectable, exportSettings, actionsTemplate);
                    this.id = id;
                    this.addNewMenu = new go.MenuComponent.Group("addNewMenu", [
                        new go.MenuComponent.Item(go.BlankVM.OpenWizard, "Virtual Machine", "virtual-machine-icon"), 
                        new go.MenuComponent.Item(go.P2V.ShowDialog, "Convert Physical Machine (P2V)", "vmware-converter-icon")
                    ], "Add New", "Add New", "new-vm-icon", true);
                }
                return Grid;
            })(go.kg.Grid);
            VCenter.Grid = Grid;            
        })(Virtualization.VCenter || (Virtualization.VCenter = {}));
        var VCenter = Virtualization.VCenter;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (VCenter) {
            var GridViewModel = (function () {
                function GridViewModel() {
                    var vcentersHandle = go.ActiveManagement.ActiveViewManager.getView("VCenters", [
                        "Name", 
                        go.Subjects.VCenterProperties.disabledMethods(), 
                        go.Subjects.VCenterProperties.primaryServerIpAddress()
                    ]);
                    this.vcentersGrid = new go.Virtualization.VCenter.Grid("vcentersGrid", [
                        new go.kg.StringColumn("name", "nameColumn", "Name")
                    ], vcentersHandle, "Showing <span class='results-count'>All {0}</span> VCenters", "Showing <span class='results-count'>{0} of {1}</span> VCenters", go.Routes.vSphere.VirtualMachine.PowerOn(), go.Routes.vSphere.VirtualMachine.PowerOff(), "Virtual Machine Added", "Virtual Machine Removed", "name", true, new go.kg.ExportSettings("Virtual Machines Report", true), "vmGridActionsTemplate");
                }
                return GridViewModel;
            })();
            VCenter.GridViewModel = GridViewModel;            
        })(Virtualization.VCenter || (Virtualization.VCenter = {}));
        var VCenter = Virtualization.VCenter;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (RecentTasks) {
            var GridViewModel = (function () {
                function GridViewModel() {
                    var recentTasksHandle = go.ActiveManagement.ActiveViewManager.getView("VimTasks", [
                        "Name", 
                        go.Subjects.VimTaskProperties.state(), 
                        go.Subjects.VimTaskProperties.progress(), 
                        go.Subjects.VimTaskProperties.affectedSubject()
                    ]);
                    this.recentTasks = new go.kg.Grid("recentTasks", [
                        new go.kg.StringColumn("name", "recentTasksNameColumn", "Name"), 
                        new go.kg.StringColumn("affectedSubject", "recentTasksTargetColumn", "Target"), 
                        new go.kg.StringColumn("state", "recentTasksStateColumn", "Status")
                    ], recentTasksHandle, "", "", "", "", "", false);
                }
                return GridViewModel;
            })();
            RecentTasks.GridViewModel = GridViewModel;            
        })(Virtualization.RecentTasks || (Virtualization.RecentTasks = {}));
        var RecentTasks = Virtualization.RecentTasks;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var go;
(function (go) {
    var IPAddressModel = (function () {
        function IPAddressModel(fullIP) {
            var _this = this;
            var part1 = null;
            var part2 = null;
            var part3 = null;
            var part4 = null;
            if(fullIP) {
                var parts = fullIP.split(".");
                if(parts.length === 4) {
                    part1 = parts[0];
                    part2 = parts[1];
                    part3 = parts[2];
                    part4 = parts[3];
                }
            }
            this.part1 = ko.observable(part1);
            this.part2 = ko.observable(part2);
            this.part3 = ko.observable(part3);
            this.part4 = ko.observable(part4);
            this.full = ko.computed(function () {
                return [
                    _this.part1(), 
                    _this.part2(), 
                    _this.part3(), 
                    _this.part4()
                ].join(".");
            });
        }
        IPAddressModel.prototype.isValid = function () {
            return (/(\d{1,3}\.){3}\d{1,3}/).test(this.full());
        };
        IPAddressModel.prototype.clear = function () {
            this.part1(null);
            this.part2(null);
            this.part3(null);
            this.part4(null);
        };
        return IPAddressModel;
    })();
    go.IPAddressModel = IPAddressModel;    
})(go || (go = {}));
var __extends = this.__extends || function (d, b) {
    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var go;
(function (go) {
    var TestUtils = (function () {
        function TestUtils() { }
        TestUtils.minWait = function minWait(expression) {
            stop();
            setTimeout(function () {
                start();
                expression();
            }, 1);
        }
        return TestUtils;
    })();
    go.TestUtils = TestUtils;    
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var Connection = (function () {
            function Connection(name, ip) {
                this.name = name;
                this.type = "host-icon";
                this.ip = ip ? ip : new go.IPAddressModel();
            }
            return Connection;
        })();
        ActiveManagement.Connection = Connection;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var ConnectionManager = (function () {
            function ConnectionManager(connections) {
                this.connections = connections;
                this.liNodeType = 1;
                this.workingIP = new go.IPAddressModel();
                this.validationMessage = ko.observable();
            }
            ConnectionManager.prototype.addWorkingIP = function () {
                this.workingIP.part1($("#manageConnectionsList .add-ip-address .part1").val());
                this.workingIP.part2($("#manageConnectionsList .add-ip-address .part2").val());
                this.workingIP.part3($("#manageConnectionsList .add-ip-address .part3").val());
                this.workingIP.part4($("#manageConnectionsList .add-ip-address .part4").val());
                if(this.workingIP.isValid()) {
                    this.validationMessage(null);
                    var clone = ko.mapping.fromJS(ko.mapping.toJS(this.workingIP));
                    this.connections.push(new go.ActiveManagement.Connection("Unknown", clone));
                    this.workingIP.clear();
                    $("#manageConnectionsList .add-ip-address .part1").val("");
                    $("#manageConnectionsList .add-ip-address .part2").val("");
                    $("#manageConnectionsList .add-ip-address .part3").val("");
                    $("#manageConnectionsList .add-ip-address .part4").val("");
                } else {
                    this.validationMessage('Valid IP address required, e.g. "123.123.123.123"');
                }
            };
            ConnectionManager.prototype.removeIP = function (ip) {
                this.lastRemovedIP = ip;
                this.connections.remove(ip);
                $("#undoLastRemovedIP").show();
            };
            ConnectionManager.prototype.undoLastRemovedIP = function () {
                if(this.lastRemovedIP) {
                    this.connections.push(this.lastRemovedIP);
                    this.lastRemovedIP = null;
                }
                $("#undoLastRemovedIP").hide();
            };
            ConnectionManager.prototype.fadeIn = function (element, index, data) {
                if(element.nodeType === this.liNodeType) {
                    $(element).filter("li").effect("highlight", {
                    }, 2000);
                }
            };
            ConnectionManager.prototype.fadeOutCallback = function () {
                $(this).remove();
            };
            ConnectionManager.prototype.fadeOut = function (element, index, data) {
                if(element.nodeType === this.liNodeType) {
                    $(element).css("background-color", "#fcefa1");
                    $(element).fadeOut('slow', this.fadeOutCallback.bind(element));
                }
            };
            return ConnectionManager;
        })();
        ActiveManagement.ConnectionManager = ConnectionManager;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var DateColumn = (function (_super) {
            __extends(DateColumn, _super);
            function DateColumn() {
                _super.apply(this, arguments);

            }
            return DateColumn;
        })(go.kg.Column);
        kg.DateColumn = DateColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var NumberColumn = (function (_super) {
            __extends(NumberColumn, _super);
            function NumberColumn() {
                _super.apply(this, arguments);

            }
            NumberColumn.prototype.sortASC = function (a, b) {
                var aVal = +ko.utils.unwrapObservable(a[this.field]);
                var bVal = +ko.utils.unwrapObservable(b[this.field]);
                aVal = isNaN(aVal) ? Number.MAX_VALUE : aVal;
                bVal = isNaN(bVal) ? Number.MAX_VALUE : bVal;
                return aVal - bVal;
            };
            NumberColumn.prototype.sortDESC = function (a, b) {
                var aVal = +ko.utils.unwrapObservable(a[this.field]);
                var bVal = +ko.utils.unwrapObservable(b[this.field]);
                aVal = isNaN(aVal) ? Number.MAX_VALUE : aVal;
                bVal = isNaN(bVal) ? Number.MAX_VALUE : bVal;
                return bVal - aVal;
            };
            return NumberColumn;
        })(go.kg.Column);
        kg.NumberColumn = NumberColumn;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (kg) {
        var ColumnBool = (function (_super) {
            __extends(ColumnBool, _super);
            function ColumnBool() {
                _super.apply(this, arguments);

            }
            ColumnBool.prototype.sortASC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal === bVal ? 0 : aVal ? -1 : 1;
            };
            ColumnBool.prototype.sortDESC = function (a, b) {
                var aVal = ko.utils.unwrapObservable(a[this.field]);
                var bVal = ko.utils.unwrapObservable(b[this.field]);
                return aVal === bVal ? 0 : aVal ? 1 : -1;
            };
            return ColumnBool;
        })(go.kg.Column);
        kg.ColumnBool = ColumnBool;        
    })(go.kg || (go.kg = {}));
    var kg = go.kg;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var ClientHubViewSource = (function () {
            function ClientHubViewSource(connection) {
                this.connection = connection;
                var _this = this;
                connection.client.updateViews = function (data) {
                    return _this.onViewNotification(data);
                };
            }
            ClientHubViewSource.prototype.onViewNotification = function (data) {
                if(this.notificationHandler) {
                    this.notificationHandler(JSON.parse(data));
                }
            };
            ClientHubViewSource.prototype.setViewRequests = function (viewRequests) {
                this.connection.server.setViewRequests(viewRequests);
            };
            return ClientHubViewSource;
        })();
        ActiveManagement.ClientHubViewSource = ClientHubViewSource;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (AppInitialization) {
        function Initialize() {
            go.Subjects.ViewModelFactory.setVirtualMachineFactory(function (subjectRef, properties) {
                return new go.Virtualization.VirtualMachine.VirtualMachineModel(subjectRef, properties);
            });
            go.Subjects.ViewModelFactory.setVimTaskFactory(function (subjectRef, properties) {
                return new go.Virtualization.VimTask(subjectRef, properties);
            });
        }
        AppInitialization.Initialize = Initialize;
    })(go.AppInitialization || (go.AppInitialization = {}));
    var AppInitialization = go.AppInitialization;
})(go || (go = {}));
var go;
(function (go) {
    (function (Virtualization) {
        (function (RecentTasks) {
            var RecentTasksMenu = (function () {
                function RecentTasksMenu() { }
                RecentTasksMenu.open = function open() {
                    $("#recentTasks").show();
                }
                RecentTasksMenu.close = function close() {
                    $("#recentTasks").hide();
                }
                return RecentTasksMenu;
            })();
            RecentTasks.RecentTasksMenu = RecentTasksMenu;            
        })(Virtualization.RecentTasks || (Virtualization.RecentTasks = {}));
        var RecentTasks = Virtualization.RecentTasks;
    })(go.Virtualization || (go.Virtualization = {}));
    var Virtualization = go.Virtualization;
})(go || (go = {}));
var kg;
(function (kg) {
    (function (GridSelectionTest) {
        var SelectableObject = (function (_super) {
            __extends(SelectableObject, _super);
            function SelectableObject(aString, aNum, aBool, aDate) {
                        _super.call(this);
                this.aString = aString;
                this.aNum = aNum;
                this.aBool = aBool;
                this.aDate = aDate;
            }
            return SelectableObject;
        })(go.kg.SelectableItem);        
        var aGrid;
        var aGridColumns = [
            new go.kg.StringColumn("aString", "")
        ];
        QUnit.testStart(function () {
            var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                new SelectableObject("goo", 1, false, new Date(2010, 0, 15)), 
                new SelectableObject("foo", 2, true, new Date(2012, 0, 14)), 
                new SelectableObject("bar", 3, false, new Date(2010, 1, 14))
            ]), ko.observable(1), function () {
            });
            aGrid = new go.kg.Grid("aGrid", aGridColumns, viewHandle, "Showing All {0}", "Showing {0} of {1} {2}", "Item Added", "Item Removed", "aString", true);
        });
        QUnit.module("go.kg.Grid");
        test("selection single items", function () {
            equal(aGrid.items().length, 3, "grid should have 3 items");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
            $.each(aGrid.items(), function (i, e) {
                equal(e.selectState(), go.kg.SelectableStates.UNSELECTED, "item #" + i + " should start unselected");
            });
            var firstItem = aGrid.items()[0];
            firstItem.selectClick();
            equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");
            var thridItem = aGrid.items()[2];
            thridItem.selectClick();
            equal(thridItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");
            var secondItem = aGrid.items()[1];
            secondItem.selectClick();
            equal(secondItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.SELECTED, "select all state should be selected now b/c all items are selected");
            secondItem = aGrid.items()[1];
            secondItem.selectClick();
            equal(secondItem.selectState(), go.kg.SelectableStates.UNSELECTED, "item should be unselected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now b/c we unselected one");
        });
        test("select/unselect all", function () {
            equal(aGrid.items().length, 3, "grid should have 3 items");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
            aGrid.selectAllClick();
            equal(aGrid.selectAllState(), go.kg.SelectableStates.SELECTED, "select all state on grid should now be selected");
            aGrid.selectAllClick();
            equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should now be unselected");
        });
        test("select single item and the click select all", function () {
            equal(aGrid.items().length, 3, "grid should have 3 items");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
            var firstItem = aGrid.items()[0];
            firstItem.selectClick();
            equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "first item should be selected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");
            aGrid.selectAllClick();
            equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "first item should still be selected");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.SELECTED, "select all state on grid should now be selected");
        });
    })(kg.GridSelectionTest || (kg.GridSelectionTest = {}));
    var GridSelectionTest = kg.GridSelectionTest;
})(kg || (kg = {}));
var kg;
(function (kg) {
    (function (GridSearchTest) {
        var SortableObject = (function () {
            function SortableObject(id, aString, aNum, aBool, aDate) {
                this.id = id;
                this.aString = aString;
                this.aNum = aNum;
                this.aBool = aBool;
                this.aDate = aDate;
            }
            return SortableObject;
        })();        
        var aGrid;
        var aGridColumns = [
            new go.kg.StringColumn("aString", ""), 
            new go.kg.NumberColumn("aNum", ""), 
            new go.kg.ColumnBool("aBool", ""), 
            new go.kg.DateColumn("aDate", "")
        ];
        var itemCountMessageAll = "Showing <span class='results-count'>All</span> Items";
        var itemCountMessagePartial = "Showing <span class='results-count'>{0} of {1}</span> Items";
        var itemAddedToastTitle = "Item Added";
        var itemRemovedToastTitle = "Item Removed";
        var itemFieldForToastBody = "aString";
        QUnit.testStart(function () {
            var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                new SortableObject(0, "foo", 994, false, new Date(2012, 12, 12, 12, 12, 12, 12)), 
                new SortableObject(1, "foo bar", 995, true, new Date(2012, 12, 12, 12, 12, 12, 12)), 
                new SortableObject(2, "bar", 996, false, new Date(2012, 12, 12, 12, 12, 12, 12))
            ]), ko.observable(1), function () {
            });
            aGrid = new go.kg.Grid("aGrid", aGridColumns, viewHandle, itemCountMessageAll, itemCountMessagePartial, itemAddedToastTitle, itemRemovedToastTitle, itemFieldForToastBody);
        });
        QUnit.module("go.kg.Grid");
        test("simple string search", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            aGrid.filter("foo");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 2, "grid should only show 2 items");
                equal(aGrid.filteredItems()[0].id, 0, "item 0 should be first item in filtered list");
                equal(aGrid.filteredItems()[1].id, 1, "item 1 should be second item in filtered list");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                });
            });
        });
        test("search for a number data type", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            aGrid.filter("995");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 1, "grid should only show 1 items");
                equal(aGrid.filteredItems()[0].id, 1, "item 1 should be first item in filtered list");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                });
            });
        });
        test("2 string combo search. only one row has both search terms", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            aGrid.filter("foo bar");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 1, "grid should only show 1 items");
                equal(aGrid.filteredItems()[0].id, 1, "item 1 should be first item in filtered list");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                });
            });
        });
        test("2 string combo search across columns. only one row has both search terms", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            aGrid.filter("foo 994");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 1, "grid should only show 1 items");
                equal(aGrid.filteredItems()[0].id, 0, "item 0 should be first item in filtered list");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                });
            });
        });
        test("2 string combo search across columns. no row has both.", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            aGrid.filter("foo 996");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 0, "grid should show 0 items");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                });
            });
        });
        test("search is case insensitive", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            aGrid.filter("FOO");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 2, "grid should show 2 items");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                });
            });
        });
        test("search is case insensitive. fields are lowercased for searching", function () {
            aGrid.items.push(new SortableObject(3, "FOO", 997, false, new Date(2012, 12, 12, 12, 12, 12, 12)));
            aGrid.items.push(new SortableObject(4, "FoO", 998, false, new Date(2012, 12, 12, 12, 12, 12, 12)));
            equal(aGrid.filteredItems().length, 5, "grid should start showing all 5 items");
            aGrid.filter("foo");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 4, "grid should show 4 items");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 5, "grid should have all 5 items again");
                });
            });
        });
        test("show correct item count message", function () {
            equal(aGrid.filteredItems().length, 3, "grid should start showing all 3 items");
            equal(aGrid.countText(), itemCountMessageAll, "should be showing all count message");
            aGrid.filter("foo");
            go.TestUtils.minWait(function () {
                equal(aGrid.filteredItems().length, 2, "grid should only show 2 items");
                equal(aGrid.filteredItems()[0].id, 0, "item 0 should be first item in filtered list");
                equal(aGrid.filteredItems()[1].id, 1, "item 1 should be second item in filtered list");
                equal(aGrid.countText(), itemCountMessagePartial.format(2, 3), "should be showing partial count message");
                aGrid.filter("");
                go.TestUtils.minWait(function () {
                    equal(aGrid.filteredItems().length, 3, "grid should have all 3 items again");
                    equal(aGrid.countText(), itemCountMessageAll, "should be showing all count message");
                });
            });
        });
    })(kg.GridSearchTest || (kg.GridSearchTest = {}));
    var GridSearchTest = kg.GridSearchTest;
})(kg || (kg = {}));
var kg;
(function (kg) {
    (function (GridSelectAndSearchTest) {
        var SelectableObject = (function (_super) {
            __extends(SelectableObject, _super);
            function SelectableObject(aString, aNum, aBool, aDate) {
                        _super.call(this);
                this.aString = aString;
                this.aNum = aNum;
                this.aBool = aBool;
                this.aDate = aDate;
            }
            return SelectableObject;
        })(go.kg.SelectableItem);        
        var aGrid;
        var aGridColumns = [
            new go.kg.StringColumn("aString", ""), 
            new go.kg.NumberColumn("aNum", ""), 
            new go.kg.ColumnBool("aBool", ""), 
            new go.kg.DateColumn("aDate", "")
        ];
        QUnit.testStart(function () {
            var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                new SelectableObject("goo", 1, false, new Date(2010, 0, 15)), 
                new SelectableObject("foo", 2, true, new Date(2012, 0, 14)), 
                new SelectableObject("bar", 3, false, new Date(2010, 1, 14))
            ]), ko.observable(1), function () {
            });
            aGrid = new go.kg.Grid("aGrid", aGridColumns, viewHandle, "Showing All {0}", "Showing {0} of {1} {2}", "Item Added", "Item Removed", "aString", true);
        });
        QUnit.module("go.kg.Grid");
        test("select some and then search", function () {
            equal(aGrid.items().length, 3, "grid should have 3 items");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state on grid should start unselected");
            $.each(aGrid.items(), function (i, e) {
                equal(e.selectState(), go.kg.SelectableStates.UNSELECTED, "item #" + i + " should start unselected");
            });
            var firstItem = aGrid.items()[0];
            firstItem.selectClick();
            equal(firstItem.selectState(), go.kg.SelectableStates.SELECTED, "item should be selected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.PARTIAL, "select all state should be partial now");
            aGrid.filterChange();
            equal(firstItem.selectState(), go.kg.SelectableStates.UNSELECTED, "item should be selected now");
            equal(aGrid.selectAllState(), go.kg.SelectableStates.UNSELECTED, "select all state should be partial now");
        });
    })(kg.GridSelectAndSearchTest || (kg.GridSelectAndSearchTest = {}));
    var GridSelectAndSearchTest = kg.GridSelectAndSearchTest;
})(kg || (kg = {}));
var go;
(function (go) {
    (function (OSFactoryTest) {
        var LinuxTooltip = "Linux";
        var MacOSTooltip = "Mac OS";
        var UnixTooltip = "Unix";
        QUnit.module("go.OS");
        test("Windows", function () {
            var cssWindows = "windows";
            var os1 = "Microsoft Windows 7 (32-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssWindows, osImage1.cssClass, "");
            var os2 = "Microsoft Windows Server 2003, Enterprise Edition (64-bit)";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssWindows, osImage2.cssClass, "");
            var os3 = "Microsoft Windows XP Professional (64-bit)";
            var osImage3 = go.OSFactory.get(os3);
            equal(cssWindows, osImage3.cssClass, "");
        });
        test("Linux", function () {
            var cssClass = "linux";
            var os1 = "Other 2.6x Linux (64-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("RedHat", function () {
            var cssClass = "redhat";
            var os1 = "Red Hat Enterprise Linux 3 (32-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
            var os2 = "Red Hat Enterprise Linux 4 (64-bit)";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssClass, osImage2.cssClass, "");
        });
        test("Debian", function () {
            var cssClass = "debian";
            var os1 = "Debian GNU/Linux 5 (32-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
            var os2 = "Debian 6.0.5";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssClass, osImage2.cssClass, "");
        });
        test("CentOS", function () {
            var cssClass = "centos";
            var os1 = "CentOS 4/5 (64-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("FreeBSD", function () {
            var cssClass = "freebsd";
            var os1 = "FreeBSD (32-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
            var os2 = "FreeBSD (64-bit)";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssClass, osImage2.cssClass, "");
            var os3 = "FreeBSD 8.0-RELEASE";
            var osImage3 = go.OSFactory.get(os3);
            equal(cssClass, osImage3.cssClass, "");
        });
        test("MacOs", function () {
            var cssClass = "macos";
            var os1 = "Apple Mac OS X 10.5 - 10.6.3 (Leopard - Snow Leopard)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
            var os2 = "Apple Mac OS X 10.6 (64-bit)";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssClass, osImage2.cssClass, "");
            var os3 = "Apple Mac OS X 10.4.10 (Tiger) (Darwin 8.10.0, PowerPC)";
            var osImage3 = go.OSFactory.get(os3);
            equal(cssClass, osImage3.cssClass, "");
        });
        test("OpenBSD", function () {
            var cssClass = "openbsd";
            var os1 = "OpenBSD";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("Solaris", function () {
            var cssClass = "solaris";
            var os1 = "Sun Solaris 9";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("Suse", function () {
            var cssClass = "suse";
            var os1 = "Suse Linux Enterprise 10 (64-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("Novell", function () {
            var cssClass = "novell";
            var os1 = "Novell NetWare 6.x";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
            var os2 = "Open Enterprise Server";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssClass, osImage2.cssClass, "");
        });
        test("Ubuntu", function () {
            var cssClass = "ubuntu";
            var os1 = "Ubuntu Linux (32-bit)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
            var os2 = "Ubuntu Linux (64-bit)";
            var osImage2 = go.OSFactory.get(os2);
            equal(cssClass, osImage2.cssClass, "");
        });
        test("Darwin", function () {
            var cssClass = "darwin";
            var os1 = "Darwin (32-bit) (unsupported)";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("Dos", function () {
            var cssClass = "ms-dos";
            var os1 = "DOS";
            var osImage1 = go.OSFactory.get(os1);
            equal(cssClass, osImage1.cssClass, "");
        });
        test("Other", function () {
            var cssDefault = "virtualmachine";
            var os3 = "my cool new os";
            var osImage3 = go.OSFactory.get(os3);
            equal(cssDefault, osImage3.cssClass, "");
            var os4 = "Other Operating System";
            var osImage4 = go.OSFactory.get(os4);
            equal(cssDefault, osImage4.cssClass, "");
        });
    })(go.OSFactoryTest || (go.OSFactoryTest = {}));
    var OSFactoryTest = go.OSFactoryTest;
})(go || (go = {}));
var currentTestExportFileType;
var Substitute = Substitute || {
};
Substitute.ForJQueryAjax = function (config) {
    ok(config.data, "");
    equal(config.data.type, currentTestExportFileType, "export file type should be " + currentTestExportFileType);
    ok(config.data.items, "");
    ok(config.data.items.length > 0, "items json should contain something");
    ok(config.data.items.indexOf("aString") === -1, "items json should not contain aString");
    ok(config.data.items.indexOf("foo") === -1, "items json should not contain foo");
    ok(config.data.items.indexOf("aNum") === -1, "items json should not contain aNum");
    ok(config.data.items.indexOf("996") === -1, "items json should not contain 996");
    ok(config.data.items.indexOf("aBool") !== -1, "items json should contain aBool");
    ok(config.data.items.indexOf("true") !== -1, "items json should contain true");
    ok(config.data.items.indexOf("aDate") !== -1, "items json should contain aDate");
    ok(config.data.items.indexOf("2012") !== -1, "items json should contain 2012");
    ok(config.data.settings, "");
    ok(config.data.settings.length > 0, "settings json should contain something");
    ok(config.data.settings.indexOf("fileName") !== -1, "settings json should contain fileName");
    ok(config.data.settings.indexOf("enabled") === -1, "settings json should not contain enabled");
    ok(config.data.settings.indexOf("columns") !== -1, "settings json should contain columns");
    ok(config.data.settings.indexOf("aString") === -1, "settings json should not contain aString");
    ok(config.data.settings.indexOf("aNum") === -1, "settings json should not contain aNum");
    ok(config.data.settings.indexOf("aBool") !== -1, "settings json should contain aBool");
    ok(config.data.settings.indexOf("aDate") !== -1, "settings json should contain aDate");
};
var kg;
(function (kg) {
    (function (GridExportTest) {
        var ExportableObject = (function (_super) {
            __extends(ExportableObject, _super);
            function ExportableObject(id, aString, aNum, aBool, aDate) {
                        _super.call(this);
                this.id = id;
                this.aString = aString;
                this.aNum = aNum;
                this.aBool = aBool;
                this.aDate = aDate;
            }
            ExportableObject.prototype.toJSON = function () {
                delete this.aString;
                delete this.aNum;
                return this;
            };
            return ExportableObject;
        })(go.kg.GridItem);        
        $.ajax = Substitute.ForJQueryAjax;
        var aGrid;
        var aGridColumns = [
            new go.kg.StringColumn("aString", "", "", true, false), 
            new go.kg.NumberColumn("aNum", "", "", true, false), 
            new go.kg.ColumnBool("aBool", "", "", true, true), 
            new go.kg.DateColumn("aDate", "", "", true, true)
        ];
        QUnit.testStart(function () {
            var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                new ExportableObject(0, "foo", 994, false, new Date(2012, 11, 12)), 
                new ExportableObject(1, "foo bar", 995, true, new Date(2012, 11, 12)), 
                new ExportableObject(2, "bar", 996, false, new Date(2012, 11, 12))
            ]), ko.observable(1), function () {
            });
            aGrid = new go.kg.Grid("aGrid", aGridColumns, viewHandle, "Showing <span class='results-count'>All</span> Items", "Showing <span class='results-count'>{0} of {1}</span> Items", "Item Added", "Item Removed", "aString");
        });
        QUnit.module("go.kg.Grid");
        test("export stringifys columns and items correctly", function () {
            currentTestExportFileType = "pdf";
            aGrid.exportAsPDF();
        });
    })(kg.GridExportTest || (kg.GridExportTest = {}));
    var GridExportTest = kg.GridExportTest;
})(kg || (kg = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var TestSubjectRef = (function () {
            function TestSubjectRef($subjectRefType, key, subject) {
                this.$subjectRefType = $subjectRefType;
                this.key = key;
                this.subject = subject;
            }
            return TestSubjectRef;
        })();
        ActiveManagement.TestSubjectRef = TestSubjectRef;        
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    })(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        QUnit.module("go.ActiveManagement");
        QUnit.test("ViewHandle.release (and subsequent calls)", function () {
            var callCount = 0;
            var handle = new ActiveManagement.ViewHandle([
                "property1"
            ], ko.observableArray(), ko.observable(""), function () {
                return callCount++;
            });
            handle.release();
            handle.release();
            QUnit.equal(callCount, 1, "calls passed in callback exactly once");
        });
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var go;
(function (go) {
    (function (ActiveManagement) {
        var TestView = (function () {
            function TestView() {
                var _this = this;
                var propertySets = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    propertySets[_i] = arguments[_i + 0];
                }
                this.updateSubscriptionCount = 0;
                this.releaseViewCount = 0;
                this.view = new ActiveManagement.View(TestView.TEST_KEY(), function () {
                    return _this.releaseViewCount++;
                }, function () {
                    return _this.updateSubscriptionCount++;
                });
                this.testHandles = $.map(propertySets, function (propertySet) {
                    return new TestHandle(_this.view, propertySet);
                });
                this.updateSubscriptionCount = 0;
            }
            TestView._TEST_SUBJECT_1 = new go.Subjects.SubjectViewModel(new ActiveManagement.TestSubjectRef("thing", "thing-subject1"));
            TestView._TEST_SUBJECT_2 = new go.Subjects.SubjectViewModel(new ActiveManagement.TestSubjectRef("thing", "thing-subject2"));
            TestView.TEST_KEY = function TEST_KEY() {
                return "testkey";
            }
            TestView.TEST_PROPERTIES_1 = function TEST_PROPERTIES_1() {
                return [
                    "property1"
                ];
            }
            TestView.TEST_PROPERTIES_2 = function TEST_PROPERTIES_2() {
                return [
                    "property1", 
                    "property2"
                ];
            }
            TestView.TEST_SUBJECT_1 = function TEST_SUBJECT_1() {
                return TestView._TEST_SUBJECT_1;
            }
            TestView.TEST_SUBJECT_2 = function TEST_SUBJECT_2() {
                return TestView._TEST_SUBJECT_2;
            }
            TestView.TEST_SUBJECTS_1 = function TEST_SUBJECTS_1() {
                return [
                    TestView._TEST_SUBJECT_1
                ];
            }
            TestView.TEST_SUBJECTS_2 = function TEST_SUBJECTS_2() {
                return [
                    TestView._TEST_SUBJECT_1, 
                    TestView._TEST_SUBJECT_2
                ];
            }
            TestView.prototype.resetCounts = function () {
                this.updateSubscriptionCount = 0;
                this.releaseViewCount = 0;
                $.each(this.testHandles, function (_, subject) {
                    return subject.resetCounts();
                });
            };
            TestView.prototype.getTestState = function () {
                var requirements = this.view.getViewRequest();
                var requiredProperties = null;
                if(requirements) {
                    requiredProperties = requirements.properties;
                }
                return new TestViewState(requiredProperties, this.updateSubscriptionCount, this.releaseViewCount, this.view.getStatus());
            };
            return TestView;
        })();        
        var TestHandle = (function () {
            function TestHandle(view, propertySet) {
                var _this = this;
                this.statusNotificationCount = 0;
                this.subjectsNotificationCount = 0;
                this.handle = view.createHandle(propertySet);
                this.handle.status.subscribe(function (_) {
                    return _this.statusNotificationCount++;
                });
                this.handle.subjects.subscribe(function (_) {
                    return _this.subjectsNotificationCount++;
                });
            }
            TestHandle.prototype.resetCounts = function () {
                ko.processAllDeferredUpdates();
                this.statusNotificationCount = 0;
                this.subjectsNotificationCount = 0;
            };
            TestHandle.prototype.getStatusNotificationCount = function () {
                ko.processAllDeferredUpdates();
                return this.statusNotificationCount;
            };
            TestHandle.prototype.getSubjectsNotificationCount = function () {
                ko.processAllDeferredUpdates();
                return this.subjectsNotificationCount;
            };
            return TestHandle;
        })();        
        var TestViewState = (function () {
            function TestViewState(properties, updateSubscriptionCount, releaseViewCount, status) {
                this.properties = properties;
                this.updateSubscriptionCount = updateSubscriptionCount;
                this.releaseViewCount = releaseViewCount;
                this.status = status;
            }
            return TestViewState;
        })();        
        QUnit.module("go.ActiveManagement");
        QUnit.test("View.ctor", function () {
            var subject = new TestView();
            QUnit.equal(subject.view.getViewKey(), TestView.TEST_KEY(), "has the same key passed to the ctor");
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 0, 0, ActiveManagement.ViewStatus.New), "is 'new', has no requirements, does not release view, does not update subscriptions");
        });
        QUnit.test("First View.createHandle", function () {
            var subject = new TestView();
            var handle = subject.view.createHandle(TestView.TEST_PROPERTIES_1());
            QUnit.ok(handle, "returns a view handle");
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 1, 0, ActiveManagement.ViewStatus.New), "remains 'new', has correct requirements, does not release view, updates subscriptions");
            var requirements = subject.view.getViewRequest();
            QUnit.equal(requirements.viewKey, TestView.TEST_KEY(), "getRequiredProperties returns expected view key");
        });
        QUnit.test("Final handle release on View", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.testHandles[0].handle.release();
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 1, 1, ActiveManagement.ViewStatus.Inactive), "becomes 'inactive', has no requirements, releases view, updates subscriptions");
        });
        QUnit.test("View.createHandle with identical request", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.createHandle(TestView.TEST_PROPERTIES_1());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.New), "remains 'new', has correct requirements, does not release view, does not update subscriptions");
        });
        QUnit.test("View.createHandle after becoming inactive", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.testHandles[0].handle.release();
            subject.resetCounts();
            subject.view.createHandle(TestView.TEST_PROPERTIES_1());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 0, 0, ActiveManagement.ViewStatus.Inactive), "remains 'inactive', has no requirements, does not release view, does not update subscriptions");
        });
        QUnit.test("Subsequent View.createHandle with new properties", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            var handle2 = subject.view.createHandle(TestView.TEST_PROPERTIES_2());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_2(), 1, 0, ActiveManagement.ViewStatus.New), "remains 'new', has correct requirements, does not release view, updates subscriptions");
        });
        QUnit.test("Release handle on View (that does not remove any properties)", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1(), TestView.TEST_PROPERTIES_2());
            subject.testHandles[0].handle.release();
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_2(), 0, 0, ActiveManagement.ViewStatus.New), "remains 'new', has correct requirements, does not release view, does not update subscriptions");
        });
        QUnit.test("View.setStaticSubjects before any handles are created", function () {
            var subject = new TestView();
            subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 1, 0, ActiveManagement.ViewStatus.Inactive), "becomes 'inactive', has no requirements, does not release view, updates subscriptions");
            QUnit.deepEqual(subject.view.createHandle([]).subjects(), TestView.TEST_SUBJECTS_1(), "contains the static subjects");
        });
        QUnit.test("View.setStaticSubjects after handles are created", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 1, 0, ActiveManagement.ViewStatus.Inactive), "becomes 'inactive', has no requirements, does not release view, updates subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), TestView.TEST_SUBJECTS_1(), "contains the static subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
        });
        QUnit.test("View.setStaticSubjects after becoming inactive", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.testHandles[0].handle.release();
            subject.resetCounts();
            subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 0, 0, ActiveManagement.ViewStatus.Inactive), "remains 'inactive', has no requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.view.createHandle([]).subjects(), TestView.TEST_SUBJECTS_1(), "contains the static subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
        });
        QUnit.test("Subsequent View.setStaticSubjects call", function () {
            var subject = new TestView();
            subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_1());
            subject.resetCounts();
            subject.view.setStaticSubjects(TestView.TEST_SUBJECTS_2());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 0, 0, ActiveManagement.ViewStatus.Inactive), "remains 'inactive', has no requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.view.createHandle([]).subjects(), TestView.TEST_SUBJECTS_2(), "contains the second set of static subjects");
        });
        QUnit.test("View.updateSubjects with nulls", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(null, null);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.New), "remains 'new', has expected requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [], "contains no subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects adding empty list", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects([], null);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.Active), "becomes 'active', has expected requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [], "contains no subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects removing empty list", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(null, []);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.New), "remains 'new', has expected requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [], "contains no subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects adding and removing empty lists", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects([], []);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.Active), "becomes 'active', has expected requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [], "contains no subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects before any handles are created", function () {
            var subject = new TestView();
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 0, 0, ActiveManagement.ViewStatus.Active), "becomes 'active', has no requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.view.createHandle([]).subjects(), TestView.TEST_SUBJECTS_1(), "contains expected subjects");
        });
        QUnit.test("View.updateSubjects after handles are created", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.Active), "becomes 'active', retains correct requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), TestView.TEST_SUBJECTS_1(), "contains expected subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
        });
        QUnit.test("View.updatesSubjects adding an existing subject", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);
            subject.resetCounts();
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_1(), null);
            QUnit.deepEqual(subject.getTestState(), new TestViewState(TestView.TEST_PROPERTIES_1(), 0, 0, ActiveManagement.ViewStatus.Active), "becomes 'active', retains correct requirements, does no release view, does not update subscriptions");
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), TestView.TEST_SUBJECTS_1(), "contains expected subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects before any handles are created removing non-existing subject", function () {
            var subject = new TestView();
            subject.view.updateSubjects(null, TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.getTestState(), new TestViewState(null, 0, 0, ActiveManagement.ViewStatus.New), "remains 'new', has not requirements, does not release view, does not update subscriptions");
            QUnit.deepEqual(subject.view.createHandle([]).subjects(), [], "contains no subjects");
        });
        QUnit.test("View.updateSubjects after handles are created removing non-existing subject", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(null, TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [], "contains no subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects removing an existing subject", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
            subject.resetCounts();
            subject.view.updateSubjects(null, TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [
                TestView.TEST_SUBJECT_2()
            ], "contains expected subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes");
        });
        QUnit.test("View.updateSubjects adding multiple non-existing subjects", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), TestView.TEST_SUBJECTS_2(), "contains expected subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes once");
        });
        QUnit.test("View.updateSubjects adding multiple existing subjects", function () {
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
            subject.resetCounts();
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), TestView.TEST_SUBJECTS_2(), "contains expected subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 0, "does not notify about subject changes");
        });
        QUnit.test("View.updateSubjects adding and removing subjects", function () {
            var testSubject3 = new go.Subjects.SubjectViewModel({
                $subjectRefType: "thing",
                key: "thing-subject3"
            });
            var subject = new TestView(TestView.TEST_PROPERTIES_1());
            subject.view.updateSubjects(TestView.TEST_SUBJECTS_2(), null);
            subject.resetCounts();
            subject.view.updateSubjects([
                testSubject3
            ], TestView.TEST_SUBJECTS_1());
            QUnit.deepEqual(subject.testHandles[0].handle.subjects(), [
                TestView.TEST_SUBJECT_2(), 
                testSubject3
            ], "contains expected subjects");
            QUnit.equal(subject.testHandles[0].getSubjectsNotificationCount(), 1, "notifies about subject changes once");
        });
    })(go.ActiveManagement || (go.ActiveManagement = {}));
    var ActiveManagement = go.ActiveManagement;
})(go || (go = {}));
var kg;
(function (kg) {
    (function (GridTest) {
        QUnit.module("go.kg.Grid");
        test("creating instance of kg.Grid with no config throws error", function () {
            QUnit.throws(function () {
                var grid = new go.kg.Grid();
            }, go.IllegalArgumentError, "creating instance of kg.Grid should throw a go.IllegalArgumentError");
        });
        test("creating instance of kg.Grid with no id throws error", function () {
            QUnit.throws(function () {
                var grid = new go.kg.Grid("");
            }, go.IllegalArgumentError, "creating instance of kg.Grid should throw a go.IllegalArgumentError");
        });
        test("creating instance of kg.Grid with no columns throws error", function () {
            QUnit.throws(function () {
                var grid = new go.kg.Grid(null, []);
            }, go.IllegalArgumentError, "creating instance of kg.Grid should throw a go.IllegalArgumentError");
        });
        test("initializing grid should work", function () {
            var aGrid = new go.kg.Grid("aGrid", [
                new go.kg.Column("name", "")
            ], new go.ActiveManagement.ViewHandle([], ko.observableArray([]), ko.observable(1), function () {
            }));
            equal(aGrid.columns().length, 1, "grid should have 1 columns");
            equal(aGrid.items().length, 0, "grid should have 0 items");
            ok(!aGrid.selectable, "by default grid should not be selectable");
            ok(!aGrid.exportSettings.enabled, "by default grid should not be exportable");
            equal(go.kg.GridManager.get("aGrid"), aGrid, "grid should have been register in grid manager");
        });
        test("add new item to grid", function () {
            var a2Grid = new go.kg.Grid("a2Grid", [
                new go.kg.Column("name", "")
            ], new go.ActiveManagement.ViewHandle([], ko.observableArray([]), ko.observable(1), function () {
            }));
            equal(a2Grid.items().length, 0, "grid should have 0 items");
            equal(a2Grid.filteredItems().length, 0, "grid should have 0 filtered items");
            a2Grid.items.push({
                id: "one"
            });
            equal(a2Grid.items().length, 1, "grid should have 1 items");
            equal(a2Grid.filteredItems().length, 1, "grid should have 1 filtered items");
        });
    })(kg.GridTest || (kg.GridTest = {}));
    var GridTest = kg.GridTest;
})(kg || (kg = {}));
var kg;
(function (kg) {
    (function (GridSortingObservablesTest) {
        var SortableObjectWithObservables = (function () {
            function SortableObjectWithObservables(aString, aNum, aBool, aDate) {
                this.aString = ko.observable(aString);
                this.aNum = ko.observable(aNum);
                this.aBool = ko.observable(aBool);
                this.aDate = ko.observable(aDate);
            }
            return SortableObjectWithObservables;
        })();        
        var aGrid;
        var aGridColumns = [
            new go.kg.StringColumn("aString", ""), 
            new go.kg.NumberColumn("aNum", ""), 
            new go.kg.ColumnBool("aBool", ""), 
            new go.kg.DateColumn("aDate", "")
        ];
        QUnit.testStart(function () {
            var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                new SortableObjectWithObservables("goo", 171, false, new Date(2010, 0, 15)), 
                new SortableObjectWithObservables("foo", 7, true, new Date(2012, 0, 14)), 
                new SortableObjectWithObservables("bar", 8, false, new Date(2010, 1, 14)), 
                new SortableObjectWithObservables("Fooa", 25, true, new Date(2011, 0, 14)), 
                new SortableObjectWithObservables("Bara", 41, false, new Date(2010, 0, 14))
            ]), ko.observable(1), function () {
            });
            aGrid = new go.kg.Grid("aGrid", aGridColumns, viewHandle, "Showing All {0}", "Showing {0} of {1} {2}", "Item Added", "Item Removed", "aString");
        });
        QUnit.module("go.kg.Grid");
        test("basic string sorting using ko observables", function () {
            equal(aGrid.items().length, 5, "grid should have 5 items");
            var ascSortResult = [
                "bar", 
                "Bara", 
                "foo", 
                "Fooa", 
                "goo"
            ];
            aGrid.sortASC(aGridColumns[0]);
            for(var i = 0; i < ascSortResult.length; i++) {
                equal(aGrid.items()[i].aString(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
            var descSortResult = [
                "goo", 
                "Fooa", 
                "foo", 
                "Bara", 
                "bar"
            ];
            aGrid.sortDESC(aGridColumns[0]);
            for(var i = 0; i < descSortResult.length; i++) {
                equal(aGrid.items()[i].aString(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
        });
        test("basic number sorting using ko observables", function () {
            equal(aGrid.items().length, 5, "grid should have 5 items");
            var ascSortResult = [
                "foo", 
                "bar", 
                "Fooa", 
                "Bara", 
                "goo"
            ];
            aGrid.sortASC(aGridColumns[1]);
            for(var i = 0; i < ascSortResult.length; i++) {
                equal(aGrid.items()[i].aString(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
            var descSortResult = [
                "goo", 
                "Bara", 
                "Fooa", 
                "bar", 
                "foo"
            ];
            aGrid.sortDESC(aGridColumns[1]);
            for(var i = 0; i < descSortResult.length; i++) {
                equal(aGrid.items()[i].aString(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
        });
        test("basic bool sorting using ko observables", function () {
            equal(aGrid.items().length, 5, "grid should have 5 items");
            var ascSortResult = [
                true, 
                true, 
                false, 
                false, 
                false
            ];
            aGrid.sortASC(aGridColumns[2]);
            for(var i = 0; i < ascSortResult.length; i++) {
                equal(aGrid.items()[i].aBool(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
            var descSortResult = [
                false, 
                false, 
                false, 
                true, 
                true
            ];
            aGrid.sortDESC(aGridColumns[2]);
            for(var i = 0; i < descSortResult.length; i++) {
                equal(aGrid.items()[i].aBool(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
        });
        test("basic date sorting using ko observables", function () {
            equal(aGrid.items().length, 5, "grid should have 5 items");
            var ascSortResult = [
                "Bara", 
                "goo", 
                "bar", 
                "Fooa", 
                "foo"
            ];
            aGrid.sortASC(aGridColumns[3]);
            for(var i = 0; i < ascSortResult.length; i++) {
                equal(aGrid.items()[i].aString(), ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "asc", "items should be sorted asc");
            var descSortResult = [
                "foo", 
                "Fooa", 
                "bar", 
                "goo", 
                "Bara"
            ];
            aGrid.sortDESC(aGridColumns[3]);
            for(var i = 0; i < descSortResult.length; i++) {
                equal(aGrid.items()[i].aString(), descSortResult[i], "item in sorted array should be " + descSortResult[i]);
            }
            equal(aGrid.lastSortOrder(), "desc", "items should be sorted asc");
        });
    })(kg.GridSortingObservablesTest || (kg.GridSortingObservablesTest = {}));
    var GridSortingObservablesTest = kg.GridSortingObservablesTest;
})(kg || (kg = {}));
var Virtualization;
(function (Virtualization) {
    (function (VirtualMachine) {
        (function (PowerStateColumnTest) {
            QUnit.module("go.Virtualization");
            test("verify custom vm power state sorting", function () {
                var vmGridColumns = [
                    new go.Virtualization.VirtualMachine.PowerStateColumn("state", "powerStateColumn", null, true, false), 
                    
                ];
                var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                    new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-1"), {
                        powerState: "unknown",
                        name: "I'm not as cool",
                        guestFullName: "dos",
                        memorySize: 2048,
                        cpuCount: 2,
                        lastChangeDate: "2012-10-31 12:56:17.470"
                    }), 
                    new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-2"), {
                        powerState: "suspended",
                        name: "Test VM",
                        guestFullName: "windows",
                        memorySize: 1024,
                        cpuCount: 1,
                        lastChangeDate: "2012-06-08 16:10:59.203"
                    }), 
                    new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-3"), {
                        powerState: "wait",
                        name: "I'm cool",
                        guestFullName: "suse",
                        memorySize: 2048,
                        cpuCount: 2,
                        lastChangeDate: "2012-10-31 12:56:17.470"
                    }), 
                    new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-4"), {
                        powerState: "poweredOn",
                        name: "Prod VM",
                        guestFullName: "linux",
                        cpuCount: 2,
                        lastChangeDate: "2012-06-08 16:11:59.823"
                    }), 
                    new go.Virtualization.VirtualMachine.VirtualMachineModel(new go.ActiveManagement.TestSubjectRef("vi.vm", "vi.vm-5"), {
                        powerState: "poweredOff",
                        name: "The new hotness",
                        guestFullName: "ubuntu",
                        memorySize: 2048,
                        lastChangeDate: "2012-10-31 12:56:17.470"
                    })
                ]), ko.observable(1), function () {
                });
                var vmGrid = new go.kg.Grid("vmGrid", vmGridColumns, viewHandle);
                equal(vmGrid.items().length, 5, "grid should have 5 items");
                var ascSortResult = [
                    4, 
                    2, 
                    5, 
                    3, 
                    1
                ];
                vmGrid.sortASC(vmGridColumns[0]);
                for(var i = 0; i < ascSortResult.length; i++) {
                    equal(vmGrid.items()[i].getKey(), "vi.vm-" + ascSortResult[i], "item in sorted array should be " + ascSortResult[i]);
                }
                equal(vmGrid.lastSortOrder(), "asc", "items should be sorted asc");
                var descSortResult = [
                    1, 
                    3, 
                    5, 
                    2, 
                    4
                ];
                vmGrid.sortDESC(vmGridColumns[0]);
                for(var i = 0; i < descSortResult.length; i++) {
                    equal(vmGrid.items()[i].getKey(), "vi.vm-" + descSortResult[i], "item in sorted array should be " + descSortResult[i]);
                }
                equal(vmGrid.lastSortOrder(), "desc", "items should be sorted asc");
            });
        })(VirtualMachine.PowerStateColumnTest || (VirtualMachine.PowerStateColumnTest = {}));
        var PowerStateColumnTest = VirtualMachine.PowerStateColumnTest;
    })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
    var VirtualMachine = Virtualization.VirtualMachine;
})(Virtualization || (Virtualization = {}));
(function (go) {
    (function (BlankVM) {
        var OpenWizard = (function () {
            function OpenWizard() {
            }
            return OpenWizard;
        })();
        BlankVM.OpenWizard = OpenWizard;
    })(go.BlankVM || (go.BlankVM = {
    }));
    var BlankVM = go.BlankVM;
})(this.go);
(function (go) {
    (function (P2V) {
        var ShowDialog = (function () {
            function ShowDialog() {
            }
            return ShowDialog;
        })();
        P2V.ShowDialog = ShowDialog;
    })(go.P2V || (go.P2V = {
    }));
    var P2V = go.P2V;
})(this.go);
var Virtualization;
(function (Virtualization) {
    (function (VirtualMachine) {
        (function (CanExecutePowerCommandTest) {
            QUnit.module("go.Virtualization");
            test("vm commands can execute", function () {
                var vm = new go.Virtualization.VirtualMachine.VirtualMachineModel({
                    $subjectRefType: "vi.vm",
                    key: "vi.vm-1"
                }, {
                    powerState: "poweredOff",
                    name: "new hotness",
                    disabledMethods: [
                        "CreateSecondaryVM_Task", 
                        "TurnOffFaultToleranceForVM_Task", 
                        "MakePrimaryVM_Task", 
                        "TerminateFaultTolerantVM_Task", 
                        "DisableSecondaryVM_Task", 
                        "EnableSecondaryVM_Task", 
                        "MakePrimaryVM_Task", 
                        "TerminateFaultTolerantVM_Task", 
                        "Rename_Task", 
                        "Destroy_Task", 
                        "ReconfigVM_Task", 
                        "MigrateVM_Task", 
                        "RevertToCurrentSnapshot_Task", 
                        "RemoveAllSnapshots_Task", 
                        "CreateSnapshot_Task", 
                        "ConsolidateVMDisks_Task", 
                        "ResetVM_Task", 
                        "UnmountToolsInstaller", 
                        "MountToolsInstaller", 
                        "RebootGuest", 
                        "StandbyGuest", 
                        "ShutdownGuest", 
                        "PowerOffVM_Task", 
                        "ExtractOvfEnvironment", 
                        "SuspendVM_Task", 
                        "AcquireMksTicket", 
                        "AnswerVM", 
                        "UpgradeVM_Task", 
                        "UpgradeTools_Task", 
                        "CreateSecondaryVM_Task", 
                        "TurnOffFaultToleranceForVM_Task", 
                        "MakePrimaryVM_Task", 
                        "TerminateFaultTolerantVM_Task", 
                        "DisableSecondaryVM_Task", 
                        "EnableSecondaryVM_Task", 
                        "StartRecording_Task", 
                        "StopRecording_Task", 
                        "StartReplaying_Task", 
                        "StopReplaying_Task", 
                        "TurnOffFaultToleranceForVM_Task", 
                        "MakePrimaryVM_Task", 
                        "TerminateFaultTolerantVM_Task", 
                        "DisableSecondaryVM_Task", 
                        "EnableSecondaryVM_Task", 
                        "StopRecording_Task", 
                        "StopReplaying_Task", 
                        "CustomizeVM_Task", 
                        "MarkAsTemplate", 
                        "ResetGuestInformation", 
                        "CloneVM_Task", 
                        "ExportVm", 
                        "MarkAsVirtualMachine"
                    ]
                });
                var viewHandle = new go.ActiveManagement.ViewHandle([], ko.observableArray([
                    vm
                ]), ko.observable(1), function () {
                });
                var vmGrid = new go.Virtualization.VirtualMachine.Grid("vmGrid", [
                    new go.Virtualization.VirtualMachine.PowerStateColumn("state", "powerStateColumn", null, true, false), 
                    new go.kg.StringColumn("name", "nameColumn", "Name")
                ], viewHandle, "Showing <span class='results-count'>All</span> Virtual Machines", "Showing <span class='results-count'>{0} of {1}</span> Virtual Machines", "~/Virtualization/VirtualMachine/PowerOn", "~/Virtualization/VirtualMachine/PowerOff", "Virtual Machine Added", "Virtual Machine Removed", "name", true, new go.kg.ExportSettings("Virtual Machines Report", true), "vmGridActionsTemplate", 250);
                ok(!vmGrid.PowerOnCommand.canExecute(), "to start we shouldn't be able to power anything on or off b/c nothing is selected");
                ok(!vmGrid.PowerOffCommand.canExecute(), "to start we shouldn't be able to power anything on or off b/c nothing is selected");
                vmGrid.items()[0].selectState(go.kg.SelectableStates.SELECTED);
                ok(vmGrid.PowerOnCommand.canExecute(), "should be able to power on");
                ok(!vmGrid.PowerOffCommand.canExecute(), "should NOT be able to power off since it's already off");
            });
        })(VirtualMachine.CanExecutePowerCommandTest || (VirtualMachine.CanExecutePowerCommandTest = {}));
        var CanExecutePowerCommandTest = VirtualMachine.CanExecutePowerCommandTest;
    })(Virtualization.VirtualMachine || (Virtualization.VirtualMachine = {}));
    var VirtualMachine = Virtualization.VirtualMachine;
})(Virtualization || (Virtualization = {}));
//@ sourceMappingURL=VMware.Go.ClientWithUnitTests.generated.js.map
