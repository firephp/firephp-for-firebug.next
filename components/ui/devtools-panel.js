

const self = require("sdk/self");

const { viewFor } = require("sdk/view/core");


exports.for = function (API) {

    const Panel = API.CLASS(
    {
        extends: API.DEV_PANEL,

        label: "FirePHP",
        tooltip: "Log from PHP scripts to Console",
        icon: "bundles/components/main/data/FirePHP_16.png",
        url: "bundles/components/main/data/devtools-panel.html",


        /**
        * Executed by the framework when an instance of this panel is created.
        * There is one instance of this panel per {@Toolbox}. The panel is
        * instantiated when selected in the toolbox for the first time.
        */
        initialize: function(options) {
            this.onMessage = this.onMessage.bind(this);
        },

        /**
        * Executed by the framework when the panel is destroyed.
        */
        dispose: function() {
        },

        /**
        * Executed by the framework when the panel content frame is
        * ready (document state == interactive).
        */
        onReady: function() {
            // This is the way how to get access to the inner <iframe> element.
            // The frame is using type="content" and so, the access to the inner
            // document must be done through a message manager.
            this.panelFrame = viewFor(this);

            // Get frame's message manager. Read more about message managers on MDN:
            // https://developer.mozilla.org/en-US/Firefox/Multiprocess_Firefox/The_message_manager
            const { messageManager } = this.panelFrame.frameLoader;
            messageManager.addMessageListener("message/from/content",
              this.onMessage);

            // Load helper frame script with content API for receiving
            // and sending messages.
            let url = self.data.url("bundles/components/main/data/devtools-panel.js");
            messageManager.loadFrameScript(url, false);

            // Send test message to the content
            this.postContentMessage("<message-id>", "Hello from chrome scope!");
        },

        // Chrome <-> Content Communication

        /**
        * Handle messages coming from the content scope (see 'frame-script.js'
        * that is responsible for sending them).
        */
        onMessage: function(message) {
            const { type, data } = message.data;

            console.log("Message from content: " + data);
        },

        /**
        * Send message to the content scope (see 'frame-script.js'
        * that is responsible for handling them).
        */
        postContentMessage: function(type, data) {
            let { messageManager } = this.panelFrame.frameLoader;
            messageManager.sendAsyncMessage("message/from/chrome", {
              type: type,
              data: data,
            });
        }

/*
        setup: function({debuggee}) {
            this.debuggee = debuggee;
        },
        dispose: function() {
            this.debuggee = null;
        },

        onReady: function() {


API.console.log("this.debuggee", this.debuggee);

            this.debuggee.onmessage = function (event) {

API.console.log("received message from devtools panel!!!", event);

            }

            this.postMessage("message from panel", [this.debuggee]);
        },
*/


    });

API.console.log("register panel");

    const Tool = new API.DEV_TOOL({
        name: "FirePHP",
        panels: {
            panel: Panel
        }
    });

    return {};
}
