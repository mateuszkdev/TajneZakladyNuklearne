const keyCodes = {
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39
}

const wallsGeneratorSettings = {
    coords: [
        "1:19", "1:18", "1:17", "1:16", "1:15", "1:14", "1:13", "1:12", "1:11", "1:10", "1:9", "1:8", "1:7", "3:19", "4:19", "5:19", "6:19", "7:19", "8:19", "9:19", "9:20", "3:17", "4:17", "5:17", "5:16", "5:15", "5:14", "4:14", "3:14", "3:15", "3:16", "4:16", "4:15", "7:17", "8:17", "9:17", "10:17", "11:17", "11:18", "11:19", "12:19", "13:19", "14:19", "15:19", "16:19", "16:18", "17:18", "18:20", "19:20", "20:20", "20:19", "20:18", "20:17", "20:16", "20:15", "19:15", "18:15", "17:15", "16:15", "15:15", "14:15", "14:16", "13:16", "13:15", "12:15", "11:15", "10:15", "9:15", "8:15", "7:15", "7:13", "7:12", "6:12", "5:12", "4:12", "3:12", "3:11", "3:10", "3:9", "3:8", "3:7", "0:7", "5:10", "5:9", "5:8", "5:7", "5:6", "5:5", "5:4", "5:3", "5:2", "5:1", "6:1", "7:1", "8:1", "9:1", "10:1", "11:1", "13:1", "14:1", "15:1", "16:1", "17:1", "18:1", "20:1", "20:2", "20:3", "20:4", "20:5", "20:6", "19:6", "19:7", "20:7", "20:8", "19:8", "18:8", "18:9", "19:9", "20:9", "20:10", "19:10", "18:10", "18:11", "19:11", "19:12", "18:12", "18:13", "19:13", "16:8", "16:7", "16:6", "17:6", "17:5", "17:4", "18:4", "18:3", "17:3", "1:5", "1:4", "1:3", "1:2", "1:1", "1:0", "2:2", "3:2", "2:4", "3:4", "9:11", "9:12", "9:13", "10:13", "11:13", "12:13", "13:13", "15:13", "16:13", "17:13", "7:3", "8:3", "9:3", "10:3", "12:3", "13:3", "14:3", "15:3", "7:10", "7:9", "7:8", "7:7", "8:7", "9:7", "13:11", "13:10", "13:9", "13:8", "13:7", "13:6", "13:5", "11:5", "11:6", "11:7", "9:5", "8:5", "7:5", "14:10", "15:10", "16:10", "16:11", "15:11", "14:11", "11:11", "12:11"
    ]
}

class ZenonMan {

    constructor () {

        this.player = { x: 10, y: 9 }
        this.game = true
        this.playerFrozen = false

        this.coins = {
            max: 56,
            owned: 0,
            total: 0
        }

        this.ai = {
            max: 1,
            cache: []
        }

    }

    updateTopBar () {
        const text = `Coins: ${this.coins.owned}/${this.coins.total}`
        return document.getElementById('TopBar').innerHTML = text
    }

    endGame (type) {
        this.game = false
        return document.getElementById('TopBar').innerHTML = `Koniec gry: ${type}`
    }

    changeClass (x, y, newClass) {
        document.getElementById(`${x}:${y}`).className = newClass
    }

    isWall (x, y) {

        const cn = document.getElementById(`${x}:${y}`).className
        if (cn == 'wall') return true
        else return false

    }

    isDefeat (x, y) {

        if (document.getElementById(`${x}:${y}`).className == 'bajkopisarz_zenon') return true
        else return false

    }
    
    isWin () {

        if (this.coins.total <= this.coins.owned) return true
        else return false

    }

    isCoin (x, y) {

        if (document.getElementById(`${x}:${y}`).className == 'coin') return true
        else return false

    }

    isBarrier (x, y) {
        if (
            x <= 0 || y <= 0 || x >= 20 || y >= 20
        ) return true
        else return false
    }

    addCoin () {
        this.coins.owned++
    }

    move (x, y) {

        if (this.isDefeat(x, y)) {
            this.game = false
            return this.endGame('defeat')
        }

        if (this.playerFrozen) return

        if (this.isCoin(x, y)) {
            this.addCoin()
            this.updateTopBar()
        }
    
        if (!this.game) return

        if (this.isWall(x, y)) return

        this.changeClass(this.player.x, this.player.y, 'floor')
        this.changeClass(x, y, 'pierwszak')

        this.player.x = x
        this.player.y = y

        if (this.isWin()) {
            return this.endGame('win')
        }

    }

    playerMovement () {

        window.addEventListener('keydown', (e) => {

            let x = this.player.x
            let y = this.player.y

            switch (e.keyCode) {

                case keyCodes.keyUp:

                        if (this.player.x - 1 >= 0) return this.move(--x, y)

                    break;
                case keyCodes.keyDown:

                        if (this.player.x + 1 <= 20) return this.move(++x, y)

                    break;
                case keyCodes.keyLeft:

                        if (this.player.y - 1 >= 0) return this.move(x, --y)

                    break;
                case keyCodes.keyRight:

                        if (this.player.y + 1 <= 20) return this.move(x, ++y)

                    break;
                default: return
            }

        })

    }

