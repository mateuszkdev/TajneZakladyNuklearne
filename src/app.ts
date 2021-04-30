import { Server } from './server'
import Router from './router'

(async () => {

    const server = new Server()
    const app = await server.app
    new Router().start(app)

})()