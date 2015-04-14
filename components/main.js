
const EVENTS = require("eventemitter2");


exports.main = function (API) {

	var exports = {};

	exports.turn = function (resolvedConfig) {

		var makeAPI = API.makeAPI = function (_API, extra) {
			var API = new EVENTS();
			for (var name in extra) {
				API[name] = extra[name];
			}
			for (var name in _API) {
				API[name] = _API[name];
				if (
					name === "console" &&
					typeof (API[name].for) === "function"
				) {
					API[name] = API[name].for(API);
				}
			}
			return API;
		}

		var console = makeAPI(API, {
			name: "main"
		}).console;

		console.log("Init components ...");

		try {

			const ADDON_API = makeAPI(API, {
				name: "adapters/addon"
			});
			const ADDON_EXPORTS = require("./adapters/addon").for(ADDON_API);



			if (API.inDevMode()) {


			}



			const UI_DEVTOOLS_EXTENSION_API = makeAPI(API, {
				name: "ui/devtools-extension"
			});
			const UI_DEVTOOLS_EXTENSION_EXPORTS = require("./ui/devtools-extension").for(UI_DEVTOOLS_EXTENSION_API);

	//UI_DEVTOOLS_EXTENSION_EXPORTS.initialize(options);
	//UI_DEVTOOLS_EXTENSION_EXPORTS.shutdown(reason);

			const UI_DEVTOOLS_PANEL_API = makeAPI(API, {
				name: "ui/devtools-panel",
				config: resolvedConfig
			});
			const UI_DEVTOOLS_PANEL_EXPORTS = require("./ui/devtools-panel").for(UI_DEVTOOLS_PANEL_API);


			const UI_DEVTOOLS_CONSOLES_API = makeAPI(API, {
				name: "adapters/devtools-consoles"
			});
			const UI_DEVTOOLS_CONSOLES_EXPORTS = require("./adapters/devtools-consoles").for(UI_DEVTOOLS_CONSOLES_API);




			const FIREBUG_API = makeAPI(API, {
				name: "adapters/firebug"
			});
			const FIREBUG_EXPORTS = require("./adapters/firebug").for(FIREBUG_API);


			const RECEIVERS_API = makeAPI(API, {
				name: "receivers/_boot"
			});
			RECEIVERS_API.REQUEST_OBSERVER = require("./adapters/http-request-observer").for(makeAPI(API, {
				name: "adapters/http-request-observer"
			}));
			RECEIVERS_API.RESPONSE_OBSERVER = require("./adapters/http-response-observer").for(makeAPI(API, {
				name: "adapters/http-response-observer"
			}));
			const RECEIVERS_EXPORTS = require("./receivers/_boot").for(RECEIVERS_API);



		} catch (err) {
			console.error("ERROR: " + err.message, err.stack);
			throw err;
		}

		console.log("... init components done!");

	}

	return exports;
}

