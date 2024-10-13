import { Role, User } from "../models/user";
import { readJSON, saveJSON } from "../utils/jsonHelper";
import { validateEmail } from "../utils/regex";

const PATH_JSON_USERS = "./src/data/users.json";

let users: User[] = readJSON<User>(PATH_JSON_USERS);

export const getUsers = (): User[] => {
   return users;
}

export const getUser = (usernameOrEmail: string): User => {
    return users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail)!;
}

export const addUser = async (username: string, email: string, hashedPassword: string) => {
    if (validateEmail(email)) {
        throw new Error("Email is in the wrong format");
    } 
    users.push({
        username: username,
        email: email,
        role: Role.EMPLOYEE, 
        password: hashedPassword
    });
    saveJSON<User>(users, PATH_JSON_USERS);
}

export const deleteUser = (username: string) => {
    const user: User = getUser(username);
    saveJSON<User>(users, PATH_JSON_USERS);
}

export const updateUser = (username: string) => {
    const user: User = getUser(username);
    saveJSON<User>(users, PATH_JSON_USERS);
}