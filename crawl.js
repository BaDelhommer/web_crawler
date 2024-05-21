import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
};

function getURLsFromHTML(html, baseURL) {
    const urls = []
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll('a')
  
    for (const anchor of anchors) {
      if (anchor.hasAttribute('href')) {
        let href = anchor.getAttribute('href')
  
        try {
          href = new URL(href, baseURL).href
          urls.push(href)
        } catch(err) {
          console.log(`${err.message}: ${href}`)
        }
      }
    }
  
    return urls
  }

  async function crawlPage(currentURL) {
    console.log(`crawling ${currentURL}`)
    
    let res
    try {
        res = await fetch(currentURL)
    } catch(err) {
        throw new Error(`Got network error: ${err.message}`)
    }

    if (res.status > 399) {
        console.log(`Got http error: ${res.status} ${res.statusText}`)
    }

    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`)
        return
    }
    console.log(await res.text())
  }

export { normalizeURL, getURLsFromHTML, crawlPage };