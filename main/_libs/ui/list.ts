import {Module} from "../module.js"
import * as Dropdown from "./dropdown.js"

export interface Cfg extends Dropdown.Cfg {
    data?: any[]
    change_event?: any
    value_attr?: string
    label_attr?: string
    value?: string
    size: number
}

export interface Change_event {
    value: string
}

export class List extends Dropdown.Dropdown {
    cfg: Cfg
    select: HTMLSelectElement

    constructor(cfg?: Cfg) {
        super(cfg)
    }

    ui() {
        return this.render(`
            <select id="ID-select" size="${this.cfg.size}" style="width: ${this.cfg.width}"></select>  
        `)
    }

}
