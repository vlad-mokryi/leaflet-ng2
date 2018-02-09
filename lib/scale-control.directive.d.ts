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
export declare class ScaleControlDirective extends Control.Scale implements OnDestroy {
    /**
     * Two-Way bound property for the display status of the control.
     * Use it with `<yaga-scale-control [(display)]="someValue">`
     * or `<yaga-scale-control (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-scale-control [(zIndex)]="someValue">`
     * or `<yaga-scale-control (zIndexChange)="processEvent($event)">`
     */
    zIndexChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the position of the control.
     * Use it with `<yaga-scale-control [(position)]="someValue">`
     * or `<yaga-scale-control (positionChange)="processEvent($event)">`
     */
    positionChange: EventEmitter<ControlPosition>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-scale-control (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-scale-control (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-scale-control (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-scale-control (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-scale-control (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-scale-control (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-scale-control (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-mouseout Original Leaflet documentation
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
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-setposition Original Leaflet documentation
     */
    setPosition(val: ControlPosition): this;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-scale-control [(opacity)]="someValue">`
     * or `<yaga-scale-control [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-opacity Original Leaflet documentation
     */
    opacity: number;
    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-scale-control [(display)]="someValue">`
     * or `<yaga-scale-control [display]="someValue">`
     */
    display: boolean;
    /**
     * Two-Way bound property for the position.
     * Use it with `<yaga-scale-control [(position)]="someValue">`
     * or `<yaga-scale-control [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-position Original Leaflet documentation
     */
    position: ControlPosition;
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-scale-control [(zIndex)]="someValue">`
     * or `<yaga-scale-control (zIndexChange)="processEvent($event)">`
     */
    zIndex: number;
    /**
     * Input for scale max-width.
     * Use it with `<yaga-scale-control [(maxWidth)]="someValue">`
     * or `<yaga-scale-control [maxWidth]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-maxwidth Original Leaflet documentation
     */
    maxWidth: number;
    /**
     * Input for state of metric-scale state.
     * Use it with `<yaga-scale-control [(metric)]="someValue">`
     * or `<yaga-scale-control [metric]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-metric Original Leaflet documentation
     */
    metric: boolean;
    /**
     * Input for state of imperial-scale state.
     * Use it with `<yaga-scale-control [(imperial)]="someValue">`
     * or `<yaga-scale-control [imperial]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-scale-imperial Original Leaflet documentation
     */
    imperial: boolean;
}
