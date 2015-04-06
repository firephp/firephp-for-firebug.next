
exports.for = function (API) {

API.console.log("init extension");

    /**
     * This object represents the extension. It's a singleton (only one
     * instance created).
     */
    const Extension =
    /** @lends Extension */
    {
      initialize: function(options) {
        // Hook developer tools events.
        API.GDEVTOOLS.on("toolbox-ready", this.onToolboxReady);
        API.GDEVTOOLS.on("toolbox-destroy", this.onToolboxDestroy);
        API.GDEVTOOLS.on("toolbox-destroyed", this.onToolboxClosed);
      },

      shutdown: function(reason) {
        API.GDEVTOOLS.off("toolbox-ready", this.onToolboxReady);
        API.GDEVTOOLS.off("toolbox-destroy", this.onToolboxDestroy);
        API.GDEVTOOLS.off("toolbox-destroyed", this.onToolboxClosed);
      },

      // Event Handlers

      /**
       * Executed by the framework when {@Toolbox} is opened and ready to use.
       * There is one instance of the {@Toolbox} per browser window.
       * The event is fired after the current panel is opened & loaded 
       * (happens asynchronously) and ready to use.
       */ 
      onToolboxReady: function(event, toolbox) {
      },

      /**
       * Executed by the framework at the beginning of the {@Toolbox} destroy
       * process. All instantiated panel objects are still available, which
       * makes this method suitable for e.g. removing event listeners.
       */
      onToolboxDestroy: function(eventId, target) {
      },

      /**
       * Executed by the framework at the end of the {@Toolbox} destroy
       * process. All panel objects are destroyed at this moment.
       */
      onToolboxClosed: function(eventId, target) {
      },
    };


    return {
        Extension: Extension
    };
}
