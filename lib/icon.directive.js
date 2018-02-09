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
var marker_provider_1 = require("./marker.provider");
/**
 * Angular2 directive for Leaflet icons.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker>
 *         <yaga-icon
 *             [iconAnchor]="..."
 *             [iconSize]="..."
 *             [popupAnchor]="..."
 *             [className]="..."
 *             [iconUrl]="..."
 *             [iconRetinaUrl]="..."
 *             [iconSize]="..."
 *             [iconAnchor]="..."
 *             [popupAnchor]="..."
 *             [tooltipAnchor]="..."
 *             [shadowUrl]="..."
 *             [shadowRetinaUrl]="..."
 *             [shadowSize]="..."
 *             [shadowAnchor]="...">
 *         </yaga-icon>
 *     </yaga-marker>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#icon Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Icon%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/icon.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/icondirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/icon-directive/
 */
var IconDirective = /** @class */ (function (_super) {
    __extends(IconDirective, _super);
    function IconDirective(markerProvider) {
        var _this = _super.call(this, {
            iconUrl: consts_1.TRANSPARENT_PIXEL,
        }) || this;
        _this.markerProvider = markerProvider;
        /**
         * This is an EventEmitter used to notify on any change in this object. It is mainly created to provide reactions
         * of the marker directive on changes.
         */
        _this.updateEvent = new core_1.EventEmitter();
        _this.markerProvider.ref.setIcon(_this);
        return _this;
    }
    Object.defineProperty(IconDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        /**
         * Input for the DOM class name.
         * Use it with `<yaga-icon [className]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-classname Original Leaflet documentation
         */
        set: function (val) {
            this.options.className = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "iconUrl", {
        get: function () {
            return this.options.iconUrl;
        },
        /**
         * Input for the icon-url.
         * Use it with `<yaga-icon [iconUrl]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-iconurl Original Leaflet documentation
         */
        set: function (val) {
            this.options.iconUrl = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "iconRetinaUrl", {
        get: function () {
            return this.options.iconRetinaUrl;
        },
        /**
         * Input for the icon-retina-url.
         * Use it with `<yaga-icon [iconRetinaUrl]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-iconretinaurl Original Leaflet documentation
         */
        set: function (val) {
            this.options.iconRetinaUrl = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "iconSize", {
        get: function () {
            return this.options.iconSize;
        },
        /**
         * Input for the icon-size.
         * Use it with `<yaga-icon [iconSize]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-iconsize Original Leaflet documentation
         */
        set: function (val) {
            this.options.iconSize = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "iconAnchor", {
        get: function () {
            return this.options.iconAnchor;
        },
        /**
         * Input for the icon-anchor.
         * Use it with `<yaga-icon [iconAnchor]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-iconanchor Original Leaflet documentation
         */
        set: function (val) {
            this.options.iconAnchor = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "popupAnchor", {
        get: function () {
            return this.options.popupAnchor;
        },
        /**
         * Input for the popup-anchor.
         * Use it with `<yaga-icon [popupAnchor]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-popupanchor Original Leaflet documentation
         */
        set: function (val) {
            this.options.popupAnchor = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "tooltipAnchor", {
        get: function () {
            return this.options.tooltipAnchor;
        },
        /**
         * Input for the tooltip-anchor.
         * Use it with `<yaga-icon [tooltipAnchor]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-tooltipanchor Original Leaflet documentation
         */
        set: function (val) {
            this.options.tooltipAnchor = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowUrl", {
        get: function () {
            return this.options.shadowUrl;
        },
        /**
         * Input for the shadow-url.
         * Use it with `<yaga-icon [shadowUrl]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowurl Original Leaflet documentation
         */
        set: function (val) {
            this.options.shadowUrl = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowRetinaUrl", {
        get: function () {
            return this.options.shadowRetinaUrl;
        },
        /**
         * Input for the shadow-url for retina displays.
         * Use it with `<yaga-icon [shadowUrl]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowretinaurl Original Leaflet documentation
         */
        set: function (val) {
            this.options.shadowRetinaUrl = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowSize", {
        get: function () {
            return this.options.shadowSize;
        },
        /**
         * Input for the shadow-size.
         * Use it with `<yaga-icon [shadowSize]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowsize Original Leaflet documentation
         */
        set: function (val) {
            this.options.shadowSize = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconDirective.prototype, "shadowAnchor", {
        get: function () {
            return this.options.shadowAnchor;
        },
        /**
         * Input for the shadow-anchor.
         * Use it with `<yaga-icon [shadowAnchor]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowanchor Original Leaflet documentation
         */
        set: function (val) {
            this.options.shadowAnchor = val;
            this.markerProvider.ref.setIcon(this);
            this.updateEvent.emit({
                target: this,
                type: 'update',
            });
        },
        enumerable: true,
        configurable: true
    });
    IconDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-icon',
                },] },
    ];
    /** @nocollapse */
    IconDirective.ctorParameters = function () { return [
        { type: marker_provider_1.MarkerProvider, },
    ]; };
    IconDirective.propDecorators = {
        'updateEvent': [{ type: core_1.Output, args: ['update',] },],
        'className': [{ type: core_1.Input },],
        'iconUrl': [{ type: core_1.Input },],
        'iconRetinaUrl': [{ type: core_1.Input },],
        'iconSize': [{ type: core_1.Input },],
        'iconAnchor': [{ type: core_1.Input },],
        'popupAnchor': [{ type: core_1.Input },],
        'tooltipAnchor': [{ type: core_1.Input },],
        'shadowUrl': [{ type: core_1.Input },],
        'shadowRetinaUrl': [{ type: core_1.Input },],
        'shadowSize': [{ type: core_1.Input },],
        'shadowAnchor': [{ type: core_1.Input },],
    };
    return IconDirective;
}(leaflet_1.Icon));
exports.IconDirective = IconDirective;
//# sourceMappingURL=icon.directive.js.map