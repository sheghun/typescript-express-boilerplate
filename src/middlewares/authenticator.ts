import {NextFunction, Request, Response} from 'express';
import Logger from '../services/Logger';
import * as util from '../utils';
import User, {UserType} from '../models/User';

export const jwt = async (req: Request, res: Response, next: NextFunction) => {
    // Extract header
    let authorization = req.headers.authorization || '';
    authorization = authorization.replace('Bearer ', '');
    if (authorization == null) {
        return res.status(401).json({
            success: false,
            message: 'User is not authorized',
        });
    }
    try {
        const decode = util.verifyJwtToken(authorization, process.env.JWT_KEY as string) as any;
        (req as any).id = decode.id;
        console.log(decode);
        next();
    } catch (error) {
        Logger.err(error);
        return res.status(401).json({
            success: false,
            message: 'User not authorized',
        });
    }
};

export const hydrateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        (req as any).user = await User.findOne({id: (req as any).id});
        next();
    } catch (err) {
        next(err);
    }
};

/*
    isAdmin checks if the request is made by an admin
    This middleware must be called directly after the hydrateUser middleware
*/
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!('user' in req)) {
            throw new Error(
                'User object does not exist in request object, make sure hydrateUser has been called',
            );
        }
        if (((req as any).user as UserType).role === 'admin') {
            (req as any).isAdmin = true;
            next();
        } else {
            return res.sendStatus(403);
        }
    } catch (err) {
        next(err);
    }
};
