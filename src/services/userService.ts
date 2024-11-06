import { deleteRequest, get, post, put } from '@/lib/apiHandler';
import { User } from '@/models/user/userModel';

const PATH_BASE = 'users';

const userService = {
    getAllUsers: async (): Promise<User[]> => {
        return await get<User[]>(PATH_BASE);
    },

    getUser: async (id: number): Promise<User> => {
        return await get<User>(`${PATH_BASE}/${id}`);
    },

    saveUser: async (model: User): Promise<number> => {
        if (model.id > 0) {
            const updatedUser = await put<User>(`${PATH_BASE}/${model.id}`, model);
            return updatedUser.id;
        } else {
            const newUser = await post<User>(PATH_BASE, model);
            return newUser.id;
        }
    },

    deleteUser: async (id: number): Promise<void> => {
        await deleteRequest<void>(`${PATH_BASE}/${id}`);
    },
};

export default userService;
