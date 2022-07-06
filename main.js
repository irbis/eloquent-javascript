const {reverse} = require("./reverse")

let argument = process.argv[2]

console.log(reverse(argument))

let {readFile} = require("fs")
readFile("main.js", "utf8", (error, text) => {
    if (error) throw error

    console.log("The file contains:", text)
})

readFile("main.js", (error, buffer) => {
    if (error) throw error

    console.log("The file contained", buffer.length, "bytes",
        "The first byte is:", buffer[0])
})
