import { NextFunction } from "express";
import moment from 'moment';

moment.locale('fr');

export default (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${moment().format('Do/MM/YYYY - HH:mm:ss')}][${req.method}] ${req.url}`);
    next();
}