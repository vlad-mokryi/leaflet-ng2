import { EventEmitter, OnDestroy } from '@angular/core';
import { FeatureGroup, LayerGroup, LeafletEvent, Map, PathOptions, PopupEvent, TooltipEvent } from 'leaflet';
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
 *     <yaga-feature-group
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
 *     </yaga-feature-group>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#featuregroup Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Feature-Group%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/feature-group.directive.js.html Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/featuregroupdirective.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/feature-group-directive
 */
export declare class FeatureGroupDirective extends FeatureGroup implements OnDestroy {
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-feature-group [(display)]="someValue">`
     * or `<yaga-feature-group (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-feature-group (layeradd)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-add Original Leaflet documentation
     */
    layeraddEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-feature-group (layerremove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-remove Original Leaflet documentation
     */
    layerremoveEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-feature-group (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-feature-group (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-feature-group (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-popupopen Original Leaflet documentation
     */
    popupopenEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-feature-group (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-popupclose Original Leaflet documentation
     */
    popupcloseEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-feature-group (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-tooltipopen Original Leaflet documentation
     */
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-feature-group (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-tooltipclose Original Leaflet documentation
     */
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-feature-group (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-click Original Leaflet documentation
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
     * Use it with `<yaga-feature-group [(display)]="someValue">` or `<yaga-feature-group [display]="someValue">`
     */
    /**
     * Two-Way bound property for the display status of the layer.
     * Use it with `<yaga-feature-group [(display)]="someValue">` or `<yaga-feature-group [display]="someValue">`
     */
    display: boolean;
    /**
     * Input for the attribution.
     * Use it with `<yaga-feature-group [attribution]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-attribution Original Leaflet documentation
     */
    attribution: string;
    removeFrom(map: Map): this;
    /**
     * Input for the style.
     * Use it with `<yaga-feature-group [style]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#featuregroup-setstyle Original Leaflet documentation
     */
    style: PathOptions;
}
