import { randomBytes } from 'crypto';

const ENGLISH_LETTERS_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';

export class Random {
    constructor() {}

    /**
     * Returns a promise that resolves to buffer of bytes with random numbers.
     * @param size Number of bytes to generate
     */
    public static nextBytes(size: number): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            randomBytes(size, (err, buf) => {
                if (err) {
                    reject(err);
                }
                resolve(buf);
            });
        });
    }

    /**
     * Returns a buffer of bytes with random numbers. Synchronous version of nextBytes method.
     * @param size Number of bytes to generate
     */
    public static nextBytesSync(size: number): Buffer {
        return randomBytes(size);
    }

    /**
     * Returns a promise that resolves to non-negative random float number that is less than 1.0.
     */
    public static async nextFloat(): Promise<number> {
        try {
            const bytes = await this.nextBytes(1);
            if (bytes.length === 0) {
                throw new Error('Error generating random float');
            }
            return bytes[0] / 256;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Returns a promise that resolves to non-negative random integer that is less than the specified maximum.
     * @param maxValue The exclusive upper bound of the random number to be generated. maxValue must 
     * be greater than 0.
     */
    public static async next(maxValue: number = 10): Promise<number> {
        if (!maxValue) {
            throw new Error('Maximum must be integer and greater than 0');
        }
        try {
            const bytes = await this.nextBytes(1);
            if (bytes.length === 0) {
                throw new Error('Error generating random float');
            }
            return Math.floor((bytes[0] / 256) * maxValue);
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Shuffles the array by method Fisher–Yates
     * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
     * @param array Array of any type
     */
    public static async shuffleArray<T>(array: T[]): Promise<T[]> {
        if (!array || array.length === 0) {
            return array;
        }
        const result = array.slice(0);
        let n = result.length;
        while (n > 1) {
            const k = await this.next(n);
            n--;
            const temp = result[k];
            result[k] = result[n];
            result[n] = temp;
        }
        return result;
    }

    /**
     * Generate alpha numeric random sequence string
     * @param size Length of string to generate
     */
    public static async generateAlphanumSequence(size: number = 8): Promise<string> {
        const numbers = [];
        for (let i = 0; i < 10; i++) {
            numbers.push(i.toString());
        }
        let chars = ENGLISH_LETTERS_LOWERCASE.toUpperCase().split('')
            .concat(ENGLISH_LETTERS_LOWERCASE.split(''))
            .concat(numbers);
        chars = await this.shuffleArray(chars);
        const result: string[] = [];
        for (let i = 0; i < size; i++) {
            result[i] = chars[await this.next(chars.length)];
        }
        return result.join('');
    }
}
