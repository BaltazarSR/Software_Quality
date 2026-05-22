export interface IUserAccount {
    id: number;
    name: string;
    isManager: boolean;
}

export const UserAccount = ({ user }: { user: IUserAccount }) => {
    return (
        <div>
            <h2>UserProfile</h2>
            <div>
                <strong>Name:</strong>
                {user.name}
            </div>
            {user.isManager && <button>Edit Button</button>}
        </div>
    );
};
