interface Permissions {
    getUsers: boolean;
    getUserById: boolean;
    createUser: boolean;
    updateUser: boolean;
    deleteUser: boolean;
}

interface Role {
    _id: string;
    name: string;
    permissions: Permissions;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface PermissionModalProps {
    role: Role;
}