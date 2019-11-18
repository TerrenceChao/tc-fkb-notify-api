module.exports = {
  content: {
    subject: 'Please verify your Travmory account',
    text: `Hi, {{0}} {{1}}\n

    Thanks for your registration! Please confirm your email address by enter the following verify code:
  
    {{2}}
    
    Or, clicking on the link below. 
    
    {{3}}?token={{4}}&code={{5}}
    
    If you did not sign up for a Travmory account please disregard this email.
    
    Happy traveling!
    Travemorer`
  },
  replacement: new Map([
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5]
  ])
}
