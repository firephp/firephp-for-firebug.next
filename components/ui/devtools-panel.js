
exports.for = function (API) {

API.console.log("init panel");

    const Panel = API.CLASS(
    {
        extends: API.DEV_PANEL,

        label: "FirePHP",
        tooltip: "Log from PHP scripts to Console",
        icon: "./FirePHP_16.png",
        url: "./panel.html",



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



/*
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
