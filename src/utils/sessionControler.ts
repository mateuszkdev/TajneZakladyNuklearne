import { Request, Response, NextFunction } from 'express'

export default function (req: Request | any, res: Response, next: NextFunction) {

    if (!req.session.ok) return res.redirect('/')
    else return next()

}