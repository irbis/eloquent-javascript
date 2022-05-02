// ********** Arrays **********
let listOfNumbers = [2, 3, 5, 7, 11]

// index starts from 0
console.log(listOfNumbers[2]) // will be 5
console.log(listOfNumbers[0]) // will be 2
console.log(listOfNumbers[2 - 1]) // will be 3

// ********** Properties **********
/*

  To get property value:
    * value.x - x is a property name
    * value[x] - x is a calculated property name, because x can be an
      expression to that returns string, which will be used as a property
      name

    It's not possible to use number in notation value.x, e.g. value.2.
    That's why array index in brackets: value[2]
*/

let testString = 'testString'
console.log(testString.length)
console.log(testString["length"]) // both expressions are the same but
console.log(testString["leng" + "th"]) // expression is calculated

// methods
let doh = "Doh"
console.log(typeof doh.toUpperCase)
console.log(doh.toUpperCase())

let sequence = [1, 2, 3]
sequence.push(4)
sequence.push(5)
console.log(sequence)

console.log(sequence.pop())
console.log(sequence)

// ********** Objects **********
let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
}
console.log(day1.squirrel)
console.log(day1.wolf)
day1.wolf = false // objects are open for modifications - property can be added
                  // at any time
console.log(day1.wolf)

// property also can be deleted at any time
let anObject = {left: 1, right: 2}
console.log(anObject.left)
delete anObject.left // delete a property
console.log(anObject.left) // it returns undefined every time it will be called
                           // but it does not garantee that property does not
                           // exist, because it can exist with a value undefined
console.log("left" in anObject) // to check if property is exists
console.log("right" in anObject) // special operation in can be used
anObject.right = undefined
console.log("right" in anObject)

// to get full list of properties
console.log(Object.keys({x: 0, y: 0, z: 0}))

// merge objects: copy all properties from one object into another
let objectA = {a: 1, b: 2}
Object.assign(objectA, {b: 3, c: 4})
console.log(objectA)

let journal = []
/*
  Function shows short form of object creation where name of property and
  it's value comes from early defined variable
 */
function addEntry(events, squirrel) {
    journal.push({events, squirrel}) // short form - value part was skipped
}

addEntry(["work", "touched tree", "pizza", "running",
    "television"], false)
addEntry(["work", "ice cream", "cauliflower", "lasagna",
    "touched tree", "brushed teeth"], false)
addEntry(["weekend", "cycling", "break", "peanuts",
    "beer"], true)

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt(
            (table[2] + table[3]) *
               (table[0] + table[1]) *
               (table[1] + table[3]) *
               (table[0] + table[2]))
}
console.log(phi([76, 9, 4, 1]))