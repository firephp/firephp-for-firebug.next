
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

    function normalizeLogArguments (label, obj) {
        if (typeof obj === "undefined") {
            obj = label;
            label = ("" + obj);
        }
        return {
            label: label,
            obj: obj
        };
    }

    function log (label, obj) {
        var args = normalizeLogArguments(label, obj);
        FBTrace.sysout(args.label, args.obj);
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
        var args = normalizeLogArguments(label, obj);
        return log(this._prefixLabel(args.label), args.obj);
    }
    Console.prototype.error = function (label, obj) {
        var args = normalizeLogArguments(label, obj);
        return log(this._prefixLabel("ERROR: " + args.label), args.obj);
    }


    return {
        FBTrace: FBTrace,
        console: new Console(API)
    };
}
