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
/**
 * Angular2 directive for Leaflet layer-groups.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-layer-group
 *         [(display)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (popupopen)="..."
 *         (popupclose)="..."
 *         (tooltipopen)="..."
 *         (tooltipclose)="..."
 *
 *         [attribution]="...">
 *         <!-- place other layers here... -->
 *     </yaga-layer-group>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#layergroup Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Layer-Group%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/layer-group.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/layergroupdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/layer-group-directive
 */
var LayerGroupDirective = /** @class */ (function (_super) {
    __extends(LayerGroupDirective, _super);
    function LayerGroupDirective(parentLayerGroupProvider, layerGroupProvider, layerProvider) {
        var _this = _super.call(this) || this;
        /**
         * Two-Way bound property for the display status of the layer.
         * Use it with `<yaga-layer-group [(display)]="someValue">`
         * or `<yaga-layer-group (displayChange)="processEvent($event)">`
         */
        _this.displayChange = new core_1.EventEmitter();
        /**
         * From leaflet fired add event.
         * Use it with `<yaga-layer-group (add)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-add Original Leaflet documentation
         */
        _this.addEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired remove event.
         * Use it with `<yaga-layer-group (remove)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-remove Original Leaflet documentation
         */
        _this.removeEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired popupopen event.
         * Use it with `<yaga-layer-group (popupopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupopen Original Leaflet documentation
         */
        _this.popupopenEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired popupclose event.
         * Use it with `<yaga-layer-group (popupclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupclose Original Leaflet documentation
         */
        _this.popupcloseEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tooltipopen event.
         * Use it with `<yaga-layer-group (tooltipopen)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipopen Original Leaflet documentation
         */
        _this.tooltipopenEvent = new core_1.EventEmitter();
        /**
         * From leaflet fired tooltipclose event.
         * Use it with `<yaga-layer-group (tooltipclose)="processEvent($event)">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipclose Original Leaflet documentation
         */
        _this.tooltipcloseEvent = new core_1.EventEmitter();
        layerProvider.ref = _this;
        layerGroupProvider.ref = _this;
        _this.on('remove', function () {
            _this._map = null; // This seems to fix a bug in Leaflet
            _this.displayChange.emit(false);
        });
        _this.on('add', function () {
            _this.displayChange.emit(true);
        });
        _this.addTo(parentLayerGroupProvider.ref);
        _this.parentLayerGroup = parentLayerGroupProvider.ref;
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
        return _this;
    }
    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    LayerGroupDirective.prototype.ngOnDestroy = function () {
        this.removeFrom(this._map);
    };
    Object.defineProperty(LayerGroupDirective.prototype, "display", {
        /**
         * Two-Way bound property for the display status of the layer.
         * Use it with `<yaga-layer-group [(display)]="someValue">` or `<yaga-layer-group [display]="someValue">`
         */
        get: function () {
            return !!(this._map);
        },
        /**
         * Two-Way bound property for the display status of the layer.
         * Use it with `<yaga-layer-group [(display)]="someValue">` or `<yaga-layer-group [display]="someValue">`
         */
        set: function (val) {
            if (val) {
                this.addTo(this.parentLayerGroup);
                return;
            }
            // TODO: proof and maybe enhance typedefinition
            this.parentLayerGroup.removeLayer(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerGroupDirective.prototype, "attribution", {
        get: function () {
            return this.getAttribution();
        },
        /**
         * Input for the attribution.
         * Use it with `<yaga-layer-group [attribution]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-attribution Original Leaflet documentation
         */
        set: function (val) {
            if (this._map && this._map.attributionControl) {
                this._map.attributionControl.removeAttribution(this.getAttribution());
                this._map.attributionControl.addAttribution(val);
            }
            // TODO: add options to the official type definition
            this.options.attribution = val;
        },
        enumerable: true,
        configurable: true
    });
    LayerGroupDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [layer_group_provider_1.LayerGroupProvider, layer_provider_1.LayerProvider],
                    selector: 'yaga-layer-group',
                },] },
    ];
    /** @nocollapse */
    LayerGroupDirective.ctorParameters = function () { return [
        { type: layer_group_provider_1.LayerGroupProvider, decorators: [{ type: core_1.SkipSelf },] },
        { type: layer_group_provider_1.LayerGroupProvider, },
        { type: layer_provider_1.LayerProvider, },
    ]; };
    LayerGroupDirective.propDecorators = {
        'displayChange': [{ type: core_1.Output },],
        'addEvent': [{ type: core_1.Output, args: ['add',] },],
        'removeEvent': [{ type: core_1.Output, args: ['remove',] },],
        'popupopenEvent': [{ type: core_1.Output, args: ['popupopen',] },],
        'popupcloseEvent': [{ type: core_1.Output, args: ['popupclose',] },],
        'tooltipopenEvent': [{ type: core_1.Output, args: ['tooltipopen',] },],
        'tooltipcloseEvent': [{ type: core_1.Output, args: ['tooltipclose',] },],
        'display': [{ type: core_1.Input },],
        'attribution': [{ type: core_1.Input },],
    };
    return LayerGroupDirective;
}(leaflet_1.LayerGroup));
exports.LayerGroupDirective = LayerGroupDirective;
//# sourceMappingURL=layer-group.directive.js.map