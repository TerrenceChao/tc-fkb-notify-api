module.exports = {
  content: `嗨， {{0}} {{1}}\n

  感謝您的註冊！ 請在登入畫面中通過輸入以下驗證碼來完成註冊：

  {{2}}

  祝旅途愉快！
  Travemorer`,
  replacement: new Map([
    [0, 1],
    [1, 0],
    [2, 2]
  ])
}
