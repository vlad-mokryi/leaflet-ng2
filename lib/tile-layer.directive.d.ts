import { EventEmitter, OnDestroy } from '@angular/core';
import { LatLngBoundsExpression, LeafletEvent, LeafletMouseEvent, Point, PopupEvent, TileErrorEvent, TileEvent, TileLayer, TooltipEvent } from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';
/**
 * Angular2 directive for Leaflet tile-layers.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-tile-layer
 *         [(url)]="..."
 *         [(display)]="..."
 *         [(opacity)]="..."
 *         [(zIndex)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (popupopen)="..."
 *         (popupclose)="..."
 *         (tooltipopen)="..."
 *         (tooltipclose)="..."
 *         (click)="..."
 *         (dbclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         (contextmenu)="..."
 *         (loading)="..."
 *         (tileunload)="..."
 *         (tileloadstart)="..."
 *         (tileerror)="..."
 *         (tileload)="..."
 *         (load)="..."
 *
 *         [tileSize]="..."
 *         [updateWhenIdle]="..."
 *         [updateWhenZooming]="..."
 *         [updateInterval]="..."
 *         [bounds]="..."
 *         [noWrap]="..."
 *         [className]="..."
 *         [keepBuffer]="..."
 *         [maxZoom]="..."
 *         [minZoom]="..."
 *         [maxNativeZoom]="..."
 *         [minNativeZoom]="..."
 *         [subdomains]="..."
 *         [errorTileUrl]="..."
 *         [zoomOffset]="..."
 *         [tms]="..."
 *         [zoomReverse]="..."
 *         [detectRetina]="..."
 *         [crossOrigin]="..."
 *         [attribution]="...">
 *     </yaga-tile-layer>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#tilelayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
export declare class TileLayerDirective extends TileLayer implements OnDestroy {
    /**
     * Two-Way bound property for the URL.
     * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer (urlChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    urlChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">`
     * or `<yaga-tile-layer (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the opacity of the layer.
     * Use it with `<yaga-tile-layer [(opacity)]="someValue">`
     * or `<yaga-tile-layer (opacityChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-opacity Original Leaflet documentation
     */
    opacityChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the zIndex of the layer.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">`
     * or `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    zIndexChange: EventEmitter<number>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-tile-layer (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-tile-layer (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupopen Original Leaflet documentation
     */
    popupopenEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupclose Original Leaflet documentation
     */
    popupcloseEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipopen Original Leaflet documentation
     */
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipclose Original Leaflet documentation
     */
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-tile-layer (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mouseout Original Leaflet documentation
     */
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-contextmenu Original Leaflet documentation
     */
    contextmenuEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired loading event.
     * Use it with `<yaga-tile-layer (loading)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-loading Original Leaflet documentation
     */
    loadingEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired tileunload event.
     * Use it with `<yaga-tile-layer (tileunload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileunload Original Leaflet documentation
     */
    tileunloadEvent: EventEmitter<TileEvent>;
    /**
     * From leaflet fired tileloadstart event.
     * Use it with `<yaga-tile-layer (tileloadstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileloadstart Original Leaflet documentation
     */
    tileloadstartEvent: EventEmitter<TileEvent>;
    /**
     * From leaflet fired tileerror event.
     * Use it with `<yaga-tile-layer (tileerror)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileerror Original Leaflet documentation
     */
    tileerrorEvent: EventEmitter<TileErrorEvent>;
    /**
     * From leaflet fired tileload event.
     * Use it with `<yaga-tile-layer (tileload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileload Original Leaflet documentation
     */
    tileloadEvent: EventEmitter<TileEvent>;
    /**
     * From leaflet fired load event.
     * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-load Original Leaflet documentation
     */
    loadEvent: EventEmitter<LeafletEvent>;
    constructor(layerGroupProvider: LayerGroupProvider, layerProvider: LayerProvider);
    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    ngOnDestroy(): void;
    /**
     * Derived method of the original setUrl method.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    setUrl(url: string, noRedraw?: boolean): this;
    /**
     * Two-Way bound property for the URL.
     * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer [url]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    url: string;
    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setopacity Original Leaflet documentation
     */
    setOpacity(val: number): this;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setopacity Original Leaflet documentation
     */
    opacity: number;
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
     */
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
     */
    display: boolean;
    /**
     * Derived method of the original setZIndexmethod.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    setZIndex(val: number): this;
    /**
     * Two-Way bound property for the zIndex.
     * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer [zIndex]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    zIndex: number;
    /**
     * Input for the tileSize.
     * Use it with `<yaga-tile-layer [tileSize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileSize Original Leaflet documentation
     */
    tileSize: Point;
    /**
     * Input for the updateWhenIdle.
     * Use it with `<yaga-tile-layer [updateWhenIdle]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updatewhenidle Original Leaflet documentation
     */
    updateWhenIdle: boolean;
    /**
     * Input for the updateWhenZooming.
     * Use it with `<yaga-tile-layer [updateWhenZooming]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updatewhenzooming Original Leaflet documentation
     */
    updateWhenZooming: boolean;
    /**
     * Input for the updateInterval.
     * Use it with `<yaga-tile-layer [updateInterval]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updateinterval Original Leaflet documentation
     */
    updateInterval: number;
    /**
     * Input for the bounds.
     * Use it with `<yaga-tile-layer [bounds]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-bounds Original Leaflet documentation
     */
    bounds: LatLngBoundsExpression;
    /**
     * Input for the noWrap.
     * Use it with `<yaga-tile-layer [noWrap]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-nowrap Original Leaflet documentation
     */
    noWrap: boolean;
    /**
     * Input for the className.
     * Use it with `<yaga-tile-layer [className]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-classname Original Leaflet documentation
     */
    className: string;
    /**
     * Input for the keepBuffer.
     * Use it with `<yaga-tile-layer [keepBuffer]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-keepbuffer Original Leaflet documentation
     */
    keepBuffer: number;
    /**
     * Input for the maxZoom.
     * Use it with `<yaga-tile-layer [maxZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-maxzoom Original Leaflet documentation
     */
    maxZoom: number;
    /**
     * Input for the minZoom.
     * Use it with `<yaga-tile-layer [minZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-minzoom Original Leaflet documentation
     */
    minZoom: number;
    /**
     * Input for the maxNativeZoom.
     * Use it with `<yaga-tile-layer [maxNativeZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-maxnativezoom Original Leaflet documentation
     */
    maxNativeZoom: number;
    /**
     * Input for the minNativeZoom.
     * Use it with `<yaga-tile-layer [minNativeZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-minnativezoom Original Leaflet documentation
     */
    minNativeZoom: number;
    /**
     * Input for the subdomains.
     * Use it with `<yaga-tile-layer [subdomains]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-subdomains Original Leaflet documentation
     */
    subdomains: string[];
    /**
     * Input for the errorTileUrl.
     * Use it with `<yaga-tile-layer [errorTileUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-errortileurl Original Leaflet documentation
     */
    errorTileUrl: string;
    /**
     * Input for the zoomOffset.
     * Use it with `<yaga-tile-layer [zoomOffset]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-zoomoffset Original Leaflet documentation
     */
    zoomOffset: number;
    /**
     * Input for the tms.
     * Use it with `<yaga-tile-layer [tms]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tms Original Leaflet documentation
     */
    tms: boolean;
    /**
     * Input for the zoomReverse.
     * Use it with `<yaga-tile-layer [zoomReverse]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-zoomreverse Original Leaflet documentation
     */
    zoomReverse: boolean;
    /**
     * Input for the detectRetina.
     * Use it with `<yaga-tile-layer [detectRetina]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-detectretina Original Leaflet documentation
     */
    detectRetina: boolean;
    /**
     * Input for the crossOrigin.
     * Use it with `<yaga-tile-layer [crossOrigin]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-crossorigin Original Leaflet documentation
     */
    crossOrigin: boolean;
    /**
     * Input for the attribution.
     * Use it with `<yaga-tile-layer [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-attribution Original Leaflet documentation
     */
    attribution: string;
}
