// data from the book
require('./journal.js')

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

function tableFor(event, journal) {
  let table = [0, 0, 0, 0]

  for (let entry of journal) {
    let index = 0
    if (entry.events.includes(event)) index += 1
    if (entry.squirrel) index += 2
    table[index] += 1
  }

  return table
}

console.log(tableFor("pizza", JOURNAL))

function journalEvents(journal) {
  let events = []

  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event)
      }
    }
  }

  return events
}

console.log(journalEvents(JOURNAL))
for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)))
}

console.log("--------------- Filtered correlation ---------------")
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL))
  if (correlation > 0.1 || correlation < -0.1) 
    console.log(event + ":", phi(tableFor(event, JOURNAL)))
}

console.log("--------------- Peanuts, Brushed teeth ---------------")
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
    !entry.events.includes("brushed teeth")) {
      entry.events.push("peanut teeth")
    }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)))

/*
  Several useful methods of array: push, pop - add/remove from the end
 */
let todoList = []
// put task to the tail
function remember(task) {
  todoList.push(task)
}
// extract task from the start of an array
function getTask() {
  return todoList.shift()
}
// put task to the head of an array
function rememberUrgently(task) {
  todoList.unshift(task)
}

remember("task1")
remember("task2")
remember("task3")
remember("task4")
console.log(todoList)

console.log(getTask())
console.log(todoList)

rememberUrgently("urgentTask")
console.log(todoList)

// array indexOf() and lastIndexOf() methods
// there is a second optional parameter that indicates
// where to start searching
console.log([1, 2, 3, 2, 1].indexOf(2)) // --> will return 2
console.log([1, 2, 3, 2, 1].lastIndexOf(2)) // --> will return 3

console.log("coconuts".slice(4, 7))
console.log("coconut".indexOf('u'))
console.log("one two three".indexOf("ee")) // to compare to arrays string allow to search substring

console.log("  okay \n".trim())
console.log(String(6).padStart(3, "0"))

let sentence = "Secretarybirds specialize in stomping"
let words = sentence.split(" ")
console.log(words)
console.log(words.join('.')) // join array of string to one string
console.log("LA".repeat(3))

// functions with variable amount of parameters
function max(...numbers) {
  let result = -Infinity
  for (let number of numbers) 
    if (number > result) result = number
  
  return result
}

console.log(max(4, 1, 9, -2))

let numbers = [5, 1, 7]
console.log(max(...numbers)) // spread array to variable amount of parameters

words = ["never", "fully"]
console.log(["will", ...words, "understand"])