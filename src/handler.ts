const secret_key= process.env.SHORT_SECRET_KEY;
const domain = "url.francis.run";
const allowDuplicates = false;
const re = "^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$";
export const html = `
<!DOCTYPE HTML><html><head><title>URL Shorten</title><link rel="icon"href="https://simpleicons.org/icons/fujitsu.svg"type="image/x-icon"/><meta http-equiv="Content-Type"content="text/html; charset=utf-8"/><meta name="viewport"content="width=device-width, initial-scale=1, maximum-scale=1"><meta http-equiv="Content-Type"content="text/html; charset=utf-8"/><style type="text/css"> body { background: url(http://h2.ioliu.cn/bing/HallwylfjelletSunset_ZH-CN9300910376_1920x1200.jpg) no-repeat; background-size: cover; font-family: 'Open Sans', sans-serif; font-size: 100% } .shorten { text-align: center; margin: 25em 0 0 0; position: relative } .s-bar { width: 40%; margin: 0 auto; } .s-bar input[type="text"] { font-size: 1.2em; font-weight: 600; color: #7a7777; padding: 1.3em 1em 1.3em 1.5em; width: 70%; border-radius: 5px 0 0 5px; -webkit-border-radius: 5px 0 0 5px; -moz-border-radius: 5px 0 0 5px; -o-border-radius: 5px 0 0 5px; background: rgba(255, 255, 255, 0.5); border: 0; outline: 0; -webkit-appearance: none } .s-bar input[type="submit"] { font-size: 1.2em; font-weight: 600; color: #fff; padding: 1.3em .5em; width: 22%; text-align: center; text-shadow: rgba(80, 80, 80, 0.08) 1px 1px, rgba(80, 80, 80, 0.07) 2px 2px, rgba(80, 80, 80, 0.09) 3px 3px, rgba(80, 80, 80, 0.04) 4px 4px, rgba(80, 80, 80, 0.06) 5px 5px; border-radius: 0 5px 5px 0; -webkit-border-radius: 0 5px 5px 0; -moz-border-radius: 0 5px 5px 0; -o-border-radius: 0 5px 5px 0; margin: 0 0 0 -4px; background: #A36058; cursor: pointer; border: 0; outline: 0; -webkit-appearance: none; background: #A36058; background: -moz-linear-gradient(top, #A36058 0, #A36058 37%, #A36058 66%, #A36058 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #A36058), color-stop(37%, #A36058), color-stop(66%, #A36058), color-stop(100%, #A36058)); background: -webkit-linear-gradient(top, #A36058 0, #A36058 37%, #A36058 66%, #A36058 100%); background: -o-linear-gradient(top, #A36058 0, #A36058 37%, #A36058 66%, #A36058 100%); background: -ms-linear-gradient(top, #A36058 0, #A36058 37%, #A36058 66%, #A36058 100%); background: linear-gradient(to bottom, #A36058 0, #A36058 37%, #A36058 66%, #A36058 100%); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1fd8de', endColorstr='#1fd8de', GradientType=0) } .s-bar input[type="submit"]:hover { opacity: .8; filter: alpha(opacity=100); transition: all .3s ease; -webkit-transition: all .3s ease; -moz-transition: all .3s ease; -o-transition: all .3s ease } .code { font-size: 1.3em; font-weight: 600; color: #d4d1d1; padding: 1.3em 1em 1.3em 1.5em; width: 100%; text-shadow: rgba(80, 80, 80, 0.08) 1px 1px, rgba(80, 80, 80, 0.07) 2px 2px, rgba(80, 80, 80, 0.09) 3px 3px, rgba(80, 80, 80, 0.04) 4px 4px, rgba(80, 80, 80, 0.06) 5px 5px; border-radius: 5px 0 0 5px; -webkit-border-radius: 5px 0 0 5px; -moz-border-radius: 5px 0 0 5px; } @media (max-width: 1440px) { .s-bar { width: 40% } } @media (max-width: 1280px) { .s-bar input[type="text"] { width: 63% } } @media (max-width: 1024px) { .s-bar { width: 50% } } @media (max-width: 768px) { .shorten { margin: 22em 0 0 0 } .s-bar { width: 58% } .s-bar input[type="text"] { width: 67% } } @media (max-width: 640px) { .s-bar { width: 65% } } @media (max-width: 568px) { .s-bar input[type="text"] { width: 64% } } @media (max-width: 480px) { .s-bar input[type="text"] { width: 55%; font-size: .8em } .s-bar input[type="submit"] { width: 30%; font-size: .8em } } @media (max-width: 320px) { .shorten { margin: 11.25em 0 0 0 } .s-bar { width: 100% } .s-bar input[type="submit"] { text-shadow: rgba(80, 80, 80, 0.08) 1px 1px, rgba(80, 80, 80, 0.07) 2px 2px, rgba(80, 80, 80, 0.09) 3px 3px, rgba(80, 80, 80, 0.04) 4px 4px, rgba(80, 80, 80, 0.06) 5px 5px } } </style></head><body><div class="shorten"><div class="s-bar"><form><input name="link"type="text"value="https://francis.run"onfocus="this.value = '';"onblur="if (this.value === '') {this.value = 'https://francis.run';}"><input id="submit"type="submit"value="Go"/></form></div><div class="s-bar"><p class="code">https://url.francis.run</p></div></div></body></html>
`

