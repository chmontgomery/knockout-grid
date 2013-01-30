module goglobal {
	/**
	* Used to manage the references to objects.
	* Specifically useful for handlers that do not have the context of your local object or lose context with SetTimeout.
	*/
	export class ObjectManager {

		private objects = {};
		private isDebug: bool = false;

		private logger(message: string) {
			if (this.isDebug) {
				console.log(message);
			}
		}

		/**
		* @param {String} id unique id to use a key
		* @param {Object} object to be stored
		* @return {Object} the object that was registered
		*/
		public register(id, object) {
			if (this.objects[id]) {
				this.logger('go.ObjectManager.Register -> "' + id + '" already registered in manager. The value will now be overridden with your new object.');
			} else {
				this.logger('go.ObjectManager.Register -> registering object "' + id + '"');
			}
			this.objects[id] = object;
			return object;
		}

		public remove(id: string): bool {
			/// <returns type="bool">if the object was successfully unregistered</returns>
			this.logger('go.ObjectManager.Remove -> un-registering object "' + id + '"');
			if (this.objects[id]) {
				return delete this.objects[id];
			}
			return false;
		}

		/**
		* @param {String} id unique id to use a key
		* @return {Object} the object for the given id
		*/
		public get(id: string) {
			if (!(id in this.objects)) {
				return null; // could not find the object, return null
			}
			this.logger('go.ObjectManager.Get -> returning object obj for "' + id + '"');
			return this.objects[id];
		}

		/**
		* @param {String} id of object key
		* @return {Boolean} true if object is contained in object manager by the given key
		*/
		public contains(id): bool {
			var contains = (id in this.objects);
			this.logger('go.ObjectManager.Contains -> id in manager?: ' + contains);
			return contains;
		}

		/**
		* Get all objects out of the manager by matching a key to the given regex
		* @param {Regex} regexPattern regular expression to match against
		* @return {Array} the array of objects for the given pattern
		*/
		public getAllByRegex(regexPattern) {
			var matchedKeys = [];
			var matcher = new RegExp(regexPattern);
			for (var key in this.objects) {
				if (matcher.test(key)) {
					matchedKeys.push(key);
				}
			}
			return matchedKeys;
		}

		/**
		* Get a single object out of the manager by matching a key to the given regex. If a match is not found or more than one match is found an error is thrown.
		* @param {Regex} regexPattern regular expression to match against
		* @return {Object} the object for the given pattern. If more than 1 match is found or no match is found an error is thrown.
		*/
		public getSingleByRegex(regexPattern) {
			var matchedKeys = this.getAllByRegex(regexPattern);
			if (matchedKeys.length === 1) {
				return this.objects[matchedKeys[0]];
			} else if (matchedKeys.length > 1) {
				throw new Error('go.ObjectManager.Register -> found multiple matches in manager for regex "' + regexPattern + '". Matching keys: ' + matchedKeys.toString());
			} else {
				throw new Error('go.ObjectManager.Register -> object NOT found in manager using regex "' + regexPattern + '"');
			}
		}
	}
}