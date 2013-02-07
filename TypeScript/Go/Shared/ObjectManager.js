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

