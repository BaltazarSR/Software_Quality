import React from 'react';

export interface IButtonsProps {
    dataTestId: string;
    setCounter: React.Dispatch<React.SetStateAction<number>>; // (value: number) => void,
}

export type CounterProps = {
    initialCount?: number;
};
