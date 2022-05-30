// the following method was highly used before modules were
// added to JavaScript
const weekDay = function () {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"]
    return {
        name(number) { return names[number] },
        number(name) { return names.indexOf(name) }
    }
}()

console.log(weekDay.name(weekDay.number("Sunday"))) // <-- expecting Sunday

// Evaluating data as code - one of the method to control execution context
const x = 1
function evalAndReturnX(code) {
    eval(code)
    return x
}

// the following code defines variable x in a scope to execute which is hides
// constant x defined globally
console.log(evalAndReturnX("var x = 2"))
// shows value of constant x defined globally
console.log(x)

// another method to run data as a code. Two parameters: list of arguments
// and body
let plusOne = Function("n", "return n + 1")
console.log(plusOne(4)) // <-- expecting 4

/* *************** CommonJS modules *************** */
const { formatDateCJS } = require("./format-date-commonjs")
console.log(formatDateCJS(new Date(2017, 9, 13), "dddd the Do"))

const { parse } = require("ini")
console.log(parse("x = 10\ny = 20")) // <-- expecting { x: "10", y: "20" }

/* *************** ECMAScript modules *************** */
// additional settings are required to support import from ECMAScript modules
// import { formatDate as formatDateECMA } from "./format-date-ecmascript"
