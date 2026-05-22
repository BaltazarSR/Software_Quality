import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';

type RenderOptions = Parameters<typeof render>[1];

export function setUpUserEvent(ui: ReactElement, options?: RenderOptions) {
    return {
        ...render(ui, options),
        user: userEvent.setup(),
    };
}
