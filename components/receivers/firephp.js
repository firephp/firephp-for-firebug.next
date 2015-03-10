

exports.for = function (API) {


    var transportReceiver1 = API.WILDFIRE.Receiver();
    transportReceiver1.setId("http://meta.firephp.org/Wildfire/Structure/FirePHP/FirebugConsole/0.1");
    transportReceiver1.addListener({
	    onMessageReceived: function(request, message) {

	        try {
	        	
	        	API.console.log("FirebugConsole onMessageReceived", message);

	        } catch (err) {
	        	API.console.error(err);
	        }
	    }
	});
    API.httpHeaderChannel.addReceiver(transportReceiver1);


    var transportReceiver2 = API.WILDFIRE.Receiver();
    transportReceiver2.setId("http://meta.firephp.org/Wildfire/Structure/FirePHP/Dump/0.1");
    transportReceiver2.addListener({
	    onMessageReceived: function(request, message) {

	        try {

	        	API.console.log("FirePHP onMessageReceived", message);

	        } catch (err) {
	        	API.console.error(err);
	        }
	    }
	});
    API.httpHeaderChannel.addReceiver(transportReceiver2);


/*
    // FirePHP 0.x compatibility
    var transportReceiver = API.WILDFIRE.Receiver();
    transportReceiver.setId("http://registry.pinf.org/cadorn.org/github/fireconsole/@meta/receiver/console/0.1.0");
    transportReceiver.addListener({
	    onMessageReceived: function(request, message) {

	        try {
	        	
	        	API.console.log("FireConsole onMessageReceived: " + message);

	        } catch (err) {
	        	API.console.error(err);
	        }
	    }
	});
    API.httpHeaderChannel.addReceiver(transportReceiver);
*/


	return {};
}

