// Type definitions for Knockout.Mapping 2.0
// Project: https://github.com/SteveSanderson/knockout.mapping
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../../CDN/knockout-2.2.d.ts" />

interface KnockoutMappingCreateOptions {
    data: any;
    parent: any;
}

interface KnockoutMappingUpdateOptions {
    data: any;
    parent: any;
    observable: KnockoutObservableAny;
}

interface KnockoutMappingOptions {
    ignore? : string[];
    include? : string[];
    copy? : string[];
    mappedProperties? : string[];
    deferEvaluation? :  bool;
    create?: (options: KnockoutMappingCreateOptions) => void;
    update?: (options: KnockoutMappingUpdateOptions) => void;
}

interface KnockoutMapping {
    isMapped(viewModel: any): bool;
    fromJS(jsObject: any): any;
    fromJS(jsObject: any, targetOrOptions: any): any;
    fromJS(jsObject: any, inputOptions: any, target: any): any;
    fromJSON(jsonString: string): any;
    toJS(rootObject: any, options?: KnockoutMappingOptions): any;
    toJSON(rootObject: any, options?: KnockoutMappingOptions): any;
    defaultOptions(): KnockoutMappingOptions;
    resetDefaultOptions(): void;
    getType(x: any): any;
    visitModel(rootObject: any, callback: Function, options?: { visitedObjects?; parentName?; ignore?; copy?; include?; } ): any;
}

interface KnockoutStatic {
    mapping: KnockoutMapping;
}