    renderMap () {

        let map = '<table>'

        for (let x = 0; x <= 20; x++) {

            map += '<tr>'

            for (let y = 0; y <= 20; y++) {
                map += `<td id="${x}:${y}" class="floor"> </td>`
            }

            map += '</tr>'

        }

        map += '</table>'
        document.getElementById('container').innerHTML = map

    }

    wallsGenerator () {

        wallsGeneratorSettings.coords.forEach(xy => {
            if (document.getElementById(xy).className == 'floor') {
                document.getElementById(xy).className = 'wall'
            }
        })

    }

    coinsGenerator () {

        const randomPos = () => {
            return ~~(Math.random() * 20)
        }

        for (let i = 0; i < this.coins.max; i) {
            let x = randomPos()
            let y = randomPos()

            if (document.getElementById(`${x}:${y}`).className == 'floor') {
                i++
                this.coins.total++
                document.getElementById(`${x}:${y}`).className = 'coin'
            }
        }

    }

    aiGenerator () {

        const randomPos = () => {
            return ~~(Math.random() * 20)
        }

        const randomDirection = () => {
            const directions = ['up', 'down', 'left', 'right']
            return directions[~~(Math.random() * directions.length)]
        }

        const checkPlayer = (x, y, direction) => {
            let is = false

            const check = (x, y) => {
                return document.getElementById(`${x}:${y}`).className == 'pierwszak' ? true : false
            } 
            
            for (let i = 0; i <= 10; i++) {
                switch (direction) {
                    case 'up': is = check(x-i, y); break
                    case 'down': is = check(x+i, y); break
                    case 'left': is = check(x, y-i); break
                    case 'right': is = check(x, y+i); break
                }
                if (is) break
            }

            return is
        }

        for (let i = 0; i <= this.ai.max; i) {
            let x = randomPos()
            let y = randomPos()
            if (
                document.getElementById(`${x}:${y}`).className == 'floor' &&
                !checkPlayer() && 
                document.getElementById(`${x}:${y}`).className != 'wall'
            ) {
                i++
                this.ai.cache.push({
                    ID: i,
                    x, y,
                    direction: randomDirection(),
                    underself: 'floor'
                })
                document.getElementById(`${x}:${y}`).className = 'bajkopisarz_zenon'
            }

        }

    }

    aiMovement () {

        const calcNewCoords = (x, y, direction) => {
            switch (direction) {
                case 'up': return { x: x-1, y }
                case 'down': return { x: x+1, y }
                case 'left': return { x, y: y-1 }
                case 'right': return { x, y: y+1 }
            }
        }

        const directions = ['up', 'down', 'left', 'right']

        const chnageDirection = (current, x, y) => {
            let it = directions[~~(Math.random() * directions.length)]
            if (it == current) return chnageDirection(current, x, y)
            let c = calcNewCoords(x, y, it)
            if (this.isWall(c.x, c.y)) return chnageDirection(current, x, y)
            if (this.isBarrier(c.x,  c.y)) return chnageDirection(current, x, y)
            else return it
        }
        
        const setTexture = (x, y, name) => {
            document.getElementById(`${x}:${y}`).className = name
        }

        this.ai.cache.forEach((ai, i) => {

            const next = async () => {

                if (!this.game) return

                const currectCoords = {
                    x: this.ai.cache[i].x,
                    y: this.ai.cache[i].y,
                    direction: this.ai.cache[i].direction
                }

                let move = calcNewCoords(currectCoords.x, currectCoords.y, currectCoords.direction)

                if (this.isWall(move.x, move.y)) {
                    this.ai.cache[i].direction = chnageDirection(currectCoords.direction, currectCoords.x, currectCoords.y)
                    move = calcNewCoords(currectCoords.x, currectCoords.y, this.ai.cache[i].direction)
                }

                await setTexture(currectCoords.x, currectCoords.y, this.ai.cache[i].underself)
                this.ai.cache[i].underself = document.getElementById(`${move.x}:${move.y}`).className
                setTexture(move.x, move.y, 'bajkopisarz_zenon')

                this.ai.cache[i].x = move.x
                this.ai.cache[i].y = move.y

            }

            next(); setInterval(() => {
                next()
            }, 1.2 * 1000)

        })
    }

    start () {

        this.renderMap()
        this.wallsGenerator()
        document.getElementById(`${this.player.x}:${this.player.y}`).className = 'pierwszak'
        // this.coinsGenerator()
        this.aiGenerator()
        this.aiMovement()
        this.playerMovement()
        this.updateTopBar()

    }

}

new ZenonMan().start()