/* Exercise 06: React Testing Library - UserAccount

    In this exercise, you will be testing the UserAccount component using React Testing Library.
    The UserAccount component receives a user prop and displays the user's name and edit button.
    You will write tests to check if the component renders correctly based on the user prop.

    1) Test if the UserAccount component renders correctly with a user prop.
    2) Test if the Edit button is displayed only when the user is a manager.
    3) Test if the Edit button is not displayed when the user is not a manager.
    Remember to prepare user test data per test.
*/

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserAccount } from './UserAccount';
import type { IUserAccount } from './UserAccount';

describe('UserAccount', () => {
    it('It should render with a user prop', () => {
        const user: IUserAccount = { id: 1, name: 'Melchor', isManager: false };
        render(<UserAccount user={user} />);
        expect(screen.getByText('Melchor')).toBeInTheDocument();
    });

    it('It should display the Edit button when the user is a manager', () => {
        const user: IUserAccount = { id: 2, name: 'Melchor', isManager: true };
        render(<UserAccount user={user} />);
        expect(
            screen.getByRole('button', { name: /edit button/i }),
        ).toBeInTheDocument();
    });

    it('It should not display the Edit button when the user is not a manager', () => {
        const user: IUserAccount = { id: 3, name: 'Melchor', isManager: false };
        render(<UserAccount user={user} />);
        expect(
            screen.queryByRole('button', { name: /edit button/i }),
        ).not.toBeInTheDocument();
    });
});
