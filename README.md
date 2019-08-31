**DEPRECATED: For new Firefox Web Extension see https://github.com/firephp/firephp-for-browser-devtools**

---

FirePHP for Firebug.Next
========================

The original [FirePHP Firebug extension](https://github.com/firephp/firephp-extension) re-implemented to leverage the latest [module loader](https://github.com/pinf/pinf-loader-js), [console logging](https://github.com/fireconsole), [out-of-band communication](https://github.com/firenode) libraries, [installer](https://github.com/sourcemint/smi) and [development system](http://devcomp.org) working against [Firebug.Next](https://github.com/firebug/firebug.next) and [Firefox Nightly](https://nightly.mozilla.org/).


Install
=======

  1. Open Firefox
  2. Install latest release: [github.com/firephp/firephp-for-firebug.next/releases](https://github.com/firephp/firephp-for-firebug.next/releases)
  3. Open developer tools toolbox (F12 or Menu -> Developer -> Toogle Tools)
  4. See the **FirePHP** panel for further information

Development
-----------

This project uses [devcomp.org](http://devcomp.org) to orchestrate a development environment for every contributor. See [boot.devcomp.org](http://boot.devcomp.org) to get started.


Implementation
==============

This [Firefox add-on](https://developer.mozilla.org/en-US/Add-ons) is built using [github.com/pinf-it](https://github.com/pinf-it) to bundle and [github.com/pinf/pinf-for-mozilla-addon-sdk](https://github.com/pinf/pinf-for-mozilla-addon-sdk) to load source code bundles on demand as the addon is loaded and reloaded triggered by source changes.

On the server side, [github.com/pinf-to/pinf-to-docker](https://github.com/pinf-to/pinf-to-docker) is used to start a PHP server. 

The source code is structured as follows:

  * `components` - The add-on implementation broken down into logical modules along with any dependencies the client needs.
  * `server` - PHP scripts that load the [github.com/firephp/firephp-core](https://github.com/firephp/firephp-core) and [github.com/firephp/firephp](https://github.com/firephp/firephp) libraries and generate test data for the client.

Roadmap
-------

  1. Stabilize core featureset
  2. Finish devcomp.org dev system.


License
=======

MPL 2.0

Copyright 2015 Christoph Dorn

