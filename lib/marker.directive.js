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
var layer_provider_1 = require("./layer.provider");
var marker_provider_1 = require("./marker.provider");
var MarkerDirective = /** @class */ (function (_super) {
    __extends(MarkerDirective, _super);
    function MarkerDirective(layerGroupProvider, layerProvider, markerProvider) {
        var _this = _super.call(this, [0, 0]) || this;
        _this.positionChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        _this.displayChange = new core_1.EventEmitter();
        _this.zindexChange = new core_1.EventEmitter();
        _this.draggableChange = new core_1.EventEmitter();
        _this.iconChange = new core_1.EventEmitter();
        _this.tooltipOpenedChange = new core_1.EventEmitter();
        _this.popupOpenedChange = new core_1.EventEmitter();
        _this.dragendEvent = new core_1.EventEmitter();
        _this.dragstartEvent = new core_1.EventEmitter();
        _this.movestartEvent = new core_1.EventEmitter();
        _this.dragEvent = new core_1.EventEmitter();
        _this.moveendEvent = new core_1.EventEmitter();
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
        layerProvider.ref = _this;
        markerProvider.ref = _this;
        layerGroupProvider.ref.addLayer(_this);
        _this.on('remove', function () {
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        _this.on('drag', function (event) {
            _this.latChange.emit(_this.getLatLng().lat);
            _this.lngChange.emit(_this.getLatLng().lng);
            _this.positionChange.emit(_this.getLatLng());
        });
        // Events
        _this.on('dragend', function (event) {
            _this.dragendEvent.emit(event);
        });
        _this.on('dragstart', function (event) {
            _this.dragstartEvent.emit(event);
        });
        _this.on('movestart', function (event) {
            _this.movestartEvent.emit(event);
        });
        _this.on('drag', function (event) {
            _this.dragEvent.emit(event);
        });
        _this.on('moveend', function (event) {
            _this.moveendEvent.emit(event);
        });
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
        var oldDraggingEnable = _this.dragging.enable;
        var oldDraggingDisable = _this.dragging.disable;
        _this.dragging.enable = function () {
            var val = oldDraggingEnable.call(_this.dragging);
            _this.draggableChange.emit(true);
            return val;
        };
        _this.dragging.disable = function () {
            var val = oldDraggingDisable.call(_this.dragging);
            _this.draggableChange.emit(false);
            return val;
        };
        return _this;
    }
    MarkerDirective.prototype.ngAfterContentInit = function () {
        this.initialized = true; // Otherwise lng gets overwritten to 0
    };
    MarkerDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    Object.defineProperty(MarkerDirective.prototype, "display", {
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
    MarkerDirective.prototype.setLatLng = function (val) {
        _super.prototype.setLatLng.call(this, val);
        if (this.initialized) {
            this.positionChange.emit(this.getLatLng());
            this.latChange.emit(this.getLatLng().lat);
            this.lngChange.emit(this.getLatLng().lng);
        }
        return this;
    };
    Object.defineProperty(MarkerDirective.prototype, "position", {
        get: function () {
            return this.getLatLng();
        },
        set: function (val) {
            this.setLatLng(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "lat", {
        get: function () {
            return this.getLatLng().lat;
        },
        set: function (val) {
            this.setLatLng([val, this.lng]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "lng", {
        get: function () {
            return this.getLatLng().lng;
        },
        set: function (val) {
            this.setLatLng([this.lat, val]);
        },
        enumerable: true,
        configurable: true
    });
    MarkerDirective.prototype.setOpacity = function (val) {
        if (this.opacity === val) {
            return;
        }
        this.opacityChange.emit(val);
        return _super.prototype.setOpacity.call(this, val);
    };
    Object.defineProperty(MarkerDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    MarkerDirective.prototype.setIcon = function (val) {
        _super.prototype.setIcon.call(this, val);
        this.iconChange.emit(val);
        return this;
    };
    Object.defineProperty(MarkerDirective.prototype, "icon", {
        get: function () {
            return this.options.icon;
        },
        set: function (val) {
            this.setIcon(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "draggable", {
        get: function () {
            return this.dragging.enabled();
        },
        set: function (val) {
            if (val) {
                this.dragging.enable();
                return;
            }
            this.dragging.disable();
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "title", {
        get: function () {
            return this.getElement().getAttribute('title');
        },
        set: function (val) {
            this.options.title = val;
            this.getElement().setAttribute('title', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerDirective.prototype, "alt", {
        get: function () {
            return this.getElement().getAttribute('alt');
        },
        set: function (val) {
            this.options.alt = val;
            this.getElement().setAttribute('alt', val);
        },
        enumerable: true,
        configurable: true
    });
    MarkerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [layer_provider_1.LayerProvider, marker_provider_1.MarkerProvider],
                    selector: 'yaga-marker',
                },] },
    ];
    /** @nocollapse */
    MarkerDirective.ctorParameters = function () { return [
        { type: layer_group_provider_1.LayerGroupProvider, },
        { type: layer_provider_1.LayerProvider, },
        { type: marker_provider_1.MarkerProvider, },
    ]; };
    MarkerDirective.propDecorators = {
        'positionChange': [{ type: core_1.Output },],
        'latChange': [{ type: core_1.Output },],
        'lngChange': [{ type: core_1.Output },],
        'opacityChange': [{ type: core_1.Output },],
        'displayChange': [{ type: core_1.Output },],
        'zindexChange': [{ type: core_1.Output },],
        'draggableChange': [{ type: core_1.Output },],
        'iconChange': [{ type: core_1.Output },],
        'tooltipOpenedChange': [{ type: core_1.Output },],
        'popupOpenedChange': [{ type: core_1.Output },],
        'dragendEvent': [{ type: core_1.Output, args: ['dragend',] },],
        'dragstartEvent': [{ type: core_1.Output, args: ['dragstart',] },],
        'movestartEvent': [{ type: core_1.Output, args: ['movestart',] },],
        'dragEvent': [{ type: core_1.Output, args: ['drag',] },],
        'moveendEvent': [{ type: core_1.Output, args: ['moveend',] },],
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
        'display': [{ type: core_1.Input },],
        'position': [{ type: core_1.Input },],
        'lat': [{ type: core_1.Input },],
        'lng': [{ type: core_1.Input },],
        'opacity': [{ type: core_1.Input },],
        'icon': [{ type: core_1.Input },],
        'draggable': [{ type: core_1.Input },],
        'title': [{ type: core_1.Input },],
        'alt': [{ type: core_1.Input },],
    };
    return MarkerDirective;
}(leaflet_1.Marker));
exports.MarkerDirective = MarkerDirective;
//# sourceMappingURL=marker.directive.js.map