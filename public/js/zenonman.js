const keyCodes = {
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39
}

class ZenonMan {

    constructor () {

        this.player = { x: 0, y: 0 }
        this.game = true
        this.playerFrozen = false

    }

    endGame () {

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

        if (document.getElementById(`${x}:${y}`).className = 'bajkopisarz_zenon') return true
        else return false

    }

    move(x, y) {

        if (this.isEnd(x, y)) {
            this.game = false
            return this.endGame()
        }
    
        if (!this.game) return
        if (this.playerFrozen) return

        let _x_ = this.player.x
        let _y_ = this.player.y

        if (this.isWall(_x_, _y_)) return

        this.changeClass(x, y, 'floor')
        this.changeClass(x, y, 'pierwszak')

    }

    playerMovement () {

        window.addEventListener('keydown', (e) => {

            let _x_ = this.player.x
            let _y_ = this.player.y

            switch (e.keyCode) {

                case keyCodes.keyLeft:



                    break;
                case keyCodes.keyRight:



                    break;
                case keyCodes.keyUp:



                    break;
                case keyCodes.keyDown:



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

    }

}

new ZenonMan().start()
