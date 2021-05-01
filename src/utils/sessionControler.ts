import { Request, Response, NextFunction } from 'express'

export default function (req: Request | any, res: Response, next: NextFunction) {

    if (req.device.type != 'desktop') return res.render('login', {
        error: 'Telefon nie jest w stanie pojąć takiej wiedzy.. Nie zadziała.. :<'
    })

    else if (!req.session.ok) return res.redirect('/')
    else return next()

}