import type { IButtonsProps } from './ICounter';
import { ResetButton } from './ResetButton';

export const Buttons = ({ dataTestId, setCounter }: IButtonsProps) => {
    return (
        <div>
            <h3>Hello Team</h3>
            <ResetButton dataTestId={dataTestId} setCounter={setCounter} />
            <button
                name='increment'
                data-testid={`${dataTestId}-IncrementBtn`}
                onClick={() => setCounter((n) => n + 1)}
            >
                Increment
            </button>
        </div>
    );
};
