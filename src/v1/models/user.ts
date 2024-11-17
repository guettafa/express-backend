export enum Role {
    GESTIONNAIRE,
    EMPLOYEE,
}

export interface User {
    username: string;
    email: string
    password: string;
    role: Role;
}