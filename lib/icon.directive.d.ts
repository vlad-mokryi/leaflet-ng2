import { EventEmitter } from '@angular/core';
import { Icon, LeafletEvent, Point } from 'leaflet';
import { MarkerProvider } from './marker.provider';
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
export declare class IconDirective extends Icon {
    markerProvider: MarkerProvider;
    /**
     * This is an EventEmitter used to notify on any change in this object. It is mainly created to provide reactions
     * of the marker directive on changes.
     */
    updateEvent: EventEmitter<LeafletEvent>;
    constructor(markerProvider: MarkerProvider);
    /**
     * Input for the DOM class name.
     * Use it with `<yaga-icon [className]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-classname Original Leaflet documentation
     */
    className: string;
    /**
     * Input for the icon-url.
     * Use it with `<yaga-icon [iconUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-iconurl Original Leaflet documentation
     */
    iconUrl: string;
    /**
     * Input for the icon-retina-url.
     * Use it with `<yaga-icon [iconRetinaUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-iconretinaurl Original Leaflet documentation
     */
    iconRetinaUrl: string;
    /**
     * Input for the icon-size.
     * Use it with `<yaga-icon [iconSize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-iconsize Original Leaflet documentation
     */
    iconSize: Point;
    /**
     * Input for the icon-anchor.
     * Use it with `<yaga-icon [iconAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-iconanchor Original Leaflet documentation
     */
    iconAnchor: Point;
    /**
     * Input for the popup-anchor.
     * Use it with `<yaga-icon [popupAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-popupanchor Original Leaflet documentation
     */
    popupAnchor: Point;
    /**
     * Input for the tooltip-anchor.
     * Use it with `<yaga-icon [tooltipAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-tooltipanchor Original Leaflet documentation
     */
    tooltipAnchor: Point;
    /**
     * Input for the shadow-url.
     * Use it with `<yaga-icon [shadowUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowurl Original Leaflet documentation
     */
    shadowUrl: string;
    /**
     * Input for the shadow-url for retina displays.
     * Use it with `<yaga-icon [shadowUrl]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowretinaurl Original Leaflet documentation
     */
    shadowRetinaUrl: string;
    /**
     * Input for the shadow-size.
     * Use it with `<yaga-icon [shadowSize]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowsize Original Leaflet documentation
     */
    shadowSize: Point;
    /**
     * Input for the shadow-anchor.
     * Use it with `<yaga-icon [shadowAnchor]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#icon-shadowanchor Original Leaflet documentation
     */
    shadowAnchor: Point;
}
