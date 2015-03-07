
exports.for = function (API) {

API.console.log("init panel");

    const Panel = API.CLASS(
    {
        extends: API.DEV_PANEL,

        label: "FirePHP",
        tooltip: "Log from PHP scripts to Console",
        icon: "./FirePHP_16.png",
        url: "./panel.html",

        /**
        * Executed by the framework when an instance of this panel is created.
        * There is one instance of this panel per {@Toolbox}. The panel is
        * instantiated when selected in the toolbox for the first time.
        */
        initialize: function(options) {

API.console.log("initialize()");
API.console.log("initialize() this", this);
API.console.log("initialize() options", options);

        },

        /**
        * Executed by the framework when the panel is destroyed.
        */
        dispose: function() {
API.console.log("dispose()");
        },

        /**
        * Executed by the framework when the panel content iframe is
        * constructed. Allows e.g to connect the backend through
        * `debuggee` object
        */
        setup: function(options) {
        // TODO: connect to backend using options.debuggee

API.console.log("setup()");
API.console.log("setup() options", options);

/*
options.frame.contentWindow.addEventListener("message", function (event) {
    API.console.log("GOT MESSAGE IN PANEL:", event.data);
}, false);
*/



            var panel = API.PANEL.Panel({
              contentURL: "./viewer.html",
              contentScriptFile: API.SELF.data.url("viewer.js")
            });

panel.port.on("message", function(data) {

    API.console.log("GOT MESSAGE", data);
});

            panel.show();

API.TIMERS.setInterval(function () {

    panel.port.emit("message", "Message from extension!");

}, 2000);






API.console.log("setup() DONE");

        }
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
