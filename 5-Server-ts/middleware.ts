import {Request, Response, NextFunction} from "express";
import { v4 as uuidv4 } from 'uuid';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let currentUserId: string;
    if (!req.cookies?.todoAppUserId){
        currentUserId = uuidv4();
        res.cookie("todoAppUserId", currentUserId);
    }
    else{
        currentUserId = req.cookies.todoAppUserId;
    }
    res.locals.currentUserId = currentUserId;
    next();
}