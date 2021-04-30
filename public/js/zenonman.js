const keyCodes = {
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39
}

class ZenonMan {

    constructor () {

        this.player = { x: 4, y: 5 }
        this.game = true
        this.playerFrozen = false

    }

    endGame () {
        console.log('game end')
    }

    changeClass (x, y, newClass) {
        document.getElementById(`${x}:${y}`).className = newClass
    }

    isWall (x, y) {

        const cn = document.getElementById(`${x}:${y}`).className
        if (cn == 'wall') return true
        else return false

    }

    isEnd (x, y) {

        if (document.getElementById(`${x}:${y}`).className == 'bajkopisarz_zenon') return true
        else return false

    }

    move(x, y) {

        console.log(x,y)
        if (this.isEnd(x, y)) {
            this.game = false
            return this.endGame()
        }
    
        if (!this.game) return
        if (this.playerFrozen) return

        if (this.isWall(x, y)) return

        this.changeClass(this.player.x, this.player.y, 'floor')
        this.changeClass(x, y, 'pierwszak')

        this.player.x = x
        this.player.y = y

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

                        if (this.player.y- 1 >= 0) return this.move(x, --y)

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

    start () {

        this.renderMap()
        document.getElementById(`${this.player.x}:${this.player.y}`).className = 'pierwszak'
        document.getElementById(`10:10`).className = 'wall'
        this.playerMovement()

    }

}

new ZenonMan().start()
