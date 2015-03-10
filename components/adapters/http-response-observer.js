
exports.for = function (API) {

    const OBSERVER_SERVICE = API.CC["@mozilla.org/observer-service;1"].getService(API.CI.nsIObserverService);

    var requestIndex = 0;

    const LISTENER = {
        observe: function(subject, topic, data) {
            if (topic == "http-on-examine-response") {

                var httpChannel = subject.QueryInterface(API.CI.nsIHttpChannel);

                try {
                    var requestHeaders = [];
                    var requestId;
                    httpChannel.visitRequestHeaders({
                        visitHeader: function(name, value) {
                            requestHeaders.push({name: name, value: value});
                            if(name.toLowerCase()=="x-request-id") {
                                requestId = value;
                            }
                        }
                    });
                    var responseHeaders = [],
                        contentType = false;
                    httpChannel.visitResponseHeaders({
                        visitHeader: function(name, value) {
                            responseHeaders.push({name: name, value: value});
                            if (name.toLowerCase() == "content-type")
                                contentType = value;
                        }
                    });

                    requestIndex += 1;

                    var response = {
                        "request": {
                            "id": requestId || "id:" + httpChannel.URI.spec + ":" + requestIndex,
                            "url": httpChannel.URI.spec,
                            "hostname": httpChannel.URI.host,
                            "port": httpChannel.URI.port,
                            "method": httpChannel.requestMethod,
                            "headers": requestHeaders
                        },
                        "httpChannel": httpChannel,
                        "status": httpChannel.responseStatus,
                        "contentType": contentType,
                        "headers": responseHeaders
                    };

                    //API.console.log("response", response);

                    API.emit("response", response);

                } catch (err) {
                    API.console.error(err);
                }
            }
        }
    };


    OBSERVER_SERVICE.addObserver(LISTENER, "http-on-examine-response", false);

    API.on("destroy", function () {
        OBSERVER_SERVICE.removeObserver(LISTENER, "http-on-examine-response");
    });

    return {
        on: API.on.bind(API)
    };
}
