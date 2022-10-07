import {Module} from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js"
import {Main} from "./main.js"
import {Layer} from "./layer.js"

declare var L: any

export class BorderLayer extends Layer {
    main: Main

    constructor() {
        super({
            name: 'border',
            label: 'Region Border'
        })
    }

    async init_after_ui() {
        const border = JSON.parse(this.parent.project.border_gj)
        const pane = this.pane_init()
        const layer = L.geoJSON(border, {
            pane: pane})
        layer.addTo(this.parent.map)
        this.parent.map.fitBounds(layer.getBounds())
    }

    // -------------------------------------------------------------

    ui() {
        return this.render(`
            ${this.show_ui()}
        `)
    }

}