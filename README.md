sg-socket-client
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/sg-socket-client
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/sg-socket-client
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/sg-socket-client.svg?style=flat
[bd_license_url]: https://github.com/realglobe-Inc/sg-socket-client/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/sg-socket-client
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/sg-socket-client.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/sg-socket-client.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/sg-socket-client
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/sg-socket-client.svg
[bd_npm_url]: http://www.npmjs.org/package/sg-socket-client
[bd_npm_shield_url]: http://img.shields.io/npm/v/sg-socket-client.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Web socket client for SUGOS

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>
Installation
-----

```bash
$ npm install sg-socket-client --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>
Usage
---------

```javascript
'use strict'

const sgSocketClient = require('sg-socket-client')
const co = require('co')

let socket = sgSocketClient('http://localhost:8084')
socket.on('connect', () => { /* ... */ })
socket.on('my:event', () => { /* ... */ })
socket.on('disconnect', () => { /* ... */ })

// Using locking extension
{
  // Resource to lock.
  let resource = 'screen'

  co(function * () {
    // Start locking
    // Throws error if another client lock the resrouce
    yield socket.lock(resource)

    // Stop locking
    yield socket.unlock(resource)
  })
}

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/realglobe-Inc/sg-socket-client/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [socket.io-client](https://github.com/socketio/socket.io-client#readme)

<!-- Links End -->
