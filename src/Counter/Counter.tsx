import { useState } from 'react';
import type { CounterProps } from './ICounter';
import { Buttons } from './Buttons';

const dataTestId: string = 'Counter';
const Counter = ({ initialCount = 0 }: CounterProps) => {
    const [counter, setCounter] = useState(initialCount);

    return (
        <div>
            <header>
                <h1 data-testid={`${dataTestId}-Header`}>
                    This is a Counter Hello
                </h1>
            </header>
            <h2 data-testid={`${dataTestId}-Value`}>{counter}</h2>
            <Buttons dataTestId={dataTestId} setCounter={setCounter} />
        </div>
    );
};

export default Counter;
