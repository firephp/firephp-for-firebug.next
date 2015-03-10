/* See license.txt for terms of usage */

"use strict";

const { Extension:EXTENSION } = require("./extension.js");
const { Cc: CC, Cu:CU, Ci:CI } = require("chrome");
const { gDevTools:GDEVTOOLS } = CU.import("resource:///modules/devtools/gDevTools.jsm", {});


const { data:DATA } = require("sdk/self");
const { sandbox:SANDBOX } = require("pinf-for-mozilla-addon-sdk");


/**
 * Application entry point. Read MDN to learn more about Add-on SDK:
 * https://developer.mozilla.org/en-US/Add-ons/SDK
 */
function main(options, callbacks) {
  // Initialize extension object (singleton).
  EXTENSION.initialize(options);


  GDEVTOOLS.on("webconsole-init", onConsoleInit);


  var API = {
    CC: CC,
    CU: CU,
    CI: CI,
    GDEVTOOLS: GDEVTOOLS,
    SELF: require("sdk/self"),
    TIMERS: require("sdk/timers"),
    CLASS: require("sdk/core/heritage").Class,
    DEV_PANEL: require("dev/panel.js").Panel,
    DEV_TOOL: require("dev/toolbox").Tool,
    PANEL: require("sdk/panel"),
    PAGE_WORKER: require("sdk/page-worker"),
    ADDON_INSTALLER: require("sdk/addon/installer"),
    TABS: require("sdk/tabs"),
    SYSTEM: require("sdk/system"),
    SIMPLE_PREFS: require("sdk/simple-prefs"),
    PREFERENCES_SERVICE: require("sdk/preferences/service")
  };

  API.getBootOptions = function () {
    return options;
  }

  API.inDevMode = function () {
    return !!API.SIMPLE_PREFS.prefs.dev;
  }


  var uri = DATA.url("bundles/components/main.js");
  if (API.inDevMode()) {
    // TODO: Get URI from mappings.
    uri = "http://localhost:8080/bundles/main.js";
  }
  SANDBOX(uri, {
    debug: API.inDevMode(),
    global: {
      // Not available in this context.
      Components: undefined
    },
    onInitModule: function(moduleInterface, moduleObj, pkg, sandbox, options) {
      var origRequire = moduleObj.require;
      moduleObj.require = function(identifier) {
        if (
          identifier === "chrome" ||
          /^sdk/.test(identifier)
        ) {
          // Return SDK module that is not bundled.
          return require(identifier);
        }
        return origRequire(identifier);
      }
      for (var property in origRequire) {
        moduleObj.require[property] = origRequire[property];
      }
      // @see http://nodejs.org/docs/latest/api/globals.html
      moduleObj.require.resolve = function() {
        throw new Error("NYI");
      }
      moduleObj.require.async = function(id, successCallback, errorCallback) {
        throw new Error("NYI");
      }
    }
  }, function(sandbox) {
    sandbox.main(API);
  });

}

function onUnload(reason) {
  EXTENSION.shutdown(reason);
}

// Exports from this module
exports.main = main;
exports.onUnload = onUnload;



/**
 * Console panel customization.
 *
 * @param eventId ID of the event
 * @param toolbox Parent toolbox object
 * @param panelFrame Panel iframe
 */
function onConsoleInit(eventId, toolbox, panelFrame) {
  // Use the toolbox object and wait till the Console panel
  // is fully ready (panel frame loaded).
  toolbox.once("webconsole-ready", (eventId, panel) => {
    panel.hud.ui.on("new-messages", onNewMessages);
  });
}

function onNewMessages(topic, messages) {
  messages.forEach(msg => {
    onNewMessage(msg);
  });
}

function onNewMessage(msg) {
  // Get DOM node associated with the message
  let node = msg.node;
  let category = node.getAttribute("category");

  // If category of the node is 'console' change the background.
  if (category == "console") {
    msg.node.setAttribute("style", "background-color: green");
  }
}
