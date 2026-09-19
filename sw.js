const CACHE='gym-'+"beaf937999421b7e";
const FILES=["index.html","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","THIRD-PARTY-NOTICES.txt","REPDB-LICENSE.md","assets/index-BlJSZTH4.js","assets/index-D3LiG5WA.css","media/repdb/cable-pallof-press-peak.webp","media/repdb/cable-pallof-press-start.webp","media/repdb/chest-press-machine-peak.webp","media/repdb/chest-press-machine-start.webp","media/repdb/chest-supported-db-row-peak.webp","media/repdb/chest-supported-db-row-start.webp","media/repdb/db-bench-press-peak.webp","media/repdb/db-bench-press-start.webp","media/repdb/leg-extension-peak.webp","media/repdb/leg-extension-start.webp","media/repdb/leg-press-peak.webp","media/repdb/leg-press-start.webp","media/repdb/machine-shoulder-press-peak.webp","media/repdb/machine-shoulder-press-start.webp","media/repdb/seated-dumbbell-curl-peak.webp","media/repdb/seated-dumbbell-curl-start.webp","media/repdb/seated-dumbbell-lateral-raise-peak.webp","media/repdb/seated-dumbbell-lateral-raise-start.webp","media/repdb/seated-leg-curl-peak.webp","media/repdb/seated-leg-curl-start.webp","media/repdb/tricep-pushdown-peak.webp","media/repdb/tricep-pushdown-start.webp","media/repdb/v-bar-lat-pulldown-peak.webp","media/repdb/v-bar-lat-pulldown-start.webp"];
const urls=FILES.map(file=>new URL(file,self.registration.scope).href);
const shell=new URL('index.html',self.registration.scope).href;
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(urls);if(!self.registration.active)await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('message',event=>{
 if(event.data?.type==='ACTIVATE')self.skipWaiting();
 if(event.data?.type==='CACHE_STATUS')event.waitUntil((async()=>{const cache=await caches.open(CACHE);const complete=(await Promise.all(urls.map(url=>cache.match(url)))).every(Boolean);if(complete)event.source?.postMessage({type:'CACHE_READY'});})());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||!event.request.url.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(event.request.mode==='navigate'){const page=await cache.match(shell);return page||fetch(event.request);}
  return await cache.match(event.request)||fetch(event.request);
 })());
});
