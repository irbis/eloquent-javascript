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