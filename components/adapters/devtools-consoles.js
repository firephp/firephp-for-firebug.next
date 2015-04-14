


exports.for = function (API) {

	API.console.log("init devtools-consoles");

	
	const TABS = require("sdk/tabs");

	API.console.log("TABS.activeTab: " + TABS.activeTab, TABS.activeTab);
	API.console.log("TABS.activeTab.linkedBrowser: " + TABS.activeTab.linkedBrowser, TABS.activeTab.linkedBrowser);

console.log("YES!");

	const {gDevTools} = API.CU.import("resource:///modules/devtools/gDevTools.jsm", {});
	const {devtools} = API.CU.import("resource://gre/modules/devtools/Loader.jsm", {});


	function getWebConsole(tab) {
	  // |tab| is the XUL tab for the page you want.
	  let target = devtools.TargetFactory.forTab(tab);
	  let toolbox = gDevTools.getToolbox(target);
	  let panel = toolbox ? toolbox.getPanel("webconsole") : null;
	  return panel ? panel.hud : null;
	}


	// Get the Messages object which holds the main classes of Messages
	// used by the Web Console.
	const {Messages} = devtools.require("devtools/webconsole/console-output");

	// Create the simplest message we can.
	let msg1 = new Messages.Simple("hello world from devtools-console", {
	  category: "js",
	  severity: "error",
	});

	// Add it to the output.

	var wm = API.CC["@mozilla.org/appshell/window-mediator;1"].getService(API.CI.nsIWindowMediator);
	var tabbrowser = wm.getEnumerator('navigator:browser').getNext().gBrowser;
	API.console.log("tabbrowser.selectedTab: " + tabbrowser.selectedTab);


	let hud = getWebConsole(tabbrowser.selectedTab);
	hud.ui.output.addMessage(msg1);




	// Get HUDService - the Web/Browser Consoles manager.
	const hudservice = devtools.require("devtools/webconsole/hudservice");

	// Get the Browser Console - there can only be one.
	// This method returns null if the Browser Console is not open.
	let browserConsole = hudservice.getBrowserConsole();

	// Add a message.
	browserConsole.ui.output.addMessage(msg1);




const Heritage = require("sdk/core/heritage");

console.log("Heritage: " + typeof Heritage);

Messages.RandomPrefix = function(msg) {
  this._onClick = this._onClick.bind(this);

  let prefix = this._getPrefix();
  Messages.Simple.call(this, prefix + msg, {
    linkCallback: this._onClick,
  });
};

Messages.RandomPrefix.prototype = Heritage.extend(Messages.Simple.prototype,
{
  _onClick: function() {
    let body = this.element.querySelector(".body");
    let newPrefix = this._getPrefix();
    body.textContent = body.textContent.replace(/^\[[\d.]+\]/, newPrefix);
  },

  _getPrefix: function() {
    return "[" + Math.random() + "] ";
  },
});

// Later you can use this message class.
let msg4 = new Messages.RandomPrefix("oh la la");
hud.ui.output.addMessage(msg4);
browserConsole.ui.output.addMessage(msg4);

console.log("LOGGED OLALA");





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



	API.console.log("init devtools-consoles DONE");


    return {};
}
