import { EventEmitter, OnDestroy } from '@angular/core';
import { Control, ControlPosition, LeafletEvent, LeafletMouseEvent, Map } from 'leaflet';
import { MapProvider } from './map.provider';
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
export declare class AttributionControlDirective extends Control.Attribution implements OnDestroy {
    /**
     * Two-Way bound property for the display status of the control.
     * Use it with `<yaga-attribution-control [(display)]="someValue">`
     * or `<yaga-attribution-control (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the position of the control.
     * Use it with `<yaga-attribution-control [(position)]="someValue">`
     * or `<yaga-attribution-control (positionChange)="processEvent($event)">`
     */
    positionChange: EventEmitter<ControlPosition>;
    /**
     * Two-Way bound property for the prefix of the control.
     * Use it with `<yaga-attribution-control [(prefix)]="someValue">`
     * or `<yaga-attribution-control (prefixChange)="processEvent($event)">`
     */
    prefixChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the list of attributions of the control.
     * Use it with `<yaga-attribution-control [(attributions)]="someValue">`
     * or `<yaga-attribution-control (attributionsChange)="processEvent($event)">`
     */
    attributionsChange: EventEmitter<string[]>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-attribution-control (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-attribution-control (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-attribution-control (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-attribution-control (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-attribution-control (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-attribution-control (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-attribution-control (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-mouseout Original Leaflet documentation
     */
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    constructor(mapProvider: MapProvider);
    /**
     * Internal method to provide the removal of the control in Leaflet, when removing it from the Angular template
     */
    ngOnDestroy(): void;
    /**
     * Derived remove function
     */
    remove(): this;
    /**
     * Derived addTo function
     */
    addTo(map: Map): this;
    /**
     * Derived method of the original setPosition.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-setposition Original Leaflet documentation
     */
    setPosition(val: ControlPosition): this;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-attribution-control [(opacity)]="someValue">`
     * or `<yaga-attribution-control [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-opacity Original Leaflet documentation
     */
    opacity: number;
    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-attribution-control [(display)]="someValue">`
     * or `<yaga-attribution-control [display]="someValue">`
     */
    display: boolean;
    /**
     * Two-Way bound property for the position.
     * Use it with `<yaga-attribution-control [(position)]="someValue">`
     * or `<yaga-attribution-control [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-position Original Leaflet documentation
     */
    position: ControlPosition;
    /**
     * Input for the zIndex of the control.
     * Use it with `<yaga-attribution-control [zIndex]="someValue">`
     */
    zIndex: number;
    /**
     * Derived method of the original setPrefix.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-setprefix Original Leaflet documentation
     */
    setPrefix(prefix: string): this;
    /**
     * Two-Way bound property for the prefix.
     * Use it with `<yaga-attribution-control [(prefix)]="someValue">`
     * or `<yaga-attribution-control [prefix]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-prefix Original Leaflet documentation
     */
    prefix: string;
    /**
     * Derived method of the original addAttribution.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-addattribution Original Leaflet documentation
     */
    addAttribution(val: string): this;
    /**
     * Derived method of the original removeAttribution.
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-removeattribution
     * Original Leaflet documentation
     */
    removeAttribution(val: string): this;
    /**
     * Two-Way bound property for the attributions.
     * Use it with `<yaga-attribution-control [(attributions)]="someValue">`
     * or `<yaga-attribution-control [attributions]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-attribution-attributions Original Leaflet documentation
     */
    attributions: string[];
    /**
     * Self written method to provide the removal of all attributions in a single step
     */
    removeAllAttributions(silent?: boolean): this;
}
