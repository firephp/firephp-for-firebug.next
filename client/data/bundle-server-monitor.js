

// Connect to server, on error reconnect and once reconnected
// signal reconnect. Client can this determine when server is rebooted and comes back.
// TODO: Include an instance ID in websocket condition so we can distinguish
//       between network issues and server restarts.


function connectAndWaitForError (first, _onError) {

	var onError = function (err) {
		if (!_onError) return;
		_onError(err);
		_onError = null;
	}

	var ws = new WebSocket("ws://localhost:8080");
	ws.onopen = function (event) {
		if (first) {
			self.port.emit("opened");
		} else {
			self.port.emit("reopened");
		}
//		ws.send("Send test message from client to server!");
	};

	ws.onerror = function (err) {
		onError(err);
	};

	/*
	ws.onmessage = function (message) {
		self.port.emit("message", "got message: " + message);
	}
	*/

	ws.onclose = function () {
		onError(new Error("closed"));
	}
}


function reconnect (first) {
	return setTimeout(function () {
		return connectAndWaitForError(first, function (err) {
			if (first) {
				self.port.emit("closed");
			}
			return reconnect(false);
		});
	}, 500);
}


reconnect(true);

