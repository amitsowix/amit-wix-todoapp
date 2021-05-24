import {Request, Response, NextFunction} from "express";
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { AuthJson } from "../common/interfaces";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let currentUserId: string;
    if (!req.cookies?.token){
        currentUserId = uuidv4();
        const currentUserToken = jwt.sign({currentUserId}, <string>process.env.SECRET, {expiresIn: '10000d'});
        res.cookie("token", currentUserToken);
        res.locals.currentUserId = currentUserId;
    }
    else{
        try {
            let decoded: AuthJson = <AuthJson>jwt.verify(req.cookies.token, <string>process.env.SECRET);
            res.locals.currentUserId = decoded.currentUserId;
        }
        catch (err){
            console.log(err);
            res.status(401).send(err);
        }
    }
    next();
}