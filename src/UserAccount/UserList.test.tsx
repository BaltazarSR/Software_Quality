/* React Testing Library - UserList
   In this exercise, you will be testing the UserList component using React Testing Library.
    The UserList component receives a users prop and displays a list of user names.
    You will write tests to check if the component renders correctly based on the users prop.
    1) Test if the UserList component renders correctly with a list of users.
    2) Test if the No users found message is displayed when the users prop is empty.
    3) Test if the user names are displayed as links in the list.
    Remember to prepare user test data per test.
*/

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserList } from './UserList';
import type { IUserAccount } from './UserAccount';

describe('UserList', () => {
    it('It should render with a list of users', () => {
        const users: IUserAccount[] = [
            { id: 1, name: 'Alice', isManager: false },
            { id: 2, name: 'Bob', isManager: true },
        ];
        render(<UserList users={users} />);
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('It should display "No users found" when the users list is empty', () => {
        render(<UserList users={[]} />);
        expect(screen.getByText('No users found')).toBeInTheDocument();
    });

    it('It should display user names as links', () => {
        const users: IUserAccount[] = [
            { id: 1, name: 'Alice', isManager: false },
        ];
        render(<UserList users={users} />);
        expect(screen.getByRole('link', { name: 'Alice' })).toBeInTheDocument();
    });
});
