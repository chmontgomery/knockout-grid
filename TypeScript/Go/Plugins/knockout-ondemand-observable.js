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
