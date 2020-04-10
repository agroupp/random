const { Random } = require('../lib');
const should = require('chai').should();

describe('Basic Random class operations', () => {
    it('generate buffer with 16 random bytes', async () => {
        const result1 = await Random.nextBytes(16);
        result1.length.should.equal(16);
    });

    it('generate random float number between 0 and 1', async () => {
        const numberOfTests = 100;
        let results = [];
        for (let i = 0; i < numberOfTests; i++) {
            results.push(await Random.nextFloat());
        }
        results = results.filter(r => r >= 0 && r < 1);
        (numberOfTests === results.length).should.be.true;
    });

    it('generate random int number between 0 and 10', async () => {
        const numberOfTests = 100;
        const max = 10;
        let results = [];
        for (let i = 0; i < numberOfTests; i++) {
            results.push(await Random.next(max));
        }
        results = results.filter(r => r >= 0 && r < max);
        (numberOfTests === results.length).should.be.true;
    });

    it('generate random int number between 0 and 26', async () => {
        const numberOfTests = 100;
        const max = 26;
        let results = [];
        for (let i = 0; i < numberOfTests; i++) {
            results.push(await Random.next(max));
        }
        results = results.filter(r => r >= 0 && r < max);
        (numberOfTests === results.length).should.be.true;
    });

    it('generate random int number between 0 and 34', async () => {
        const numberOfTests = 100;
        const max = 34;
        let results = [];
        for (let i = 0; i < numberOfTests; i++) {
            results.push(await Random.next(max));
        }
        results = results.filter(r => r >= 0 && r < max);
        (numberOfTests === results.length).should.be.true;
    });
});

describe('Advanced Random class operations', () => {
    it('shuffle array with at least 95% of elements moved', async () => {
        // Create ordered array
        const testArray = [];
        for(let i = 0; i < 100; i++) {
            testArray.push(i);
        }

        // Shuffle
        const shuffledArray = await Random.shuffleArray(testArray);
        const movedElements = [];
        for (let i = 0; i < shuffledArray.length; i++) {
            if (testArray[i] !== shuffledArray[i]) {
                movedElements.push(testArray[i]);
            }
        }
        movedElements.length.should.above(testArray.length * .95);
    });

    it('generate alpha numeric random sequence', async () => {
        const s = await Random.generateAlphanumSequence(16);
        s.should.be.a('string');
        s.length.should.be.equal(16);
    });

    /* Can fail on slow computers because of timeout exceed (2000ms) */
    it('generate alpha numeric random sequence and check for no repeats', async () => {
        const s = [];
        const numberOfSequences = 400;
        for (let i = 0; i < numberOfSequences; i++) {
            s.push(await Random.generateAlphanumSequence());
        }
        const set = new Set(s);
        (set.size === s.length).should.be.true;
    });
});