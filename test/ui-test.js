const { chromium } = require('playwright')
const test = require('ava')
const browserPromise = chromium.launch({
  headless: true
  // slowMo: 30
})

const path = require('path')
async function pageMacro (t, callback) {
  const browser = await browserPromise
  const page = await browser.newPage()
  await page.setViewportSize({ width: 640, height: 480 })
  try {
    await callback(t, page)
  } finally {
    await page.close()
  }
}

test('test', pageMacro, async (t, page) => {
  const filePath = await path.resolve('./demo/index.html')
  const url = 'file://' + filePath

  // Go to ./demo/index.html
  await page.goto(url)

  // Click [placeholder="Add a headline"]
  await page.click('#headlinetext')

  // Fill [placeholder="Add a headline"]
  await page.keyboard.type('a headline to analyze')

  // Press Tab
  await page.keyboard.press('Tab')

  // Fill [placeholder="Add a lot of body text"]
  await page.keyboard.type('to analyze a headline we need a heading and then some bodytext that could be compared to analyze to work')

  // Click #keywordsFound
  await page.click('#keywordsFound')
  t.deepEqual(await page.textContent('#keywordsFound'), 'analyze,headline')
})
