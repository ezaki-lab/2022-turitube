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
    "revision": "6bbdfaa2f04085e9bcf1299f9af5bd58"
  }, {
    "url": "/img/1.04a0c03b8712989862ab7f36a966563d.png",
    "revision": null
  }, {
    "url": "/img/1.24e3af34c4edacd361a0fdf28ce83f80.png",
    "revision": null
  }, {
    "url": "/img/1.6c089389ef92f5b037542b22a4ac22a9.png",
    "revision": null
  }, {
    "url": "/img/1.88f4de6dcf774a062cda348cd989ec97.png",
    "revision": null
  }, {
    "url": "/img/1.e43b70392d87b2515842f9a0b0c7c8b3.png",
    "revision": null
  }, {
    "url": "/img/1.e7780ad5a489fe12b48eaaaa7b155758.png",
    "revision": null
  }, {
    "url": "/img/2.2ea991208d173e44f560d0fae47f11b2.png",
    "revision": null
  }, {
    "url": "/img/2.444966f7b1848cfae0f498f88f5d41c0.png",
    "revision": null
  }, {
    "url": "/img/2.470e9ec0137bb11733afeb83a871e701.png",
    "revision": null
  }, {
    "url": "/img/2.5f0e4d1406f4fa54936217f53982590e.png",
    "revision": null
  }, {
    "url": "/img/2.9f89261de68522340b5d7d98256f9f09.png",
    "revision": null
  }, {
    "url": "/img/2.ba53374160de52e7fcb34f1ade16522f.png",
    "revision": null
  }, {
    "url": "/img/3.68cc066be3524981cbf469a35556aa9b.png",
    "revision": null
  }, {
    "url": "/img/3.ab625414fe1250ec00e3fdc20f6009e2.png",
    "revision": null
  }, {
    "url": "/img/3.ad0c0f70dde4667a73dccf7030a39e31.png",
    "revision": null
  }, {
    "url": "/img/3.c03b358c57bb6ec52aa28d23fb4df802.png",
    "revision": null
  }, {
    "url": "/img/3.d0119a7948158f3be46accc1bb770407.png",
    "revision": null
  }, {
    "url": "/img/3.efb1bdc662b4f37c2b18d4712c5acec3.png",
    "revision": null
  }, {
    "url": "/img/Footprints.cab536d8b7760a2ecddaedf3edebde4f.png",
    "revision": null
  }, {
    "url": "/img/achive.6aaad058b05202803ae2bc1336419421.png",
    "revision": null
  }, {
    "url": "/img/achive_fish_green.active.8238f4158b3ce2b7d50b9c40a214a61c.png",
    "revision": null
  }, {
    "url": "/img/achive_fish_green.inactive.b04efaf3f945f500781f5f394dc3e936.png",
    "revision": null
  }, {
    "url": "/img/achive_modal.04d3f0754e3354bc8af4d55cc59a9ce7.png",
    "revision": null
  }, {
    "url": "/img/achive_small.c2e480ba0cac06a31b43f3382148b931.png",
    "revision": null
  }, {
    "url": "/img/back.0a6f1e73ab021ac4219d31722070baa4.png",
    "revision": null
  }, {
    "url": "/img/back.f67931482eea21cf227569cce73cec11.png",
    "revision": null
  }, {
    "url": "/img/back_blue.f7ea54cc6bb4421372ff11cb5d5202bb.png",
    "revision": null
  }, {
    "url": "/img/beacon.5fef39b1467d57c3fa357c2b44e86402.png",
    "revision": null
  }, {
    "url": "/img/calendar.1b75e4913e68c1230643e4b6cb1aaf1a.png",
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
    "url": "/img/fish.1f395609f8a3a8c8bf7e647f9415aa45.png",
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
    "url": "/img/home.active.305a5d538a1b53f6e798e2acfc0fd56d.png",
    "revision": null
  }, {
    "url": "/img/home.inactive.94de2dfbc92d466ad6fcd2d1d7b8c46b.png",
    "revision": null
  }, {
    "url": "/img/home_2.a8497429e54ad6bfc1bc1a309a65e5c3.png",
    "revision": null
  }, {
    "url": "/img/item0.d8b8304b4309fe7233fd09549f198906.png",
    "revision": null
  }, {
    "url": "/img/item1.e3d3a0906ad2b1a3fed34bf85f6b6100.png",
    "revision": null
  }, {
    "url": "/img/item2.e3d3a0906ad2b1a3fed34bf85f6b6100.png",
    "revision": null
  }, {
    "url": "/img/kari4.244bb9c13d3570fd0e9365cf6c16e183.png",
    "revision": null
  }, {
    "url": "/img/level.d8b8304b4309fe7233fd09549f198906.png",
    "revision": null
  }, {
    "url": "/img/library.active.8304240e27ad65818c006117e07a21d3.png",
    "revision": null
  }, {
    "url": "/img/library.inactive.e862726188bb2e8dd6c918052d23f425.png",
    "revision": null
  }, {
    "url": "/img/mainlogo.8b55aba31884564a7616c0d4fcc0a7fd.png",
    "revision": null
  }, {
    "url": "/img/map.c537ef2e78d0767da2cce4336240e287.png",
    "revision": null
  }, {
    "url": "/img/max_size.30d5be76e334e45f460c4dc258442182.png",
    "revision": null
  }, {
    "url": "/img/measure.1915132da8211cfccc3f0a27e0f48d56.png",
    "revision": null
  }, {
    "url": "/img/name.43f3e7052d2d1b5451f9a2939b6533e4.png",
    "revision": null
  }, {
    "url": "/img/notification.active.1a82dea17fa438b92b83e9a5ca8a2539.png",
    "revision": null
  }, {
    "url": "/img/notification.inactive.4ed2223ead1ade69135fc362c66956d5.png",
    "revision": null
  }, {
    "url": "/img/option_modal.9759141a6912260d1a275d1a62ac85cc.png",
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
    "url": "/img/profile.b7d713afd6ab303ac8d2157b4a3dcd7c.png",
    "revision": null
  }, {
    "url": "/img/profile_modal.6d4ef353a96dd289ce633546c2c32d46.png",
    "revision": null
  }, {
    "url": "/img/quest.5ace294d6cc7af357cc11ea0abdc9753.png",
    "revision": null
  }, {
    "url": "/img/quest_fish_aqua.active.4bc91609c0ae03a8e33163c384ba244b.png",
    "revision": null
  }, {
    "url": "/img/quest_fish_aqua.inactive.38331143b1123710397141f4a7a521c1.png",
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
    "url": "/img/share.05989fb8af5c0f132ddee71f7e140d39.png",
    "revision": null
  }, {
    "url": "/img/stabbed_pin.bed3a4def6e0550dc24fb6b8687b823a.png",
    "revision": null
  }, {
    "url": "/img/stabbed_pin2.333422d21d8b20c46421a91195131aad.png",
    "revision": null
  }, {
    "url": "/img/stream.4e95753db8192462df6d6d46fe9a5545.png",
    "revision": null
  }, {
    "url": "/img/stream.d85eb6ffb0567224d5cb0d2ea5f6cfc9.png",
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
    "url": "/img/unregistered.aa7ec316d81f162f13e5ba389d661c5b.png",
    "revision": null
  }, {
    "url": "/img/watch_ok.668410930fb762dfda6ceb54c39bdad5.png",
    "revision": null
  }], {});

}));
