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
var layer_group_provider_1 = require("./layer-group.provider");
var lng2lat_1 = require("./lng2lat");
var RectangleDirective = /** @class */ (function (_super) {
    __extends(RectangleDirective, _super);
    function RectangleDirective(layerGroupProvider) {
        var _this = _super.call(this, leaflet_1.latLngBounds([0, 0], [0, 0])) || this;
        _this.displayChange = new core_1.EventEmitter();
        _this.strokeChange = new core_1.EventEmitter();
        _this.colorChange = new core_1.EventEmitter();
        _this.weightChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        _this.lineCapChange = new core_1.EventEmitter();
        _this.lineJoinChange = new core_1.EventEmitter();
        _this.dashArrayChange = new core_1.EventEmitter();
        _this.dashOffsetChange = new core_1.EventEmitter();
        _this.fillChange = new core_1.EventEmitter();
        _this.fillColorChange = new core_1.EventEmitter();
        _this.fillOpacityChange = new core_1.EventEmitter();
        _this.fillRuleChange = new core_1.EventEmitter();
        // @Output() public rendererChange: EventEmitter<number> = new EventEmitter();
        _this.classNameChange = new core_1.EventEmitter();
        _this.styleChange = new core_1.EventEmitter();
        _this.latLngsChange = new core_1.EventEmitter();
        _this.boundsChange = new core_1.EventEmitter();
        _this.northChange = new core_1.EventEmitter();
        _this.eastChange = new core_1.EventEmitter();
        _this.southChange = new core_1.EventEmitter();
        _this.westChange = new core_1.EventEmitter();
        /* tslint:disable:max-line-length */
        _this.geoJSONChange = new core_1.EventEmitter();
        /* tslint:enable */
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
        _this.initialized = false;
        _this.feature = _this.feature || { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [] } };
        _this.feature.properties = _this.feature.properties || {};
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
    RectangleDirective.prototype.ngAfterContentInit = function () {
        this.initialized = true;
    };
    RectangleDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    RectangleDirective.prototype.setBounds = function (val) {
        _super.prototype.setBounds.call(this, val);
        if (!this.initialized) {
            return this;
        }
        this.boundsChange.emit(this.getBounds());
        this.northChange.emit(this.getBounds().getNorth());
        this.eastChange.emit(this.getBounds().getEast());
        this.southChange.emit(this.getBounds().getSouth());
        this.westChange.emit(this.getBounds().getWest());
        return this;
    };
    Object.defineProperty(RectangleDirective.prototype, "bounds", {
        get: function () {
            return this.getBounds();
        },
        set: function (val) {
            this.setBounds(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "north", {
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
    Object.defineProperty(RectangleDirective.prototype, "east", {
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
    Object.defineProperty(RectangleDirective.prototype, "south", {
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
    Object.defineProperty(RectangleDirective.prototype, "west", {
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
    RectangleDirective.prototype.setLatLngs = function (val) {
        _super.prototype.setLatLngs.call(this, val);
        this.latLngsChange.emit(this._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    };
    RectangleDirective.prototype.addLatLng = function (val) {
        _super.prototype.addLatLng.call(this, val);
        this.latLngsChange.emit(this._latlngs);
        this.geoJSONChange.emit(this.geoJSON);
        return this;
    };
    Object.defineProperty(RectangleDirective.prototype, "latLngs", {
        get: function () {
            return this._latlngs;
        },
        set: function (val) {
            this.setLatLngs(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "geoJSON", {
        get: function () {
            return this.toGeoJSON();
        },
        set: function (val) {
            this.feature.properties = val.properties;
            var geomType = val.geometry.type; // Normally '(Multi)Polygon'
            /* istanbul ignore if */
            if (geomType !== 'Polygon' && geomType !== 'MultiPolygon') {
                throw new Error('Unsupported geometry type: ' + geomType);
            }
            this.setLatLngs(lng2lat_1.lng2lat(val.geometry.coordinates));
        },
        enumerable: true,
        configurable: true
    });
    RectangleDirective.prototype.setStyle = function (style) {
        _super.prototype.setStyle.call(this, style);
        if (style.hasOwnProperty('stroke')) {
            this.strokeChange.emit(style.stroke);
        }
        if (style.hasOwnProperty('color')) {
            this.colorChange.emit(style.color);
        }
        if (style.hasOwnProperty('weight')) {
            this.weightChange.emit(style.weight);
        }
        if (style.hasOwnProperty('opacity')) {
            this.opacityChange.emit(style.opacity);
        }
        if (style.hasOwnProperty('lineCap')) {
            this.lineCapChange.emit(style.lineCap);
        }
        if (style.hasOwnProperty('lineJoin')) {
            this.lineJoinChange.emit(style.lineJoin);
        }
        if (style.hasOwnProperty('dashArray')) {
            this.dashArrayChange.emit(style.dashArray);
        }
        if (style.hasOwnProperty('dashOffset')) {
            this.dashOffsetChange.emit(style.dashOffset);
        }
        if (style.hasOwnProperty('fill')) {
            this.fillChange.emit(style.fill);
        }
        if (style.hasOwnProperty('fillColor')) {
            this.fillColorChange.emit(style.fillColor);
        }
        if (style.hasOwnProperty('fillOpacity')) {
            this.fillOpacityChange.emit(style.fillOpacity);
        }
        if (style.hasOwnProperty('fillRule')) {
            this.fillRuleChange.emit(style.fillRule);
        }
        if (style.hasOwnProperty('className')) {
            this.classNameChange.emit(style.className);
        }
        this.styleChange.emit(style);
        return this;
    };
    Object.defineProperty(RectangleDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setStyle({ opacity: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "stroke", {
        get: function () {
            return this.options.stroke;
        },
        set: function (val) {
            this.setStyle({ stroke: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "color", {
        get: function () {
            return this.options.color;
        },
        set: function (val) {
            this.setStyle({ color: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "weight", {
        get: function () {
            return this.options.weight;
        },
        set: function (val) {
            this.setStyle({ weight: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "lineCap", {
        get: function () {
            return this.options.lineCap;
        },
        set: function (val) {
            this.setStyle({ lineCap: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "lineJoin", {
        get: function () {
            return this.options.lineJoin;
        },
        set: function (val) {
            this.setStyle({ lineJoin: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "dashArray", {
        get: function () {
            return this.options.dashArray;
        },
        set: function (val) {
            this.setStyle({ dashArray: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "dashOffset", {
        get: function () {
            return this.options.dashOffset;
        },
        set: function (val) {
            this.setStyle({ dashOffset: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fill", {
        get: function () {
            return this.options.fill;
        },
        set: function (val) {
            this.setStyle({ fill: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fillColor", {
        get: function () {
            return this.options.fillColor;
        },
        set: function (val) {
            this.setStyle({ fillColor: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fillOpacity", {
        get: function () {
            return this.options.fillOpacity;
        },
        set: function (val) {
            this.setStyle({ fillOpacity: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "fillRule", {
        get: function () {
            return this.options.fillRule;
        },
        set: function (val) {
            this.setStyle({ fillRule: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        set: function (val) {
            this.setStyle({ className: val });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "style", {
        get: function () {
            return this.options;
        },
        set: function (val) {
            this.setStyle(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "display", {
        get: function () {
            var container;
            try {
                container = this.getElement();
            }
            catch (err) {
                /* istanbul ignore next */
                return false;
            }
            return container.style.display !== 'none' && !!container.parentElement;
        },
        set: function (val) {
            var isDisplayed = this.display;
            if (isDisplayed === val) {
                return;
            }
            var container;
            try {
                container = this.getElement();
            }
            catch (err) {
                /* istanbul ignore next */
                return;
            }
            this.displayChange.emit(val);
            container.style.display = val ? '' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "interactive", {
        get: function () {
            return this.options.interactive;
        },
        set: function (val) {
            var map = this._map;
            this.options.interactive = val;
            this.onRemove(map);
            this.onAdd(map);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "smoothFactor", {
        get: function () {
            return this.options.smoothFactor;
        },
        set: function (val) {
            this.options.smoothFactor = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "noClip", {
        get: function () {
            return this.options.noClip;
        },
        set: function (val) {
            this.options.noClip = val;
            this.redraw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RectangleDirective.prototype, "properties", {
        get: function () {
            return this.feature.properties;
        },
        set: function (val) {
            this.feature.properties = val;
            this.geoJSONChange.emit(this.geoJSON);
        },
        enumerable: true,
        configurable: true
    });
    RectangleDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-rectangle',
                },] },
    ];
    /** @nocollapse */
    RectangleDirective.ctorParameters = function () { return [
        { type: layer_group_provider_1.LayerGroupProvider, },
    ]; };
    RectangleDirective.propDecorators = {
        'displayChange': [{ type: core_1.Output },],
        'strokeChange': [{ type: core_1.Output },],
        'colorChange': [{ type: core_1.Output },],
        'weightChange': [{ type: core_1.Output },],
        'opacityChange': [{ type: core_1.Output },],
        'lineCapChange': [{ type: core_1.Output },],
        'lineJoinChange': [{ type: core_1.Output },],
        'dashArrayChange': [{ type: core_1.Output },],
        'dashOffsetChange': [{ type: core_1.Output },],
        'fillChange': [{ type: core_1.Output },],
        'fillColorChange': [{ type: core_1.Output },],
        'fillOpacityChange': [{ type: core_1.Output },],
        'fillRuleChange': [{ type: core_1.Output },],
        'classNameChange': [{ type: core_1.Output },],
        'styleChange': [{ type: core_1.Output },],
        'latLngsChange': [{ type: core_1.Output },],
        'boundsChange': [{ type: core_1.Output },],
        'northChange': [{ type: core_1.Output },],
        'eastChange': [{ type: core_1.Output },],
        'southChange': [{ type: core_1.Output },],
        'westChange': [{ type: core_1.Output },],
        'geoJSONChange': [{ type: core_1.Output },],
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
        'bounds': [{ type: core_1.Input },],
        'north': [{ type: core_1.Input },],
        'east': [{ type: core_1.Input },],
        'south': [{ type: core_1.Input },],
        'west': [{ type: core_1.Input },],
        'latLngs': [{ type: core_1.Input },],
        'geoJSON': [{ type: core_1.Input },],
        'opacity': [{ type: core_1.Input },],
        'stroke': [{ type: core_1.Input },],
        'color': [{ type: core_1.Input },],
        'weight': [{ type: core_1.Input },],
        'lineCap': [{ type: core_1.Input },],
        'lineJoin': [{ type: core_1.Input },],
        'dashArray': [{ type: core_1.Input },],
        'dashOffset': [{ type: core_1.Input },],
        'fill': [{ type: core_1.Input },],
        'fillColor': [{ type: core_1.Input },],
        'fillOpacity': [{ type: core_1.Input },],
        'fillRule': [{ type: core_1.Input },],
        'className': [{ type: core_1.Input },],
        'style': [{ type: core_1.Input },],
        'display': [{ type: core_1.Input },],
        'interactive': [{ type: core_1.Input },],
        'smoothFactor': [{ type: core_1.Input },],
        'noClip': [{ type: core_1.Input },],
        'properties': [{ type: core_1.Input },],
    };
    return RectangleDirective;
}(leaflet_1.Rectangle));
exports.RectangleDirective = RectangleDirective;
//# sourceMappingURL=rectangle.directive.js.map