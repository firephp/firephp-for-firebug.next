
exports.for = function (API) {

	var pageWorker = API.PAGE_WORKER.Page({
		contentScriptFile: "./bundle-server-monitor.js"
	});

/*
	pageWorker.port.on("message", function (msg) {
API.console.log("monitor worker LOADED: " + msg);
	});
*/

	pageWorker.port.on("opened", function () {
//API.console.log("SERVER OPENED");
	});

	pageWorker.port.on("closed", function () {
//API.console.log("SERVER CLOSED: trigger reload!");
	});

	pageWorker.port.on("reopened", function () {
//API.console.log("SERVER RE-OPENED!");
		API.emit("restarted");
	});

}
