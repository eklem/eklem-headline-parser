const findKeywords = function( headline, body, cutoff = 0){
  console.log('headline: ' + headline)
  // remove duplicates in headline
  headline = [...new Set(headline)]
  console.log('headline: ' + headline)
  console.log('body:     ' + body)
  console.log('cutoff:   ' + cutoff)

  // keywords array of word objects with word count
  let keywordsCount = []

  // returned array (cutoff if != 0)
  let keywords = []

  // loop through headline
  for (var i = 0; i < headline.length; i++) {
    // loop through body with each of the words in headline
    for (var j = 0; j < body.length; j++) {
      // headline/body mathching
      if (headline[i] === body[j]) {
        // check if word exists in keywordsCount first
        let existing = findExistingWord(keywordsCount, 'word', headline[i])
        if (existing > -1) {
          console.log('Should update count on word: ' + headline[i] + ' indexOf ' + existing)
          keywordsCount[existing].count++
          // update count on word object
        } else {
          // create object and push to array
          let wordObj = {word: headline[i], count: 1}
          keywordsCount.push(wordObj)
        }
        console.dir(keywordsCount)
      }
    }
  }
  // Sort on most times used in body
  keywordsCount.sort(compare)
  console.dir(keywordsCount)
}

function findExistingWord(array, attr, value) {
  for(var k = 0; k < array.length; k += 1) {
      if(array[k][attr] === value) {
          return k;
      }
  }
  return -1;
}

function compare( a, b ) {
  if ( a.count > b.count ){
    return -1;
  }
  if ( a.count < b.count ){
    return 1;
  }
  return 0;
}

const titleArray = ['words', 'I', 'have', 'some', 'interesting', 'words', 'words']
const bodyArray = ['There', 'is', 'a', 'chance', 'that', 'some', 'words', 'are', 'interesting', 'words', 'interesting', 'words']

findKeywords(titleArray,bodyArray)

// module.exports = {
//   findKeywords: findKeywords
// }