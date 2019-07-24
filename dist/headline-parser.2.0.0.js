var ehp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./headline-parser.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./headline-parser.js":
/*!****************************!*\
  !*** ./headline-parser.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// var stopword = require('stopword')

// var findKeywords = function( headline, body, n, keywordArgs, returnNonMatched ){
//   keywordArgs = keywordArgs || { language:'en' };
  
//   // Set returnNonMatched to false if not given
//   returnNonMatched = returnNonMatched || false;

//   // Extract keywords from headline. Returns an array
//   var stopwordWrapper = function(headline, keywordArgs){
//     var languageArray = stopword[keywordArgs.language]
//     var newArray = stopword.removeStopwords(headline, languageArray)
//     if (newArray === ['']) {
//       newArray === []
//     }
//     return newArray
//   }

//   keywordArray = stopwordWrapper(headline, keywordArgs)

//   // if no N is given, set n to max length. // todo: just set to infinity?
//   n = n || keywordArray.length;

//   // Create object to track each mention of keyword in summary
//   keywordCount = {};
//   keywordArray.map(function(word){ keywordCount[word] = 0; });

//   // Iterate over summary to count mentions of each keyword
//   for ( var i = 0; i < body.length; i++ ) {
//     for (word in keywordCount) {
//       // console.log(word, body[i]);
//       if (word === body[i]){
//         keywordCount[word] += 1;
//       }
//     }
//   }

//   // If no keywords have been mentioned, and 'returnNonMatched == true' return non matched keywords from headline
//   var aboveZero = Object.keys(keywordCount).filter(function(key){ return keywordCount[key] > 0 })

//   if (Object.keys(keywordCount).length > 1 && aboveZero.length < 1 && !returnNonMatched) {
//     console.log('No keywords matched')
//     return []
//   }
//   else if (Object.keys(keywordCount).length > 1 && aboveZero.length < 1 && returnNonMatched) {
//     console.log('Keywords matched')
//     var nonMatchedKeys = keywordArray;
//     return nonMatchedKeys;
//   } 
//   else {
//     // Sort keywords by highest number of mentions
//     var sortedKeys = Object.keys(keywordCount).sort(function(a,b){return keywordCount[a] - keywordCount[b];});

//     // Return last n important words, will return maximum if n is greater than max.
//     return sortedKeys.slice(-n);
//   }
// }

const titleArray = ['I', 'have', 'some', 'interesting', 'words']
const bodyArray = ['There', 'is', 'a', 'chance', 'that', 'some', 'words', 'are', 'interesting', 'words']

findKeywords(titleArray,bodyArray)

const findKeywords = function( headline, body, cutoff = 0) {
  console.log('headline: ' + headline)
  console.log('body: ' + body)
  console.log('cutoff: ' + cutoff)
}

// module.exports = {
//   findKeywords: findKeywords
// }


/***/ })

/******/ });