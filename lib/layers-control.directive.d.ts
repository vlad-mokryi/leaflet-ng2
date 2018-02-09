import { EventEmitter, OnDestroy } from '@angular/core';
import { Control, ControlPosition, LeafletEvent, LeafletMouseEvent, Map } from 'leaflet';
import { LayersControlProvider } from './layers-control.provider';
import { MapProvider } from './map.provider';
/**
 * Angular2 directive for the attribution-control of Leaflet.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-layers-control
 *         [(display)]="..."
 *         [(zIndex)]="..."
 *         [(position)]="..."
 *
 *         (add)="..."
 *         (remove)="..."
 *         (click)="..."
 *         (dbclick)="..."
 *         (mousedown)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         >
 *         <yaga-tile-layer yaga-base-layer="OSM"></yaga-tile-layer>
 *         <yaga-geojson yaga-overlay-layer="My points"></yaga-geojson>
 *     </yaga-layers-control>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#control-layers Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Scale-Control%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/attribution-control.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/layerscontroldirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/layers-control-directive/
 */
export declare class LayersControlDirective extends Control.Layers implements OnDestroy {
    /**
     * Two-Way bound property for the display status of the control.
     * Use it with `<yaga-layers-control [(display)]="someValue">`
     * or `<yaga-layers-control (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-layers-control [(zIndex)]="someValue">`
     * or `<yaga-layers-control (zIndexChange)="processEvent($event)">`
     */
    zIndexChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the position of the control.
     * Use it with `<yaga-layers-control [(position)]="someValue">`
     * or `<yaga-layers-control (positionChange)="processEvent($event)">`
     */
    positionChange: EventEmitter<ControlPosition>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-layers-control (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-layers-control (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-layers-control (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-layers-control (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-layers-control (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-layers-control (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-layers-control (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-mouseout Original Leaflet documentation
     */
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    constructor(mapProvider: MapProvider, layersControlProvider: LayersControlProvider);
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
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-setposition Original Leaflet documentation
     */
    setPosition(val: ControlPosition): this;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-layers-control [(opacity)]="someValue">`
     * or `<yaga-layers-control [opacity]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-opacity Original Leaflet documentation
     */
    opacity: number;
    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-layers-control [(display)]="someValue">`
     * or `<yaga-layers-control [display]="someValue">`
     */
    display: boolean;
    /**
     * Two-Way bound property for the position.
     * Use it with `<yaga-layers-control [(position)]="someValue">`
     * or `<yaga-layers-control [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#control-layers-position Original Leaflet documentation
     */
    position: ControlPosition;
    /**
     * Two-Way bound property for the zIndex of the control.
     * Use it with `<yaga-layers-control [(zIndex)]="someValue">`
     * or `<yaga-layers-control (zIndexChange)="processEvent($event)">`
     */
    zIndex: number;
}
