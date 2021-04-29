import { Request, Response } from 'express'
import { Route } from '../router'

export default class extends Route {

    constructor () {

        super()

        this.endpoint = '/'
        this.method = 'GET'

    }

    async execute (req: Request, res: Response): Promise<any> {

        res.render('home')

    }

}