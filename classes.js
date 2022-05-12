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
let object = new class { getWorld() { return "hello" }}
console.log(object.getWorld())