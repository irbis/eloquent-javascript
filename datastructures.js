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
    That's why array index in breakets: value[2]
*/

let testString = 'testString'
console.log(testString.length)
console.log(testString["length"]) // both expressions are the same but
console.log(testString["leng" + "th"])

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
day1.wolf = false
console.log(day1.wolf)
