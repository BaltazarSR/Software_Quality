import { describe, test, expect } from 'vitest';
import { shoppingList } from '../mockData';
import { taskData } from '../mockData';
import { compileCode } from '../utils';

describe('matchers example files', () => {
    test.skip('common matcher', () => {
        // Numbers, strings and booleans (same memory adress)
        expect(2 + 2).toBe(4);
    });

    test.skip('object matcher', () => {
        const a = { name: 'John' };
        const b = { name: 'John' };

        // Data structures (Checks internal structure)
        expect(a).toEqual(b);
    });

    test.skip('compare decimal', () => {
        const a = 0.1;
        const b = 0.2;
        const c = 0.3;

        // Equal for decimals
        expect(a + b).toBeCloseTo(0.3);

        // Greater than
        expect(c).toBeGreaterThan(a);
    });

    test.skip('truthy and falsy', () => {
        const a = null;
        const b = undefined;
        const c = 0;
        const d = '';
        const e = false;

        // expect().toBeNull();
        // expect().toBeUndefined();
        // expect().toBeDefined();
        // expect().toBeTruthy();
        // expect().toBeFalsy();

        expect(a).toBeNull();
        expect(b).toBeUndefined();
        expect(c).toBeFalsy();
        expect(d).toBeFalsy();
        expect(e).toBeFalsy();

        expect(a).not.toBeTruthy();
    });

    test.skip('there is not I in team', () => {
        const errorMessage: string =
            'This is an error message, reach out to support';

        // Regular expressions
        expect('team').not.toMatch(/I/);
        expect(errorMessage).toMatch(/error/);
    });

    // Check value in array
    test.skip('milk will be bought', () => {
        expect(shoppingList).toContain('milk');
    });

    test.skip('Pepe Quality has stuff to do', () => {
        expect(taskData).toMatchObject({ assign: 'Pepe', priority: 1 });
        expect(taskData).toHaveProperty('assign');
    });

    test.skip('Compiling an empty string', () => {
        expect(() => compileCode('')).toThrow();
        expect(() => compileCode('')).toThrow('Cannot compile empty string');
        expect(() => compileCode('')).toThrow(/empty string/);
    });

    // Soft assertions (doesn't stop when a test fails)
    test.skip('Compiling an empty string', () => {
        expect.soft(() => compileCode('')).toThrow();
        expect.soft(() => compileCode('')).toThrow('Cannot compile string');
        expect.soft(() => compileCode('')).toThrow(/empty string/);
    });
});
