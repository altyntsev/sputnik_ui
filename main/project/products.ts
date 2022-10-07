import {Module} from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js"
import * as lib from '../lib.js'
import {Product, Project} from '../_types.js'

declare var app: Main

interface Response {
    products: Product[]
}

export class Main extends Module {
    cfg: any
    project: Project

    constructor(cfg) {
        super();
        this.cfg = cfg
    }

    async ui() {
        this.project = await lib.init_project_name_menu()
        set_active_menu('products')

        const res: Response = await ajax_get('/product/list', {project_id: this.project.project_id})

        return this.render(`
            ${this.table_ui(res.products)}
        `)
    }

    table_ui(products: Product[]) {
        const header = `
            <tr>
                <th>product</th>
                <th>product_id</th>
                <th>date</th>
                <th></th>
            </tr>
            `
        const rows = []
        for (const product of products) {
            rows.push(`
                <tr>
                    <td>${product.product}</td>
                    <td>${product.product_id}</td>
                    <td>${product.date}</td>
                    <td><a href="${app.cfg.api}/product/download?project_id=${this.project.project_id}&product_id=${product.product_id}">download</a></td>
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


