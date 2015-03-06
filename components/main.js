
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


	console.log("Init components");


	const HTTP_RESPONSE_OBSERVER_API = makeAPI(API, {
		name: "http-response-observer"
	});
	const HTTP_RESPONSE_OBSERVER_EXPORTS = require("./adapters/http-response-observer").for(HTTP_RESPONSE_OBSERVER_API);


	HTTP_RESPONSE_OBSERVER_API.on("response", function (response) {

		API.console.log("response in MAIN", response);

	});
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
