import { User } from "../models/user";
import { readJSON, saveJSON } from "../utils/jsonHelper";

const PATH_JSON_USERS = "./src/data/users.json";

let users: User[] = readJSON<User>(PATH_JSON_USERS);

export const getUsers = (): User[] => {
   return users;
}

export const getUser = (username: string): User => {
    return users.find(u => u.username === username)!
}

export const deleteUser = (username: string) => {
    const user: User = getUser(username);
    saveJSON<User>(users, PATH_JSON_USERS);
}

export const updateUser = (username: string) => {
    const user: User = getUser(username);
    saveJSON<User>(users, PATH_JSON_USERS);
}