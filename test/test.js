const headlineP = require('../headline-parser.js')
const test = require('tape')
const findKeywords = headlineP.findKeywords

var stubs = [
  {
    headline: 'Burkina Faso opposition parties, African Union reject army takeover',
    body: "OUAGADOUGOU (Reuters) - Burkina Faso's opposition parties, the United States and the African Union rejected the army's seizure of power in the West African country on Saturday after the resignation of President Blaise Compaore, setting the stage for fresh street protests.",
    n: 1,
    returnNonMatched: false,
    args: {language:"english", return_changed_case:false}
  },
  {
    headline: "absolutely exclamation final",
    body: "final exclamation exclamation absolutely absolutely absolutely",
    n: 3,
    returnNonMatched: false,
    args: {language:"english", return_changed_case:false},
  },
  {
    headline: "a the and if",
    body: "a the and if and a the if and",
    n: null,
    args: null,
    returnNonMatched: false,
  },
  {
    headline: "imperative otter shenanigans",
    body: "there are no mentions of the headline keywords in this sentence",
    n: 3,
    args: {language:"english", return_changed_case:false},
    returnNonMatched: false,
  },
]

test('return single most relevant keyword from title', function (t) {
  t.plan(2)
  t.deepEqual(findKeywords(stubs[0].headline.split(' '), stubs[0].body.split(' '), stubs[0].n, stubs[0].args, stubs[0].returnNonMatched), ['African'])
  t.deepEqual(findKeywords(stubs[1].headline.split(' '), stubs[1].body.split(' '), 1, stubs[1].args, stubs[1].returnNonMatched), ['absolutely'])
})

test('return top three keywords sorted by relevance', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[1].headline.split(' '), stubs[1].body.split(' '), stubs[1].n, stubs[1].args, stubs[1].returnNonMatched), ['final','exclamation','absolutely'])
})

test('return all keywords when no N or args argument is given', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[1].headline.split(' '), stubs[1].body.split(' '), null, null, null), ['final','exclamation','absolutely'])
})

test('return empty array if given empty strings', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords([''], [''], stubs[2].n, stubs[2].args), [''])
})

test('return empty array if headline has only stopwords', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[2].headline.split(' '), stubs[2].body.split(' '), stubs[2].n, stubs[2].args, stubs[2].returnNonMatched), [])
})

test('return all sorted keywords if N is greater than number of keywords', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[1].headline.split(' '), stubs[1].body.split(' '), 10, stubs[1].args, null), ['final','exclamation','absolutely'])
})

test('return all sorted keywords if no N is given', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[1].headline.split(' '), stubs[1].body.split(' '), null, stubs[1].args, null), ['final','exclamation','absolutely'])
})

test('return no keywords since returnNonMatched is set to to false', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[3].headline.split(' '), stubs[3].body.split(' '), stubs[3].n, stubs[3].args, stubs[3].returnNonMatched), [])
})

test('return no keywords since returnNonMatched defaults to false', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[3].headline.split(' '), stubs[3].body.split(' '), stubs[3].n, stubs[3].args, null), [])
})

test('return keywords even if no match since returnNonMatched is true', function (t) {
  t.plan(1)
  t.deepEqual(findKeywords(stubs[3].headline.split(' '), stubs[3].body.split(' '), stubs[3].n, stubs[3].args, true), ['imperative','otter','shenanigans'])
})

