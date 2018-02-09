"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var leaflet_1 = require("leaflet");
var consts_1 = require("./consts");
var layer_group_provider_1 = require("./layer-group.provider");
var map_provider_1 = require("./map.provider");
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
var MapComponent = /** @class */ (function (_super) {
    __extends(MapComponent, _super);
    function MapComponent(elementRef, layerProvider, mapProvider) {
        var _this = _super.call(this, elementRef.nativeElement, { attributionControl: false, zoomControl: false }) || this;
        /**
         * Two-Way bound property for the zoom.
         * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map (zoomChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setzoom Original Leaflet documentation
         */
        _this.zoomChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the center latitude.
         * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map (latChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
         */
        _this.latChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the center longitude.
         * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map (lngChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
         */
        _this.lngChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the minimal available zoom.
         * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map (minZoomChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
         */
        _this.minZoomChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the maximal available zoom.
         * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map (maxZoomChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
         */
        _this.maxZoomChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the bounds on the map.
         * Use it with `<yaga-map [(maxBounds)]="someValue">`
         * or `<yaga-map (maxBoundsChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxbounds Original Leaflet documentation
         */
        _this.maxBoundsChange = new core_1.EventEmitter();
        /**
         * From leaflet fired baselayerchange event.
         * Use it with `<yaga-tile-layer (baselayerchange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-baselayerchange Original Leaflet documentation
         */
        _this.baselayerchangeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired overlayadd event.
         * Use it with `<yaga-tile-layer (overlayadd)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-overlayadd Original Leaflet documentation
         */
        _this.overlayaddEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired overlayremove event.
         * Use it with `<yaga-tile-layer (overlayremove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-overlayremove Original Leaflet documentation
         */
        _this.overlayremoveEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired layeradd event.
         * Use it with `<yaga-tile-layer (layeradd)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-layeradd Original Leaflet documentation
         */
        _this.layeraddEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired layerremove event.
         * Use it with `<yaga-tile-layer (layerremove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-layerremove Original Leaflet documentation
         */
        _this.layerremoveEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired zoomlevelschan event.
         * Use it with `<yaga-tile-layer (zoomlevelschan)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomlevelschan Original Leaflet documentation
         */
        _this.zoomlevelschangeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired resize event.
         * Use it with `<yaga-tile-layer (resize)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-resize Original Leaflet documentation
         */
        _this.resizeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired unload event.
         * Use it with `<yaga-tile-layer (unload)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-unload Original Leaflet documentation
         */
        _this.unloadEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired viewreset event.
         * Use it with `<yaga-tile-layer (viewreset)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-viewreset Original Leaflet documentation
         */
        _this.viewresetEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired load event.
         * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-load Original Leaflet documentation
         */
        _this.loadEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired zoomstart event.
         * Use it with `<yaga-tile-layer (zoomstart)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomstart Original Leaflet documentation
         */
        _this.zoomstartEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired movestart event.
         * Use it with `<yaga-tile-layer (movestart)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-movestart Original Leaflet documentation
         */
        _this.movestartEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired zoom event.
         * Use it with `<yaga-tile-layer (zoom)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoom Original Leaflet documentation
         */
        _this.zoomEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired move event.
         * Use it with `<yaga-tile-layer (move)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-move Original Leaflet documentation
         */
        _this.moveEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired zoomend event.
         * Use it with `<yaga-tile-layer (zoomend)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomend Original Leaflet documentation
         */
        _this.zoomendEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired moveend event.
         * Use it with `<yaga-tile-layer (moveend)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-moveend Original Leaflet documentation
         */
        _this.moveendEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired popupopen event.
         * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-popupopen Original Leaflet documentation
         */
        _this.popupopenEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired popupclose event.
         * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-popupclose Original Leaflet documentation
         */
        _this.popupcloseEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired autopanstart event.
         * Use it with `<yaga-tile-layer (autopanstart)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-autopanstart Original Leaflet documentation
         */
        _this.autopanstartEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tooltipopen event.
         * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-tooltipopen Original Leaflet documentation
         */
        _this.tooltipopenEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tooltipclose event.
         * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-tooltipclose Original Leaflet documentation
         */
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired click event.
         * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-click Original Leaflet documentation
         */
        _this.clickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired dblclick event.
         * Use it with `<yaga-tile-layer (dblclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-dblclick Original Leaflet documentation
         */
        _this.dblclickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mousedown event.
         * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-mousedown Original Leaflet documentation
         */
        _this.mousedownEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseup event.
         * Use it with `<yaga-tile-layer (mouseup)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-mouseup Original Leaflet documentation
         */
        _this.mouseupEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseover event.
         * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-mouseover Original Leaflet documentation
         */
        _this.mouseoverEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseout event.
         * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-mouseout Original Leaflet documentation
         */
        _this.mouseoutEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mousemove event.
         * Use it with `<yaga-tile-layer (mousemove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-mousemove Original Leaflet documentation
         */
        _this.mousemoveEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired contextmenu event.
         * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-contextmenu Original Leaflet documentation
         */
        _this.contextmenuEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired keypress event.
         * Use it with `<yaga-tile-layer (keypress)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-keypress Original Leaflet documentation
         */
        _this.keypressEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired preclick event.
         * Use it with `<yaga-tile-layer (preclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-preclick Original Leaflet documentation
         */
        _this.preclickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired zoomanim event.
         * Use it with `<yaga-tile-layer (zoomanim)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanim Original Leaflet documentation
         */
        _this.zoomanimEvent = new core_1.EventEmitter();
        _this.isZooming = false;
        mapProvider.ref = _this;
        layerProvider.ref = _this;
        var moveFn = function () {
            if (_this.isZooming) {
                _this.moveTimeout = setTimeout(moveFn, consts_1.ANIMATION_DELAY);
                return;
            }
            _this.latChange.emit(_this.lat);
            _this.lngChange.emit(_this.lng);
            _this.zoomChange.emit(_this.zoom);
            _this.moveTimeout = undefined;
        };
        _this.setView([0, 0], 0);
        elementRef.nativeElement.setAttribute('class', elementRef.nativeElement.getAttribute('class') + ' yaga-map');
        _this.on('move', function () {
            if (_this.moveTimeout) {
                clearTimeout(_this.moveTimeout);
            }
            _this.moveTimeout = setTimeout(moveFn, consts_1.ANIMATION_DELAY);
        });
        _this.on('zoomstart', function () {
            _this.isZooming = true;
        });
        _this.on('zoomend', function () {
            _this.isZooming = false;
            if (_this.moveTimeout) {
                clearTimeout(_this.moveTimeout);
            }
            _this.moveTimeout = setTimeout(moveFn, consts_1.ANIMATION_DELAY);
        });
        _this.on('baselayerchange', function (event) {
            _this.baselayerchangeEvent.emit(event);
        });
        _this.on('overlayadd', function (event) {
            _this.overlayaddEvent.emit(event);
        });
        _this.on('overlayremove', function (event) {
            _this.overlayremoveEvent.emit(event);
        });
        _this.on('layeradd', function (event) {
            _this.layeraddEvent.emit(event);
        });
        _this.on('layerremove', function (event) {
            _this.layerremoveEvent.emit(event);
        });
        _this.on('zoomlevelschange', function (event) {
            _this.zoomlevelschangeEvent.emit(event);
        });
        _this.on('resize', function (event) {
            _this.resizeEvent.emit(event);
        });
        _this.on('unload', function (event) {
            _this.unloadEvent.emit(event);
        });
        _this.on('viewreset', function (event) {
            _this.viewresetEvent.emit(event);
        });
        _this.on('load', function (event) {
            _this.loadEvent.emit(event);
        });
        _this.on('zoomstart', function (event) {
            _this.zoomstartEvent.emit(event);
        });
        _this.on('movestart', function (event) {
            _this.movestartEvent.emit(event);
        });
        _this.on('zoom', function (event) {
            _this.zoomEvent.emit(event);
        });
        _this.on('move', function (event) {
            _this.moveEvent.emit(event);
        });
        _this.on('zoomend', function (event) {
            _this.zoomendEvent.emit(event);
        });
        _this.on('moveend', function (event) {
            _this.moveendEvent.emit(event);
        });
        _this.on('popupopen', function (event) {
            _this.popupopenEvent.emit(event);
        });
        _this.on('popupclose', function (event) {
            _this.popupcloseEvent.emit(event);
        });
        _this.on('autopanstart', function (event) {
            _this.autopanstartEvent.emit(event);
        });
        _this.on('tooltipopen', function (event) {
            _this.tooltipopenEvent.emit(event);
        });
        _this.on('tooltipclose', function (event) {
            _this.tooltipcloseEvent.emit(event);
        });
        _this.on('click', function (event) {
            _this.clickEvent.emit(event);
        });
        _this.on('dblclick', function (event) {
            _this.dblclickEvent.emit(event);
        });
        _this.on('mousedown', function (event) {
            _this.mousedownEvent.emit(event);
        });
        _this.on('mouseup', function (event) {
            _this.mouseupEvent.emit(event);
        });
        _this.on('mouseover', function (event) {
            _this.mouseoverEvent.emit(event);
        });
        _this.on('mouseout', function (event) {
            _this.mouseoutEvent.emit(event);
        });
        _this.on('mousemove', function (event) {
            _this.mousemoveEvent.emit(event);
        });
        _this.on('contextmenu', function (event) {
            _this.contextmenuEvent.emit(event);
        });
        _this.on('keypress', function (event) {
            _this.keypressEvent.emit(event);
        });
        _this.on('preclick', function (event) {
            _this.preclickEvent.emit(event);
        });
        _this.on('zoomanim', function (event) {
            _this.zoomanimEvent.emit(event);
        });
        return _this;
    }
    /**
     * This function gets called from Angular after initializing the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/AfterViewInit-class.html
     */
    MapComponent.prototype.ngAfterViewInit = function () {
        this.invalidateSize(false);
    };
    Object.defineProperty(MapComponent.prototype, "zoom", {
        get: function () {
            return this.getZoom();
        },
        /*setZoom(zoom: number, options?: ZoomPanOptions): this {
         if (this.zoom === zoom) {
         return;
         }
         this.zoomChange.emit(zoom);
         return super.setZoom(zoom, options)
         }*/
        // already handled with moveend
        // setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this {
        /**
         * Two-Way bound property for the zoom.
         * Use it with `<yaga-map [(zoom)]="someValue">` or `<yaga-map [zoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setzoom Original Leaflet documentation
         */
        set: function (val) {
            this.setZoom(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "lat", {
        get: function () {
            return this.getCenter().lat;
        },
        /**
         * Two-Way bound property for the latitude.
         * Use it with `<yaga-map [(lat)]="someValue">` or `<yaga-map [lat]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
         */
        set: function (val) {
            var coords = new leaflet_1.LatLng(val, this.getCenter().lng);
            this.setView(coords, this.zoom);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "lng", {
        get: function () {
            return this.getCenter().lng;
        },
        /**
         * Two-Way bound property for the longitude.
         * Use it with `<yaga-map [(lng)]="someValue">` or `<yaga-map [lng]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setview Original Leaflet documentation
         */
        set: function (val) {
            var coords = new leaflet_1.LatLng(this.getCenter().lat, val);
            this.setView(coords, this.zoom);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original setMinZoom method.
     * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
     */
    MapComponent.prototype.setMinZoom = function (val) {
        this.minZoomChange.emit(val);
        return _super.prototype.setMinZoom.call(this, val);
    };
    Object.defineProperty(MapComponent.prototype, "minZoom", {
        get: function () {
            return this.getMinZoom();
        },
        /**
         * Two-Way bound property for the minimal availabe zoom.
         * Use it with `<yaga-map [(minZoom)]="someValue">` or `<yaga-map [minZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setminzoom Original Leaflet documentation
         */
        set: function (val) {
            this.setMinZoom(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original setMaxZoom method.
     * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
     */
    MapComponent.prototype.setMaxZoom = function (val) {
        this.maxZoomChange.emit(val);
        return _super.prototype.setMaxZoom.call(this, val);
    };
    Object.defineProperty(MapComponent.prototype, "maxZoom", {
        get: function () {
            return this.getMaxZoom();
        },
        /**
         * Two-Way bound property for the maximal availabe zoom.
         * Use it with `<yaga-map [(maxZoom)]="someValue">` or `<yaga-map [maxZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-setmaxzoom Original Leaflet documentation
         */
        set: function (val) {
            this.setMaxZoom(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Inherited function to provide event emitting.
     */
    MapComponent.prototype.setMaxBounds = function (bounds) {
        _super.prototype.setMaxBounds.call(this, bounds);
        this.maxBoundsChange.emit(this.maxBounds);
        return this;
    };
    Object.defineProperty(MapComponent.prototype, "crs", {
        get: function () {
            return this.options.crs;
        },
        /**
         * One-Way property for the Coordinate Reference System.
         * Use it with `<yaga-map [crs]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-crs Original Leaflet documentation
         */
        set: function (val) {
            this.options.crs = val;
            var keys = Object.keys(this._layers);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (typeof this._layers[key].redraw === 'function') {
                    this._layers[key].redraw();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "maxBounds", {
        get: function () {
            return this.options.maxBounds;
        },
        /**
         * Two-Way bound property for the maximal bounds.
         * Use it with `<yaga-map [(maxBounds)]="someValue">` or `<yaga-map [maxBounds]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-maxbounds Original Leaflet documentation
         */
        set: function (val) {
            this.setMaxBounds(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "closePopupOnClick", {
        get: function () {
            return this.options.closePopupOnClick;
        },
        // One-way Input
        /**
         * Input for the closePopupOnClick.
         * Use it with `<yaga-map [closePopupOnClick]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-closepopuponclick Original Leaflet documentation
         */
        set: function (val) {
            this.options.closePopupOnClick = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomSnap", {
        get: function () {
            return this.options.zoomSnap;
        },
        /**
         * Input for the zoomSnap.
         * Use it with `<yaga-map [zoomSnap]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomsnap Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomSnap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomDelta", {
        get: function () {
            return this.options.zoomDelta;
        },
        /**
         * Input for the zoomDelta.
         * Use it with `<yaga-map [zoomDelta]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomdelta Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomDelta = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "trackResize", {
        get: function () {
            return this.options.trackResize;
        },
        /**
         * Input for the trackResize.
         * Use it with `<yaga-map [trackResize]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-trackresize Original Leaflet documentation
         */
        set: function (val) {
            this.options.trackResize = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "boxZoomEnabled", {
        get: function () {
            return this.boxZoom.enabled();
        },
        // maybe 2way!?!
        /**
         * Input for the boxZoomEnabled.
         * Use it with `<yaga-map [boxZoomEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-boxzoom Original Leaflet documentation
         */
        set: function (val) {
            if (val) {
                this.boxZoom.enable();
                return;
            }
            this.boxZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "doubleClickZoomEnabled", {
        get: function () {
            return this.doubleClickZoom.enabled();
        },
        // maybe 2way!?!
        /**
         * Input for the doubleClickZoomEnabled.
         * Use it with `<yaga-map [doubleClickZoomEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-doubleclickzoom Original Leaflet documentation
         */
        set: function (val) {
            if (val) {
                this.doubleClickZoom.enable();
                return;
            }
            this.doubleClickZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "draggingEnabled", {
        get: function () {
            return this.dragging.enabled();
        },
        // maybe 2way!?!
        /**
         * Input for the draggingEnabled.
         * Use it with `<yaga-map [draggingEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-dragging Original Leaflet documentation
         */
        set: function (val) {
            if (val) {
                this.dragging.enable();
                return;
            }
            this.dragging.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "fadeAnimation", {
        get: function () {
            return this.options.fadeAnimation;
        },
        /**
         * Input for the fadeAnimation.
         * Use it with `<yaga-map [fadeAnimation]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-fadeanimation Original Leaflet documentation
         */
        set: function (val) {
            this.options.fadeAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "markerZoomAnimation", {
        get: function () {
            return this.options.markerZoomAnimation;
        },
        /**
         * Input for the markerZoomAnimation.
         * Use it with `<yaga-map [markerZoomAnimation]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-markerzoomanimation Original Leaflet documentation
         */
        set: function (val) {
            this.options.markerZoomAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "transform3DLimit", {
        get: function () {
            return this.options.transform3DLimit;
        },
        /**
         * Input for the transform3DLimit.
         * Use it with `<yaga-map [transform3DLimit]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-transform3dlimit Original Leaflet documentation
         */
        set: function (val) {
            this.options.transform3DLimit = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomAnimation", {
        get: function () {
            return this.options.zoomAnimation;
        },
        /**
         * Input for the zoomAnimation.
         * Use it with `<yaga-map [zoomAnimation]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanimation Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomAnimation = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "zoomAnimationThreshold", {
        get: function () {
            return this.options.zoomAnimationThreshold;
        },
        /**
         * Input for the zoomAnimationThreshold.
         * Use it with `<yaga-map [zoomAnimationThreshold]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-zoomanimationthreshold Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomAnimationThreshold = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "inertia", {
        get: function () {
            return this.options.inertia;
        },
        /**
         * Input for the inertia.
         * Use it with `<yaga-map [inertia]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-inertia Original Leaflet documentation
         */
        set: function (val) {
            this.options.inertia = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "inertiaDeceleration", {
        get: function () {
            return this.options.inertiaDeceleration;
        },
        /**
         * Input for the inertiaDeceleration.
         * Use it with `<yaga-map [inertiaDeceleration]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-inertiadeceleration Original Leaflet documentation
         */
        set: function (val) {
            this.options.inertiaDeceleration = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "inertiaMaxSpeed", {
        get: function () {
            return this.options.inertiaMaxSpeed;
        },
        /**
         * Input for the inertiaMaxSpeed.
         * Use it with `<yaga-map [inertiaMaxSpeed]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-inertiamaxspeed Original Leaflet documentation
         */
        set: function (val) {
            this.options.inertiaMaxSpeed = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "easeLinearity", {
        get: function () {
            return this.options.easeLinearity;
        },
        /**
         * Input for the easeLinearity.
         * Use it with `<yaga-map [easeLinearity]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-easelinearity Original Leaflet documentation
         */
        set: function (val) {
            this.options.easeLinearity = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "worldCopyJump", {
        get: function () {
            return this.options.worldCopyJump;
        },
        /**
         * Input for the worldCopyJump.
         * Use it with `<yaga-map [worldCopyJump]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-worldcopyjump Original Leaflet documentation
         */
        set: function (val) {
            this.options.worldCopyJump = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "maxBoundsViscosity", {
        get: function () {
            return this.options.maxBoundsViscosity;
        },
        /**
         * Input for the maxBoundsViscosity.
         * Use it with `<yaga-map [maxBoundsViscosity]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-maxboundsviscosity Original Leaflet documentation
         */
        set: function (val) {
            this.options.maxBoundsViscosity = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "keyboardEnabled", {
        get: function () {
            return this.keyboard.enabled();
        },
        // maybe 2way!?!
        /**
         * Input for the keyboardEnabled.
         * Use it with `<yaga-map [keyboardEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-keyboard Original Leaflet documentation
         */
        set: function (val) {
            if (val) {
                this.keyboard.enable();
                return;
            }
            this.keyboard.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "keyboardPanDelta", {
        get: function () {
            return this.options.keyboardPanDelta;
        },
        /**
         * Input for the keyboardPanDelta.
         * Use it with `<yaga-map [keyboardPanDelta]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-keyboardpandelta Original Leaflet documentation
         */
        set: function (val) {
            this.options.keyboardPanDelta = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "scrollWheelZoomEnabled", {
        get: function () {
            return this.scrollWheelZoom.enabled();
        },
        // maybe 2way!?!
        /**
         * Input for the scrollWheelZoomEnabled.
         * Use it with `<yaga-map [scrollWheelZoomEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-scrollwheelzoom Original Leaflet documentation
         */
        set: function (val) {
            if (val) {
                this.scrollWheelZoom.enable();
                return;
            }
            this.scrollWheelZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "wheelDebounceTime", {
        get: function () {
            return this.options.wheelDebounceTime;
        },
        /**
         * Input for the wheelDebounceTime.
         * Use it with `<yaga-map [wheelDebounceTime]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-wheeldebouncetime Original Leaflet documentation
         */
        set: function (val) {
            this.options.wheelDebounceTime = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "wheelPxPerZoomLevel", {
        get: function () {
            return this.options.wheelPxPerZoomLevel;
        },
        /**
         * Input for the wheelPxPerZoomLevel.
         * Use it with `<yaga-map [wheelPxPerZoomLevel]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-wheelpxperzoomlevel Original Leaflet documentation
         */
        set: function (val) {
            this.options.wheelPxPerZoomLevel = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "tapEnabled", {
        get: function () {
            return this.options.tap;
        },
        /**
         * Input for the tapEnabled.
         * Use it with `<yaga-map [tapEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-tap Original Leaflet documentation
         */
        set: function (val) {
            this.options.tap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "tapTolerance", {
        get: function () {
            return this.options.tapTolerance;
        },
        /**
         * Input for the tapTolerance.
         * Use it with `<yaga-map [tapTolerance]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-taptolerance Original Leaflet documentation
         */
        set: function (val) {
            this.options.tapTolerance = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "bounceAtZoomLimits", {
        get: function () {
            return this.options.bounceAtZoomLimits;
        },
        /**
         * Input for the bounceAtZoomLimits.
         * Use it with `<yaga-map [bounceAtZoomLimits]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-bounceatzoomlimits Original Leaflet documentation
         */
        set: function (val) {
            this.options.bounceAtZoomLimits = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapComponent.prototype, "touchZoomEnabled", {
        get: function () {
            return this.touchZoom.enabled();
        },
        // maybe 2way!?!
        /**
         * Input for the touchZoomEnabled.
         * Use it with `<yaga-map [touchZoomEnabled]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#map-touchzoom Original Leaflet documentation
         */
        set: function (val) {
            if (val) {
                this.touchZoom.enable();
                return;
            }
            this.touchZoom.disable();
        },
        enumerable: true,
        configurable: true
    });
    MapComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [layer_group_provider_1.LayerGroupProvider, map_provider_1.MapProvider],
                    selector: 'yaga-map',
                    styles: [":host { display: block; }"],
                    template: "<span style=\"display: none\"><ng-content></ng-content></span>",
                },] },
    ];
    /** @nocollapse */
    MapComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: layer_group_provider_1.LayerGroupProvider, decorators: [{ type: core_1.Host },] },
        { type: map_provider_1.MapProvider, },
    ]; };
    MapComponent.propDecorators = {
        'zoomChange': [{ type: core_1.Output },],
        'latChange': [{ type: core_1.Output },],
        'lngChange': [{ type: core_1.Output },],
        'minZoomChange': [{ type: core_1.Output },],
        'maxZoomChange': [{ type: core_1.Output },],
        'maxBoundsChange': [{ type: core_1.Output },],
        'baselayerchangeEvent': [{ type: core_1.Output, args: ['baselayerchange',] },],
        'overlayaddEvent': [{ type: core_1.Output, args: ['overlayadd',] },],
        'overlayremoveEvent': [{ type: core_1.Output, args: ['overlayremove',] },],
        'layeraddEvent': [{ type: core_1.Output, args: ['layeradd',] },],
        'layerremoveEvent': [{ type: core_1.Output, args: ['layerremove',] },],
        'zoomlevelschangeEvent': [{ type: core_1.Output, args: ['zoomlevelschange',] },],
        'resizeEvent': [{ type: core_1.Output, args: ['resize',] },],
        'unloadEvent': [{ type: core_1.Output, args: ['unload',] },],
        'viewresetEvent': [{ type: core_1.Output, args: ['viewreset',] },],
        'loadEvent': [{ type: core_1.Output, args: ['load',] },],
        'zoomstartEvent': [{ type: core_1.Output, args: ['zoomstart',] },],
        'movestartEvent': [{ type: core_1.Output, args: ['movestart',] },],
        'zoomEvent': [{ type: core_1.Output, args: ['zoom',] },],
        'moveEvent': [{ type: core_1.Output, args: ['move',] },],
        'zoomendEvent': [{ type: core_1.Output, args: ['zoomend',] },],
        'moveendEvent': [{ type: core_1.Output, args: ['moveend',] },],
        'popupopenEvent': [{ type: core_1.Output, args: ['popupopen',] },],
        'popupcloseEvent': [{ type: core_1.Output, args: ['popupclose',] },],
        'autopanstartEvent': [{ type: core_1.Output, args: ['autopanstart',] },],
        'tooltipopenEvent': [{ type: core_1.Output, args: ['tooltipopen',] },],
        'tooltipcloseEvent': [{ type: core_1.Output, args: ['tooltipclose',] },],
        'clickEvent': [{ type: core_1.Output, args: ['click',] },],
        'dblclickEvent': [{ type: core_1.Output, args: ['dblclick',] },],
        'mousedownEvent': [{ type: core_1.Output, args: ['mousedown',] },],
        'mouseupEvent': [{ type: core_1.Output, args: ['mouseup',] },],
        'mouseoverEvent': [{ type: core_1.Output, args: ['mouseover',] },],
        'mouseoutEvent': [{ type: core_1.Output, args: ['mouseout',] },],
        'mousemoveEvent': [{ type: core_1.Output, args: ['mousemove',] },],
        'contextmenuEvent': [{ type: core_1.Output, args: ['contextmenu',] },],
        'keypressEvent': [{ type: core_1.Output, args: ['keypress',] },],
        'preclickEvent': [{ type: core_1.Output, args: ['preclick',] },],
        'zoomanimEvent': [{ type: core_1.Output, args: ['zoomanim',] },],
        'zoom': [{ type: core_1.Input },],
        'lat': [{ type: core_1.Input },],
        'lng': [{ type: core_1.Input },],
        'minZoom': [{ type: core_1.Input },],
        'maxZoom': [{ type: core_1.Input },],
        'crs': [{ type: core_1.Input },],
        'maxBounds': [{ type: core_1.Input },],
        'closePopupOnClick': [{ type: core_1.Input },],
        'zoomSnap': [{ type: core_1.Input },],
        'zoomDelta': [{ type: core_1.Input },],
        'trackResize': [{ type: core_1.Input },],
        'boxZoomEnabled': [{ type: core_1.Input },],
        'doubleClickZoomEnabled': [{ type: core_1.Input },],
        'draggingEnabled': [{ type: core_1.Input },],
        'fadeAnimation': [{ type: core_1.Input },],
        'markerZoomAnimation': [{ type: core_1.Input },],
        'transform3DLimit': [{ type: core_1.Input },],
        'zoomAnimation': [{ type: core_1.Input },],
        'zoomAnimationThreshold': [{ type: core_1.Input },],
        'inertia': [{ type: core_1.Input },],
        'inertiaDeceleration': [{ type: core_1.Input },],
        'inertiaMaxSpeed': [{ type: core_1.Input },],
        'easeLinearity': [{ type: core_1.Input },],
        'worldCopyJump': [{ type: core_1.Input },],
        'maxBoundsViscosity': [{ type: core_1.Input },],
        'keyboardEnabled': [{ type: core_1.Input },],
        'keyboardPanDelta': [{ type: core_1.Input },],
        'scrollWheelZoomEnabled': [{ type: core_1.Input },],
        'wheelDebounceTime': [{ type: core_1.Input },],
        'wheelPxPerZoomLevel': [{ type: core_1.Input },],
        'tapEnabled': [{ type: core_1.Input },],
        'tapTolerance': [{ type: core_1.Input },],
        'bounceAtZoomLimits': [{ type: core_1.Input },],
        'touchZoomEnabled': [{ type: core_1.Input },],
    };
    return MapComponent;
}(leaflet_1.Map));
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map