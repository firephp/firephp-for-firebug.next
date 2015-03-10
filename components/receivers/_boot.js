
const WILDFIRE = require("wildfire-for-js");


exports.for = function (API) {

    API.WILDFIRE = WILDFIRE;


    function isEnabled () {
        return true;
    }


    var httpHeaderChannel = API.httpHeaderChannel = API.WILDFIRE.HttpHeaderChannel({
        "enableTransport": false
    });
    httpHeaderChannel.setNoReceiverCallback(function(id) {
        API.console.error("trying to log to unknown receiver: " + id);
    });


    // TODO: Use a PINF directive to get list of receivers.
    var receivers = [
        ["receivers/firephp", require("./firephp"), null /* api */, null /* exports */]
    ];
    receivers.forEach(function (receiver) {
        receiver[2] = API.makeAPI(API, {
            name: receiver[0]
        });
        receiver[3] = receiver[1].for(receiver[2]);
    });



    var announceDispatcher = API.WILDFIRE.Dispatcher();
    announceDispatcher.setProtocol('http://registry.pinf.org/cadorn.org/wildfire/@meta/protocol/announce/0.1.0');
    announceDispatcher.setChannel(httpHeaderChannel);

    function getAnnounceMessageForRequest (request) {

        if (!getAnnounceMessageForRequest._forHostnames) {
            getAnnounceMessageForRequest._forHostnames = {};
        }
        var cache = getAnnounceMessageForRequest._forHostnames;

        // TODO: Don't just use `request.hostname` for cache.
        // TODO: If config changes this announceMessage needs to be reset

        if (cache[request.hostname]) {
            return cache[request.hostname];
        }

        cache[request.hostname] = new API.WILDFIRE.Message();
        cache[request.hostname].setData(JSON.stringify({
            // TODO: Populate crypto-based key
            "authkey": null,
            "receivers": httpHeaderChannel.receivers.map(function (receiver) {
                return receiver.getId();
            })
        }));

        return cache[request.hostname];
    }

    API.REQUEST_OBSERVER.register(function (request) {
        if (!isEnabled()) return;

        if (!request.httpChannel.getRequestHeader("User-Agent").match(/\sFirePHP\/([\.|\d]*)\s?/)) {
            request.httpChannel.setRequestHeader("User-Agent", request.httpChannel.getRequestHeader("User-Agent") + " FirePHP/0.5", false);
        }

        // NOTE: Do NOT set this header. This only works with FirePHPCore 0.3.2 and most users are using
        //       FirePHPCore 0.3.1. If someone does not want their user-agent modified they should use FirePHP 1.0 with DeveloperCompanion
        //       and disable the 'extensions.devcomp.firePHPCoreCompatibility' option.
        // request.httpChannel.setRequestHeader("X-FirePHP-Version", "0.4", false);

        var announceMessage = getAnnounceMessageForRequest(request);
        if (announceMessage) {
            // dispatch announce message
            announceDispatcher.dispatch(announceMessage);

            // flush channel
            httpHeaderChannel.flush({
                setMessagePart: function(name, value) {
                    request.httpChannel.setRequestHeader(name, value, false);
                },
                getMessagePart: function(name) {
                    if (request.httpChannel.getRequestHeader) {
                        return null;
                    }
                    // HACK: Do not use exception for flow control
                    try {
                        return request.httpChannel.getRequestHeader(name);
                    } catch (err) {
                        return null;
                    }
                }
            });
        } else {
            // TODO: Use a proper unique ID + counter.
            request.httpChannel.setRequestHeader("x-request-id", ""+(new Date().getTime()) + "" + Math.floor(Math.random()*1000+1), false);
        }

        // API.console.log("REQUEST", request);

    });

    API.RESPONSE_OBSERVER.on("response", function (response) {
        if (!isEnabled()) return;

        // API.console.log("RESPONSE", response);

        try {

            httpHeaderChannel.parseReceived(response.headers, {
                "MozillaRequestObserverListener": {
                    "httpChannel": response.httpChannel
                },
                "id": response.request.id,
                "url": response.request.url,
                "hostname": response.request.hostname,
                "port": response.request.port,
                "method": response.request.method,
                "status": response.status,
                "contentType": response.contentType,
                "requestHeaders": response.request.headers
            });

        } catch (err) {
            API.console.error(err);
        }

    });
}

