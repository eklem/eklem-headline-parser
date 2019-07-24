const headlineParser = require('../index.js')
const test = require('tape')
const findKeywords = headlineParser.findKeywords

//const titleArray = ['her', 'var', 'det', 'bra']
const titleArray = ['words', 'I', 'have', 'some', 'interesting', 'words', 'words']
const bodyArray = ['There', 'is', 'a', 'chance', 'that', 'some', 'words', 'are', 'interesting', 'words', 'interesting', 'words']













test('return top two keywords sorted by relevance', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(titleArray,bodyArray,2), ['words','interesting'])
})


