class ZenonMan {

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
