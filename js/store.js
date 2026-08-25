/* Compatibility shim.
   This file was the storefront's script before the redesign; it now lives at
   js/storefront.js. Pages are cached for ten minutes, so a browser can still
   be holding an old page that loads THIS url. Without the shim that request
   404s, every handler on the page dies, and the cart can't even be cleared.

   Reloading with a fresh query string gives the browser a different cache key,
   so it fetches the current page instead of the stale one. New pages never
   load this file, so there is no loop. */
(function () {
    try {
        if (location.search.indexOf('sqcfresh=') === -1) {
            location.replace(location.pathname + '?sqcfresh=' + Date.now());
        }
    } catch (e) {}
})();
