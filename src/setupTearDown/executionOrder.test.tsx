import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    it,
    expect,
} from 'vitest';

beforeAll(() => {
    // Runs once before all tests in this describe block
    console.log('beforeAll external');
});

afterAll(() => {
    // Runs once after all tests in this describe block
    console.log('afterAll external');
});

beforeEach(() => {
    console.log('beforeEach external');
});

afterEach(() => {
    console.log('afterEach external');
});

describe('Test execution order 1', () => {
    // beforeAll(() => {
    //     // Runs once before all tests in this describe block
    //     console.log("beforeAll tests 1");
    // });

    // afterAll(() => {
    //     // Runs once after all tests in this describe block
    //     console.log("afterAll tests 1");
    // });

    beforeEach(() => {
        // Runs before every individual test
        console.log('beforeEach test 1');
    });

    afterEach(() => {
        // Runs after every individual test
        console.log('afterEach test 1');
    });

    it('first test', () => {
        expect(true).toBe(true);
    });

    it('second test', () => {
        expect(true).toBe(true);
    });
});

describe('Test execution order 2', () => {
    beforeEach(() => {
        console.log('beforeEach test 2');
    });

    afterEach(() => {
        console.log('afterEach test 2');
    });

    it('first test', () => {
        expect(true).toBe(true);
    });

    it('second test', () => {
        expect(true).toBe(true);
    });
});
