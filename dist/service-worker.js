/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-f09d4406'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/bundle.js",
<<<<<<< Updated upstream
    "revision": "fb163962bbd645cc1396422f829dd547"
=======
    "revision": "f7fd1d889f18ee3cf41bab9e7db3709c"
>>>>>>> Stashed changes
  }, {
    "url": "/img/Footprints.cab536d8b7760a2ecddaedf3edebde4f.png",
    "revision": null
  }, {
    "url": "/img/achive.6aaad058b05202803ae2bc1336419421.png",
    "revision": null
  }, {
    "url": "/img/achive_modal.04d3f0754e3354bc8af4d55cc59a9ce7.png",
    "revision": null
  }, {
    "url": "/img/achive_small.c2e480ba0cac06a31b43f3382148b931.png",
    "revision": null
  }, {
    "url": "/img/back.f67931482eea21cf227569cce73cec11.png",
    "revision": null
  }, {
    "url": "/img/beacon.5fef39b1467d57c3fa357c2b44e86402.png",
    "revision": null
  }, {
    "url": "/img/calendar.1b75e4913e68c1230643e4b6cb1aaf1a.png",
    "revision": null
  }, {
    "url": "/img/camera.active.f52a482e37b9fe8854762d7237ebb815.png",
    "revision": null
  }, {
    "url": "/img/camera.inactive.a9aad84a0c884af8ddd83d3442f32e10.png",
    "revision": null
  }, {
    "url": "/img/change_img.76adab88dfaf84118c74b2c06654474b.png",
    "revision": null
  }, {
    "url": "/img/close.da5a8b1ecb5076b571956ed182ee41ed.png",
    "revision": null
  }, {
    "url": "/img/coin.e3d3a0906ad2b1a3fed34bf85f6b6100.png",
    "revision": null
  }, {
    "url": "/img/diary.ed14815eec99553795f587e691a8b318.png",
    "revision": null
  }, {
    "url": "/img/diary_small.a963ee83500e8d293154ea118a317883.png",
    "revision": null
  }, {
    "url": "/img/entered_sum.c548713702b96e614299bf62ebaa2c37.png",
    "revision": null
  }, {
    "url": "/img/exit.2f26d9b075f8c2be4d178211af73739f.png",
    "revision": null
  }, {
    "url": "/img/eye.ac8deee211b600e20ef15553262e9e56.png",
    "revision": null
  }, {
    "url": "/img/group.5b5934ef1292685c65111ef3c308b66c.png",
    "revision": null
  }, {
    "url": "/img/hamburger.ca2d1eba4a06b0f772c98030549ccad2.png",
    "revision": null
  }, {
    "url": "/img/home.55ff927cc7dbe6e501643b82601271ca.png",
    "revision": null
  }, {
    "url": "/img/home_2.a8497429e54ad6bfc1bc1a309a65e5c3.png",
    "revision": null
  }, {
    "url": "/img/item900.d8b8304b4309fe7233fd09549f198906.png",
    "revision": null
  }, {
    "url": "/img/item901.e3d3a0906ad2b1a3fed34bf85f6b6100.png",
    "revision": null
  }, {
    "url": "/img/kari.49429758f8cc1450cf26a661bc02bb75.jpg",
    "revision": null
  }, {
    "url": "/img/kari2.1445d07711ca14862da9fcbddb7cf2ba.png",
    "revision": null
  }, {
    "url": "/img/kari4.244bb9c13d3570fd0e9365cf6c16e183.png",
    "revision": null
  }, {
    "url": "/img/kari5.a1b6232723c03b5db173521a64475d6a.png",
    "revision": null
  }, {
    "url": "/img/level.d8b8304b4309fe7233fd09549f198906.png",
    "revision": null
  }, {
    "url": "/img/logout.3202d5967adbc1a0120468597717d554.png",
    "revision": null
  }, {
    "url": "/img/mainlogo.8b55aba31884564a7616c0d4fcc0a7fd.png",
    "revision": null
  }, {
    "url": "/img/max_size.30d5be76e334e45f460c4dc258442182.png",
    "revision": null
  }, {
    "url": "/img/measure.1915132da8211cfccc3f0a27e0f48d56.png",
    "revision": null
  }, {
    "url": "/img/mic.active.6c608f28f6dce82e468112d41fd0060f.png",
    "revision": null
  }, {
    "url": "/img/mic.inactive.00daa9a09f546353e699544cbd9bd338.png",
    "revision": null
  }, {
    "url": "/img/name.43f3e7052d2d1b5451f9a2939b6533e4.png",
    "revision": null
  }, {
    "url": "/img/option_modal.9759141a6912260d1a275d1a62ac85cc.png",
    "revision": null
  }, {
    "url": "/img/order.4c3cdb2c183b1dc4aacd67efa9f5d805.png",
    "revision": null
  }, {
    "url": "/img/ordered.38bca2c2cc4c67138301886648530a83.png",
    "revision": null
  }, {
    "url": "/img/picture_book.deadc6d6563c084e91e21d7a2ebeaa73.png",
    "revision": null
  }, {
    "url": "/img/picture_book_small.8a64b9089ae5fbd93eb14411baa11d62.png",
    "revision": null
  }, {
    "url": "/img/picture_book_undefined.e8c08d246f3165e7f2a9ceed044303c2.png",
    "revision": null
  }, {
    "url": "/img/pin.c172f3e9905dee5340770149e43e3151.png",
    "revision": null
  }, {
    "url": "/img/profile_modal.6d4ef353a96dd289ce633546c2c32d46.png",
    "revision": null
  }, {
    "url": "/img/quest.5ace294d6cc7af357cc11ea0abdc9753.png",
    "revision": null
  }, {
    "url": "/img/quest_modal.c3af51e7e71e3eeaad212001ac9505aa.png",
    "revision": null
  }, {
    "url": "/img/quest_old.aad2dd8a930dc9e616167791609d1c30.png",
    "revision": null
  }, {
    "url": "/img/select_img.fe4cfdc61ef4fe3feff93fd87d6cd34b.png",
    "revision": null
  }, {
    "url": "/img/send.f30a1bfd4ccb451cbf9ed275a1cfc39c.png",
    "revision": null
  }, {
    "url": "/img/stabbed_pin2.333422d21d8b20c46421a91195131aad.png",
    "revision": null
  }, {
    "url": "/img/stream.4e95753db8192462df6d6d46fe9a5545.png",
    "revision": null
  }, {
    "url": "/img/stream_ng.cc211f59eebf020ac1eea70614692ca0.png",
    "revision": null
  }, {
    "url": "/img/sum_fish.2299de1180bdb1c8cd7df258f4905bb5.png",
    "revision": null
  }, {
    "url": "/img/time.4045418e11e645068fef1c4ac58f6353.png",
    "revision": null
  }, {
    "url": "/img/watch_ok.668410930fb762dfda6ceb54c39bdad5.png",
    "revision": null
  }], {});

}));
