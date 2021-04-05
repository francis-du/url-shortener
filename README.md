<div align="center">

<img src="https://simpleicons.org/icons/fujitsu.svg" width = "200" height = "200" alt="Logo" align=center />

<h1>URL-Shortener</h1>

[![Deploy](https://github.com/francis-du/url-shortener/workflows/Deploy/badge.svg)](https://github.com/francis-du/url-shortener/actions?query=workflow%3ADeploy)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square&color=%23E5531A)](https://github.com/francis-du/url-shortener/blob/main/LICENSE)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/francis-du/url-shortener)
</div>

---

## What's this

URL-Shortener is a simple app that is build on [Cloudflare Workers](https://workers.cloudflare.com) using Short.io API.

[![index](src/static/img/index.png)](https://short.francis.run/?link=https%3A%2F%2Ffrancis.run)

## How to use

### Web UI

- Open Website [`https://short.francis.run`](https://short.francis.run)

- Paste the long link you want to shorten.

- Click the Short button to generate a short link.

### Request

- Request Url [`https://short.francis.run`](https://short.francis.run)

- Request parameters and return response data

|  parameters  | description  | required |
|  ----  | ----  | ------- | 
| ?link=""  | link, which you want to shorten| Y|
| ?api="true" | Return json data - Required| Y |
| ?title="" |title of created URL to be shown in short.cm admin panel | N |
| ?path""  | optional path part of newly created link. If empty - it will be generated automatically | N |

## Debug and Publish

1. Install [Cloudflare Wrangler](https://github.com/cloudflare/wrangler)

```shell
npm i @cloudflare/wrangler -g
```

2. Build

```shell
wrangle build
```

3. Preview

```shell
wrangle preview
```

4. Debug

```shell
wrangle dev
```

5. Publish

```shell
wrangle publish
```

## LICENSE

[MIT LICENSE](LICENSE)
