// <head>
//      <script src="/_libs/ext/leaflet/leaflet.js"></script>
//      <link href="/_libs/ext/leaflet/leaflet.css" rel="stylesheet">
// </head>
import { Module } from "../_libs/module.js";
import * as lib from '../lib.js';
import { OsmLayer } from './osm_layer.js';
import { DemLayer } from './dem_layer.js';
import { BorderLayer } from './border_layer.js';
import { MetaLayer } from './meta_layer.js';
import { RgbLayer } from './rgb_layer.js';
export class Main extends Module {
    constructor(cfg) {
        super();
        this.cfg = cfg;
        this.layers = [];
        this.osm_layer = new OsmLayer();
        this.layers.push(this.osm_layer);
        this.dem_layer = new DemLayer();
        this.layers.push(this.dem_layer);
        this.border_layer = new BorderLayer();
        this.layers.push(this.border_layer);
        this.meta_layer = new MetaLayer();
        this.layers.push(this.meta_layer);
        this.rgb_layer = new RgbLayer();
        this.layers.push(this.rgb_layer);
        this.ID = 'main';
        this.init_child_IDs();
    }
    async init_before_ui() {
        this.project = await lib.init_project_name_menu();
        set_active_menu('map');
    }
    async init_after_ui() {
        this.map = L.map('map', {
            center: [62, 104],
            zoom: 3,
            maxZoom: 12
        });
        this.map.invalidateSize();
        L.control.scale().addTo(this.map);
        for (const layer of this.layers) {
            console.log(layer);
            await layer.init_after_ui();
        }
    }
    // ----------------------------------------------------------------------------------------
    async ui() {
        return this.render(`
            ${this.css()}
            <div class="hor">
                <div class="ver">
                    ${this.layers_ui()}
                </div>
                <gap/>
                <div class="ver">
                    ${this.map_ui()}
                </div>
            </div>
        `);
    }
    layers_ui() {
        let layer_html = [];
        for (const layer of this.layers.slice().reverse()) {
            layer_html.push(layer.ui());
        }
        return `
            ${layer_html.join('\n')}
        `;
    }
    map_ui() {
        return `
            <div id="map"></div>
        `;
    }
    css() {
        return `
        <style>
            #map {
                width: 800px;
                height: 800px;
            }
        </style>
        `;
    }
}
