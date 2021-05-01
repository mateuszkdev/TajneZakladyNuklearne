import express, { Application } from 'express'
import session from 'express-session'
import { join } from 'path' 
import device from 'express-device'

export interface ServerConfig {
    port: number
    sessionSecret: string
}

const config = require('../settings/ServerConfig.json') as ServerConfig

export class Server {

    app: Application

    constructor () {

        this.app = express()
        this.setUp()

    }

    async initUses () {

        this.app.set('views', join(__dirname, '..', 'views'))
        this.app.set('view engine', 'pug')
        this.app.use(express.static(join(__dirname, '..', 'public')))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(device.capture())

    }

    async initSession () {

        const { sessionSecret } = config

        const SESSION = session

        this.app.use(SESSION({ secret: sessionSecret, cookie: { maxAge: 5 * 100000 } }))

    }

    async setUp () {

        const { port } = config

        await this.initUses()
        await this.initSession()

        this.app.listen(port, () => console.log(`Server listening port: ${port}`))

    }

}