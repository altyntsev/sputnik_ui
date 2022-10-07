import * as Dropdown from "./dropdown.js";
export class List extends Dropdown.Dropdown {
    constructor(cfg) {
        super(cfg);
    }
    ui() {
        return this.render(`
            <select id="ID-select" size="${this.cfg.size}" style="width: ${this.cfg.width}"></select>  
        `);
    }
}
