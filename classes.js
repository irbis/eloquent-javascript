let rabbit = {}
// Objects (not classes) and method definition
rabbit.speak = function(line) {
    console.log(`The rabbit says '${line}'`)
}

rabbit.speak("I'm alive")

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`)
}
let whiteRabbit = { type: "white", speak }
let hungryRabbit = { type: "hungry", speak }

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!")
hungryRabbit.speak("I could use a carrot right now.")
speak.call(hungryRabbit, "Burp!") // another method to call function where 'this' is specified

/*
  Arrow functions are different - they do not bind their own this, but can see the this
  binding of the scope around them.
 */
function normalize() {
    console.log(this.coords.map(n => n / this.length))
}
normalize.call({coords: [0, 2, 3], length: 5})

let threeDDim = { coords: [2, 4, 5], length: 7, normalize}
threeDDim.normalize()

/* *************** Prototypes *************** */
let empty = {}
console.log(empty.toString)
console.log(empty.toString())

console.log(Object.getPrototypeOf({}) == Object.prototype)
console.log(Object.getPrototypeOf(Object.prototype))

// Functions dirives from Function.prototype
console.log(Object.getPrototypeOf(Math.max) == Function.prototype)
// Array derives from Array.prototype
console.log(Object.getPrototypeOf([]) == Array.prototype)

// to create an object with a specific prototype
let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`)
    }
}
let killerRabbit = Object.create(protoRabbit)
killerRabbit.type = "killer"
killerRabbit.speak("SKREEEE!")
console.log(Object.getPrototypeOf(killerRabbit))
console.log(Object.getPrototypeOf(whiteRabbit))

// constructor function
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit)
    rabbit.type = type
    return rabbit
}

function Rabbit(type) {
    this.type = type
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}`)
}
let weirdRabbit = new Rabbit("weird")

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype)
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype)

class RabbitClass {
    constructor(type) {
        this.type = type
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`)
    }
}

let killerRabbit1 = new RabbitClass("killer")
let blackRabbit = new RabbitClass("black")

// class can be used both in statement and in expression positions.
// anonymous class
let object = new class { getWorld() { return "hello" }}
console.log(object.getWorld())

// in case of having internal variable
class Person {
    constructor(id, firstname = "unspecified", lastname = "unspecified") {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
    }

    birthYear = 1990

    fullname() {
        return `${firstname} ${lastname}`
    }
}

let p1 = new Person(1)
let p2 = new Person(2, "FTest", "LTest")
console.log(p2.birthYear)
p2.birthYear = 1993
console.log(p2.birthYear)
console.log(Object.getPrototypeOf(Person))
console.log(Object.getPrototypeOf(p2) == Person.prototype)

Person.prototype.status = "Active" // property was defined at prototype
p1.status = "Inactive"
console.log(p1.status) // expecting 'Inactive' as p1 overrides property "status"
console.log(p2.status) // expecting 'Active' from Person prototype
p1.gender = "M"
console.log(p1.gender) // expecting 'M' - new property was added
console.log(p2.gender) // expecting 'underfined' - no property in the prototype

// toString() method calls from Object prototype - output is different
// to compare with [1, 2].toString()
console.log(Object.prototype.toString.call([1, 2]))

/* *************** Maps *************** */
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
}

console.log(`Julia is ${ages["Julia"]}`)
console.log("Is Jack's age known?", "Jack" in ages)
console.log("Is toString's age known?", "toString" in ages)

/*
   Because plain object - {} derives from Object it's dangerous to use it
   as a Map.
   To create object that is not deriving from Object:
    Object.create(null)
 */
console.log("toString" in Object.create(null)) // expecting false - null is not an Object

// More proper way is to use call Map
let agesMap = new Map()
agesMap.set("Boris", 39)
agesMap.set("Liang", 22)
agesMap.set("Julia", 62)

console.log(`Julia is ${agesMap.get("Julia")}`)
console.log("Is Jack's age known?", agesMap.has("Jack"))
console.log("Is toString's age known?", agesMap.has("toString"))
console.log(Object.getPrototypeOf(agesMap) == Map.prototype)

