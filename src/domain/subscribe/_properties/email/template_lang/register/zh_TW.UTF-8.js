module.exports = {
  content: {
    subject: '請驗證您的 Travmory 帳戶',
    text: `嗨， {{0}} {{1}}\n

    感謝您的註冊！ 請通過輸入以下驗證碼來確認您的電子郵件地址：
  
    {{2}}
    
    或者，點擊下面的鏈接。 
    
    {{3}}?token={{4}}&expire={{5}}&email={{6}}
    
    如果您沒有註冊 Travmory 帳戶，請忽略此電子郵件。
    
    祝旅途愉快！
    Travemorer`
  },
  replacement: new Map([
    [0, 1],
    [1, 0],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6]
  ])
}
