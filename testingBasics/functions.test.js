const functions = require('./functions')

test('adds 2 + 2 to equal 4', () => {
    expect(functions.add(2,2)).toBe(4)
})

test('adds 2 + 2 to NOT equal 5', () => {
    expect(functions.add(2,2)).toBe(5)
})

test('Should be null', () => {
    expect(functions.isNull()).toBeNull()
})

test('Should be falsy', () => {
    expect(functions.checkValue(undefined)).toBeFalsy()
})