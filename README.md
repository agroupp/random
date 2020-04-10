# Random
Node.js library for generation various cryptographically strong pseudo-random numbers and sequences.

## Installation
Install Random as an npm module and save it to your package.json file as a dependency:
    
    npm install --save @groupp/random

## Usage
Library provides class Random with static methods for generating various numbers, arrays and sequences with randimized content. Generation based on usage of Node.js `crypto` module and won't work in browser environment. Thanks to `crypto` module it generates cryptographically strong values that you can use in various tasks like shuffling arrays or generation "short ids". Most of the methods built to work asynchronous and won't block your API's. Just resolve returning promisees and enjoy the results.

## Example

```javascript
const { Random } = require('@groupp/random');

// generate buffer with 16 random bytes
const bytes = await Random.nextBytes(16);

// generate random int number between 0 and 10
const randomInt10 = await Random.next();

// generate random int number between 0 and 100
const randomInt100 = await Random.next(100);

// shuffle array
const testArray = [1, 2, 3, 4, 5, 6, 7, 8];
const shuffledArray = await Random.shuffleArray(testArray);

// generate alpha numeric random sequence
const shortId = await Random.generateAlphanumSequence(12);
```
For more examples see test suite.


## Test

    npm test

## Feedback
Any feedback and stars will be highly appreciated.
