import { Request, Response } from 'express'
import { Route } from '../router'

export default class extends Route {

    constructor () {

        super()

        this.endpoint = '/'
        this.method = 'GET'

    }

    async execute (req: Request | any, res: Response): Promise<any> {

        if (!req.session.ok) return res.render('login')
        else return res.render('home')

    }

}