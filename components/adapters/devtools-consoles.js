


exports.for = function (API) {

	API.console.log("init devtools-consoles");


	const {gDevTools} = API.CU.import("resource:///modules/devtools/gDevTools.jsm", {});
	const {devtools} = API.CU.import("resource://gre/modules/devtools/Loader.jsm", {});
	const TABS = require("sdk/tabs");
	const {Messages, Widgets} = devtools.require("devtools/webconsole/console-output");
	const Heritage = require("sdk/core/heritage");


	function getSelectedTab () {
		var wm = API.CC["@mozilla.org/appshell/window-mediator;1"].getService(API.CI.nsIWindowMediator);
		var tabbrowser = wm.getEnumerator('navigator:browser').getNext().gBrowser;
		return tabbrowser.selectedTab;
	}

	function getWebConsole (tab) {
		// |tab| is the XUL tab for the page you want.
		let target = devtools.TargetFactory.forTab(tab);
		let toolbox = gDevTools.getToolbox(target);
		let panel = toolbox ? toolbox.getPanel("webconsole") : null;
		return panel ? panel.hud : null;
	}


	// Simple Message

	function makeSimpleMessage () {
		return new Messages.Simple("hello world from devtools-console: " + Date.now(), {
		  category: "js",
		  severity: "error"
		});
	}

	function makeNewMessageTypeMessage () {
		Messages.RandomPrefix = function(msg) {
		  this._onClick = this._onClick.bind(this);

		  let prefix = this._getPrefix();
		  Messages.Simple.call(this, prefix + msg, {
		    linkCallback: this._onClick,
		    category: "webdev",
			severity: "log"
		  });
		};


		Messages.RandomPrefix.prototype = Heritage.extend(Messages.Simple.prototype,
		{
		  _onClick: function() {
			/* this.element.innerHTML:
			<span xmlns="http://www.w3.org/1999/xhtml" class="timestamp devtools-monospace">21:09:50.622 </span>
			<span xmlns="http://www.w3.org/1999/xhtml" class="indent" style="width: 0px;"/>
			<span xmlns="http://www.w3.org/1999/xhtml" class="icon" title="Error"/>
			<span xmlns="http://www.w3.org/1999/xhtml" class="message-body-wrapper message-body devtools-monospace"><span>
				<a href="#" draggable="false">[0.8859326232359753] oh la la</a>
			</span>
			</span>
			*/
		    let body = this.element.querySelector(".message-body");
		    let newPrefix = this._getPrefix();
		    body.textContent = body.textContent.replace(/^\[[\d.]+\]/, newPrefix);

		    var self = this;
		    body.addEventListener("click", function (event) {

		    	self._onClick();

console.log("CLICKED AFTER!!");

		    }, false);
		  },

		  _getPrefix: function() {
		    return "[" + Math.random() + "] ";
		  },
		});

		// Later you can use this message class.
		return new Messages.RandomPrefix("oh la la");
	}


	function logSet () {

		let hud = getWebConsole(getSelectedTab());
		// Get HUDService - the Web/Browser Consoles manager.
		const hudservice = devtools.require("devtools/webconsole/hudservice");
		// Get the Browser Console - there can only be one.
		// This method returns null if the Browser Console is not open.
		let browserConsole = hudservice.getBrowserConsole();


		if (hud) {
			console.log("Logging to Web Console");
			hud.ui.output.addMessage(makeSimpleMessage());
			hud.ui.output.addMessage(makeNewMessageTypeMessage());
		} else {
			console.log("Web Console not open");
		}

		if (browserConsole) {
			console.log("Logging to Browser Console");
			browserConsole.ui.output.addMessage(makeSimpleMessage());
			browserConsole.ui.output.addMessage(makeNewMessageTypeMessage());
		} else {
			console.log("Browser Console not open");
		}
	}

	require("sdk/timers").setInterval(function () {

		console.log("Log set");

		logSet();

	}, 3 * 1000);


/*




	const XHTML_NS = "http://www.w3.org/1999/xhtml";

	// Create a DOM element to be added in this message.
	let file = browserConsole.ui.output.document.createElementNS(XHTML_NS, "a");
	file.textContent = "foobar.js";
	file.href = "http://example.com/foobar.js";

	// Use a function to display an interactive button.
	// This is invoked when the message is rendered.
	function button(msg) {
	  let clicks = 0;
	  let elem = msg.document.createElementNS(XHTML_NS, "button");
	  elem.textContent = "click me " + Date.now();
	  elem.onclick = function() {
	    elem.textContent = "clicks " + (++clicks);
	  };
	  return elem;
	}

	// Create the message object.
	let pieces = ["there was an error in ", file, button];
	let msg2 = new Messages.Extended(pieces, {
	  category: "js",
	  severity: "error",
	});

	// Make sure a click on the file name opens the anchor in a new tab.
//	msg2._addLinkCallback(file);

	// Add the new message.

	hud.ui.output.addMessage(msg2);
	browserConsole.ui.output.addMessage(msg2);

*/

	API.console.log("init devtools-consoles DONE");


    return {};
}
