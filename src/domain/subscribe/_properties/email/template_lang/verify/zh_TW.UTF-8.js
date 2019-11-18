module.exports = {
  content: {
    subject: '請驗證您的 Travmory 帳戶',
    text: `親愛的 {{0}} {{1}} {{2}} 您好\n
    我們已收到你的密碼重設要求。
    請輸入以下驗證碼進行更改：
    
      {{3}} (url-link:{{4}}?token={{5}})
    
    
    你也可以改為直接變更密碼。
    
      url-link:{{6}}?token={{7}}&reset={{8}}
    
    
    你並沒有要求更改密碼？
    如果你並未要求新密碼， url-link:請通知我們。`
  },
  replacement: new Map([
    [0, 2],
    [1, 1],
    [2, (params) => { return params[0] === '1' ? '先生' : '女士' }],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8]
  ])
}
