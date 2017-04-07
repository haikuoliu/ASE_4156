import sum from './example'

// console.log(process.env.NODE_ENV)

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
