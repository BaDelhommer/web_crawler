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
          // convert any relative URLs to absolute URLs
          href = new URL(href, baseURL).href
          urls.push(href)
        } catch(err) {
          console.log(`${err.message}: ${href}`)
        }
      }
    }
  
    return urls
  }

export { normalizeURL, getURLsFromHTML };