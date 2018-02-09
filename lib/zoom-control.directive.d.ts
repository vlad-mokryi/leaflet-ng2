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
export declare class ZoomControlDirective extends Control.Zoom implements OnDestroy {
    /**
     * Two-Way bound property for the display status of the control.
     * Use it with `<yaga-zoom-control [(display)]="someValue">`
     * or `<yaga-zoom-control (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-zoom-control [(zIndex)]="someValue">`
     * or `<yaga-zoom-control (zIndexChange)="processEvent($event)">`
     */
    zIndexChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the position of the control.
     * Use it with `<yaga-zoom-control [(position)]="someValue">`
     * or `<yaga-zoom-control (positionChange)="processEvent($event)">`
     */
    positionChange: EventEmitter<ControlPosition>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-zoom-control (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-zoom-control (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-zoom-control (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-zoom-control (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-zoom-control (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-zoom-control (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-zoom-control (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-mouseout Original Leaflet documentation
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
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-setposition Original Leaflet documentation
     */
    setPosition(val: ControlPosition): this;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-zoom-control [(opacity)]="someValue">`
     * or `<yaga-zoom-control [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-opacity Original Leaflet documentation
     */
    opacity: number;
    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-zoom-control [(display)]="someValue">`
     * or `<yaga-zoom-control [display]="someValue">`
     */
    display: boolean;
    /**
     * Two-Way bound property for the position.
     * Use it with `<yaga-zoom-control [(position)]="someValue">`
     * or `<yaga-zoom-control [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-position Original Leaflet documentation
     */
    position: ControlPosition;
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-zoom-control [(zIndex)]="someValue">`
     * or `<yaga-zoom-control (zIndexChange)="processEvent($event)">`
     */
    zIndex: number;
    /**
     * Input for the text shown on the zoom in button.
     * Use it with `<yaga-zoom-control [(zoomInText)]="someValue">`
     * or `<yaga-zoom-control [zoomInText]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomintext Original Leaflet documentation
     */
    zoomInText: string;
    /**
     * Input for the title connected to the zoom in button.
     * Use it with `<yaga-zoom-control [(zoomInTitle)]="someValue">`
     * or `<yaga-zoom-control [zoomInTitle]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomintitle Original Leaflet documentation
     */
    zoomInTitle: string;
    /**
     * Input for the text shown on the zoom out button.
     * Use it with `<yaga-zoom-control [(zoomOutText)]="someValue">`
     * or `<yaga-zoom-control [zoomOutText]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomouttext Original Leaflet documentation
     */
    zoomOutText: string;
    /**
     * Input for the title connected to the zoom out button.
     * Use it with `<yaga-zoom-control [(zoomOutTitle)]="someValue">`
     * or `<yaga-zoom-control [zoomOutTitle]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-zoom-zoomouttitle Original Leaflet documentation
     */
    zoomOutTitle: string;
}
