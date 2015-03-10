
exports.for = function (API) {

    const OBSERVER_SERVICE = API.CC["@mozilla.org/observer-service;1"].getService(API.CI.nsIObserverService);

    var processors = [];
    var requestIndex = 0;

    const LISTENER = {
        observe: function(subject, topic, data) {
            if (topic == "http-on-modify-request") {

                var httpChannel = subject.QueryInterface(API.CI.nsIHttpChannel);

                try {

                    var requestHeaders = [];
                    var requestId;
                    httpChannel.visitRequestHeaders({
                        visitHeader: function(name, value) {
                            requestHeaders.push({name: name, value: value});
                            if (name.toLowerCase() === "x-request-id") {
                                requestId = value;
                            }
                        }
                    });

                    processors.forEach(function (processor) {
                        processor({
                            "id": requestId || "id:" + httpChannel.URI.spec + ":" + requestIndex,
                            "url": httpChannel.URI.spec,
                            "hostname": httpChannel.URI.host,
                            "port": httpChannel.URI.port,
                            "method": httpChannel.requestMethod,
                            "headers": requestHeaders,
                            "httpChannel": httpChannel,
                            setRequestHeader: function (name, value) {
                                httpChannel.setRequestHeader(name, value, false);
                            }
                        });
                    });

                } catch (err) {
                    API.console.error(err);
                }
            }
        }
    };


    OBSERVER_SERVICE.addObserver(LISTENER, "http-on-modify-request", false);

    API.on("destroy", function () {
        OBSERVER_SERVICE.removeObserver(LISTENER, "http-on-modify-request");
    });

    return {
        register: function (processor) {
            processors.push(processor);
        }
    };
}
