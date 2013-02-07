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