// to get list of keys - Object.keys() to read all keys
// Object.hasOwnProperty() - to check if key is exist
console.log(Object.keys({x: 1, y: 1}))
console.log({x: 1}.hasOwnProperty("x"))
console.log({x: 1}.hasOwnProperty("toString"))

/* *************** Polymorphism *************** */
Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`
}
console.log(String(weirdRabbit))

// Symbols
let sym = Symbol("name")
console.log(sym == Symbol("name"))
Rabbit.prototype[sym] = 55
console.log(weirdRabbit[sym])

const toStringSymbol = Symbol("toString")
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`
}
console.log([1, 2].toString())
console.log([1, 2][toStringSymbol]())

let stringObject = {
    [toStringSymbol]() { return "a jute rope" }
}
console.log(stringObject[toStringSymbol]())

// The iterator interface
let okIterator = "OK"[Symbol.iterator]()
console.log(okIterator.next()) // expecting value: O, done: false
console.log(okIterator.next()) // expecting value: K, done: false
console.log(okIterator.next()) // expecting value: undefined, done: true

class MatrixIterator {
    constructor(matrix) {
        this.x      = 0
        this.y      = 0
        this.matrix = matrix
    }

    /*
      return { x, y, value }
     */
    next() {
        if (this.y == this.matrix.height) return { done: true }

        let value = { x:     this.x,
                      y:     this.y,
                      value: this.matrix.get(this.x, this.y) }
        this.x++
        if (this.x == this.matrix.width) {
            this.x = 0
            this.y++
        }

        return { value, done: false }
    }

}

class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width
        this.height = height
        this.content = []

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y)
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x]
    }
    set (x, y, value) {
        this.content[y * this.width + x] = value
    }

    [Symbol.iterator]() {
        return new MatrixIterator(this)
    }
}

/*
   Another method to setup iterator:
   Matrix.prototype[Symbol.iterator] = function() {
       return new MatrixIterator(this)
   }
 */

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`)
for (let { x, y, value } of matrix) {
    console.log(x, y, value)
}

// Getters, setters and statics

// defines getter
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100)
    }
}

console.log(varyingSize.size)
console.log(varyingSize.size)

class Temperature {
    constructor(celsius) {
        this.celsius = celsius
    }

    get fahrenheit() { // <-- getter
        return this.celsius * 1.8 + 32
    }
    set fahrenheit(value) { // <-- setter
        this.celsius = Temperature._toCelcius(value)
    }
    
    static _toCelcius(value) {
        return (value - 32) / 1.8
    }
    
    static fromFahrenheit(value) { // <-- static
        return new Temperature(Temperature._toCelcius(value))
    }
}

let temp = new Temperature(22)
console.log(temp.fahrenheit)
temp.fahrenheit = 86
console.log(temp.celsius)

// Inheritance
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x)
            else       return element(x, y)
        })
    }

    set(x, y, value) {
        super.set(x, y, value)
        if (x != y) {
            super.set(y, x, value)
        }
    }
}

let symmetricMatrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`)
console.log(symmetricMatrix.get(2, 3))

// The instanceof operator
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix) // --> should be true
console.log(new SymmetricMatrix(2) instanceof Matrix) // --> should be true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix) // --> should be false
console.log([1] instanceof Array) // --> should be true

/* *************** Exercises  *************** */
// A Vector Type
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    minus(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

console.log(new Vector(1, 2).plus(new Vector(2, 3)))
console.log(new Vector(1, 2).minus(new Vector(2, 3)))
console.log(new Vector(3, 4).length)

// Groups
class Group {
    constructor(arr = []) {
        this.arr = arr
    }

    add(element) {
        if (!this.has(element))
            this.arr.push(element)
    }

    delete(element) {
        this.arr = this.arr.filter( e => e !== element)
    }

    has(element) {
        return this.arr.includes(element)
    }

    // method is expecting that range does not contain repatable values
    static from(range) {
        let arr = []
        for (let e of range)
            arr.push(e)

        return new Group(arr)
    }
}

let group = Group.from([10, 20]) 
console.log(group)
console.log(group.has(10))
console.log(group.has(30))
group.add(10)
group.delete(10)
console.log(group.has(10))
console.log(group)