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
var ImageOverlayDirective = /** @class */ (function (_super) {
    __extends(ImageOverlayDirective, _super);
    function ImageOverlayDirective(layerGroupProvider, layerProvider) {
        var _this = 
        // Transparent 1px image:
        _super.call(this, consts_1.TRANSPARENT_PIXEL, [[0, 0], [1, 1]], {}) || this;
        _this.urlChange = new core_1.EventEmitter();
        _this.displayChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        // maybe implement -> @Output() public zIndexChange: EventEmitter<number> = new EventEmitter();
        _this.boundsChange = new core_1.EventEmitter();
        _this.northChange = new core_1.EventEmitter();
        _this.eastChange = new core_1.EventEmitter();
        _this.southChange = new core_1.EventEmitter();
        _this.westChange = new core_1.EventEmitter();
        _this.addEvent = new core_1.EventEmitter();
        _this.removeEvent = new core_1.EventEmitter();
        _this.popupopenEvent = new core_1.EventEmitter();
        _this.popupcloseEvent = new core_1.EventEmitter();
        _this.tooltipopenEvent = new core_1.EventEmitter();
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        _this.clickEvent = new core_1.EventEmitter();
        _this.dbclickEvent = new core_1.EventEmitter();
        _this.mousedownEvent = new core_1.EventEmitter();
        _this.mouseoverEvent = new core_1.EventEmitter();
        _this.mouseoutEvent = new core_1.EventEmitter();
        _this.contextmenuEvent = new core_1.EventEmitter();
        layerProvider.ref = _this;
        _this.on('remove', function () {
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        layerGroupProvider.ref.addLayer(_this);
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
        return _this;
    }
    ImageOverlayDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    ImageOverlayDirective.prototype.setUrl = function (url) {
        if (this.url === url) {
            return;
        }
        this.urlChange.emit(url);
        return _super.prototype.setUrl.call(this, url);
    };
    Object.defineProperty(ImageOverlayDirective.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (val) {
            this.setUrl(val);
        },
        enumerable: true,
        configurable: true
    });
    ImageOverlayDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(ImageOverlayDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "display", {
        get: function () {
            var pane;
            var container;
            try {
                pane = this.getPane();
                container = this.getElement();
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
                container = this.getElement();
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
    ImageOverlayDirective.prototype.setBounds = function (val) {
        _super.prototype.setBounds.call(this, leaflet_1.latLngBounds(val));
        this.boundsChange.emit(this.bounds);
        this.northChange.emit(this.north);
        this.eastChange.emit(this.east);
        this.southChange.emit(this.south);
        this.westChange.emit(this.west);
        return this;
    };
    Object.defineProperty(ImageOverlayDirective.prototype, "bounds", {
        get: function () {
            return this.getBounds();
        },
        set: function (val) {
            this.setBounds(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "north", {
        get: function () {
            return this.getBounds().getNorth();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            // super because we call the change listeners ourselves
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [oldBounds.getSouth(), oldBounds.getWest()],
                [val, oldBounds.getEast()],
            ]));
            this.boundsChange.emit(this.bounds);
            this.northChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "east", {
        get: function () {
            return this.getBounds().getEast();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [oldBounds.getSouth(), oldBounds.getWest()],
                [oldBounds.getNorth(), val],
            ]));
            this.boundsChange.emit(this.bounds);
            this.eastChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "south", {
        get: function () {
            return this.getBounds().getSouth();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [val, oldBounds.getWest()],
                [oldBounds.getNorth(), oldBounds.getEast()],
            ]));
            this.boundsChange.emit(this.bounds);
            this.southChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "west", {
        get: function () {
            return this.getBounds().getWest();
        },
        set: function (val) {
            var oldBounds = this.getBounds();
            _super.prototype.setBounds.call(this, leaflet_1.latLngBounds([
                [oldBounds.getSouth(), val],
                [oldBounds.getNorth(), oldBounds.getEast()],
            ]));
            this.boundsChange.emit(this.bounds);
            this.westChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "crossOrigin", {
        get: function () {
            return this.options.crossOrigin;
        },
        set: function (val) {
            this.options.crossOrigin = val;
            this.getElement().crossOrigin = val ? '' : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "alt", {
        get: function () {
            return this.getElement().getAttribute('alt');
        },
        set: function (val) {
            this.options.alt = val;
            this.getElement().alt = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "interactive", {
        get: function () {
            return this.options.interactive;
        },
        set: function (val) {
            this.options.interactive = val;
            this.onRemove(this._map);
            this.onAdd(this._map);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageOverlayDirective.prototype, "attribution", {
        get: function () {
            return this.getAttribution();
        },
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
    ImageOverlayDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [layer_provider_1.LayerProvider],
                    selector: 'yaga-image-overlay',
                },] },
    ];
    /** @nocollapse */
    ImageOverlayDirective.ctorParameters = function () { return [
        { type: layer_group_provider_1.LayerGroupProvider, },
        { type: layer_provider_1.LayerProvider, },
    ]; };
    ImageOverlayDirective.propDecorators = {
        'urlChange': [{ type: core_1.Output },],
        'displayChange': [{ type: core_1.Output },],
        'opacityChange': [{ type: core_1.Output },],
        'boundsChange': [{ type: core_1.Output },],
        'northChange': [{ type: core_1.Output },],
        'eastChange': [{ type: core_1.Output },],
        'southChange': [{ type: core_1.Output },],
        'westChange': [{ type: core_1.Output },],
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
        'url': [{ type: core_1.Input },],
        'opacity': [{ type: core_1.Input },],
        'display': [{ type: core_1.Input },],
        'bounds': [{ type: core_1.Input },],
        'north': [{ type: core_1.Input },],
        'east': [{ type: core_1.Input },],
        'south': [{ type: core_1.Input },],
        'west': [{ type: core_1.Input },],
        'crossOrigin': [{ type: core_1.Input },],
        'alt': [{ type: core_1.Input },],
        'interactive': [{ type: core_1.Input },],
        'attribution': [{ type: core_1.Input },],
    };
    return ImageOverlayDirective;
}(leaflet_1.ImageOverlay));
exports.ImageOverlayDirective = ImageOverlayDirective;
//# sourceMappingURL=image-overlay.directive.js.map