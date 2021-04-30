import { Application, Request, Response } from 'express'
import { readdirSync } from 'fs'

export abstract class Route {
    method: 'GET' | 'POST'
    endpoint: string
    abstract execute (req: Request, res: Response): Promise<any>
}

export default class Router {

    async start (app: Application) {

        const routesNames: string[] = readdirSync(`${__dirname}/routes`).filter(f => f.endsWith('.js'))

        const routes: Route[] = []
        await routesNames.forEach(n => {

            if (n == 'router.js' || (n.split(/\./g).length <= 1) ) return

            const file = require(`${__dirname}/routes/${n}`)

            const r: Route = new file.default()
            
            if (
                !r.method ||
                !r.execute ||
                !r.endpoint
            ) return

            console.log(`Router loaded (${n}) file as ["${r.endpoint}" endpoint], method: "${r.method}"`)

            routes.push(r)

        })

        await routes.forEach(r => {

            switch (r.method) {

                case 'GET': app.get(r.endpoint, async (req, res) => await r.execute(req, res)); break
                case 'POST': app.post(r.endpoint, async (req, res) => await r.execute(req, res)); break

                default: return
            }

        })

        app.get('/howlogin', (req, res) => res.render('howlogin'))
        app.get('*', (req, res) => res.redirect('/'))

    }

}