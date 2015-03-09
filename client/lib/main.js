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

  // Wait for Console panel initialization
  GDEVTOOLS.on("webconsole-init", onConsoleInit);


  var uri = DATA.url("bundles/components/main.js");
// TODO: Get URI from mappings.
  uri = "http://localhost:8080/bundles/main.js";

  SANDBOX(uri, function(sandbox) {

    sandbox.main({
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
      getBootOptions: function () {
        return options;
      }
    });
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
