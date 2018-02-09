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
var layer_provider_1 = require("./layer.provider");
var TooltipDirective = /** @class */ (function (_super) {
    __extends(TooltipDirective, _super);
    function TooltipDirective(layerProvider, elementRef) {
        var _this = _super.call(this) || this;
        _this.layerProvider = layerProvider;
        _this.contentChange = new core_1.EventEmitter();
        _this.openedChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.positionChange = new core_1.EventEmitter();
        _this.opacityChange = new core_1.EventEmitter();
        _this.openEvent = new core_1.EventEmitter();
        _this.closeEvent = new core_1.EventEmitter();
        _this.setContent(elementRef.nativeElement);
        _this.on('add', function (event) {
            _this.openEvent.emit(event);
            _this.openedChange.emit(true);
        });
        _this.on('remove', function (event) {
            _this.closeEvent.emit(event);
            _this.openedChange.emit(false);
        });
        _this.layerProvider.ref.bindTooltip(_this);
        return _this;
    }
    TooltipDirective.prototype.ngOnDestroy = function () {
        if (this._source) {
            this._source.unbindTooltip();
        }
    };
    TooltipDirective.prototype.setContent = function (content) {
        this.contentChange.emit((content));
        return _super.prototype.setContent.call(this, content);
    };
    Object.defineProperty(TooltipDirective.prototype, "content", {
        get: function () {
            return this.getContent();
        },
        set: function (val) {
            this.setContent(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "opened", {
        get: function () {
            return !!this._map;
        },
        set: function (val) {
            if (val) {
                this.layerProvider.ref.openTooltip();
                return;
            }
            this.layerProvider.ref.closeTooltip();
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.setLatLng = function (latlng) {
        _super.prototype.setLatLng.call(this, latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(leaflet_1.latLng(this.lat, this.lng));
        return this;
    };
    Object.defineProperty(TooltipDirective.prototype, "lat", {
        get: function () {
            return this.getLatLng().lat;
        },
        set: function (val) {
            this.setLatLng([val, this.lng]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "lng", {
        get: function () {
            return this.getLatLng().lng;
        },
        set: function (val) {
            this.setLatLng([this.lat, val]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "position", {
        get: function () {
            return this.getLatLng();
        },
        set: function (val) {
            this.setLatLng(val);
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.setOpacity = function (val) {
        _super.prototype.setOpacity.call(this, val);
        this.opacityChange.emit(val);
    };
    Object.defineProperty(TooltipDirective.prototype, "opacity", {
        get: function () {
            return this.options.opacity;
        },
        set: function (val) {
            this.setOpacity(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "className", {
        get: function () {
            return this.options.className;
        },
        set: function (val) {
            this.options.className = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "pane", {
        get: function () {
            return this.options.pane;
        },
        set: function (val) {
            this.options.pane = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "interactive", {
        get: function () {
            return this.options.interactive;
        },
        set: function (val) {
            this.options.interactive = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "sticky", {
        get: function () {
            return this.options.sticky;
        },
        set: function (val) {
            this.options.sticky = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "direction", {
        get: function () {
            return this.options.direction;
        },
        set: function (val) {
            this.options.direction = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "permanent", {
        get: function () {
            return this.options.permanent;
        },
        set: function (val) {
            this.options.permanent = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "offset", {
        get: function () {
            return this.options.offset;
        },
        set: function (val) {
            this.options.offset = val;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-tooltip',
                },] },
    ];
    /** @nocollapse */
    TooltipDirective.ctorParameters = function () { return [
        { type: layer_provider_1.LayerProvider, },
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    ]; };
    TooltipDirective.propDecorators = {
        'contentChange': [{ type: core_1.Output },],
        'openedChange': [{ type: core_1.Output },],
        'latChange': [{ type: core_1.Output },],
        'lngChange': [{ type: core_1.Output },],
        'positionChange': [{ type: core_1.Output },],
        'opacityChange': [{ type: core_1.Output },],
        'openEvent': [{ type: core_1.Output, args: ['open',] },],
        'closeEvent': [{ type: core_1.Output, args: ['close',] },],
        'content': [{ type: core_1.Input },],
        'opened': [{ type: core_1.Input },],
        'lat': [{ type: core_1.Input },],
        'lng': [{ type: core_1.Input },],
        'position': [{ type: core_1.Input },],
        'opacity': [{ type: core_1.Input },],
        'className': [{ type: core_1.Input },],
        'pane': [{ type: core_1.Input },],
        'interactive': [{ type: core_1.Input },],
        'sticky': [{ type: core_1.Input },],
        'direction': [{ type: core_1.Input },],
        'permanent': [{ type: core_1.Input },],
        'offset': [{ type: core_1.Input },],
    };
    return TooltipDirective;
}(leaflet_1.Tooltip));
exports.TooltipDirective = TooltipDirective;
//# sourceMappingURL=tooltip.directive.js.map