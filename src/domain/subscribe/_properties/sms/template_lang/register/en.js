module.exports = {
  content: `Hi, {{0}} {{1}}\n

  Thank you for your registration! Please complete the registration by entering the following verification code on the login page:

  {{2}}
  
  Happy traveling!
  Travemorer`,
  replacement: new Map([
    [0, 0],
    [1, 1],
    [2, 2]
  ])
}
