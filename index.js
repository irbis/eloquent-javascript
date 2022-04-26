console.log("Hello world!")

// just an example of a program
let total = 0, count = 1
while (count <= 10) {
    total += count
    count += 1
}

console.log(total)

// example of a function
function factorial(n) {
    if (n === 0) {
        return 1
    } else {
        return factorial(n - 1) * n
    }
}

console.log(factorial(3))

// multi line string with ability to put values from variables
let multiline =
`This is a multiline
String ${factorial(5)}`

console.log(multiline)

// determine data type
console.log(typeof 4.5)
console.log(typeof "x")

let stringType = typeof "x"
if (stringType === "string")
    console.log("It's a string")
else
    console.log("It is not a string!")

let nanValue = NaN
let nullValue = null
let undefinedValue = undefined

console.log(8 * null)
console.log("5" - 1)
console.log("5" + 1)
console.log("five" * 2)
console.log(false == 0)
console.log(5 % 2)

function returnNull() { return null}

// logical operators special usage (&& by default right)
let ifHaveDefault = returnNull() || "user"
console.log(ifHaveDefault)

let var1 = 5
console.log(var1)

var1 = "five"
console.log(var1)

let variableWithUnderfinedValue
console.log(variableWithUnderfinedValue)
if (!variableWithUnderfinedValue)
    console.log("Value is undefined")
else
    console.log("Value is defined")

// define constants
var name = "Name1" // var is an old fashion style
const greeting = "Hello" // to define constant
console.log(greeting + name)

// loops
// while
let number = 0
while (number <= 12) {
    console.log(number)
    number = number + 2
}

// do
let doNumber = 0
do {
    console.log(doNumber)
    doNumber = doNumber + 2
} while (doNumber <= 12)

// for
for (let number = 0; number <= 12; number = number + 2)
    console.log(number)

// switch (and pattern matching)
let wheaterLike = "rainy"
switch (wheaterLike) {
    case "rainy":
        console.log("Remember to bring an umbrella.")
        break
    case "sunny":
        console.log("Dress lightly.")
        break
    case "cloudy":
        console.log("Go outside.")
        break
    default:
        console.log("Unknown weather type!")
        break
}

let triangleSymb = "#"
while (triangleSymb.length < 8) {
    console.log(triangleSymb)
    triangleSymb = triangleSymb + "#"
}

for (let i = 1; i <= 100; i++) {
    if (i % 5 === 0 && i % 3 === 0) console.log("FizzBuzz")
    else if (i % 5 === 0) console.log("Buzz")
    else if (i % 3 === 0) console.log("Fizz")
    else console.log(i)
}

let board = ""
let boardFixedPart = ""
const boardSize = 16
const eol = "\n"
const whiteCell = " "
const blackCell = "#"

for (let i = 1; i < boardSize; i++)
    if (i % 2 === 0)  boardFixedPart += whiteCell
    else              boardFixedPart += blackCell

for (let i = 0; i < boardSize; i++)
    if (i % 2 === 0)  board = board + boardFixedPart + eol
    else              board = board + whiteCell + boardFixedPart + eol

console.log(board)

// ******************** functions ************************* 
// interepts by definition - can be useful in case to define a local functions, for instance inside if conditions
const square = function(x) {
    return x * x
}

// in case of declare with 'function':
// functions that will be interrepted before running the first line of code (main program block)
console.log("The future says:", future()) 

function future() {
    return "You'll never have flying cars"
}

// arrow functions - definition with =>, almost the same as with usage of 'function'
/*
   definition structure:
   ([param1, [param2, [...]]]) => {
       statements
   }

   definition variants:
      1. (param1, param2, param3, ..., paramN) => expression
      2. singleParam => { statements } or singleParam => expression
      3. () => { statements } or () => expression

   arrow functions calculates during code execution, not before running the program
   as functions that were defined with 'function name ...'. So it's not possible to
   have the following part of code:

       plusFunc (2,2)
       const plusFunc = (x, y) => x + y

*/
const power = (base, exponent) => {
    let result = 1
    for (let count = 0; count < exponent; count++) {
        result *= base
    }

    return result
}

const square1 = (x) => { return x * x }
const square2 = x => x * x
const horn = () => {
    console.log("Toot")
}

// arguments and optional arguments
function minus(a, b) {
    if (b === undefined) return -a
    else return a - b
}

console.log(minus(4)) // parameter b has value 'undefined'
console.log(minus(6, 2))
console.log(minus(6, 3, 7)) // third parameter is ignored

function power2(base, exponent = 2) {
    let result = 1
    for (let count = 0; count < exponent; count++)
        result *= base

    return result
}

console.log(power2(4)) // power2(4, 2) - in fact
console.log(power2(2, 6))

// ********** closure **********
function wrapValue(n) {
    let local = n
    return () => local
}

let wrap1 = wrapValue(1)
let wrap2 = wrapValue(2)
console.log(wrap1())
console.log(wrap2())

function mulpiplier(factor) {
    return number => number * factor
}

let twice = mulpiplier(2)
console.log(twice(5))
