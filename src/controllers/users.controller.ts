import { User } from "../models/user";
import { readJSON, saveJSON } from "../utils/jsonHelper";

const PATH_JSON_USERS = "./src/data/users.json";

let users: User[] = readJSON<User>(PATH_JSON_USERS);

export const getUsers = (): User[] => {
   return users;
}

export const getUser = (id: number) => {
}

export const deleteUser = (id: number) => {
    const user = getUser(id);
}

export const updateUser = (id: number) => {
    
}