 <img src="https://simpleicons.org/icons/fujitsu.svg" width = "200" height = "200" alt="Logo" align=center />
 
 [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/francis-du/url-shortener)
 
---
 
# URL-Shortener  

![What's it](https://img.shields.io/badge/What's%20it-orange?style=for-the-badge) 

URL-Shortener is a simple url shortener that is build on Cloudflare Workers using Short.io API.

[![index](src/images/index.png)](https://short.francis.run)

![Website](https://img.shields.io/badge/How%20to%20use-orange?style=for-the-badge)

#### Web UI
- Open Website `https://short.francis.run`

- Paste the long link you want to shorten.

- Click the Go button to generate a short link.

#### Get request

- Request Url `https://short.francis.run`

- Request parameters and return response data

|  parameters  | description  | required |
|  ----  | ----  | ------- | 
| ?link=""  | link, which you want to shorten| Y|
| ?api="true" | Return json data - Required| Y |
| ?title="" |title of created URL to be shown in short.cm admin panel | N |
| ?path""  | optional path part of newly created link. If empty - it will be generated automatically | N |

[![MIT LICENSE](https://img.shields.io/badge/MIT%20LICENSE-orange?style=for-the-badge)](LICENSE)
