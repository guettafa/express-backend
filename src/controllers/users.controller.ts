import { Role, User } from "../models/user";
import { readJSON, saveJSON } from "../utils/jsonHelper";

const PATH_JSON_USERS = "./src/data/users.json";

let users: User[] = readJSON<User>(PATH_JSON_USERS);

export const getUsers = (): User[] => {
   return users;
}

export const getUser = (usernameOrEmail: string): User => {
    return users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail)!;
}

export const addUser = (username: string, email: string, hashedPassword: string): string => {
    users.push({
        username: username,
        email: email,
        role: Role.EMPLOYEE, 
        password: hashedPassword
    });
    saveJSON<User>(users, PATH_JSON_USERS);
    return "Account created sucessfully";
}