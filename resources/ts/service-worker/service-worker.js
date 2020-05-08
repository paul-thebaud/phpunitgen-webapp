import { precacheAndRoute } from 'workbox-precaching';
import {registerRoute, setDefaultHandler} from 'workbox-routing';
import * as strategies from 'workbox-strategies';

self.skipWaiting()

precacheAndRoute([
    {url: "/docs-content/fr/README.md", revision: null},
    {url: "/docs-content/fr/_sidebar.md", revision: null},
    {url: "/docs-content/fr/advanced-usage.md", revision: null},
    {url: "/docs-content/fr/command-line.md", revision: null},
    {url: "/docs-content/fr/configuration.md", revision: null},
    {url: "/docs-content/fr/how-does-it-works.md", revision: null},
    {url: "/docs-content/fr/old-version.md", revision: null},
    {url: "/docs-content/fr/webapp.md", revision: null},
    {url: "/docs-content/en/README.md", revision: null},
    {url: "/docs-content/en/_sidebar.md", revision: null},
    {url: "/docs-content/en/advanced-usage.md", revision: null},
    {url: "/docs-content/en/command-line.md", revision: null},
    {url: "/docs-content/en/configuration.md", revision: null},
    {url: "/docs-content/en/how-does-it-works.md", revision: null},
    {url: "/docs-content/en/old-version.md", revision: null},
    {url: "/docs-content/en/webapp.md", revision: null},
    {url: "/docs", revision: null},
    {url: "/", revision: null},
    {url: "/tool", revision: null},
    {url: "/themes", revision: null},
    {url: "/configuration", revision: null},
    {url: "/legal", revision: null},
    {url: "/unicorn", revision: null},
    {url: "/cookies", revision: null}
])

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
    new RegExp(/\.(?:jpg|webp|mp4|woff2|jpeg|png|gif|ico|css|html|md)$/),
    new strategies.StaleWhileRevalidate()
);

setDefaultHandler(new strategies.StaleWhileRevalidate())