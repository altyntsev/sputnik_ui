import * as UI from "../_libs/ui/_import.js";
import { Layer } from "./layer.js";
export class RgbLayer extends Layer {
    constructor() {
        super({
            name: 'rgb',
            label: 'RGB'
        });
    }
    async init_after_ui() {
        this.main = this.parent;
        this.project_id = this.main.project.project_id;
        const pane = this.pane_init();
        const res = await ajax_get('/product/list', {
            project_id: this.project_id,
            product: 'rgb'
        });
        const product_ids = [];
        for (const product of res.products) {
            product_ids.push(product.product_id);
        }
        this.product_list.data = product_ids;
    }
    async product_event(ev) {
        const product_id = ev.value;
        if (this.rgb_layer) {
            this.main.map.removeLayer(this.rgb_layer);
        }
        const file = app.cfg.storage_dir + `projects/${this.project_id}/rgb/${product_id}.tif`;
        const url = `http://192.168.3.169:10006/cog/tiles/{z}/{x}/{y}.png?url=${file}`;
        this.rgb_layer = L.tileLayer(url, { pane: this.pane });
        this.rgb_layer.addTo(this.main.map);
    }
    // -------------------------------------------------------------
    ui() {
        this.product_list = new UI.List({
            data: [],
            size: 5,
            change_event: this.product_event.bind(this)
        });
        return this.render(`
            <div class="ver">
                ${this.show_ui()}
                ${this.product_list.ui()}
                <gap/>
            </div>
        `);
    }
}
