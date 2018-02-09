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
var marker_provider_1 = require("./marker.provider");
/**
 * Angular2 directive for Leaflet div-icons.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-marker>
 *         <yaga-div-icon
 *             [iconAnchor]="..."
 *             [iconSize]="..."
 *             [popupAnchor]="...">
 *             You can paste your HTML content for the icon here!
 *         </yaga-div-icon>
 *     </yaga-marker>
 * </yaga-map>
 * ```
 *
 * Notes:
 *
 * * All div-icon-directives have the css-class `yaga-div-icon`.
 * * The `contentHtml` property is not the child-node in the leaflet div-icon, it is the clone of it and gets cloned
 * again on every change.
 *
 * @link http://leafletjs.com/reference-1.2.0.html#divicon Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=DivIcon%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/div-icon.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/divicondirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/div-icon-directive/
 */
var DivIconDirective = /** @class */ (function (_super) {
    __extends(DivIconDirective, _super);
    function DivIconDirective(elementRef, markerProvider) {
        var _this = _super.call(this, {}) || this;
        _this.markerProvider = markerProvider;
        /**
         * This is an EventEmitter used to notify on any change in this object. It is mainly created to provide reactions
         * of the marker directive on changes.
         */
        _this.updateEvent = new core_1.EventEmitter();
        _this.contentHtml = elementRef.nativeElement;
        if (typeof MutationObserver === 'function') {
            var mutationObserver = new MutationObserver(function () {
                _this.markerProvider.ref.setIcon(_this);
                _this.updateEvent.emit({
                    target: _this,
                    type: 'update',
                });
            });
            mutationObserver.observe(_this.contentHtml, {
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true,
            });
        }
        else {
            _this.contentHtml.addEventListener('DOMSubtreeModified', function () {
                _this.markerProvider.ref.setIcon(_this);
                _this.updateEvent.emit({
                    target: _this,
                    type: 'update',
                });
            });
        }
        markerProvider.ref.setIcon(_this);
        return _this;
    }
    Object.defineProperty(DivIconDirective.prototype, "iconSize", {
        get: function () {
            return this.options.iconSize;
        },
        /**
         * Input for the iconSize.
         * Use it with `<yaga-div-icon [iconSize]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#divicon-iconsize Original Leaflet documentation
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
    Object.defineProperty(DivIconDirective.prototype, "iconAnchor", {
        get: function () {
            return this.options.iconAnchor;
        },
        /**
         * Input for the iconAnchor.
         * Use it with `<yaga-div-icon [iconAnchor]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#divicon-iconanchor Original Leaflet documentation
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
    Object.defineProperty(DivIconDirective.prototype, "popupAnchor", {
        get: function () {
            return this.options.popupAnchor;
        },
        /**
         * Input for the popupAnchor.
         * Use it with `<yaga-div-icon [popupAnchor]="someValue">`
         * @link http://leafletjs.com/reference-1.2.0.html#divicon-popupanchor Original Leaflet documentation
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
    /**
     * This inherited function enhances the directive with an own css-class and clones the its html content into the
     * leaflet div icon.
     */
    DivIconDirective.prototype.createIcon = function (oldDivIcon) {
        oldDivIcon = _super.prototype.createIcon.call(this, oldDivIcon);
        if (oldDivIcon.getAttribute('class').split(' ').indexOf('yaga-div-icon') === -1) {
            oldDivIcon.setAttribute('class', oldDivIcon.getAttribute('class') + ' yaga-div-icon');
        }
        oldDivIcon.appendChild(this.contentHtml.cloneNode(true));
        return oldDivIcon;
    };
    DivIconDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'yaga-div-icon',
                },] },
    ];
    /** @nocollapse */
    DivIconDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: marker_provider_1.MarkerProvider, },
    ]; };
    DivIconDirective.propDecorators = {
        'updateEvent': [{ type: core_1.Output, args: ['update',] },],
        'iconSize': [{ type: core_1.Input },],
        'iconAnchor': [{ type: core_1.Input },],
        'popupAnchor': [{ type: core_1.Input },],
    };
    return DivIconDirective;
}(leaflet_1.DivIcon));
exports.DivIconDirective = DivIconDirective;
//# sourceMappingURL=div-icon.directive.js.map