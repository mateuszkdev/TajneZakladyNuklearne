export default class Generator {

    get get (): string {

        let passwd: string = require('../../settings/password.json').passwd

        const now = new Date()

        const data = {
            month: now.getMonth()+1,
            day: now.getDate()
        }

        Object.keys(data).forEach(k => {
            const reg = new RegExp(`{${k}}`, 'gm')

            reg.test(passwd) ? passwd = passwd.replace(reg, data[k]) : null

        })

        return passwd

    }
    
}