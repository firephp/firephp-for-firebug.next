/* See license.txt for terms of usage */

"use strict";

const { Cu:CU } = require("chrome");
const { gDevTools:GDEVTOOLS } = CU.import("resource:///modules/devtools/gDevTools.jsm", {});

/**
 * This object represents the extension. It's a singleton (only one
 * instance created).
 */
const Extension =
/** @lends Extension */
{
  initialize: function(options) {
    // Hook developer tools events.
    GDEVTOOLS.on("toolbox-ready", this.onToolboxReady);
    GDEVTOOLS.on("toolbox-destroy", this.onToolboxDestroy);
    GDEVTOOLS.on("toolbox-destroyed", this.onToolboxClosed);
  },

  shutdown: function(reason) {
    GDEVTOOLS.off("toolbox-ready", this.onToolboxReady);
    GDEVTOOLS.off("toolbox-destroy", this.onToolboxDestroy);
    GDEVTOOLS.off("toolbox-destroyed", this.onToolboxClosed);
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

// Exports from this module
exports.Extension = Extension;
