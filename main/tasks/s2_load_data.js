import { Task } from './task.js';
import * as UI from "../_libs/ui/_import.js";
export class Main extends Task {
    constructor(cfg) {
        super(cfg);
    }
    async init_after_ui() {
        await super.init_after_ui();
        const params = get_url_params();
        this.params.module('scene_id').value = params.scene_id;
        this.title_input.value = params.scene_id;
    }
    // ---------------------------------------------------------------------
    async ui() {
        this.params.add('scene_id', new UI.Input({
            size: 20
        }));
        return this.render(`
            ${await super.ui()}
            Scene_id: ${this.params.module('scene_id').ui()}
        `);
    }
}
