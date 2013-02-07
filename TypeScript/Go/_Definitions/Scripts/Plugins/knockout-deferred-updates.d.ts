/// <reference path="../../_allRefs.d.ts" />

interface KnockoutComputed {
	 deferedUpdates: bool;
}

interface KnockoutTasks {
	processImmediate(evaluator: () => void, object?: any, args?: Array): void;
}

interface KnockoutStatic {
	processAllDeferredBindingUpdates(): void;
	processAllDeferredUpdates(): void;
	tasks: KnockoutTasks;
}

declare var ko: KnockoutStatic;