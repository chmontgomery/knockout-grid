/// <reference path="IllegalArgumentError.ts" />
module go {
	export class Argument {
		static notNull(arg: any, argName: string) {
			if (typeof arg === 'undefined' || arg === null) {
				throw new go.IllegalArgumentError("argument '" + argName + "' cannot be null.");
			}
			return true;
		}

		static boolOrTrue(arg: any): bool {
			if (typeof arg === 'undefined' || arg === null) {
				return true;
			}
			return !!arg;
		}

		static boolOrFalse(arg: any): bool {
			if (typeof arg === 'undefined' || arg === null) {
				return false;
			}
			return !!arg;
		}

		static stringOrEmptyString(arg: any): string {
			return go.Argument.stringOrDefault(arg, "");
		}

		static stringOrDefault(arg: any, stringDefault: string): string {
			if (typeof arg === 'undefined' || arg === null) {
				return stringDefault;
			}
			return arg + '';
		}

		static objectOrDefault(value: any, defaultValue: any) {
			return typeof value === "undefined" ? defaultValue : value;
		}
	}
}