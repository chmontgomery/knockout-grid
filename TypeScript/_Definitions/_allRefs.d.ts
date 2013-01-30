/// <reference path="Scripts/Shared/Global.d.ts" />
/// <reference path="CDN/knockout-utils.d.ts" />
/// <reference path="CDN/knockout-2.2.d.ts" />
/// <reference path="CDN/jqueryui.d.ts" />
/// <reference path="CDN/jquery.blockUI.d.ts" />
/// <reference path="CDN/jquery-1.8.d.ts" />
/// <reference path="Scripts/Plugins/toastr.d.ts" />
/// <reference path="Scripts/Plugins/signalr-1.0.d.ts" />
/// <reference path="Scripts/Plugins/knockout.mapping-2.0.d.ts" />
/// <reference path="Scripts/Plugins/knockout-dynamic-throttle.d.ts" />
/// <reference path="Scripts/Plugins/knockout-deferred-updates.d.ts" />
/// <reference path="../_G11n/Resources.d.ts" />
/// <reference path="Routes.d.ts" />

// This file just collects all external references into a single reference.
// Include this file in project files; do NOT include the individual reference files, as they have type numbers in their names
// and will be painful to update when revving.

// defined in Global.js
interface String {
	format(...args: any[]): string;
}