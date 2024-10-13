import jwt from "jsonwebtoken";
import { Role } from "../models/user";
import { envConfig } from "../config/config";

const SECRET_KEY = envConfig.jwt_secret;

export const signToken = (username: string, role: Role) => {
    return jwt.sign(
        {username: username, role: role}, // Informations in JWT 
        SECRET_KEY as string, 
        { expiresIn: "1h"}
    );
}