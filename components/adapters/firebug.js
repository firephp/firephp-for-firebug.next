
const SYSTEM = require("firebug.sdk/lib/core/system").System;


exports.for = function (API) {

	API.console.log("isDeveloperBrowser: " + SYSTEM.isDeveloperBrowser());

    return {};
}

