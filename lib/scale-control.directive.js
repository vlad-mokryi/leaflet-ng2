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
 *     <yaga-scale-control
 *         [(display)]="..."
 *         [(zIndex)]="..."
 *         [(position)]="..."
 *
 *         [metric]="..."
 *         [imperial]="..."
 *         [maxWidth]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (click)="..."
 *         (dbclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         >
 *     </yaga-scale-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-scale Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Scale-Control%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/attribution-control.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/scalecontroldirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/scale-control-directive/
 */
var ScaleControlDirective = /** @class */ (function (_super) {
    __extends(ScaleControlDirective, _super);
    function ScaleControlDirective(mapProvider) {
        var _this = _super.call(this) || this;
        /**
         * Two-Way bound property for the display status of the control.
         * Use it with `<yaga-scale-control [(display)]="someValue">`
         * or `<yaga-scale-control (displayChange)="processEvent($event)">`
         */
        _this.displayChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the zIndex of the control.
         * Use it with `<yaga-scale-control [(zIndex)]="someValue">`
         * or `<yaga-scale-control (zIndexChange)="processEvent($event)">`
         */
        _this.zIndexChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the position of the control.
         * Use it with `<yaga-scale-control [(position)]="someValue">`
         * or `<yaga-scale-control (positionChange)="processEvent($event)">`
         */
        _this.positionChange = new core_1.EventEmitter();
        /**
         * From leaflet fired add event.
         * Use it with `<yaga-scale-control (add)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-add Original Leaflet documentation
         */
        _this.addEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired remove event.
         * Use it with `<yaga-scale-control (remove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-remove Original Leaflet documentation
         */
        _this.removeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired click event.
         * Use it with `<yaga-scale-control (click)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-click Original Leaflet documentation
         */
        _this.clickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired dbclick event.
         * Use it with `<yaga-scale-control (dbclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-dbclick Original Leaflet documentation
         */
        _this.dbclickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mousedown event.
         * Use it with `<yaga-scale-control (mousedown)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mousedown Original Leaflet documentation
         */
        _this.mousedownEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseover event.
         * Use it with `<yaga-scale-control (mouseover)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mouseover Original Leaflet documentation
         */
        _this.mouseoverEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseout event.
         * Use it with `<yaga-scale-control (mouseout)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mouseout Original Leaflet documentation
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
    ScaleControlDirective.prototype.ngOnDestroy = function () {
        this._map.removeControl(this);
    };
    /**
     * Derived remove function
     */
    ScaleControlDirective.prototype.remove = function () {
        /* tslint:disable */
        _super.prototype.remove.call(this);
        this.displayChange.emit(false);
        this.removeEvent.emit({ target: this, type: 'remove' });
        return this;
    };
    /**
     * Derived addTo function
     */
    ScaleControlDirective.prototype.addTo = function (map) {
        /* tslint:disable */
        _super.prototype.addTo.call(this, map);
        this.displayChange.emit(true);
        this.addEvent.emit({ target: this, type: 'add' });
        return this;
    };
    /**
     * Derived method of the original setPosition.
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-setposition Original Leaflet documentation
     */
    ScaleControlDirective.prototype.setPosition = function (val) {
        _super.prototype.setPosition.call(this, val);
        this.positionChange.emit(val);
        return this;
    };
    Object.defineProperty(ScaleControlDirective.prototype, "opacity", {
        get: function () {
            return parseFloat(this.getContainer().style.opacity);
        },
        /**
         * Two-Way bound property for the opacity.
         * Use it with `<yaga-scale-control [(opacity)]="someValue">`
         * or `<yaga-scale-control [opacity]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-opacity Original Leaflet documentation
         */
        set: function (val) {
            this.getContainer().style.opacity = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "display", {
        get: function () {
            return !!(this._map && this.getContainer().style.display !== 'none');
        },
        /**
         * Two-Way bound property for the display state.
         * Use it with `<yaga-scale-control [(display)]="someValue">`
         * or `<yaga-scale-control [display]="someValue">`
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
    Object.defineProperty(ScaleControlDirective.prototype, "position", {
        get: function () {
            return this.getPosition();
        },
        /**
         * Two-Way bound property for the position.
         * Use it with `<yaga-scale-control [(position)]="someValue">`
         * or `<yaga-scale-control [position]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-position Original Leaflet documentation
         */
        set: function (val) {
            this.setPosition(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "zIndex", {
        get: function () {
            return parseInt(this.getContainer().style.zIndex, 10);
        },
        /**
         * Two-Way bound property for the zIndex of the control.
         * Use it with `<yaga-scale-control [(zIndex)]="someValue">`
         * or `<yaga-scale-control (zIndexChange)="processEvent($event)">`
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
    Object.defineProperty(ScaleControlDirective.prototype, "maxWidth", {
        get: function () {
            return this.options.maxWidth;
        },
        /**
         * Input for scale max-width.
         * Use it with `<yaga-scale-control [(maxWidth)]="someValue">`
         * or `<yaga-scale-control [maxWidth]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-maxwidth Original Leaflet documentation
         */
        set: function (val) {
            this.options.maxWidth = val;
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "metric", {
        get: function () {
            return this.options.metric;
        },
        /**
         * Input for state of metric-scale state.
         * Use it with `<yaga-scale-control [(metric)]="someValue">`
         * or `<yaga-scale-control [metric]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-metric Original Leaflet documentation
         */
        set: function (val) {
            while (this.getContainer().hasChildNodes()) {
                this.getContainer().removeChild(this.getContainer().lastChild);
            }
            this.options.metric = val;
            this._addScales(this.options, 'leaflet-control-scale-line', this.getContainer());
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleControlDirective.prototype, "imperial", {
        get: function () {
            return this.options.imperial;
        },
        /**
         * Input for state of imperial-scale state.
         * Use it with `<yaga-scale-control [(imperial)]="someValue">`
         * or `<yaga-scale-control [imperial]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-scale-imperial Original Leaflet documentation
         */
        set: function (val) {
            while (this.getContainer().hasChildNodes()) {
                this.getContainer().removeChild(this.getContainer().lastChild);
            }
            this.options.imperial = val;
            this._addScales(this.options, 'leaflet-control-scale-line', this.getContainer());
            this._update();
        },
        enumerable: true,
        configurable: true
    });
    ScaleControlDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-scale-control',
                },] },
    ];
    /** @nocollapse */
    ScaleControlDirective.ctorParameters = function () { return [
        { type: map_provider_1.MapProvider, },
    ]; };
    ScaleControlDirective.propDecorators = {
        'displayChange': [{ type: core_1.Output },],
        'zIndexChange': [{ type: core_1.Output },],
        'positionChange': [{ type: core_1.Output },],
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
        'maxWidth': [{ type: core_1.Input },],
        'metric': [{ type: core_1.Input },],
        'imperial': [{ type: core_1.Input },],
    };
    return ScaleControlDirective;
}(leaflet_1.Control.Scale));
exports.ScaleControlDirective = ScaleControlDirective;
//# sourceMappingURL=scale-control.directive.js.map