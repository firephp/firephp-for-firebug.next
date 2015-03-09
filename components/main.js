
const EVENTS = require("eventemitter2");


exports.main = function (API) {

	const FBTRACE_API = makeAPI(API, {
		name: "fbtrace"
	});
	const FBTRACE_EXPORTS = require("./adapters/fbtrace").for(FBTRACE_API);
	//FBTRACE_EXPORTS.console.log("CALLED MAIN IN ADAPTER 4444!");
	//FBTRACE_API.emit("log", "CALLED MAIN IN ADAPTER 5555!");

	API.console = FBTRACE_EXPORTS.console;
	var console = makeAPI(API, {
		name: "main"
	}).console;


	console.log("Init components ...");

	try {

		const ADDON_API = makeAPI(API, {
			name: "adapters/addon"
		});
		const ADDON_EXPORTS = require("./adapters/addon").for(ADDON_API);



		const MONITORS_BUNDLE_SERVER_API = makeAPI(API, {
			name: "monitors/bundle-server"
		});
		const MONITORS_BUNDLE_SERVER_EXPORTS = require("./monitors/bundle-server").for(MONITORS_BUNDLE_SERVER_API);

		MONITORS_BUNDLE_SERVER_API.once("restarted", function () {

			ADDON_EXPORTS.reload();

		});



		const HTTP_RESPONSE_OBSERVER_API = makeAPI(API, {
			name: "adapters/http-response-observer"
		});
		const HTTP_RESPONSE_OBSERVER_EXPORTS = require("./adapters/http-response-observer").for(HTTP_RESPONSE_OBSERVER_API);

		HTTP_RESPONSE_OBSERVER_API.on("response", function (response) {

			API.console.log("response in MAIN", response);

		});



		const UI_DEVTOOLS_PANEL_API = makeAPI(API, {
			name: "ui/devtools-panel"
		});
		const UI_DEVTOOLS_PANEL_EXPORTS = require("./ui/devtools-panel").for(UI_DEVTOOLS_PANEL_API);



API.console.log("Open tab!");
API.TABS.open("http://localhost:49084/");



	} catch (err) {
		console.error(err.stack);
		throw err;
	}

	console.log("... init components done!");
}


function makeAPI (_API, extra) {
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
