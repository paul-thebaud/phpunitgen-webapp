import { precacheAndRoute } from 'workbox-precaching';
import {registerRoute, setDefaultHandler} from 'workbox-routing';
import * as strategies from 'workbox-strategies';
self.skipWaiting()
precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
    new RegExp(/\.(?:jpg|webp|mp4|woff2|jpeg|png|gif|ico|css|html|md)$/),
    new strategies.StaleWhileRevalidate()
);

setDefaultHandler(new strategies.StaleWhileRevalidate())