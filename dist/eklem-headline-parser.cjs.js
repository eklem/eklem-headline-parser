'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const findKeywords = function (headline, body, cutoff = 0) {
  // remove duplicates in headline
  headline = [...new Set(headline)];

  // keywords array of word objects with word count
  const keywordsCount = [];
  // returned array (cutoff if != 0)
  let keywords = [];

  // loop through headline and body
  for (let i = 0; i < headline.length; i++) {
    for (let j = 0; j < body.length; j++) {
      // headline/body mathching
      if (headline[i] === body[j]) {
        // check if word exists in keywordsCount first and update it
        const existing = findExistingWord(keywordsCount, 'word', headline[i]);
        if (existing > -1) {
          keywordsCount[existing].count++;
        } else {
          // create object and push to array
          const wordObj = { word: headline[i], count: 1 };
          keywordsCount.push(wordObj);
        }
      }
    }
  }

  // Sort on most times used in body
  keywordsCount.sort(compareObjects);
  // loop through keywordsCount and push word to keywords
  for (let l = 0; l < keywordsCount.length; l++) {
    keywords.push(keywordsCount[l].word);
  }
  // slice, if cutoff set
  if (cutoff > 0) {
    keywords = keywords.slice(0, cutoff);
  }
  return keywords
};

const findExistingWord = function (array, attr, value) {
  for (let k = 0; k < array.length; k += 1) {
    if (array[k][attr] === value) {
      return k
    }
  }
  return -1
};

const compareObjects = function (a, b) {
  if (a.count > b.count) {
    return -1
  }
  if (a.count < b.count) {
    return 1
  }
  return 0
};

exports.findKeywords = findKeywords;
