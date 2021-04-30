import { Request, Response } from 'express'
import { Route } from '../router'
import PasswordGen from '../utils/passwordGenerator'

export default class extends Route {

    constructor () {

        super()

        this.endpoint = '/login'
        this.method = 'POST'

    }

    async execute (req: Request | any, res: Response): Promise<any> {

        const inputPassword: string = req.body.passwd

        const correctPassword = new PasswordGen().get

        console.log(correctPassword, inputPassword)

        if (correctPassword != inputPassword) return res.render('home', {
            error: 'Nie znasz hasła? Nie ładnie, oj, nie ładnie.'
        })

        req.session.ok = true
        return res.redirect('/')
    }

}