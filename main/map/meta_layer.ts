import {Module} from "../_libs/module.js";
import * as UI from "../_libs/ui/_import.js"
import {Main} from "./main.js"
import {Meta} from "../_types.js"
import {Layer} from "./layer.js"

declare var L: any

interface MetaRes extends Meta {
    border_gj: string
}

interface MetaListRes {
    metas: MetaRes[]
}

export class MetaLayer extends Layer {
    main: Main
    date_list: UI.List
    scene_list: UI.List
    date_meta_by_scene_id: any
    selected_scene_id: string
    selected_layer: any
    all_layer: any
    project_id: number
    ql_layer: any

    constructor() {
        super({
            name: 'meta',
            label: 'Metadata'
        })
        this.date_meta_by_scene_id = {}
    }

    async init_after_ui() {
        this.main = this.parent
        this.project_id = this.main.project.project_id

        const pane = this.pane_init()
        this.parent.map.createPane('pane-ql')

        const res = await ajax_get('/meta/dates', {project_id: this.project_id})
        this.date_list.data = res.dates
        this.selected_layer = L.geoJSON(null, {
            pane: this.pane
        })
        this.selected_layer.addTo(this.main.map)
        this.selected_scene_id = null
        this.all_layer = L.geoJSON(null, {
            pane: this.pane
        })
        this.all_layer.addTo(this.main.map)
        this.ql_layer = null
    }

    async date_event(ev) {
        const res: MetaListRes = await ajax_get('/meta/list', {
            project_id: this.project_id,
            date: ev.value
        })
        this.scene_list.data = res.metas
        this.date_meta_by_scene_id = {}
        for (const meta of res.metas) {
            this.date_meta_by_scene_id[meta.scene_id] = meta
        }
        this.selected_layer.clearLayers()
        this.all_layer.clearLayers()
        for (const meta of res.metas) {
            this.all_layer.addData(JSON.parse(meta.border_gj))
        }
    }

    async scene_event(ev) {
        const scene_id = ev.value
        this.selected_scene_id = scene_id
        this.selected_layer.clearLayers()
        const meta = this.date_meta_by_scene_id[scene_id]
        this.selected_layer.addData(JSON.parse(meta.border_gj))
        const url = app.cfg.api + `/storage/${this.project_id}/ql/${scene_id}-ql.jpg`
        const bounds = L.latLngBounds(L.latLng(meta.yg0, meta.xg0), L.latLng(meta.yg1, meta.xg1))
        if (this.ql_layer) {
            this.main.map.removeLayer(this.ql_layer)
        }
        this.ql_layer = L.imageOverlay(url, bounds, {pane: 'pane-ql'})
        this.ql_layer.addTo(this.main.map)
    }

    download_event() {
        if (!this.selected_scene_id) return
        const params = `project_id=${this.project_id}&scene_id=${this.selected_scene_id}`
        window.open('/html/tasks/s2_load_data?' + params, '_blank')
    }

    show_event(ev) {
        const elem = this.parent.map.getPane(this.pane)
        const ql_elem = this.parent.map.getPane('pane-ql')
        if (ev.value) {
            elem.style.display = 'block'
            ql_elem.style.display = 'block'
        } else {
            elem.style.display = 'none'
            ql_elem.style.display = 'none'
        }
    }

    // -------------------------------------------------------------
    ui() {
        this.date_list = new UI.List({
            data: [],
            size: 5,
            change_event: this.date_event.bind(this)
        })
        this.scene_list = new UI.List({
            data: [],
            value_attr: 'scene_id',
            label_attr: 'scene_id',
            size: 5,
            width: '15rem',
            change_event: this.scene_event.bind(this)
        })
        const download_button = new UI.Button({
            label: 'Download',
            click_event: this.download_event.bind(this)
            })
        return this.render(`
            <div class="ver">
                ${this.show_ui()}
                Dates:
                ${this.date_list.ui()}
                Scenes:
                ${this.scene_list.ui()}
                <gap/>
                ${download_button.ui()}
                <gap/>
            </div>
        `)
    }

}