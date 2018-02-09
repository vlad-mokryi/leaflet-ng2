import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { CRS, LatLngBounds, LatLngBoundsExpression, LayerEvent, LayersControlEvent, LeafletEvent, LeafletKeyboardEvent, LeafletMouseEvent, Map, PopupEvent, ResizeEvent, TooltipEvent, ZoomAnimEvent } from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { MapProvider } from './map.provider';
/**
 * Angular2 root component for a Leaflet map
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map
 *     [(zoom)]="..."
 *     [(lat)]="..."
 *     [(lng)]="..."
 *     [(minZoom)]="..."
 *     [(maxZoom)]="..."
 *     [(maxBounds)]="..."
 *
 *     (baselayerchange)="..."
 *     (overlayadd)="..."
 *     (overlayremove)="..."
 *     (layeradd)="..."
 *     (layerremove)="..."
 *     (zoomlevelschan)="..."
 *     (resize)="..."
 *     (unload)="..."
 *     (viewreset)="..."
 *     (load)="..."
 *     (zoomstart)="..."
 *     (movestart)="..."
 *     (zoom)="..."
 *     (move)="..."
 *     (zoomend)="..."
 *     (moveend)="..."
 *     (popupopen)="..."
 *     (popupclose)="..."
 *     (autopanstart)="..."
 *     (tooltipopen)="..."
 *     (tooltipclose)="..."
 *     (click)="..."
 *     (dblclick)="..."
 *     (mousedown)="..."
 *     (mouseup)="..."
 *     (mouseover)="..."
 *     (mouseout)="..."
 *     (mousemove)="..."
 *     (contextmenu)="..."
 *     (keypress)="..."
 *     (preclick)="..."
 *     (zoomanim)="..."
 *
 *     [crs]="..."
 *     [closePopupOnClick]="..."
 *     [zoomSnap]="..."
 *     [zoomDelta]="..."
 *     [trackResize]="..."
 *     [boxZoomEnabled]="..."
 *     [doubleClickZoomEnabled]="..."
 *     [draggingEnabled]="..."
 *     [fadeAnimation]="..."
 *     [markerZoomAnimation]="..."
 *     [transform3DLimit]="..."
 *     [zoomAnimation]="..."
 *     [zoomAnimationThreshold]="..."
 *     [inertia]="..."
 *     [inertiaDeceleration]="..."
 *     [inertiaMaxSpeed]="..."
 *     [easeLinearity]="..."
 *     [worldCopyJump]="..."
 *     [maxBoundsViscosity]="..."
 *     [keyboardEnabled]="..."
 *     [keyboardPanDelta]="..."
 *     [scrollWheelZoomEnabled]="..."
 *     [wheelDebounceTime]="..."
 *     [wheelPxPerZoomLevel]="..."
 *     [tapEnabled]="..."
 *     [tapTolerance]="..."
 *     [bounceAtZoomLimits]="..."
 *     [touchZoomEnabled]="...">
 *     <!-- other yaga directives -->
 * </yaga-map>
 * ```
 *
 * You can use the following directives as child of this one:
 *
 * * yaga-attribution-control
 * * yaga-circle
 * * yaga-circle-marker
 * * yaga-geojson
 * * yaga-image-overlay
 * * yaga-marker
 * * yaga-polygon
 * * yaga-polyline
 * * yaga-rectangle
 * * yaga-scale-control
 * * yaga-tile-layer
 * * yaga-wms-layer
 * * yaga-zoom-control
 *
 * @link http://leafletjs.com/reference-1.2.0.html#tilelayer Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Tile-Layer%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/tile-layer.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/tilelayerdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/tile-layer-directive
 */
