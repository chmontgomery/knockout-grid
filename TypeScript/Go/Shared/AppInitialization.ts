/// <reference path="../Virtualization/VimTask.ts" />
/// <reference path="../Virtualization/VirtualMachine/VirtualMachineModel.ts" />
/// <reference path="../GoDomain.generated.ts" />
/// <reference path="IllegalArgumentError.ts" />

module go.AppInitialization {
    export function Initialize() {
        Subjects.ViewModelFactory.setVirtualMachineFactory((subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new go.Virtualization.VirtualMachine.VirtualMachineModel(subjectRef, properties));
		Subjects.ViewModelFactory.setVimTaskFactory((subjectRef: Subjects.SubjectRef, properties?: go.StringToAnyMap) => new go.Virtualization.VimTask(subjectRef, properties));
    }
}