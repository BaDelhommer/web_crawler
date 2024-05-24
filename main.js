import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js"
import process from "node:process";

async function main() {
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
    const pages = crawlPage(baseURL)
    printReport(pages)
    
}

main()
