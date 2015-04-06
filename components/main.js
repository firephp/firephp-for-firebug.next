
const EVENTS = require("eventemitter2");



exports.main = function (API) {

	var exports = {};

	exports.resolve = function (resolver, config, previousResolvedConfig) {

		API.insight.debug("1 resolve()", resolver, config, previousResolvedConfig);

		return resolver({}).then(function (resolvedConfig) {

			API.insight.debug("2 resolve() - resolvedConfig", resolvedConfig);

			return resolvedConfig;
		});
	}

	exports.turn = function (resolvedConfig) {

		API.insight.debug("3 turn()", resolvedConfig);

	}

	exports.spin = function (resolvedConfig) {

		API.insight.debug("4 spin()", resolvedConfig);

	}

	return exports;
}





exports.main2 = function (API) {


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



		if (API.inDevMode()) {


		}



		const UI_DEVTOOLS_EXTENSION_API = makeAPI(API, {
			name: "ui/devtools-extension"
		});
		const UI_DEVTOOLS_EXTENSION_EXPORTS = require("./ui/devtools-extension").for(UI_DEVTOOLS_EXTENSION_API);

//UI_DEVTOOLS_EXTENSION_EXPORTS.initialize(options);
//UI_DEVTOOLS_EXTENSION_EXPORTS.shutdown(reason);


		const UI_DEVTOOLS_PANEL_API = makeAPI(API, {
			name: "ui/devtools-panel"
		});
		const UI_DEVTOOLS_PANEL_EXPORTS = require("./ui/devtools-panel").for(UI_DEVTOOLS_PANEL_API);



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


//API.TABS.open("http://localhost:49084/");
API.TABS.open("http://firephp.org/");


/*
GDEVTOOLS.on("webconsole-init", onConsoleInit);
// Console panel customization.
function onConsoleInit(eventId, toolbox, panelFrame) {
  // Use the toolbox object and wait till the Console panel
  // is fully ready (panel frame loaded).
  toolbox.once("webconsole-ready", (eventId, panel) => {
    panel.hud.ui.on("new-messages", onNewMessages);
  });
}
function onNewMessages(topic, messages) {
  messages.forEach(msg => {
    onNewMessage(msg);
  });
}
function onNewMessage(msg) {
  // Get DOM node associated with the message
  let node = msg.node;
  let category = node.getAttribute("category");

  // If category of the node is 'console' change the background.
  if (category == "console") {
    msg.node.setAttribute("style", "background-color: green");
  }
}
*/

	} catch (err) {
		console.error(err.stack);
		throw err;
	}

	console.log("... init components done!");
}

