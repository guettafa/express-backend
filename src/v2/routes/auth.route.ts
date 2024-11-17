import express, {Request, Response} from "express";
import bcrypt from "bcryptjs"; 

import { User } from "../models/user";
import { addUser, getUser } from "../controllers/users.controller";
import { logger } from "../utils/logger";
import { signToken } from "../utils/jwt";
import { isValidEmail } from "../utils/regex";

const router = express();

/**
 * @swagger
 * /api/v2/auth/login:
 *   post:
 *     description: Login to an account 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: user email or username 
 *               password:
 *                 type: string
 *                 description: user password
 *     responses:
 *       200:
 *         description: User is logged in and a JWT that will expire in 1 hour is returned 
 *       404:
 *         description: No user with this email or username is registered
 *       401:
 *         description: Entered password is wrong
 */
router.post("/login", async (req: Request, res: Response) => {
    const {usernameOrEmail, password} = req.body;
    const user: User = getUser(usernameOrEmail);
    
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            res.json({token: signToken(user.username, user.role)});
            logger.info(`User ( ${user.username} - ${user.email} ) just logged in`);
        } else {
            res.status(401).json("Wrong Password") 
            logger.error(`Failed attempt to login to account associated to ${user.email}`)
        }
    } else {
        res.status(404).json("No user with those informations can be found");
    }
})

/**
 * @swagger
 * /api/v2/auth/register:
 *   post:
 *     description: Register an account 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: user username 
 *               email:
 *                 type: string
 *                 description: user email
 *               password:
 *                 type: string
 *                 description: user password
 *     responses:
 *       200:
 *         description: User account has been created 
 *       500:
 *         description: Account couldn't be created because email is in the wrong format  
 */
router.post("/register", async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    if (isValidEmail(email)) {
        const hashedPassword = await bcrypt.hash(password, 15);

        res.json({message: addUser(username, email, hashedPassword)});
        logger.info(`New account has been created with email ${email}`);
    } else {
        res.status(500).json({message: 'Email is in the wrong format'});
        logger.error("Account couldn't be created because it's in the wrong format");
    }
})

export default router;