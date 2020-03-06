module.exports = {
  content: `親愛的 {{0}} {{1}} {{2}} 您好\n
  我們已收到你的 Fakebook 密碼重設要求。
  輸入以下密碼重設確認碼：
  {{3}}`,
  replacement: new Map([
    [0, 2],
    [1, 1],
    [2, (params) => { return params[0] === '1' ? '先生' : '女士' }],
    [3, 3]
  ])
}
