// programming language Egg

/*
   Example of the program:

   do(define(x, 10),
    if(>(x,5),
        print("large"),
        print("small)))

   There are three types of expressions:
     * value - literal strings or numbers
     * word - identifiers (names), such objects have a "name" property
       that holds the identifier's name as a string
     * apply - represents application. They have an operator property
       that refers to the expression that is being applied, as well as an
       args property that holds an arry of arguments expressions.

     >(x, 5) looks like this:
       {
         type: "apply",
         operator: {type: "word", name: ">"},
         args: [
           {type: "word", name: "x"},
           {type: "value", value: 5}
         ]
       }
 */

function parseExpression(program) {
    program = skipSpaces(program)
    let match, expr
    if (match = /^"([^"]*)"/.exec(program)) {
        expr = {type: "value", value: match[1]}
    } else if (match = /^\d+\b/.exec(program)) {
        expr = {type: "value", value: Number(match[0])}
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = {type: "word", name: match[0]}
    } else {
        throw new SyntaxError("Unexpected syntax: " + program)
    }

    return parseApply(expr, program.slice(match[0].length))
}

function skipSpaces(string) {
    let first = string.search(/\S/)
    if (first == -1) return ""
    return string.slice(first)
}

function parseApply(expr, program) {
    program = skipSpaces(program)
    if (program[0] != "(") {
        return {expr: expr, rest: program}
    }

    program = skipSpaces(program.slice(1))
    expr = {type: "apply", operator: expr, args:[]}
    while (program[0] != ")") {
        let arg = parseExpression(program)
        expr.args.push(arg.expr)
        program = skipSpaces(arg.rest)
        if (program[0] == ",") {
            program = skipSpaces(program.slice(1))
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'")
        }
    }
    return parseApply(expr, program.slice(1))
}

function parse(program) {
    let {expr, rest} = parseExpression(program)
    if (skipSpaces(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program")
    }
    return expr
}

console.log(parse("+(a, 10)"))

const specialForms = Object.create(null)

function evaluate(expr, scope) {
    if (expr.type == "value") {
        return expr.value
    } else if (expr.type == "word") {
        if (expr.name in scope) {
            return scope[expr.name]
        } else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`)
        }
    } else if (expr.type == "apply") {
        let { operator, args } = expr
        if (operator.type == "word" && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope)
        } else {
            let op = evaluate(operator, scope)
            if (typeof op == "function") {
                return op(...args.map(arg => evaluate(arg.scope)))
            } else {
                throw new TypeError("Applying a non-function.")
            }
        }
    }
}

// ternary operator if - always requires 3 arguments
specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError("Wrong number of args to if")
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope)
    } else {
        return evaluate(args[2], scope)
    }
}

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError("Wrong number of args to while")
    }
    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope)
    }

    return false
}

specialForms.do = (args, scope) => {
    let value = false
    for (let arg of args) {
        value = evaluate(arg, scope)
    }
    return value
}

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
        throw new SyntaxError("Incorrect use of define")
    }
    let value = evaluate(args[1], scope)
    scope[args[0].name] = value
    return value
}
