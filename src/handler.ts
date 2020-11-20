const domain = "url.francis.run";
const allowDuplicates = false;
const re = "^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$";
export const html = `
<!DOCTYPE HTML><html><head><title>URL Shorten</title><link rel="icon" href="https://simpleicons.org/icons/fujitsu.svg" type="image/x-icon"/><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style type="text/css">body {height: 100%;width: 100%;margin:0;padding:0;background: url(https://w.wallhaven.cc/full/dp/wallhaven-dpx573.png) no-repeat;background-size: cover;font-family: 'Open Sans', sans-serif;font-size: 100%;background-attachment:fixed;}.shorten {text-align: center;margin-top: 20em;position: relative}.s-bar {width: 40%;margin: 0 auto;}.s-bar input[type="text"] {font-size: 1.2em;font-weight: 600;color:rgba(0, 0, 0, 0.452);padding: 1.3em 1em 1.3em 1.5em;width: 70%;background: rgba(255, 255, 255, 0.479);border: 0;outline: 0;}.s-bar input[type="submit"] {font-size: 1.2em;font-weight: 600;color: rgb(238, 227, 227);padding: 1.3em .5em;width: 22%;text-align: center;border-radius: 0 5px 5px 0;-webkit-border-radius: 0 5px 5px 0;-moz-border-radius: 0 5px 5px 0;-o-border-radius: 0 5px 5px 0;margin: 0 0 0 -4px;background: #4c6574;cursor: pointer;border: 0;outline: 0;-webkit-appearance: none;background: #068a48c7;background: -moz-linear-gradient(top, #068a48c7 0, #068a48c7 37%, #068a48c7 66%, #068a48c7 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #068a48c7), color-stop(37%, #068a48c7), color-stop(66%, #068a48c7), color-stop(100%, #068a48c7));background: -webkit-linear-gradient(top, #068a48c7 0, #068a48c7 37%, #068a48c7 66%, #068a48c7 100%);background: -o-linear-gradient(top, #068a48c7 0, #068a48c7 37%, #068a48c7 66%, #068a48c7 100%);background: -ms-linear-gradient(top, #068a48c7 0, #068a48c7 37%, #068a48c7 66%, #068a48c7 100%);background: linear-gradient(to bottom, #068a48c7 0, #068a48c7 37%, #068a48c7 66%, #068a48c7 100%);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1fd8de', endColorstr='#1fd8de', GradientType=0)}.s-bar input[type="submit"]:hover {opacity: .8;filter: alpha(opacity=100);transition: all .3s ease;-webkit-transition: all .3s ease;-moz-transition: all .3s ease;-o-transition: all .3s ease}.result {font-size: 1.3em;font-weight: 700;color: rgba(0, 0, 0, 0.452);margin-bottom: 2em;margin-right: 5em;}@media (max-width: 1440px) {.s-bar {width: 40%}}@media (max-width: 1280px) {.s-bar input[type="text"] {width: 63%}}@media (max-width: 1024px) {.s-bar {width: 50%}}@media (max-width: 768px) {.shorten {margin: 22em 0 0 0}.s-bar {width: 58%}.s-bar input[type="text"] {width: 67%}}@media (max-width: 640px) {.s-bar {width: 65%}}@media (max-width: 568px) {.s-bar input[type="text"] {width: 64%}}@media (max-width: 480px) {.s-bar input[type="text"] {width: 55%;font-size: .8em}.s-bar input[type="submit"] {width: 30%;font-size: .8em}}@media (max-width: 320px) {.shorten {margin: 11.25em 0 0 0}.s-bar {width: 100%}.s-bar input[type="submit"] {text-shadow: rgba(80, 80, 80, 0.08) 1px 1px, rgba(80, 80, 80, 0.07) 2px 2px, rgba(80, 80, 80, 0.09) 3px 3px, rgba(80, 80, 80, 0.04) 4px 4px, rgba(80, 80, 80, 0.06) 5px 5px}}</style></head><body><div class="shorten"><div class="s-bar"><p class="result">https://url.francis.run</p></div><div class="s-bar"><form><input name="link" type="text" value="https://francis.run" onfocus="this.value = '';"onblur="if (this.value === '') {this.value = 'https://francis.run';}"><input id="submit" type="submit" value="Go"/></form></div></body></html>
`
 
const short_secret_key =  process.env.SHORT_SECRET_KEY;

console.log(short_secret_key)


// Generate short link
export async function urlShorten(request: Request) {
    if(short_secret_key ==""){
        return echoShortUrl(rawHtmlResponse(), "Short.io API secret key is empty,please export SHORT_SECRET_KEY");
    }

    const full_link = decodeURIComponent(request.url);

    // get params form url
    const originalURL = getUrlArg(full_link, "link");
    const path = getUrlArg(full_link, "path");
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
                    "Authorization": short_secret_key
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
    const reg = new RegExp(re, "i");
    return !reg.test(link);
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