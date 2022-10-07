import {Module} from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js"
import * as lib from '../lib.js'
import {Project} from '../_types.js'

declare var app: Main

interface ScriptRes {
    proc_id: number
    iscript: number
    name: string
    status: 'WAIT' | 'NEXT' | 'RUN' | 'DONE'
    result: 'SUCCESS' | 'FATAL' | 'ERRORS'
}

interface ProcRes {
    event_id: number
    proc_id: number
    status: 'WAIT' | 'RUN' | 'DONE' | 'DELETED'
    result?: 'SUCCESS' | 'FATAL' | 'ERRORS'
    task: string
    title: string
    scripts: ScriptRes[]
}

interface ListRes {
    procs: ProcRes[]
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
        set_active_menu('procs')
    }

    async update() {
        const res: ListRes = await ajax_get('/proc/list', {project_id: this.project.project_id})
        el('#procs').innerHTML = this.procs_ui(res.procs)
    }

    async ui() {
        return this.render(`
            ${this.css()}
            <div id="procs"></div>
        `)
    }

    async init_after_ui(){
        this.update()
    }

    procs_ui(procs: ProcRes[]) {
        const header = `
            <tr>
                <th>event_id</th>
                <th>task</th>
                <th>title</th>
                <th>proc_id</th>
                <th>status</th>
                <th>result</th>
                <th>scripts</th>
            </tr>
            `
        const rows = []
        for (const proc of procs) {
            const scripts = []
            let script: ScriptRes
            for(script of proc.scripts || []) {
                const status = script.status=='DONE' ? script.result : script.status
                scripts.push(`
                    <span class="script ${status}">${script.name}</span>
                    `)
            }
            rows.push(`
                <tr>
                    <td>${proc.event_id}</td>
                    <td>${proc.task}</td>
                    <td>${proc.title}</td>
                    <td>${proc.proc_id}</td>
                    <td class="${proc.status}">${proc.status}</td>
                    <td class="${proc.result}">${proc.result}</td>
                    <td>${scripts.join('\n')}</td>
                </tr>
                `)
        }
        return this.render(`
            <table>
                ${header}
                ${rows.join('\n')}
            </table>
        `)
    }
    css() {
        return `
            <style>
                .script {
                    padding: 2px;
                    margin: 0;
                }
            </style>
        `
    }
}


