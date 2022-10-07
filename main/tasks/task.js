import { Module } from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js";
import * as lib from '../lib.js';
import { Params } from '../_libs/params.js';
export class Task extends Module {
    constructor(cfg) {
        super();
        this.cfg = cfg;
        this.task = window.location.pathname.split('/').pop();
        this.params = new Params();
    }
    async init_before_ui() {
        this.project = await lib.init_project_name_menu();
        set_active_menu('tasks');
    }
    async init_after_ui() {
        this.params.init();
    }
    async run_event() {
        await ajax_post('/task/run', {
            task: this.task,
            project_id: this.project.project_id,
            title: this.title_input.value,
            params: this.params.get_params()
        });
        window.location.href = `/html/project/procs?project_id=${this.project.project_id}`;
    }
    async ui() {
        const run_button = new UI.Button({
            label: 'Run',
            click_event: this.run_event.bind(this)
        });
        this.title_input = new UI.Input({ size: 20 });
        return this.render(`
            <h1>Task: ${this.task}</h1>
            Load Sentinel-2 metadata
            <gap/>
            Processing title: ${this.title_input.ui()} ${run_button.ui()}
            <hr>
        `);
    }
}
