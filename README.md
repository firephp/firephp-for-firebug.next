FirePHP for Firebug.Next
========================

The original [FirePHP Firebug extension](https://github.com/firephp/firephp-extension) re-implemented to leverage the latest [module loader](https://github.com/pinf/pinf-loader-js), [console logging](https://github.com/fireconsole), [out-of-band communication](https://github.com/firenode) libraries and [development system](https://github.com/devcomp-io) working against [Firebug.Next](https://github.com/firebug/firebug.next) and [Firefox Nightly](https://nightly.mozilla.org/).


Install
=======

  1. Open Firefox
  2. Install latest release: [github.com/firephp/firephp-for-firebug.next/releases](https://github.com/firephp/firephp-for-firebug.next/releases)
  3. Open developer tools toolbox (F12 or Menu -> Developer -> Toogle Tools)
  4. See the **FirePHP** panel for further information

Development
-----------

This project is being developed within the [github.com/firebug/dev-system](https://github.com/firebug/dev-system). Once installed you can run:

    pio publish --local firephp-for-firebug.next
    pio run firephp-for-firebug.next --open
    profile run fbn-firephp
    profile run fbn-firephp-test


Implementation
==============

This [Firefox add-on](https://developer.mozilla.org/en-US/Add-ons) is built using [github.com/pinf-to](https://github.com/pinf-to) to bundle and [github.com/pinf/pinf-for-mozilla-addon-sdk](https://github.com/pinf/pinf-for-mozilla-addon-sdk) to load source code on demand as the addon is loaded and reloaded triggered by source changes.

The source code is structured as follows:

  * `client` - A minimal addon acting as a bootstrapper that loads the root [PINF JavaScript Bundle](https://github.com/pinf/pinf-loader-js) holding the root extension implementation.
  * `components` - The extension implementation broken down into logical modules along with any dependencies the client needs.
  * `server` - PHP scripts that load the [github.com/firephp/firephp-core](https://github.com/firephp/firephp-core) and [github.com/firephp/firephp](https://github.com/firephp/firephp) libraries and generate test data for the client.

Roadmap
-------

  1. Stabilize core featureset
  2. Refactor `client` and `components` into [github.com/freedom-platform/fp-for-mozilla-extensions](http://github.com/freedom-platform/fp-for-mozilla-extensions)
  3. Support development without needing [github.com/firebug/dev-system](https://github.com/firebug/dev-system) by simply running: `git clone ; bin/install ; bin/run`


License
=======

MPL 2.0

Copyright 2015 Christoph Dorn
