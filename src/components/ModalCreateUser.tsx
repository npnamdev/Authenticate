import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createUser } from '@/services/api';
import { toast } from "sonner";

interface ModalCreateUserProps {
    fetchUsers: () => void;
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ fetchUsers }) => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await createUser(username, email, password);
        if (res.status === "success") {
            fetchUsers();
            setOpen(false);
            toast(res.message, { action: { label: "Undo", onClick: () => console.log("Undo") } });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="text-white">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader className="border-b pb-5">
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border p-2 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border p-2 rounded"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                            Create User
                        </button>
                    </form>
                </div>
                <DialogFooter className="sm:justify-end border-t pt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalCreateUser;
