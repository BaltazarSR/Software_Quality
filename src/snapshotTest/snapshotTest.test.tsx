// Snapshot testing
// Captura el estado de un componente en un momento dado y lo compara con una versión anterior para detectar cambios inesperados
import { describe, expect, test } from 'vitest';

function generateGreeting(name: string) {
    return {
        message: `Hello, ${name}!`,
        timestamp: null,
        version: 2,
    };
}

describe('test snapshot', () => {
    test('generates a greeting with snapshot', () => {
        expect(generateGreeting('Balta')).toMatchSnapshot();
    });

    test('generates an inlineSnapshot', () => {
        expect(generateGreeting('Balta')).toMatchInlineSnapshot(`
          {
            "message": "Hello, Balta!",
            "timestamp": null,
            "version": 2,
          }
        `);
    });

    test.todo('throws on invalid input', () => {
        expect(() => parseFloat('')).toThrowErrorMatchingInlineSnapshot(
            '[Error: Unexpected end of input at position 0]',
        );
    });
});
