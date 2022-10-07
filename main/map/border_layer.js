import { Layer } from "./layer.js";
export class BorderLayer extends Layer {
    constructor() {
        super({
            name: 'border',
            label: 'Region Border'
        });
    }
    async init_after_ui() {
        const border = JSON.parse(this.parent.project.border_gj);
        const pane = this.pane_init();
        const layer = L.geoJSON(border, {
            pane: pane
        });
        layer.addTo(this.parent.map);
        this.parent.map.fitBounds(layer.getBounds());
    }
    // -------------------------------------------------------------
    ui() {
        return this.render(`
            ${this.show_ui()}
        `);
    }
}
