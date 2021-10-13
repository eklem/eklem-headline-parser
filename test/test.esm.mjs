// libraries
import test from 'ava'
import ehp from '../dist/eklem-headline-parser.cjs.js'
import sw from 'stopword'
const findKeywords = ehp.findKeywords

// const titleArray = ['her', 'var', 'det', 'bra']
const titleArray = [
  ['words', 'I', 'have', 'some', 'interesting', 'words', 'words'],
  ['I', 'you', 'some', 'it', 'the'],
  ['spikeren', 'i', 'kista', 'for', 'riksrett']
]
const bodyArray = [
  ['There', 'is', 'a', 'chance', 'that', 'some', 'words', 'are', 'interesting', 'words', 'interesting', 'words', 'I', 'think'],
  ['I', 'think', 'there', 'is', 'a', 'chance', 'that', 'this', 'text', 'will', 'return', 'some', 'keywords'],
  ['i', 'dag', 'skal', 'spesialetterforsker', 'Robert', 'Muller', 'vitne', 'om', 'den', 'såkalte', 'Russland', 'etterforskningen', 'norsk', 'ekspert', 'tror', 'det', 'blir', 'et', 'antiklimaks', 'for', 'dem', 'som', 'ønsker', 'Trump', 'vekk', 'det', 'store', 'spørsmålet', 'for', 'demokratene', 'er', 'hvorvidt', 'de', 'skal', 'stille', 'presidenten', 'for', 'riksrett', 'for', 'å', 'ha', 'hindret', 'Muellers', 'etterforskning']
]

test('return top keywords sorted by relevance, first two, then all (four)', (t) => {
  t.deepEqual(findKeywords(titleArray[0], bodyArray[0], 2), ['words', 'interesting'])
  t.deepEqual(findKeywords(titleArray[0], bodyArray[0]), ['words', 'interesting', 'I', 'some'])
})

test('same as above. Returns two when stopwords are removed from headline first', (t) => {
  t.deepEqual(findKeywords(sw.removeStopwords(titleArray[0]), bodyArray[0]), ['words', 'interesting'])
})

test('Only stopwords in headline, they are removed, should return no keywords', (t) => {
  t.deepEqual(findKeywords(sw.removeStopwords(titleArray[1]), bodyArray[1]), [])
})

test('Norwegian language and removal of Norwegian stopwords from headline before finding keywords', (t) => {
  t.deepEqual(findKeywords(sw.removeStopwords(titleArray[2], sw.no), bodyArray[2]), ['riksrett'])
})
