import jwt from "jsonwebtoken";
import express, { Response, NextFunction } from "express";
import { config } from "../config/config";

// Auth middleware
export const checkAccess = (req: any, res: Response, next: NextFunction) => {
    const token: string = req.headers['authorization'];
    // No token found
    if (!token) {
        res.status(403).json({ message: "Token is missing" });
    } else {
        // Token found

        // Separate Bearer and token
        jwt.verify(token?.split(' ')[1], config.jwt_secret as string, (error: any, decoded: any) => {
            if (error) {
                res.status(401).json({message: "Invalid Token"});
            }
            // Retrieve token information
            req.user = decoded
            next(); // pass to the next middleware
        })
    }
}

export const isEmployee = (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== 1) {
        res.status(403).json({message: "You don't have access to this ressource"});
    }
    next();
}

export const isGestionnaire = (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== 0) {
        res.status(403).json({message: "You don't have access to this ressource"});
    }
    next();
}