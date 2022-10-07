import {Module} from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js"
import * as lib from '../lib.js'
import {Project} from '../_types.js'

declare var app: Main

interface Task {
    name: string
    descr: string
}

interface Res {
    tasks: Task[]
}

export class Main extends Module {
    cfg: any
    project: Project

    constructor(cfg) {
        super();
        this.cfg = cfg
    }

    async init_before_ui(){
        this.project = await lib.init_project_name_menu()
        set_active_menu('tasks')
    }

    async update() {
        const res: Res = await ajax_get('/task/list')
        el('#tasks').innerHTML = this.tasks_ui(res.tasks)
    }

    async ui() {
        return this.render(`
            <div id="tasks"></div>
        `)
    }

    async init_after_ui(){
        this.update()
    }

    tasks_ui(tasks: Task[]) {
        const header = `
            <tr>
                <th>name</th>
                <th>description</th>
            </tr>
            `
        const rows = []
        for (const task of tasks) {
            rows.push(`
                <tr>
                    <td>
                        <a href="/html/tasks/${task.name}?project_id=${this.project.project_id}">
                            ${task.name}</a>
                    </td>
                    <td>${task.descr}</td>
                </tr>
            `)
        }
        return `
            <table>
                ${header}
                ${rows.join('\n')}
            </table>
        `
    }
}


