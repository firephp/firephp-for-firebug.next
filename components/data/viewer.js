
setInterval(function () {

	self.port.emit("message", "Message data");

}, 1000);

self.port.on("message", function(data) {
	dump("GOT MESSAGE IN CONTRENT SCRIPT : " + data);
});

