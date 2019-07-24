# eklem-headline-parser

Determines the most relevant keywords in a headline by considering article context. Works for Node.js and the browser. Started as a forked version of [TessMyers](https://github.com/TessMyers) [headline-parser](https://github.com/TessMyers/headline-parser).

## Usage

### Node.js

```javascript
const headlineParser = require('eklem-headline-parser')
// headlineParser.findKeywords(headline, body [, cutoff]) now available
```

### Script tag method
```javascript
<script src="headline-parser.js"></script>
<script>
// ehp.findKeywords(headline, body [, cutoff]) now available
</script>
```

### Calculating some keywords

```javascript
const headlineParser = require('eklem-headline-parser')
const stopword = require('stopword')

// Declare variables for your headline and article summary. These have been edited to provide a good example.
let headline = 'China successfully develops drone defense system'

let body = 'China has tested a self-developed laser defense system against small-scale low-altitude drones, state media said on Sunday. Reportedly, the drone defense is designed to destroy small-scale drones flying within an altitude of 500 meters and at speeds below 50 meters per second. In addition to the drone network, china has developed stealth jets and has built one aircraft carrier.'

// Find the most relevant keywords in the headline, sorted by number of appearances in the body text
let important_keywords = headline_parser.findKeywords(stopword.removeStopwords(headline.split(' ')), body.split(' '), 3);

// => Returns the top three occuring words [ 'drone', 'defence', 'China' ], with 'defense' appearing most often.
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

Some things to note: The module will not count partial appearances of keywords, or compounded keywords. For instance, if one of your headline keywords is ['china'], then neither "China", "china's" or "Indochina" will be counted as an appearance of that keyword. Additionally, unless the `args` object is supplied with  a `return_changed_case: false` parameter, the module will count only the lowercase appearances of the word.