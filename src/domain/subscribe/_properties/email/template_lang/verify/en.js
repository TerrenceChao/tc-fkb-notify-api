module.exports = {
  content: {
    subject: 'Please verify your Travmory account',
    text: `Dear {{0}} {{1}} {{2}}\n
    We have received your password-change requirement.
    Please enter the following verify code to change:
    
      {{3}} (link:{{4}}?token={{5}})
    
    
    you can change password directly instead of above.
    
      link:{{6}}?token={{7}}&expire={{8}}
    
    
    Have you never requested for password-change?
    If you have not requested a new password, link: please let us know.`
  },
  replacement: new Map([
    [0, (params) => { return params[0] === '1' ? 'Mr.' : 'Ms.' }],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8]
  ])
}
