import { normalizeURL, crawlPage } from "./crawl.js";
import process from "node:process";

function main() {
    if (process.argv.length > 3) {
        console.log("Too many arguments")
        return
    }

    if (process.argv.length < 3) {
        console.log("Too few arguments")
        return
    }
    const baseURL = process.argv[2]

    console.log(`starting crawl of: ${baseURL}`)
    crawlPage(baseURL)



}

main()
