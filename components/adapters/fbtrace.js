
exports.for = function (API) {

    // TODO Externalise this constant.
    const PREF_DOMAIN = "extensions.firephp-for-firebug-next";

    var FBTrace = {};
    try {
        var scope = {};
        API.CU["import"]("resource://fbtrace/firebug-trace-service.js", scope);
        FBTrace = scope.traceConsoleService.getTracer(PREF_DOMAIN);
    } catch(err) {
    }


    function log (label, obj) {
        if (typeof object === "undefined") {
            object = label;
            label = ("" + obj);
        }
        FBTrace.sysout(label, obj);
    }
    API.on("log", log);


    var Console = function (context) {
        var self = this;

        self._context = context;

        self._prefixLabel = function (label) {
            if (self._context.name) {
                label = "[" + self._context.name + "] " + label;
            }
            return label;
        }
    }
    Console.prototype.for = function (context) {
        return (new Console(context));
    }
    Console.prototype.log = function (label, obj) {
        return log(this._prefixLabel(label || ("" + obj)), obj);
    }
    Console.prototype.error = function (label, obj) {
        return log(this._prefixLabel("ERROR: " + (label || ("" + obj))), obj);
    }


    return {
        FBTrace: FBTrace,
        console: new Console(API)
    };
}
