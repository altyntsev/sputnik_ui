import {Module} from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js"

interface Cfg {
    name: string
    label: string
}

export class Layer extends Module {
    cfg: Cfg
    pane: string

    constructor(cfg) {
        super();
        this.cfg = cfg
    }

    pane_init() {
        this.pane = `pane-${this.cfg.name}`
        this.parent.map.createPane(this.pane)

        return this.pane
    }

    show_event(ev) {
        const elem = this.parent.map.getPane(this.pane)
        if (ev.value) {
            elem.style.display = 'block'
        } else {
            elem.style.display = 'none'
        }
    }
    // ---------------------------------
    show_ui() {
        const show_cb = new UI.Checkbox({
            change_event: this.show_event.bind(this),
            value: true
        })
        return this.render(`
            ${this.css()}
            <div id="ID-container" class="hor_center">
                ${show_cb.ui()} <b>${this.cfg.label}</b>
            </div>
        `)
    }
    css() {
        return this.render(`
            <style>
                #ID-container {
                    border-top: solid 1px;
                    width: 100%;
                    margin-bottom: 1rem;
                    padding-top: .5rem;
                }
            </style>
            `)
    }

}