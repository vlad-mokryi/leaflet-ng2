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
 *     <yaga-zoom-control
 *         [(display)]="..."
 *         [(zIndex)]="..."
 *         [(position)]="..."
 *
 *         [zoomInText]="..."
 *         [zoomInTitle]="..."
 *         [zoomOutText]="..."
 *         [zoomOutTitle]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (click)="..."
 *         (dbclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         >
 *     </yaga-zoom-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-zoom Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Zoom-Control%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/zoom-control.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/zoomcontroldirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/zoom-control-directive/
 */
var ZoomControlDirective = /** @class */ (function (_super) {
    __extends(ZoomControlDirective, _super);
    function ZoomControlDirective(mapProvider) {
        var _this = _super.call(this) || this;
        /**
         * Two-Way bound property for the display status of the control.
         * Use it with `<yaga-zoom-control [(display)]="someValue">`
         * or `<yaga-zoom-control (displayChange)="processEvent($event)">`
         */
        _this.displayChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the zIndex of the control.
         * Use it with `<yaga-zoom-control [(zIndex)]="someValue">`
         * or `<yaga-zoom-control (zIndexChange)="processEvent($event)">`
         */
        _this.zIndexChange = new core_1.EventEmitter();
        /**
         * Two-Way bound property for the position of the control.
         * Use it with `<yaga-zoom-control [(position)]="someValue">`
         * or `<yaga-zoom-control (positionChange)="processEvent($event)">`
         */
        _this.positionChange = new core_1.EventEmitter();
        /**
         * From leaflet fired add event.
         * Use it with `<yaga-zoom-control (add)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-add Original Leaflet documentation
         */
        _this.addEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired remove event.
         * Use it with `<yaga-zoom-control (remove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-remove Original Leaflet documentation
         */
        _this.removeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired click event.
         * Use it with `<yaga-zoom-control (click)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-click Original Leaflet documentation
         */
        _this.clickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired dbclick event.
         * Use it with `<yaga-zoom-control (dbclick)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-dbclick Original Leaflet documentation
         */
        _this.dbclickEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mousedown event.
         * Use it with `<yaga-zoom-control (mousedown)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mousedown Original Leaflet documentation
         */
        _this.mousedownEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseover event.
         * Use it with `<yaga-zoom-control (mouseover)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mouseover Original Leaflet documentation
         */
        _this.mouseoverEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired mouseout event.
         * Use it with `<yaga-zoom-control (mouseout)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mouseout Original Leaflet documentation
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
    ZoomControlDirective.prototype.ngOnDestroy = function () {
        this._map.removeControl(this);
    };
    /**
     * Derived remove function
     */
    ZoomControlDirective.prototype.remove = function () {
        /* tslint:disable */
        _super.prototype.remove.call(this);
        this.displayChange.emit(false);
        this.removeEvent.emit({ target: this, type: 'remove' });
        return this;
    };
    /**
     * Derived addTo function
     */
    ZoomControlDirective.prototype.addTo = function (map) {
        /* tslint:disable */
        _super.prototype.addTo.call(this, map);
        this.displayChange.emit(true);
        this.addEvent.emit({ target: this, type: 'add' });
        return this;
    };
    /**
     * Derived method of the original setPosition.
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-setposition Original Leaflet documentation
     */
    ZoomControlDirective.prototype.setPosition = function (val) {
        _super.prototype.setPosition.call(this, val);
        this.positionChange.emit(val);
        return this;
    };
    Object.defineProperty(ZoomControlDirective.prototype, "opacity", {
        get: function () {
            return parseFloat(this.getContainer().style.opacity);
        },
        /**
         * Two-Way bound property for the opacity.
         * Use it with `<yaga-zoom-control [(opacity)]="someValue">`
         * or `<yaga-zoom-control [opacity]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-opacity Original Leaflet documentation
         */
        set: function (val) {
            this.getContainer().style.opacity = val.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "display", {
        get: function () {
            return !!(this._map && this.getContainer().style.display !== 'none');
        },
        /**
         * Two-Way bound property for the display state.
         * Use it with `<yaga-zoom-control [(display)]="someValue">`
         * or `<yaga-zoom-control [display]="someValue">`
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
    Object.defineProperty(ZoomControlDirective.prototype, "position", {
        get: function () {
            return this.getPosition();
        },
        /**
         * Two-Way bound property for the position.
         * Use it with `<yaga-zoom-control [(position)]="someValue">`
         * or `<yaga-zoom-control [position]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-position Original Leaflet documentation
         */
        set: function (val) {
            this.setPosition(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zIndex", {
        get: function () {
            return parseInt(this.getContainer().style.zIndex, 10);
        },
        /**
         * Two-Way bound property for the zIndex of the control.
         * Use it with `<yaga-zoom-control [(zIndex)]="someValue">`
         * or `<yaga-zoom-control (zIndexChange)="processEvent($event)">`
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
    Object.defineProperty(ZoomControlDirective.prototype, "zoomInText", {
        get: function () {
            return this.options.zoomInText;
        },
        /**
         * Input for the text shown on the zoom in button.
         * Use it with `<yaga-zoom-control [(zoomInText)]="someValue">`
         * or `<yaga-zoom-control [zoomInText]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomintext Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomInText = val;
            this._zoomInButton.textContent = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomInTitle", {
        get: function () {
            return this.options.zoomInTitle;
        },
        /**
         * Input for the title connected to the zoom in button.
         * Use it with `<yaga-zoom-control [(zoomInTitle)]="someValue">`
         * or `<yaga-zoom-control [zoomInTitle]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomintitle Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomInTitle = val;
            this._zoomInButton.setAttribute('title', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomOutText", {
        get: function () {
            return this.options.zoomOutText;
        },
        /**
         * Input for the text shown on the zoom out button.
         * Use it with `<yaga-zoom-control [(zoomOutText)]="someValue">`
         * or `<yaga-zoom-control [zoomOutText]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomouttext Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomOutText = val;
            this._zoomOutButton.textContent = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZoomControlDirective.prototype, "zoomOutTitle", {
        get: function () {
            return this.options.zoomOutTitle;
        },
        /**
         * Input for the title connected to the zoom out button.
         * Use it with `<yaga-zoom-control [(zoomOutTitle)]="someValue">`
         * or `<yaga-zoom-control [zoomOutTitle]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomouttitle Original Leaflet documentation
         */
        set: function (val) {
            this.options.zoomOutTitle = val;
            this._zoomOutButton.setAttribute('title', val);
        },
        enumerable: true,
        configurable: true
    });
    ZoomControlDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-zoom-control',
                },] },
    ];
    /** @nocollapse */
    ZoomControlDirective.ctorParameters = function () { return [
        { type: map_provider_1.MapProvider, },
    ]; };
    ZoomControlDirective.propDecorators = {
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
        'zoomInText': [{ type: core_1.Input },],
        'zoomInTitle': [{ type: core_1.Input },],
        'zoomOutText': [{ type: core_1.Input },],
        'zoomOutTitle': [{ type: core_1.Input },],
    };
    return ZoomControlDirective;
}(leaflet_1.Control.Zoom));
exports.ZoomControlDirective = ZoomControlDirective;
//# sourceMappingURL=zoom-control.directive.js.map