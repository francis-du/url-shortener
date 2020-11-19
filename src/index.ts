import {urlShorten} from './handler'

addEventListener('fetch', (event) => {
    return event.respondWith(urlShorten(event.request))
})