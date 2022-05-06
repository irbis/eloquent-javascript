function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i)
    }
}

repeat(3, console.log)

let lables = []
repeat(5, i => lables.push(`Unit ${i + 1}`))
console.log(lables)

function greaterThen(n) {
    return m => m > n
}
let greaterThen10 = greaterThen(10)
console.log(greaterThen10(11))

function noisy(f) {
    return (...args) => {
        console.log("calling with", args)
        let result = f(...args)
        console.log("called with", args, ",returned", result)
        return result
    }
}
noisy(Math.min)(3, 2, 1)

function unless(test, then) {
    if (!test) then()
}

repeat(3, n => {
    unless( n % 2 == 1, () => {
        console.log(n, "is even")
    })
})

/*
  Arrays' standard high-ordered operations:
    - forEach
    - filter
    - map - content will have been mapped to a new form
    - reduce (sometimes also called 'fold') - computing single value from arrays' values
 */

function reduce(array, combine, start) {
    let current = start
    for (let element of array) 
        current = combine(current, element)
    return current
}
console.log("reduce example: " + reduce([1, 2, 3, 4], (a, b) => a + b, 0))