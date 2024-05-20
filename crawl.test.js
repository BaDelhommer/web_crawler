import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "./crawl.js"
import { JSDOM } from 'jsdom'

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML len', () => {
    const sampleHTML = `
    <html>
        <body>
        <a href="https://boot.dev">boot.dev</a>
        <a href="/blog">Blog</a>
        <a href="https://example.com">Example</a>
        </body>
    </html>
    `
    const baseURL = 'https://boot.dev'
    const actual = getURLsFromHTML(sampleHTML, baseURL)
    const expected = ["https://boot.dev/", "https://boot.dev/blog", "https://example.com/"]
    console.log(actual)
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML no_links', () => {
    const sampleHTML = `
    <html>
        <body>
        <p>No links here</p>
        </body>
    </html>
    `
    const baseURL = 'https://boot.dev'
    const actual = getURLsFromHTML(sampleHTML, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML malformed_html', () => {
    const sampleHTML = `
    <html>
        <body>
        <a href="https://boot.dev">boot.dev</a>
        <a href="/blog">Blog</a>
    `
    const baseURL = 'https://boot.dev'
    const actual = getURLsFromHTML(sampleHTML, baseURL)
    const expected = ["https://boot.dev/", "https://boot.dev/blog"]
    expect(actual).toEqual(expected)
})