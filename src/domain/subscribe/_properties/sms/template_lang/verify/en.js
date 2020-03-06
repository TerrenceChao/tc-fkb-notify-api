module.exports = {
  content: `Dear {{0}} {{1}} {{2}}\n
  We have received your password reset requirement.
  Please enter the following verify code to reset:
  {{3}}`,
  replacement: new Map([
    [0, (params) => { return params[0] === '1' ? 'Mr.' : 'Ms.' }],
    [1, 1],
    [2, 2],
    [3, 3]
  ])
}
