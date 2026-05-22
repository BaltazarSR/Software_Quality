import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, test, expect } from 'vitest';
import Counter from './Counter';

describe('Avoid testing like this', () => {
    test('Test counter with React DOM', () => {
        // create a div to render your component to (document.createElement)
        const div = document.createElement('div');

        // Append the div to document.body (document.body.append)
        const root = createRoot(div);
        // Use the createRoot to render the <Counter /> to the div
        act(() => root.render(<Counter />));
        const [reset, increment] = div.querySelectorAll('button');
        const count = (div.firstChild as HTMLElement).querySelector('h2');
        expect(count!.textContent).toBe('0');
        act(() => increment.click());
        expect(count!.textContent).toBe('1');
    });
    test('Test counter with React DOM, simulate mouse click', () => {
        // create a div to render your component to (document.createElement)
        const div = document.createElement('div');
        // Append the div to document.body (document.body.append)
        const root = createRoot(div);
        // Use the createRoot to render the <Counter /> to the div
        act(() => root.render(<Counter />));
        const [reset, increment] = div.querySelectorAll('button');
        const count = (div.firstChild as HTMLElement).querySelector('h2');

        // MouseEvent simulation
        const incrementClickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            button: 0,
        });
        expect(count!.textContent).toBe('0');
        act(() => increment.dispatchEvent(incrementClickEvent));
        expect(count!.textContent).toBe('1');
    });
});
