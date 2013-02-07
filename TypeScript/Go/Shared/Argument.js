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

