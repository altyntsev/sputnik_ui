import { Layer } from "./layer.js";
export class DemLayer extends Layer {
    constructor() {
        super({
            name: 'osm',
            label: 'OSM'
        });
    }
    async init_after_ui() {
        const pane = this.pane_init();
        const layer = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            pane: pane
        });
        layer.addTo(this.parent.map);
        // const url = 'https://dev-class.ctrl2go.com/api/tileraster?rds_id=altitude&z={z}&x={x}&y={y}&product=[1]&style={"interpolation":"linear","palette":[[450,"0,0,0"],[600,"255,255,255"]]}&apikey=0655ee488e01ed5b2dcfbe80a01813a9'
        const url = 'https://dev-class.ctrl2go.com/api/tileraster?rds_id=hillshade&z={z}&x={x}&y={y}&product=[1]&style={"interpolation":"linear","palette":[[1,"0,0,0"],[255,"255,255,255"]]}&apikey=0655ee488e01ed5b2dcfbe80a01813a9';
        // const url = 'https://dev-class.ctrl2go.com/api/tileraster?rds_id=slope&z={z}&x={x}&y={y}&product=[1]&style={"interpolation":"linear","palette":[[0,"0,0,0"],[20,"255,255,255"]]}&apikey=0655ee488e01ed5b2dcfbe80a01813a9'
        const layer1 = L.tileLayer(url, {
            pane: pane
        });
        layer1.addTo(this.parent.map);
    }
    // -------------------------------------------------------------
    ui() {
        return this.render(`
            ${this.show_ui()}
        `);
    }
}