// Generate short link
export async function urlShorten(request: Request) {

    if(secret_key ==""){
        return echoShortUrl(rawHtmlResponse(), "Short.io API secret key is empty,please export SHORT_SECRET_KEY");
    }

    // get params form url
    const originalURL = getUrlArg(request.url, "link");
    const path = getUrlArg(request.url, "path");
    let title = "Shorten by https://short.francis.run";
    let api = false;

    if (originalURL == "") {
        return rawHtmlResponse();
    } else if (originalURL != "" && isNotLink(originalURL)) {
        return echoShortUrl(rawHtmlResponse(), "\"" + originalURL + "\" - This link is invalid");
    }

    if (getUrlArg(request.url, "title") != "") {
        title = getUrlArg(request.url, "title");
    }

    if (getUrlArg(request.url, "api") == "true") {
        api = true;
    }

    
    // Generate short link
    try {
        if (request.method === "GET") {
            return fetch("https://api.short.cm/links", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Expose-Headers": "true",
                    "Authorization": secret_key
                },
                body: JSON.stringify({allowDuplicates, domain, originalURL, path, title})
            })
                .then(async response => await response.json())
                .then(data => {
                    if (api) {
                        const headers = {"Access-Control-Expose-Headers": "true"};
                        return new Response(JSON.stringify({shortUrl: data.shortURL}), {headers, status: 200})
                    } else {
                        return echoShortUrl(rawHtmlResponse(), JSON.stringify({url: data.shortURL}));
                    }
                })
        } else {
            return rawHtmlResponse();
        }
    } catch (error) {
        console.log("[error]" + error)
        return echoShortUrl(rawHtmlResponse(), "API request error, please try again!");
    }
}

// Return to static page
function rawHtmlResponse() {
    const init = {
        status: 200,
        headers: {"content-type": "text/html;charset=UTF-8",},
    }
    return new Response(html, init)
}

// get URL args function
function getUrlArg(url: string, key: string): string {
    const arr = url.split('?');
    const argStr = arr.length > 1 ? arr[1] : "";
    const arr2 = argStr.split('&').map(item => item.split('='));
    const res = arr2.find(item => item[0] == key);

    if (!argStr) {
        return "";
    }
    if (res) {
        return res.length > 1 ? res[1] : "";
    } else {
        return "";
    }
}

// Is it a valid link?
function isNotLink(link: string) {
    let str = decodeURI(link);
    const reg = new RegExp(re, "i");
    return !reg.test(str);
}

// Rewrite html <p> tag content
function echoShortUrl(response: Response, data: string) {
    return new HTMLRewriter()
        .on("p", new ElementHandler(data))
        .transform(response)
}

// <p> tag content object
class ElementHandler {
    data: string;

    constructor(data: string) {
        try {
            this.data = JSON.parse(data).url
        } catch (error) {
            this.data = data
        }
    }

    element(element: Element) {
        element.setInnerContent(this.data);
    }
}