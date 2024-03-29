# eklem-headline-parser

Determines the most relevant keywords in a headline by considering article context. Works for Node.js and the browser. Started as a forked version of [TessMyers](https://github.com/TessMyers) [headline-parser](https://github.com/TessMyers/headline-parser).

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![](https://data.jsdelivr.com/v1/package/npm/eklem-headline-parser/badge?style=rounded)](https://www.jsdelivr.com/package/npm/eklem-headline-parser)
[![Build Status][build-image]][build-url]
[![JavaScript Style Guide][standardjs-image]][standardjs-url]
[![MIT License][license-image]][license-url]

## Breaking change

API on importing CJS- and ESM-script changed. 
## Demo
![Browser demo screenshot](./demo/ehp-demo-screenshot.png)
Check out the [browser demo](https://eklem.github.io/eklem-headline-parser/demo/) or have a look at [the demo source files](https://github.com/eklem/eklem-headline-parser/tree/master/demo).


## Usage

### Common JS
```javascript
const { findKeywords } = require('eklem-headline-parser')
// findKeywords(headline, body [, cutoff]) now available
```

### ES Modules
```javascript
import { findKeywords } from 'eklem-headline-parser'
// findKeywords(headline, body [, cutoff]) now available
```

### UMD - Script tag method
```javascript
<script src="https://cdn.jsdelivr.net/npm/eklem-headline-parser/dist/eklem-headline-parser.umd.min.js"></script>
<script>
// ehp.findKeywords(headline, body [, cutoff]) now available
</script>
```

### Remove noise
To skip all words with little or no meaning, use a stopword stripping library, i.e. [stopword](https://github.com/fergiemcdowall/stopword).

```javascript
<script src="headline-parser.js"></script>
<script src="stopword.js"></script>
<script>
// ehp.findKeywords(sw.removeStopwords(headline), body [, cutoff])
</script>
```

### Calculating some keywords

```javascript
const headlineParser = require('eklem-headline-parser')
const sw = require('stopword')

// Declare variables for your headline and article summary. These have been edited to provide a good example.
let headline = 'China successfully develops drone defense system'

let body = 'China has tested a self-developed laser defense system against small-scale low-altitude drones, state media said on Sunday. Reportedly, the drone defense is designed to destroy small-scale drones flying within an altitude of 500 meters and at speeds below 50 meters per second. In addition to the drone network, china has developed stealth jets and has built one aircraft carrier.'

// Find the most relevant keywords in the headline, sorted by number of appearances in the body text
let important_keywords = headline_parser.findKeywords(sw.removeStopwords(headline.split(' ')), body.split(' '), 3);

// => Returns the top three occuring words [ 'drone', 'defence', 'China' ], with 'drone' appearing most often.
```

## API

findKeywords() accepts four arguments, of which the last two are optional. 

    .findKeywords(headline, body [, cutoff]);

| Argument name | Description | Permitted values |
|---------------|-------------|------------------|
| headline| Headline of article | Array|
| body | Context from the article. May be the entire article body, or just a few sample sentences. The more context, the greater the accuracy of the parser.| Array|
| (optional) cutoff | Number of top keywords desired. If left out, the parser will return all keywords sorted by relevance. | Integer |
  
# How does it work?

It's pretty simple.  The parser will count how many times a word in a title is repeated in a body text and then sorts those words by how many times each word appears in the article body provided.

The parser is language agnostic, but for better accuracy, you should use the [stopword](https://www.npmjs.org/package/stopword) module to obtain only the words that are not stopwords. For this to happen, you need to define which langauge is used in the text analyzed.

Some things to note: The module will not count partial appearances of keywords, or compounded keywords. For instance, if one of your headline keywords is ['china'], then neither "China", "china's" or "Indochina" will be counted as an appearance of that keyword.


[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/eklem-headline-parser
[npm-version-image]: http://img.shields.io/npm/v/eklem-headline-parser.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/eklem-headline-parser.svg?style=flat
[build-url]: https://github.com/eklem/eklem-headline-parser/actions/workflows/tests.yml
[build-image]: https://github.com/eklem/eklem-headline-parser/actions/workflows/tests.yml/badge.svg
[standardjs-url]: https://standardjs.com
[standardjs-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
