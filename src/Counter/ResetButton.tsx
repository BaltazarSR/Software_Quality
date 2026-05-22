import type { IButtonsProps } from './ICounter';

export const ResetButton = ({ dataTestId, setCounter }: IButtonsProps) => {
    return (
        <div>
            <button
                name='reset'
                data-testid={`${dataTestId}-ResetBtn`}
                onClick={() => setCounter(0)}
            >
                Reset
            </button>
        </div>
    );
};
