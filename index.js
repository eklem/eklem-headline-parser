const findKeywords = function( headline, body, cutoff = 0){
  console.log('headline: ' + headline)
  console.log('body:     ' + body)
  console.log('cutoff:   ' + cutoff)

  // keywords array of word objects with word count
  let keywordsAccumulated = []

  // returned array (cutoff if != 0)
  let keywords = []


  // loop through headline
  for (var i = 0; i < headline.length; i++) {
    // loop through body with each of the words in headline
    for (var j = 0; j < body.length; j++) {
      // headline/body mathching function
      if (headline[i] === body[j]) {
        // check if word exists in keywordsAccumulated first
        let existing = findExistingWord(keywordsAccumulated, 'word', headline[i])
        if (existing > -1) {
          console.log('Should update count on word: ' + headline[i] + ' indexOf ' + existing)
          keywordsAccumulated[existing].count++
          // update count on word object
        } else {
          // create object and push to array
          let wordObj = {word: headline[i], count: 1}
          keywordsAccumulated.push(wordObj)
        }
        console.dir(keywordsAccumulated)
      }
    }
    // check if word is not already looped through, store in headlineParsed
  }
  


}

function findExistingWord(array, attr, value) {
  for(var k = 0; k < array.length; k += 1) {
      if(array[k][attr] === value) {
          return k;
      }
  }
  return -1;
}

const titleArray = ['I', 'have', 'some', 'interesting', 'words']
const bodyArray = ['There', 'is', 'a', 'chance', 'that', 'some', 'words', 'are', 'interesting', 'words', 'interesting', 'words']

findKeywords(titleArray,bodyArray)

// module.exports = {
//   findKeywords: findKeywords
// }