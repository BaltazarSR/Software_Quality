import type { IUserAccount } from './UserAccount';

export const UserList = ({ users }: { users: IUserAccount[] }) => {
    if (users.length === 0) {
        return <div>No users found</div>;
    }
    return (
        <div>
            <h1>UserList</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <a href='{`#user-${user.id}`}'>{user.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
