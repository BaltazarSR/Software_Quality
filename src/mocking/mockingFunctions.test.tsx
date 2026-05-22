import { describe, expect, test, vi } from 'vitest';

describe('Mocking functions examples', () => {
    test('should mock getNumber function', () => {
        const getNumber = vi.fn(() => 5000);

        const number = getNumber();
        expect(number).toBe(5000);
        expect(getNumber).toHaveBeenCalled();
        expect(getNumber).toHaveReturnedWith(5000);
    });

    test('should change mock implementation', () => {
        const getNumber = vi.fn(() => 5000);

        expect(getNumber()).toBe(5000);
        getNumber.mockImplementation(() => 3000);
        expect(getNumber()).toBe(3000);
    });

    test('should mock fetchUser function', async () => {
        const fetchUser = vi.fn();
        fetchUser.mockResolvedValue({ name: 'Ana' });

        const user = await fetchUser();
        expect(user).toEqual({ name: 'Ana' });
    });

    test('inspecting mock calls', () => {
        const greet = vi.fn();
        greet('Alice');
        greet('Bob', 'Jesus');
        expect(greet).toHaveBeenCalledTimes(2);
        expect(greet).toHaveBeenCalledWith('Alice');

        expect(greet.mock.calls).toEqual([['Alice'], ['Bob', 'Jesus']]);
        console.log('mock.calls: ', greet.mock.calls);
        console.log('mock.results: ', greet.mock.results);
    });

    // Hacer un mock de una funcion que recibe un number y regresa su multiplicacion *2
    test('multiplication function', () => {
        const multiplyByTwo = vi.fn();
        multiplyByTwo.mockImplementation((num: number) => num * 2);

        expect(multiplyByTwo(3)).toBe(6);
        expect(multiplyByTwo(5)).toBe(10);
        expect(multiplyByTwo).toHaveBeenCalledTimes(2);
        expect(multiplyByTwo).toHaveBeenCalledWith(3);
        expect(multiplyByTwo).toHaveReturnedWith(6);
    });
});
