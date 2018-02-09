import { EventEmitter, OnDestroy } from '@angular/core';
import { LayerGroup, LeafletEvent, Map, PopupEvent, TooltipEvent } from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';
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
export declare class LayerGroupDirective extends LayerGroup implements OnDestroy {
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-layer-group [(display)]="someValue">`
     * or `<yaga-layer-group (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-layer-group (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-layer-group (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-layer-group (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupopen Original Leaflet documentation
     */
    popupopenEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-layer-group (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-popupclose Original Leaflet documentation
     */
    popupcloseEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-layer-group (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipopen Original Leaflet documentation
     */
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-layer-group (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-tooltipclose Original Leaflet documentation
     */
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-layer-group (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-click Original Leaflet documentation
     */
    protected parentLayerGroup: Map | LayerGroup;
    constructor(parentLayerGroupProvider: LayerGroupProvider, layerGroupProvider: LayerGroupProvider, layerProvider: LayerProvider);
    /**
     * This function gets called from Angular on destroy of the html-component.
     * @link https://angular.io/docs/ts/latest/api/core/index/OnDestroy-class.html
     */
    ngOnDestroy(): void;
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-layer-group [(display)]="someValue">` or `<yaga-layer-group [display]="someValue">`
     */
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-layer-group [(display)]="someValue">` or `<yaga-layer-group [display]="someValue">`
     */
    display: boolean;
    /**
     * Input for the attribution.
     * Use it with `<yaga-layer-group [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-attribution Original Leaflet documentation
     */
    attribution: string;
}
