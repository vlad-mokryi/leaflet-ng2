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
var PopupDirective = /** @class */ (function (_super) {
    __extends(PopupDirective, _super);
    function PopupDirective(elementRef, layerProvider) {
        var _this = _super.call(this) || this;
        _this.layerProvider = layerProvider;
        _this.contentChange = new core_1.EventEmitter();
        _this.openedChange = new core_1.EventEmitter();
        _this.latChange = new core_1.EventEmitter();
        _this.lngChange = new core_1.EventEmitter();
        _this.positionChange = new core_1.EventEmitter();
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
        _this.layerProvider.ref.bindPopup(_this);
        return _this;
    }
    PopupDirective.prototype.ngOnDestroy = function () {
        if (this._source) {
            this._source.unbindPopup();
        }
    };
    PopupDirective.prototype.setContent = function (content) {
        this.contentChange.emit((content));
        return _super.prototype.setContent.call(this, content);
    };
    Object.defineProperty(PopupDirective.prototype, "content", {
        get: function () {
            return this.getContent();
        },
        set: function (val) {
            this.setContent(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "opened", {
        get: function () {
            return !!this._map;
        },
        set: function (val) {
            if (val) {
                this.layerProvider.ref.openPopup();
                return;
            }
            this.layerProvider.ref.closePopup();
        },
        enumerable: true,
        configurable: true
    });
    PopupDirective.prototype.setLatLng = function (latlng) {
        _super.prototype.setLatLng.call(this, latlng);
        this.latChange.emit(this.lat);
        this.lngChange.emit(this.lng);
        this.positionChange.emit(leaflet_1.latLng(this.lat, this.lng));
        return this;
    };
    Object.defineProperty(PopupDirective.prototype, "lat", {
        get: function () {
            return this.getLatLng().lat;
        },
        set: function (val) {
            this.setLatLng([val, this.lng]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "lng", {
        get: function () {
            return this.getLatLng().lng;
        },
        set: function (val) {
            this.setLatLng([this.lat, val]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "position", {
        get: function () {
            return this.getLatLng();
        },
        set: function (val) {
            this.setLatLng(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "maxWidth", {
        get: function () {
            return this.options.maxWidth;
        },
        set: function (val) {
            this.options.maxWidth = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "minWidth", {
        get: function () {
            return this.options.minWidth;
        },
        set: function (val) {
            this.options.minWidth = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "maxHeight", {
        get: function () {
            return this.options.maxHeight;
        },
        set: function (val) {
            this.options.maxHeight = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPan", {
        get: function () {
            return this.options.autoPan;
        },
        set: function (val) {
            this.options.autoPan = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPanPaddingTopLeft", {
        get: function () {
            return this.options.autoPanPaddingTopLeft;
        },
        set: function (val) {
            this.options.autoPanPaddingTopLeft = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPanPaddingBottomRight", {
        get: function () {
            return this.options.autoPanPaddingBottomRight;
        },
        set: function (val) {
            this.options.autoPanPaddingBottomRight = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoPanPadding", {
        get: function () {
            return this.options.autoPanPadding;
        },
        set: function (val) {
            this.options.autoPanPadding = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "keepInView", {
        get: function () {
            return this.options.keepInView;
        },
        set: function (val) {
            this.options.keepInView = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "closeButton", {
        get: function () {
            return this.options.closeButton;
        },
        set: function (val) {
            this.options.closeButton = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "autoClose", {
        get: function () {
            return this.options.autoClose;
        },
        set: function (val) {
            this.options.autoClose = val;
            this._updateLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupDirective.prototype, "className", {
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
    Object.defineProperty(PopupDirective.prototype, "pane", {
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
    PopupDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-popup',
                },] },
    ];
    /** @nocollapse */
    PopupDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: layer_provider_1.LayerProvider, },
    ]; };
    PopupDirective.propDecorators = {
        'contentChange': [{ type: core_1.Output },],
        'openedChange': [{ type: core_1.Output },],
        'latChange': [{ type: core_1.Output },],
        'lngChange': [{ type: core_1.Output },],
        'positionChange': [{ type: core_1.Output },],
        'openEvent': [{ type: core_1.Output, args: ['open',] },],
        'closeEvent': [{ type: core_1.Output, args: ['close',] },],
        'content': [{ type: core_1.Input },],
        'opened': [{ type: core_1.Input },],
        'lat': [{ type: core_1.Input },],
        'lng': [{ type: core_1.Input },],
        'position': [{ type: core_1.Input },],
        'maxWidth': [{ type: core_1.Input },],
        'minWidth': [{ type: core_1.Input },],
        'maxHeight': [{ type: core_1.Input },],
        'autoPan': [{ type: core_1.Input },],
        'autoPanPaddingTopLeft': [{ type: core_1.Input },],
        'autoPanPaddingBottomRight': [{ type: core_1.Input },],
        'autoPanPadding': [{ type: core_1.Input },],
        'keepInView': [{ type: core_1.Input },],
        'closeButton': [{ type: core_1.Input },],
        'autoClose': [{ type: core_1.Input },],
        'className': [{ type: core_1.Input },],
        'pane': [{ type: core_1.Input },],
    };
    return PopupDirective;
}(leaflet_1.Popup));
exports.PopupDirective = PopupDirective;
//# sourceMappingURL=popup.directive.js.map