// to create
let re1 = new RegExp("abc") // via constructor
let re2 = /abc/ // via /ccccc/

let eighteenPlus = /eighteen\+/

// testing for matches
console.log(/abc/.test("abcde")) // <-- expecting true
console.log(/abc/.test("abxde")) // <-- expecting false

// set of characters
console.log(/[0123456789]/.test("in 1992")) // <-- expecting true
console.log(/[0-9]/.test("in 1992")) // <-- expecting true
console.log(/\d/.test("in 1992")) // <-- expecting true

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/
console.log(dateTime.test("01-30-2003 15:20")) // <-- expecting true
console.log(dateTime.test("01-jan-2003 15:20")) // <-- expecting false

// inverting - use '^' to invert test
let notBinary = /[^01]/
console.log(notBinary.test("1111000101010101")) // <-- expecting false
console.log(notBinary.test("110010101010210010")) // <-- expecting true

// repeating parts of a pattern
console.log(/'\d+'/.test("'123'")) // <-- expecting true (+ to indicate
// repeat more than once)
console.log(/'\d+'/.test("''")) // <-- expecting false
console.log(/'\d*'/.test("'123'")) // <-- expecting true (* zero or more)
console.log(/'\d*'/.test("''")) // <-- expecting true

let neighbor = /neighbou?r/ // <-- ? is optional symbol
console.log(neighbor.test("neighbour")) // <-- expecting true
console.log(neighbor.test("neighbor")) // <-- expecting true

let dateTimeV2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
console.log(dateTime.test("01-30-2003 15:20")) // <-- expecting true

// grouping subexpressions
let cartoonCrying = /boo+(hoo+)+/i
console.log(cartoonCrying.test("Boohoooohoohooo")) // <-- expecting true

// matches and groups
let match = /\d+/.exec("one two 100")
console.log(match) // <-- expecting ["100"]
console.log(match.index) // <-- expecting 8
console.log("one two 100".match(/\d+/)) // <-- expecting ["100"]
let quotedText = /'([^']*)'/
console.log(quotedText.exec("she said 'hello'"))
console.log(/bad(ly)?/.exec("bad"))
console.log(/(\d)+/.exec("123"))

// The Date Class
console.log(new Date())
console.log(new Date(2009, 11, 9))
console.log(new Date(2009, 11, 9, 12, 59, 59, 999))

function getDate(string) {
    let [_, month, day, year] =
        /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string)
    return new Date(year, month - 1, day)
}
console.log(getDate("1-30-2023"))

// Word and string boundaries
console.log(/cat/.test("concatenate")) // <-- expecting true
console.log(/\bcat\b/.test("concatenate")) // <-- expecting false: \b is a word boundary

// choice patterns
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/
console.log(animalCount.test("15 pigs")) // <-- expecting true
console.log(animalCount.test("15 pigchickens")) // <-- expecting false

// The replace method
console.log("papa".replace("p", "m"))
console.log("Borobudur".replace(/[ou]/, "a"))
console.log("Borobudur".replace(/[ou]/g, "a"))
// alternative variant with RegExp constructor
console.log("Borobudur".replace(new RegExp("[ou]", "g"), "a"))

console.log(
    "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1"))

let s = "the cia and fbi"
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()))

let stock = "1 lemon, 2 cabbages, and 101 eggs"
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1
    if (amount === 1) {
        unit = unit.slice(0, unit.length - 1)
    } else if (amount === 0) {
        amount = "no"
    }

    return amount + " " + unit
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne))

// Dynamically creating RegExp objects
let firstName = "harry"
let text = "Harry is a suspicious character."
let regexp = new RegExp("\\b(" + firstName + ")\\b", "gi")
console.log(text.replace(regexp, "_$1_"))

let specialName = "dea+hl[]rd"
let textForSpecial = "This dea+hl[] guy is super annoying"
let escaped = specialName.replace(/[\\[.+*?(){|^$]/g, "\\$&")
let specialRegexp = new RegExp("\\b" + escaped + "\\b", "gi")
console.log(textForSpecial.replace(specialRegexp, "_$&_"))

// The Search Method
console.log("  word".search(/\S/)) // <-- expecting 2
console.log("      ".search(/\S/)) // <-- expecting -1

// The LastIndex property
let pattern = /y/g
console.log(pattern.lastIndex)
pattern.lastIndex = 3
let matchLastIndex = pattern.exec("xyzzy")
console.log(matchLastIndex.index) // <-- expecting 4
console.log(pattern.lastIndex) // <-- expecting 5

let global = /abc/g
console.log(global.exec("xyz abc"))
let sticky = /abc/y
console.log(sticky.exec("xyz abc"))
// previous search returns null as because string does not start from "abc"
// where lastIndex points as a default value
// To fix this, lastIndex has to be set to 4
sticky.lastIndex = 4
console.log(sticky.exec("xyz abc")) // <-- expecting found

// lastIndex updates automatically during search
let digit = /\d/g
console.log(digit.exec("here it is: 1")) // <-- found 1
console.log(digit.lastIndex) // <-- expecting 13
console.log(digit.exec("and now: 1")) // returns null

console.log("Banana".match(/an/g)) // <-- with global option returns array
// with two elements

// Looping over matches
let input = "A string with 3 numbers in it... 42 and 88."
let number = /\b\d+\b/g
let matchLoop
// the below is possible because lastIndex updates accordinaly
while (matchLoop = number.exec(input))
  console.log(`Found ${matchLoop[0]}, at ${matchLoop.index}`)