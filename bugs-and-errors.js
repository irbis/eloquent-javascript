function canYouSpotTheProblem() {
    "use strict" // in non-strict mode, counter can be used without let
    for (let counter = 0; counter < 10; counter++) {
        console.log("Happy happy")
    }
}

canYouSpotTheProblem()

// In strict mode this holds the value undefined in fucntions that are
// not called as methods.
// In non-strict mode this refers to the global scope objects, which is an
// object whose properties are the global bindings.
function Person(pname) { this.pname = pname }
let ferdinand = Person("Ferdinand")
console.log(pname)

// exception
function promptDirection(question) {
    let result = prompt(question)
    if (result.toLowerCase() == "left") return "L"
    if (result.toLowerCase() == "right") return "R"
    throw new Error("Invalid direction: " + result)
}

function look() {
    if (promptDirection("Which way?") == "L") {
        return "a house"
    } else {
        return "two angry bears"
    }
}

try {
    console.log("You see ", look())
} catch (error) {
    console.log("Something went wrong: " + error)
}

/* *************** Exercises ****************/
// Retry
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b
    } else {
        throw new MultiplicatorUnitFailure("Klunk")
    }
}

function reliableMutiply(a, b) {
    const tryNumbers = 100
    for (let i = 0; i < tryNumbers; i++) {
        try {
            return primitiveMultiply(a, b)
        } catch (e) {
        }
    }
    throw new Error("Number of tries were exceded!")
}

console.log(reliableMutiply(8, 8))