import { Module } from "../_libs/module.js";
export class Main extends Module {
    constructor(cfg) {
        super();
        this.cfg = cfg;
    }
    async ui() {
        set_active_menu('projects');
        const res = await ajax_get();
        return this.render(`
            <a class="button" href="/html/project/new">New Project</a>
            <gap/>
            ${this.table_ui(res.projects)}
        `);
    }
    table_ui(projects) {
        const header = `
            <tr>
                <th>project_id</th>
                <th>login</th>
                <th>name</th>
                <th>start_date</th>
                <th>end_date</th>
            </tr>
            `;
        const rows = projects.map(project => `
            <tr>
                <td>${project.project_id}</td>
                <td>${project.login}</td>
                <td>
                    <a href="/html/project/tasks?project_id=${project.project_id}">${project.name}</a>
                </td>
                <td>${project.start_date}</td>
                <td>${project.end_date}</td>
            </tr>
            `).join('\n');
        return `
            <table>
                ${header}
                ${rows}
            </table>
        `;
    }
}
