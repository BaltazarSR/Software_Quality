import { describe, test, it, expect } from 'vitest';
import { add, substract, multiply, divide } from './mathOperations';

describe.skip('fake math operations', () => {
    test('addition', () => {
        expect(1 + 1).toBe(2);
    });
    it('substraction', () => {
        expect(5 - 2).toBe(3);
    });
});

describe.skip('console log', () => {
    test('log', () => {
        console.log('Hello World!');
    });
});

describe('real math operations', () => {
    test('add', () => {
        expect(add(1, 4)).toBe(5);
    });
    test.todo('add negative numbers', () => {
        expect(add(1, 4)).toBe(5);
    });
    test('substract', () => {
        expect(substract(1, 4)).toBe(-3);
    });
    test('multiply', () => {
        expect(multiply(4, 4)).toBe(16);
    });
    test('divide', () => {
        expect(divide(4, 2)).toBe(2);
    });
    test('divide by zero', () => {
        const result = () => divide(4, 0);
        expect(result).toThrow('Cannot divide by zero');
    });
});
