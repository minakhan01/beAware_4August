/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// console.info('Service worker disabled for development, will be generated at build time.');
// importScripts('bower_components/platinum-sw/service-worker.js');
console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message received', event);
    var title = 'Be-aware :)';
var id = self.userID;
  event.waitUntil(
    self.registration.showNotification(title, {
     body: 'Time for a mindful moment' + self.userID,
     icon: 'images/app-icon-32.png',
     vibrate: [200, 100, 200, 100, 200, 100, 400],
     tag: 'my-tag'
   }));
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click: tag', event.notification.tag);
  // Android doesn't close the notification when you click it
  // See http://crbug.com/463146
  event.notification.close();
  var url = 'https://be-aware.herokuapp.com';
  // Check if there's already a tab open with this URL.
  // If yes: focus on the tab.
  // If no: open a tab with the URL.
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then(function(windowClients) {
      console.log('WindowClients', windowClients);
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('WindowClient', client);
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

self.addEventListener('message', function(event){
    var data = JSON.parse(event.data);

    console.log("SW Received Message:");
    console.log(data);

    self.userID = data.uid;
});

