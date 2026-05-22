import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { calculator } from './mocking';

describe('spy functions examples', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
        vi.restoreAllMocks();
    });
    test('spying on add function', () => {
        const spy = vi.spyOn(calculator, 'add');

        expect(calculator.add(1, 3)).toBe(4);
        // We use spy to observe calls
        expect(spy).toHaveBeenCalledWith(1, 3);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
