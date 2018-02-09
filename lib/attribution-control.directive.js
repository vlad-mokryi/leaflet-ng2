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
var map_provider_1 = require("./map.provider");
var mouse_event_helper_1 = require("./mouse-event-helper");
/**
 * Angular2 directive for the attribution-control of Leaflet.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-attribution-control
 *         [(display)]="..."
 *         [(zIndex)]="..."
 *         [(position)]="..."
 *         [(prefix)]="..."
 *         [(attributions)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (click)="..."
 *         (dbclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         >
 *     </yaga-attribution-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-attribution Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Attribution-Control%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/attribution-control.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/attributioncontroldirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/attribution-control-directive/
 */
var AttributionControlDirective = /** @class */ (function (_super) {
    __extends(AttributionControlDirective, _super);
    function AttributionControlDirective(mapProvider) {
        var _this = _super.call(this, { prefix: consts_1.ATTRIBUTION_PREFIX }) || this;
        /**
         * Two-Way bound property for the display status of the control.
         * Use it with `<yaga-attribution-control [(display)]="someValue">`
         * or `<yaga-attribution-control (displayChange)="processEvent($event)">`
         */
        _this.displayChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the position of the control.
         * Use it with `<yaga-attribution-control [(position)]="someValue">`
         * or `<yaga-attribution-control (positionChange)="processEvent($event)">`
         */
        _this.positionChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the prefix of the control.
         * Use it with `<yaga-attribution-control [(prefix)]="someValue">`
         * or `<yaga-attribution-control (prefixChange)="processEvent($event)">`
         */
        _this.prefixChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the list of attributions of the control.
         * Use it with `<yaga-attribution-control [(attributions)]="someValue">`
         * or `<yaga-attribution-control (attributionsChange)="processEvent($event)">`
         */
        _this.attributionsChange = new core_1.EventEmitter();
        /**
         * From leaflet fired add event.
         * Use it with `<yaga-attribution-control (add)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-add Original Leaflet documentation
         */
        _this.addEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired remove event.
         * Use it with `<yaga-attribution-control (remove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-remove Original Leaflet documentation
         */
        _this.removeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired click event.
         * Use it with `<yaga-attribution-control (click)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-click Original Leaflet documentation
         */
        _this.clickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired dbclick event.
         * Use it with `<yaga-attribution-control (dbclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-dbclick Original Leaflet documentation
         */
        _this.dbclickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mousedown event.
         * Use it with `<yaga-attribution-control (mousedown)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-mousedown Original Leaflet documentation
         */
        _this.mousedownEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseover event.
         * Use it with `<yaga-attribution-control (mouseover)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-mouseover Original Leaflet documentation
         */
        _this.mouseoverEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseout event.
         * Use it with `<yaga-attribution-control (mouseout)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-mouseout Original Leaflet documentation
         */
        _this.mouseoutEvent = new core_1.EventEmitter();
        mapProvider.ref.addControl(_this);
        // Events
        _this.getContainer().addEventListener('click', function (event) {
            _this.clickEvent.emit(mouse_event_helper_1.enhanceMouseEvent(event, _this._map));
        });
        _this.getContainer().addEventListener('dbclick', function (event) {
            _this.dbclickEvent.emit(mouse_event_helper_1.enhanceMouseEvent(event, _this._map));
        });
        _this.getContainer().addEventListener('mousedown', function (event) {
            _this.mousedownEvent.emit(mouse_event_helper_1.enhanceMouseEvent(event, _this._map));
        });
        _this.getContainer().addEventListener('mouseover', function (event) {
            _this.mouseoverEvent.emit(mouse_event_helper_1.enhanceMouseEvent(event, _this._map));
        });
        _this.getContainer().addEventListener('mouseout', function (event) {
            _this.mouseoutEvent.emit(mouse_event_helper_1.enhanceMouseEvent(event, _this._map));
        });
        return _this;
    }
    /**
     * Internal method to provide the removal of the control in Leaflet, when removing it from the Angular template
     */
    AttributionControlDirective.prototype.ngOnDestroy = function () {
        this._map.removeControl(this);
    };
    /**
     * Derived remove function
     */
    AttributionControlDirective.prototype.remove = function () {
        /* tslint:disable */
        _super.prototype.remove.call(this);
        this.displayChange.emit(false);
        this.removeEvent.emit({ target: this, type: 'remove' });
        return this;
    };
    /**
     * Derived addTo function
     */
    AttributionControlDirective.prototype.addTo = function (map) {
        /* tslint:disable */
        _super.prototype.addTo.call(this, map);
        this.displayChange.emit(true);
        this.addEvent.emit({ target: this, type: 'add' });
        return this;
    };
    /**
     * Derived method of the original setPosition.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-setposition Original Leaflet documentation
     */
    AttributionControlDirective.prototype.setPosition = function (val) {
        _super.prototype.setPosition.call(this, val);
        this.positionChange.emit(val);
        return this;
    };
    Object.defineProperty(AttributionControlDirective.prototype, "opacity", {
        get: function () {
            return parseFloat(this.getContainer().style.opacity);
        },
        /**
         * Two-Way bound property for the opacity.
         * Use it with `<yaga-attribution-control [(opacity)]="someValue">`
         * or `<yaga-attribution-control [opacity]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-opacity Original Leaflet documentation
         */
        set: function (val) {
            this.getContainer().style.opacity = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributionControlDirective.prototype, "display", {
        get: function () {
            return !!(this._map && this.getContainer().style.display !== 'none');
        },
        /**
         * Two-Way bound property for the display state.
         * Use it with `<yaga-attribution-control [(display)]="someValue">`
         * or `<yaga-attribution-control [display]="someValue">`
         */
        set: function (val) {
            if (!this._map) {
                // No map available...
                return;
            }
            if (val) {
                this.getContainer().style.display = '';
                return;
            }
            this.getContainer().style.display = 'none';
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributionControlDirective.prototype, "position", {
        get: function () {
            return this.getPosition();
        },
        /**
         * Two-Way bound property for the position.
         * Use it with `<yaga-attribution-control [(position)]="someValue">`
         * or `<yaga-attribution-control [position]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-position Original Leaflet documentation
         */
        set: function (val) {
            this.setPosition(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AttributionControlDirective.prototype, "zIndex", {
        get: function () {
            return parseInt(this.getContainer().style.zIndex, 10);
        },
        /**
         * Input for the zIndex of the control.
         * Use it with `<yaga-attribution-control [zIndex]="someValue">`
         */
        set: function (zIndex) {
            if (!zIndex) {
                zIndex = 0;
            }
            this.getContainer().style.zIndex = zIndex.toString();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original setPrefix.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-setprefix Original Leaflet documentation
     */
    AttributionControlDirective.prototype.setPrefix = function (prefix) {
        _super.prototype.setPrefix.call(this, prefix);
        this.prefixChange.emit(prefix);
        return this;
    };
    Object.defineProperty(AttributionControlDirective.prototype, "prefix", {
        get: function () {
            return this.options.prefix;
        },
        /**
         * Two-Way bound property for the prefix.
         * Use it with `<yaga-attribution-control [(prefix)]="someValue">`
         * or `<yaga-attribution-control [prefix]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-prefix Original Leaflet documentation
         */
        set: function (val) {
            this.setPrefix(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Derived method of the original addAttribution.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-addattribution Original Leaflet documentation
     */
    AttributionControlDirective.prototype.addAttribution = function (val) {
        _super.prototype.addAttribution.call(this, val);
        this.attributionsChange.emit(this.attributions);
        return this;
    };
    /**
     * Derived method of the original removeAttribution.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-removeattribution
     * Original Leaflet documentation
     */
    AttributionControlDirective.prototype.removeAttribution = function (val) {
        _super.prototype.removeAttribution.call(this, val);
        this.attributionsChange.emit(this.attributions);
        return this;
    };
    Object.defineProperty(AttributionControlDirective.prototype, "attributions", {
        get: function () {
            var keys = Object.keys(this._attributions);
            var arr = [];
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (this._attributions[key] === 1) {
                    arr.push(key);
                }
            }
            return arr;
        },
        /**
         * Two-Way bound property for the attributions.
         * Use it with `<yaga-attribution-control [(attributions)]="someValue">`
         * or `<yaga-attribution-control [attributions]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-attributions Original Leaflet documentation
         */
        set: function (val) {
            this.removeAllAttributions(true);
            for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                var attr = val_1[_i];
                _super.prototype.addAttribution.call(this, attr);
            }
            this.attributionsChange.emit(this.attributions);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Self written method to provide the removal of all attributions in a single step
     */
    AttributionControlDirective.prototype.removeAllAttributions = function (silent) {
        var keys = Object.keys(this._attributions);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            _super.prototype.removeAttribution.call(this, key);
        }
        if (silent) {
            return this;
        }
        this.attributionsChange.emit([]);
        return this;
    };
    AttributionControlDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-attribution-control',
                },] },
    ];
    /** @nocollapse */
    AttributionControlDirective.ctorParameters = function () { return [
        { type: map_provider_1.MapProvider, },
    ]; };
    AttributionControlDirective.propDecorators = {
        'displayChange': [{ type: core_1.Output },],
        'positionChange': [{ type: core_1.Output },],
        'prefixChange': [{ type: core_1.Output },],
        'attributionsChange': [{ type: core_1.Output },],
        'addEvent': [{ type: core_1.Output, args: ['add',] },],
        'removeEvent': [{ type: core_1.Output, args: ['remove',] },],
        'clickEvent': [{ type: core_1.Output, args: ['click',] },],
        'dbclickEvent': [{ type: core_1.Output, args: ['dbclick',] },],
        'mousedownEvent': [{ type: core_1.Output, args: ['mousedown',] },],
        'mouseoverEvent': [{ type: core_1.Output, args: ['mouseover',] },],
        'mouseoutEvent': [{ type: core_1.Output, args: ['mouseout',] },],
        'opacity': [{ type: core_1.Input },],
        'display': [{ type: core_1.Input },],
        'position': [{ type: core_1.Input },],
        'zIndex': [{ type: core_1.Input },],
        'prefix': [{ type: core_1.Input },],
        'attributions': [{ type: core_1.Input },],
    };
    return AttributionControlDirective;
}(leaflet_1.Control.Attribution));
exports.AttributionControlDirective = AttributionControlDirective;
//# sourceMappingURL=attribution-control.directive.js.map