export declare class MapComponent extends Map implements AfterViewInit {
    /**
     * Two-Way bound property for the zoom.
     * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map (zoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setzoom Original Leaflet documentation
     */
    zoomChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the center latitude.
     * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map (latChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    latChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the center longitude.
     * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map (lngChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    lngChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the minimal available zoom.
     * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map (minZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    minZoomChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the maximal available zoom.
     * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map (maxZoomChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    maxZoomChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the bounds on the map.
     * Use it with `<yaga-map [(maxBounds)]="someValue">`
     * or `<yaga-map (maxBoundsChange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxbounds Original Leaflet documentation
     */
    maxBoundsChange: EventEmitter<LatLngBounds>;
    /**
     * From leaflet fired baselayerchange event.
     * Use it with `<yaga-tile-layer (baselayerchange)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-baselayerchange Original Leaflet documentation
     */
    baselayerchangeEvent: EventEmitter<LayersControlEvent>;
    /**
     * From leaflet fired overlayadd event.
     * Use it with `<yaga-tile-layer (overlayadd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-overlayadd Original Leaflet documentation
     */
    overlayaddEvent: EventEmitter<LayersControlEvent>;
    /**
     * From leaflet fired overlayremove event.
     * Use it with `<yaga-tile-layer (overlayremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-overlayremove Original Leaflet documentation
     */
    overlayremoveEvent: EventEmitter<LayersControlEvent>;
    /**
     * From leaflet fired layeradd event.
     * Use it with `<yaga-tile-layer (layeradd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-layeradd Original Leaflet documentation
     */
    layeraddEvent: EventEmitter<LayerEvent>;
    /**
     * From leaflet fired layerremove event.
     * Use it with `<yaga-tile-layer (layerremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-layerremove Original Leaflet documentation
     */
    layerremoveEvent: EventEmitter<LayerEvent>;
    /**
     * From leaflet fired zoomlevelschan event.
     * Use it with `<yaga-tile-layer (zoomlevelschan)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomlevelschan Original Leaflet documentation
     */
    zoomlevelschangeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired resize event.
     * Use it with `<yaga-tile-layer (resize)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-resize Original Leaflet documentation
     */
    resizeEvent: EventEmitter<ResizeEvent>;
    /**
     * From leaflet fired unload event.
     * Use it with `<yaga-tile-layer (unload)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-unload Original Leaflet documentation
     */
    unloadEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired viewreset event.
     * Use it with `<yaga-tile-layer (viewreset)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-viewreset Original Leaflet documentation
     */
    viewresetEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired load event.
     * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-load Original Leaflet documentation
     */
    loadEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired zoomstart event.
     * Use it with `<yaga-tile-layer (zoomstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomstart Original Leaflet documentation
     */
    zoomstartEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired movestart event.
     * Use it with `<yaga-tile-layer (movestart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-movestart Original Leaflet documentation
     */
    movestartEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired zoom event.
     * Use it with `<yaga-tile-layer (zoom)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoom Original Leaflet documentation
     */
    zoomEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired move event.
     * Use it with `<yaga-tile-layer (move)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-move Original Leaflet documentation
     */
    moveEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired zoomend event.
     * Use it with `<yaga-tile-layer (zoomend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomend Original Leaflet documentation
     */
    zoomendEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired moveend event.
     * Use it with `<yaga-tile-layer (moveend)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-moveend Original Leaflet documentation
     */
    moveendEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-popupopen Original Leaflet documentation
     */
    popupopenEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-popupclose Original Leaflet documentation
     */
    popupcloseEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired autopanstart event.
     * Use it with `<yaga-tile-layer (autopanstart)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-autopanstart Original Leaflet documentation
     */
    autopanstartEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-tooltipopen Original Leaflet documentation
     */
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-tooltipclose Original Leaflet documentation
     */
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dblclick event.
     * Use it with `<yaga-tile-layer (dblclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-dblclick Original Leaflet documentation
     */
    dblclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseup event.
     * Use it with `<yaga-tile-layer (mouseup)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mouseup Original Leaflet documentation
     */
    mouseupEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mouseout Original Leaflet documentation
     */
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousemove event.
     * Use it with `<yaga-tile-layer (mousemove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-mousemove Original Leaflet documentation
     */
    mousemoveEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-contextmenu Original Leaflet documentation
     */
    contextmenuEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired keypress event.
     * Use it with `<yaga-tile-layer (keypress)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-keypress Original Leaflet documentation
     */
    keypressEvent: EventEmitter<LeafletKeyboardEvent>;
    /**
     * From leaflet fired preclick event.
     * Use it with `<yaga-tile-layer (preclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-preclick Original Leaflet documentation
     */
    preclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired zoomanim event.
     * Use it with `<yaga-tile-layer (zoomanim)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanim Original Leaflet documentation
     */
    zoomanimEvent: EventEmitter<ZoomAnimEvent>;
    private moveTimeout;
    private isZooming;
    constructor(elementRef: ElementRef, layerProvider: LayerGroupProvider, mapProvider: MapProvider);
    /**
     * This function gets called from Angular after initializing the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/AfterViewInit-class.html
     */
    ngAfterViewInit(): void;
    /**
     * Two-Way bound property for the zoom.
     * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map [zoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setzoom Original Leaflet documentation
     */
    zoom: number;
    /**
     * Two-Way bound property for the latitude.
     * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    lat: number;
    /**
     * Two-Way bound property for the longitude.
     * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
     */
    lng: number;
    /**
     * Derived method of the original setMinZoom method.
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    setMinZoom(val: number): this;
    /**
     * Two-Way bound property for the minimal availabe zoom.
     * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map [minZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    minZoom: number;
    /**
     * Derived method of the original setMaxZoom method.
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    setMaxZoom(val: number): this;
    /**
     * Two-Way bound property for the maximal availabe zoom.
     * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map [maxZoom]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    maxZoom: number;
    /**
     * Inherited function to provide event emitting.
     */
    setMaxBounds(bounds: LatLngBoundsExpression): this;
    /**
     * One-Way property for the Coordinate Reference System.
     * Use it with `<yaga-map [crs]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-crs Original Leaflet documentation
     */
    crs: CRS;
    /**
     * Two-Way bound property for the maximal bounds.
     * Use it with `<yaga-map [(maxBounds)]="someValue">` or `<yaga-map [maxBounds]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-maxbounds Original Leaflet documentation
     */
    maxBounds: LatLngBounds;
    /**
     * Input for the closePopupOnClick.
     * Use it with `<yaga-map [closePopupOnClick]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-closepopuponclick Original Leaflet documentation
     */
    closePopupOnClick: boolean;
    /**
     * Input for the zoomSnap.
     * Use it with `<yaga-map [zoomSnap]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomsnap Original Leaflet documentation
     */
    zoomSnap: number;
    /**
     * Input for the zoomDelta.
     * Use it with `<yaga-map [zoomDelta]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomdelta Original Leaflet documentation
     */
    zoomDelta: number;
    /**
     * Input for the trackResize.
     * Use it with `<yaga-map [trackResize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-trackresize Original Leaflet documentation
     */
    trackResize: boolean;
    /**
     * Input for the boxZoomEnabled.
     * Use it with `<yaga-map [boxZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-boxzoom Original Leaflet documentation
     */
    boxZoomEnabled: boolean;
    /**
     * Input for the doubleClickZoomEnabled.
     * Use it with `<yaga-map [doubleClickZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-doubleclickzoom Original Leaflet documentation
     */
    doubleClickZoomEnabled: boolean;
    /**
     * Input for the draggingEnabled.
     * Use it with `<yaga-map [draggingEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-dragging Original Leaflet documentation
     */
    draggingEnabled: boolean;
    /**
     * Input for the fadeAnimation.
     * Use it with `<yaga-map [fadeAnimation]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-fadeanimation Original Leaflet documentation
     */
    fadeAnimation: boolean;
    /**
     * Input for the markerZoomAnimation.
     * Use it with `<yaga-map [markerZoomAnimation]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-markerzoomanimation Original Leaflet documentation
     */
    markerZoomAnimation: boolean;
    /**
     * Input for the transform3DLimit.
     * Use it with `<yaga-map [transform3DLimit]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-transform3dlimit Original Leaflet documentation
     */
    transform3DLimit: number;
    /**
     * Input for the zoomAnimation.
     * Use it with `<yaga-map [zoomAnimation]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanimation Original Leaflet documentation
     */
    zoomAnimation: boolean;
    /**
     * Input for the zoomAnimationThreshold.
     * Use it with `<yaga-map [zoomAnimationThreshold]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanimationthreshold Original Leaflet documentation
     */
    zoomAnimationThreshold: number;
    /**
     * Input for the inertia.
     * Use it with `<yaga-map [inertia]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-inertia Original Leaflet documentation
     */
    inertia: boolean;
    /**
     * Input for the inertiaDeceleration.
     * Use it with `<yaga-map [inertiaDeceleration]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-inertiadeceleration Original Leaflet documentation
     */
    inertiaDeceleration: number;
    /**
     * Input for the inertiaMaxSpeed.
     * Use it with `<yaga-map [inertiaMaxSpeed]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-inertiamaxspeed Original Leaflet documentation
     */
    inertiaMaxSpeed: number;
    /**
     * Input for the easeLinearity.
     * Use it with `<yaga-map [easeLinearity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-easelinearity Original Leaflet documentation
     */
    easeLinearity: number;
    /**
     * Input for the worldCopyJump.
     * Use it with `<yaga-map [worldCopyJump]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-worldcopyjump Original Leaflet documentation
     */
    worldCopyJump: boolean;
    /**
     * Input for the maxBoundsViscosity.
     * Use it with `<yaga-map [maxBoundsViscosity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-maxboundsviscosity Original Leaflet documentation
     */
    maxBoundsViscosity: number;
    /**
     * Input for the keyboardEnabled.
     * Use it with `<yaga-map [keyboardEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-keyboard Original Leaflet documentation
     */
    keyboardEnabled: boolean;
    /**
     * Input for the keyboardPanDelta.
     * Use it with `<yaga-map [keyboardPanDelta]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-keyboardpandelta Original Leaflet documentation
     */
    keyboardPanDelta: number;
    /**
     * Input for the scrollWheelZoomEnabled.
     * Use it with `<yaga-map [scrollWheelZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-scrollwheelzoom Original Leaflet documentation
     */
    scrollWheelZoomEnabled: boolean;
    /**
     * Input for the wheelDebounceTime.
     * Use it with `<yaga-map [wheelDebounceTime]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-wheeldebouncetime Original Leaflet documentation
     */
    wheelDebounceTime: number;
    /**
     * Input for the wheelPxPerZoomLevel.
     * Use it with `<yaga-map [wheelPxPerZoomLevel]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-wheelpxperzoomlevel Original Leaflet documentation
     */
    wheelPxPerZoomLevel: number;
    /**
     * Input for the tapEnabled.
     * Use it with `<yaga-map [tapEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-tap Original Leaflet documentation
     */
    tapEnabled: boolean;
    /**
     * Input for the tapTolerance.
     * Use it with `<yaga-map [tapTolerance]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-taptolerance Original Leaflet documentation
     */
    tapTolerance: number;
    /**
     * Input for the bounceAtZoomLimits.
     * Use it with `<yaga-map [bounceAtZoomLimits]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-bounceatzoomlimits Original Leaflet documentation
     */
    bounceAtZoomLimits: boolean;
    /**
     * Input for the touchZoomEnabled.
     * Use it with `<yaga-map [touchZoomEnabled]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#map-touchzoom Original Leaflet documentation
     */
    touchZoomEnabled: boolean;
}
