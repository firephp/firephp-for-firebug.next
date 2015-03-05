/* See license.txt for terms of usage */

"use strict";

const self = require("sdk/self");

const { Cu:CU, Ci:CI } = require("chrome");
const { Panel:PANEL } = require("dev/panel.js");
const { Class:CLASS } = require("sdk/core/heritage");
const { Tool:TOOL } = require("dev/toolbox");

/**
 * This object represents a new {@Toolbox} panel
 */
const Panel = CLASS(
{
  extends: PANEL,

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
  },

  /**
   * Executed by the framework when the panel is destroyed.
   */
  dispose: function() {
  },

 /**
  * Executed by the framework when the panel content iframe is
  * constructed. Allows e.g to connect the backend through
  * `debuggee` object
  */
  setup: function(options) {
    // TODO: connect to backend using options.debuggee
  },
});

const Tool = new TOOL({
  name: "FirePHP",
  panels: {
    panel: Panel
  }
});
