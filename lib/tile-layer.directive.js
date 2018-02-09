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
var layer_provider_1 = require("./layer.provider");
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
var TileLayerDirective = /** @class */ (function (_super) {
    __extends(TileLayerDirective, _super);
    function TileLayerDirective(layerGroupProvider, layerProvider) {
        var _this = 
        // Transparent 1px image:
        _super.call(this, consts_1.TRANSPARENT_PIXEL, { errorTileUrl: consts_1.TRANSPARENT_PIXEL }) || this;
        /**
         * Two-Way bound property for the URL.
         * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer (urlChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
         */
        _this.urlChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the display status of the layer.
         * Use it with `<yaga-tile-layer [(display)]="someValue">`
         * or `<yaga-tile-layer (displayChange)="processEvent($event)">`
         */
        _this.displayChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the opacity of the layer.
         * Use it with `<yaga-tile-layer [(opacity)]="someValue">`
         * or `<yaga-tile-layer (opacityChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-opacity Original Leaflet documentation
         */
        _this.opacityChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the zIndex of the layer.
         * Use it with `<yaga-tile-layer [(zIndex)]="someValue">`
         * or `<yaga-tile-layer (zIndexChange)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
         */
        _this.zIndexChange = new core_1.EventEmitter();
        /**
         * From leaflet fired add event.
         * Use it with `<yaga-tile-layer (add)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-add Original Leaflet documentation
         */
        _this.addEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired remove event.
         * Use it with `<yaga-tile-layer (remove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-remove Original Leaflet documentation
         */
        _this.removeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired popupopen event.
         * Use it with `<yaga-tile-layer (popupopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupopen Original Leaflet documentation
         */
        _this.popupopenEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired popupclose event.
         * Use it with `<yaga-tile-layer (popupclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupclose Original Leaflet documentation
         */
        _this.popupcloseEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tooltipopen event.
         * Use it with `<yaga-tile-layer (tooltipopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipopen Original Leaflet documentation
         */
        _this.tooltipopenEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tooltipclose event.
         * Use it with `<yaga-tile-layer (tooltipclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipclose Original Leaflet documentation
         */
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired click event.
         * Use it with `<yaga-tile-layer (click)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-click Original Leaflet documentation
         */
        _this.clickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired dbclick event.
         * Use it with `<yaga-tile-layer (dbclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-dbclick Original Leaflet documentation
         */
        _this.dbclickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mousedown event.
         * Use it with `<yaga-tile-layer (mousedown)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mousedown Original Leaflet documentation
         */
        _this.mousedownEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseover event.
         * Use it with `<yaga-tile-layer (mouseover)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mouseover Original Leaflet documentation
         */
        _this.mouseoverEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseout event.
         * Use it with `<yaga-tile-layer (mouseout)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-mouseout Original Leaflet documentation
         */
        _this.mouseoutEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired contextmenu event.
         * Use it with `<yaga-tile-layer (contextmenu)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-contextmenu Original Leaflet documentation
         */
        _this.contextmenuEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired loading event.
         * Use it with `<yaga-tile-layer (loading)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-loading Original Leaflet documentation
         */
        _this.loadingEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tileunload event.
         * Use it with `<yaga-tile-layer (tileunload)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileunload Original Leaflet documentation
         */
        _this.tileunloadEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tileloadstart event.
         * Use it with `<yaga-tile-layer (tileloadstart)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileloadstart Original Leaflet documentation
         */
        _this.tileloadstartEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tileerror event.
         * Use it with `<yaga-tile-layer (tileerror)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileerror Original Leaflet documentation
         */
        _this.tileerrorEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tileload event.
         * Use it with `<yaga-tile-layer (tileload)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileload Original Leaflet documentation
         */
        _this.tileloadEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired load event.
         * Use it with `<yaga-tile-layer (load)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-load Original Leaflet documentation
         */
        _this.loadEvent = new core_1.EventEmitter();
        layerProvider.ref = _this;
        _this.on('remove', function () {
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        _this.addTo(layerGroupProvider.ref);
        // Events
        _this.on('add', function (event) {
            _this.addEvent.emit(event);
        });
        _this.on('remove', function (event) {
            _this.removeEvent.emit(event);
        });
        _this.on('popupopen', function (event) {
            _this.popupopenEvent.emit(event);
        });
        _this.on('popupclose', function (event) {
            _this.popupcloseEvent.emit(event);
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
        _this.on('dbclick', function (event) {
            _this.dbclickEvent.emit(event);
        });
        _this.on('mousedown', function (event) {
            _this.mousedownEvent.emit(event);
        });
        _this.on('mouseover', function (event) {
            _this.mouseoverEvent.emit(event);
        });
        _this.on('mouseout', function (event) {
            _this.mouseoutEvent.emit(event);
        });
        _this.on('contextmenu', function (event) {
            _this.contextmenuEvent.emit(event);
        });
        _this.on('loading', function (event) {
            _this.loadingEvent.emit(event);
        });
        _this.on('tileunload', function (event) {
            _this.tileunloadEvent.emit(event);
        });
        _this.on('tileloadstart', function (event) {
            _this.tileloadstartEvent.emit(event);
        });
        _this.on('tileerror', function (event) {
            _this.tileerrorEvent.emit(event);
        });
        _this.on('tileload', function (event) {
            _this.tileloadEvent.emit(event);
        });
        _this.on('load', function (event) {
            _this.loadEvent.emit(event);
        });
        return _this;
    }
    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    TileLayerDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    /**
     * Derived method of the original setUrl method.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
     */
    TileLayerDirective.prototype.setUrl = function (url, noRedraw) {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return _super.prototype.setUrl.call(this, url, noRedraw);
    };
    Object.defineProperty(TileLayerDirective.prototype, "url", {
        get: function () {
            return this._url;
        },
        /**
         * Two-Way bound property for the URL.
         * Use it with `<yaga-tile-layer [(url)]="someValue">` or `<yaga-tile-layer [url]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-seturl Original Leaflet documentation
         */
        set: function (val) {
            this.setUrl(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original setOpacity method.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setopacity Original Leaflet documentation
     */
    TileLayerDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(TileLayerDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        /**
         * Two-Way bound property for the opacity.
         * Use it with `<yaga-tile-layer [(opacity)]="someValue">` or `<yaga-tile-layer [opacity]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setopacity Original Leaflet documentation
         */
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "display", {
        /**
         * Two-Way bound property for the display status of the layer.
         * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
         */
        get: function () {
            var pane;
            var container;
            try {
                pane = this.getPane();
                container = this.getContainer();
            }
            catch (err) {
                /* istanbul ignore next */
                return false;
            }
            /* tslint:disable:prefer-for-of */
            for (var i = 0; i < pane.children.length; i += 1) {
                /* tslint:enable */
                /* istanbul ignore else */
                if (pane.children[i] === container) {
                    return true;
                }
            }
            return false;
        },
        /**
         * Two-Way bound property for the display status of the layer.
         * Use it with `<yaga-tile-layer [(display)]="someValue">` or `<yaga-tile-layer [display]="someValue">`
         */
        set: function (val) {
            var isDisplayed = this.display;
            if (isDisplayed === val) {
                return;
            }
            var pane;
            var container;
            var map;
            var events; // Dictionary of functions
            var eventKeys;
            try {
                pane = this.getPane();
                container = this.getContainer();
                map = this._map;
                events = this.getEvents();
                eventKeys = Object.keys(events);
            }
            catch (err) {
                /* istanbul ignore next */
                return;
            }
            if (val) {
                // show layer
                pane.appendChild(container);
                for (var _i = 0, eventKeys_1 = eventKeys; _i < eventKeys_1.length; _i++) {
                    var eventKey = eventKeys_1[_i];
                    map.on(eventKey, events[eventKey], this);
                }
                this.redraw();
            }
            else {
                // hide layer
                pane.removeChild(container);
                for (var _a = 0, eventKeys_2 = eventKeys; _a < eventKeys_2.length; _a++) {
                    var eventKey = eventKeys_2[_a];
                    map.off(eventKey, events[eventKey], this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original setZIndexmethod.
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
     */
    TileLayerDirective.prototype.setZIndex = function (val) {
        _super.prototype.setZIndex.call(this, val);
        this.zIndexChange.emit(val);
        return this;
    };
    Object.defineProperty(TileLayerDirective.prototype, "zIndex", {
        get: function () {
            return this.options.zIndex;
        },
        /**
         * Two-Way bound property for the zIndex.
         * Use it with `<yaga-tile-layer [(zIndex)]="someValue">` or `<yaga-tile-layer [zIndex]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-setzindex Original Leaflet documentation
         */
        set: function (val) {
            this.setZIndex(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "tileSize", {
        get: function () {
            return this.options.tileSize;
        },
        /**
         * Input for the tileSize.
         * Use it with `<yaga-tile-layer [tileSize]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tileSize Original Leaflet documentation
         */
        set: function (val) {
            this.options.tileSize = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "updateWhenIdle", {
        get: function () {
            return this.options.updateWhenIdle;
        },
        /**
         * Input for the updateWhenIdle.
         * Use it with `<yaga-tile-layer [updateWhenIdle]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updatewhenidle Original Leaflet documentation
         */
        set: function (val) {
            this.options.updateWhenIdle = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "updateWhenZooming", {
        get: function () {
            return this.options.updateWhenZooming;
        },
        /**
         * Input for the updateWhenZooming.
         * Use it with `<yaga-tile-layer [updateWhenZooming]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updatewhenzooming Original Leaflet documentation
         */
        set: function (val) {
            this.options.updateWhenZooming = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "updateInterval", {
        get: function () {
            return this.options.updateInterval;
        },
        /**
         * Input for the updateInterval.
         * Use it with `<yaga-tile-layer [updateInterval]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-updateinterval Original Leaflet documentation
         */
        set: function (val) {
            this.options.updateInterval = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "bounds", {
        get: function () {
            return this.options.bounds;
        },
        /**
         * Input for the bounds.
         * Use it with `<yaga-tile-layer [bounds]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-bounds Original Leaflet documentation
         */
        set: function (val) {
            this.options.bounds = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "noWrap", {
        get: function () {
            return this.options.noWrap;
        },
        /**
         * Input for the noWrap.
         * Use it with `<yaga-tile-layer [noWrap]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-nowrap Original Leaflet documentation
         */
        set: function (val) {
            this.options.noWrap = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        /**
         * Input for the className.
         * Use it with `<yaga-tile-layer [className]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-classname Original Leaflet documentation
         */
        set: function (val) {
            this.options.className = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "keepBuffer", {
        get: function () {
            return this.options.keepBuffer;
        },
        /**
         * Input for the keepBuffer.
         * Use it with `<yaga-tile-layer [keepBuffer]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-keepbuffer Original Leaflet documentation
         */
        set: function (val) {
            this.options.keepBuffer = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "maxZoom", {
        get: function () {
            return this.options.maxZoom;
        },
        /**
         * Input for the maxZoom.
         * Use it with `<yaga-tile-layer [maxZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-maxzoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.maxZoom = val;
            if (this._map) {
                this._map._updateZoomLevels();
            }
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "minZoom", {
        get: function () {
            return this.options.minZoom;
        },
        /**
         * Input for the minZoom.
         * Use it with `<yaga-tile-layer [minZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-minzoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.minZoom = val;
            if (this._map) {
                this._map._updateZoomLevels();
            }
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "maxNativeZoom", {
        get: function () {
            return this.options.maxNativeZoom;
        },
        /**
         * Input for the maxNativeZoom.
         * Use it with `<yaga-tile-layer [maxNativeZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-maxnativezoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.maxNativeZoom = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "minNativeZoom", {
        get: function () {
            return this.options.minNativeZoom;
        },
        /**
         * Input for the minNativeZoom.
         * Use it with `<yaga-tile-layer [minNativeZoom]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-minnativezoom Original Leaflet documentation
         */
        set: function (val) {
            this.options.minNativeZoom = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "subdomains", {
        get: function () {
            if (typeof this.options.subdomains === 'string') {
                this.options.subdomains = this.options.subdomains.split('');
            }
            return this.options.subdomains;
        },
        /**
         * Input for the subdomains.
         * Use it with `<yaga-tile-layer [subdomains]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-subdomains Original Leaflet documentation
         */
        set: function (val) {
            this.options.subdomains = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "errorTileUrl", {
        get: function () {
            return this.options.errorTileUrl;
        },
        /**
         * Input for the errorTileUrl.
         * Use it with `<yaga-tile-layer [errorTileUrl]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-errortileurl Original Leaflet documentation
         */
        set: function (val) {
            this.options.errorTileUrl = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "zoomOffset", {
        get: function () {
            return this.options.zoomOffset;
        },
        /**
         * Input for the zoomOffset.
         * Use it with `<yaga-tile-layer [zoomOffset]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-zoomoffset Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomOffset = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "tms", {
        get: function () {
            return this.options.tms;
        },
        /**
         * Input for the tms.
         * Use it with `<yaga-tile-layer [tms]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tms Original Leaflet documentation
         */
        set: function (val) {
            this.options.tms = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "zoomReverse", {
        get: function () {
            return this.options.zoomReverse;
        },
        /**
         * Input for the zoomReverse.
         * Use it with `<yaga-tile-layer [zoomReverse]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-zoomreverse Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomReverse = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "detectRetina", {
        get: function () {
            return this.options.detectRetina;
        },
        /**
         * Input for the detectRetina.
         * Use it with `<yaga-tile-layer [detectRetina]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-detectretina Original Leaflet documentation
         */
        set: function (val) {
            this.options.detectRetina = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "crossOrigin", {
        get: function () {
            return this.options.crossOrigin;
        },
        /**
         * Input for the crossOrigin.
         * Use it with `<yaga-tile-layer [crossOrigin]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-crossorigin Original Leaflet documentation
         */
        set: function (val) {
            this.options.crossOrigin = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileLayerDirective.prototype, "attribution", {
        get: function () {
            return this.getAttribution();
        },
        /**
         * Input for the attribution.
         * Use it with `<yaga-tile-layer [attribution]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-attribution Original Leaflet documentation
         */
        set: function (val) {
            if (this._map && this._map.attributionControl) {
                this._map.attributionControl.removeAttribution(this.getAttribution());
                this._map.attributionControl.addAttribution(val);
            }
            this.options.attribution = val;
        },
        enumerable: true,
        configurable: true
    });
    TileLayerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [layer_provider_1.LayerProvider],
                    selector: 'yaga-tile-layer',
                },] },
    ];
    /** @nocollapse */
    TileLayerDirective.ctorParameters = function () { return [
        { type: layer_group_provider_1.LayerGroupProvider, },
        { type: layer_provider_1.LayerProvider, },
    ]; };
    TileLayerDirective.propDecorators = {
        'urlChange': [{ type: core_1.Output },],
        'displayChange': [{ type: core_1.Output },],
        'opacityChange': [{ type: core_1.Output },],
        'zIndexChange': [{ type: core_1.Output },],
        'addEvent': [{ type: core_1.Output, args: ['add',] },],
        'removeEvent': [{ type: core_1.Output, args: ['remove',] },],
        'popupopenEvent': [{ type: core_1.Output, args: ['popupopen',] },],
        'popupcloseEvent': [{ type: core_1.Output, args: ['popupclose',] },],
        'tooltipopenEvent': [{ type: core_1.Output, args: ['tooltipopen',] },],
        'tooltipcloseEvent': [{ type: core_1.Output, args: ['tooltipclose',] },],
        'clickEvent': [{ type: core_1.Output, args: ['click',] },],
        'dbclickEvent': [{ type: core_1.Output, args: ['dbclick',] },],
        'mousedownEvent': [{ type: core_1.Output, args: ['mousedown',] },],
        'mouseoverEvent': [{ type: core_1.Output, args: ['mouseover',] },],
        'mouseoutEvent': [{ type: core_1.Output, args: ['mouseout',] },],
        'contextmenuEvent': [{ type: core_1.Output, args: ['contextmenu',] },],
        'loadingEvent': [{ type: core_1.Output, args: ['loading',] },],
        'tileunloadEvent': [{ type: core_1.Output, args: ['tileunload',] },],
        'tileloadstartEvent': [{ type: core_1.Output, args: ['tileloadstart',] },],
        'tileerrorEvent': [{ type: core_1.Output, args: ['tileerror',] },],
        'tileloadEvent': [{ type: core_1.Output, args: ['tileload',] },],
        'loadEvent': [{ type: core_1.Output, args: ['load',] },],
        'url': [{ type: core_1.Input },],
        'opacity': [{ type: core_1.Input },],
        'display': [{ type: core_1.Input },],
        'zIndex': [{ type: core_1.Input },],
        'tileSize': [{ type: core_1.Input },],
        'updateWhenIdle': [{ type: core_1.Input },],
        'updateWhenZooming': [{ type: core_1.Input },],
        'updateInterval': [{ type: core_1.Input },],
        'bounds': [{ type: core_1.Input },],
        'noWrap': [{ type: core_1.Input },],
        'className': [{ type: core_1.Input },],
        'keepBuffer': [{ type: core_1.Input },],
        'maxZoom': [{ type: core_1.Input },],
        'minZoom': [{ type: core_1.Input },],
        'maxNativeZoom': [{ type: core_1.Input },],
        'minNativeZoom': [{ type: core_1.Input },],
        'subdomains': [{ type: core_1.Input },],
        'errorTileUrl': [{ type: core_1.Input },],
        'zoomOffset': [{ type: core_1.Input },],
        'tms': [{ type: core_1.Input },],
        'zoomReverse': [{ type: core_1.Input },],
        'detectRetina': [{ type: core_1.Input },],
        'crossOrigin': [{ type: core_1.Input },],
        'attribution': [{ type: core_1.Input },],
    };
    return TileLayerDirective;
}(leaflet_1.TileLayer));
exports.TileLayerDirective = TileLayerDirective;
//# sourceMappingURL=tile-layer.directive.js.map