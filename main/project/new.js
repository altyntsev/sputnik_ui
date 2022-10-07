import { Module } from "../_libs/module.js";
import { Params } from "../_libs/params.js";
import * as UI from "../_libs/ui/_import.js";
export class Main extends Module {
    constructor(cfg) {
        super();
        this.cfg = cfg;
        this.params = new Params();
    }
    init() {
    }
    async ui() {
        set_active_menu('projects');
        this.params.add('name', new UI.Input());
        this.params.add('start_date', new UI.Input());
        this.params.add('end_date', new UI.Input());
        this.params.add('border', new UI.Text());
        const save_button = new UI.Button({
            label: 'Save Project',
            click_event: this.save_event.bind(this)
        });
        return this.render(`
            <table>
                <tr><th>Project Name*</th><td>${this.params.module('name').ui()}</td></tr>
                <tr><th>Start Date (ISO)</th><td>${this.params.module('start_date').ui()}</td></tr>
                <tr><th>End Date (ISO)</th><td>${this.params.module('end_date').ui()}</td></tr>
                <tr><th>Region Border (geojson)</th><td>${this.params.module('border').ui()}</td></tr>
            </table>
            <gap/>
            ${save_button.ui()}
        `);
    }
    async save_event() {
        await ajax_post('', this.params.get_params());
        window.location.href = '/html/project/list';
    }
}
