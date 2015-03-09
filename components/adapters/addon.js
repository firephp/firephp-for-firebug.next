
// @see https://github.com/Gozala/jpm-addon/blob/master/core.js

exports.for = function (API) {

    return {
        reload: function () {

            var addonId = API.SELF.id;

            return API.ADDON_INSTALLER.disable(addonId).then(function () {

                API.CC["@mozilla.org/observer-service;1"].
                    getService(API.CI.nsIObserverService).
                    notifyObservers({}, "startupcache-invalidate", null);

                return API.ADDON_INSTALLER.enable(addonId);
            });
        }
    };
}
