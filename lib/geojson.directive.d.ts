import { AfterContentInit, EventEmitter, OnDestroy } from '@angular/core';
import { Feature as GeoJSONFeature, FeatureCollection as GeoJSONFeatureCollection, GeometryObject, Point } from 'geojson';
import { GeoJSON, LatLng, Layer, LeafletEvent, LeafletMouseEvent, PathOptions, PopupEvent, TooltipEvent } from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';
/**
 * Interface for the styler function of the GeoJSON directive.
 *
 * You can return an individual style (PathOption) for each feature. As basis you get the feature itself and the default
 * style.
 *
 * *Note: This functions is enhanced against the original style function with a default style*
 * @link http://leafletjs.com/reference-1.2.0.html#geojson-style Original Leaflet documentation
 */
export declare type IGeoJSONStylerFn<T> = (geoJSON: GeoJSONFeature<GeometryObject, T>, defaultStyle: PathOptions) => PathOptions;
/**
 * Interface for the filter function of the GeoJSON directive.
 *
 * You can return a boolean value on each feature according if you want to add the feature or not.
 * @link http://leafletjs.com/reference-1.2.0.html#geojson-filter Original Leaflet documentation
 */
export declare type IGeoJSONFilterFn<T> = (feature: GeoJSONFeature<GeometryObject, T>) => boolean;
/**
 * Interface for the point to layer function of the GeoJSON directive.
 *
 * You can return any type of Layer that should represent the feature of type point.
 * @link http://leafletjs.com/reference-1.2.0.html#geojson-pointtolayer Original Leaflet documentation
 */
export declare type IGeoJSONPointToLayerFn<T> = (geoJSON: GeoJSONFeature<Point, T>, latLng: LatLng) => Layer;
/**
 * Interface for the protected middleware property of the GeoJSON directive.
 */
export interface IGeoJSONDirectiveMiddlewareDictionary<T> {
    styler?: IGeoJSONStylerFn<T>;
    filter?: IGeoJSONFilterFn<T>;
    pointToLayer?: IGeoJSONPointToLayerFn<T>;
    defaultStyle?: PathOptions;
}
export declare class GeoJSONDirective<T> extends GeoJSON implements OnDestroy, AfterContentInit {
    dataChange: EventEmitter<GeoJSONFeatureCollection<GeometryObject, T>>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-geojson (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-geojson (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-geojson (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-popupopen Original Leaflet documentation
     */
    popupopenEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-geojson (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-popupclose Original Leaflet documentation
     */
    popupcloseEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-geojson (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-tooltipopen Original Leaflet documentation
     */
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-geojson (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-tooltipclose Original Leaflet documentation
     */
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-geojson (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-geojson (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-geojson (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-geojson (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-geojson (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-mouseout Original Leaflet documentation
     */
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-geojson (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-contextmenu Original Leaflet documentation
     */
    contextmenuEvent: EventEmitter<LeafletMouseEvent>;
    onEachFeatureEvent: EventEmitter<{
        feature: GeoJSONFeature<GeometryObject, T>;
        layer: Layer;
    }>;
    /**
     * Property to prevent changes before directive is initialized
     */
    protected initialized: boolean;
    /**
     * Object that stores the middleware functions and the default style
     */
    protected middleware: IGeoJSONDirectiveMiddlewareDictionary<T>;
    constructor(parentLayerGroupProvider: LayerGroupProvider, layerGroupProvider: LayerGroupProvider, layerProvider: LayerProvider);
    /**
     * Internal method that provides the initialization of the child popup or tooltip
     */
    ngAfterContentInit(): void;
    /**
     * Internal method to provide the removal of the layer in Leaflet, when removing it from the Angular template
     */
    ngOnDestroy(): void;
    /**
     * Derived method of the original addData.
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-adddata Original Leaflet documentation
     */
    addData(data: GeoJSONFeature<GeometryObject, T>): Layer;
    /**
     * Derived method of the original clearLayers.
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-clearlayers Original Leaflet documentation
     */
    clearLayers(): this;
    /**
     * Method to remove all existing data and add the new data in one step.
     *
     * *Note: this is a combination of `clearLayers` and `addData`*
     */
    setData(val: GeoJSONFeatureCollection<GeometryObject, T>): this;
    /**
     * Two-Way bound property for the data geoJSON data.
     * Use it with `<yaga-geojson [(data)]="someValue">` or `<yaga-geojson [data]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-l-geojson Original Leaflet documentation
     */
    data: GeoJSONFeatureCollection<GeometryObject, T>;
    /**
     * Input for the filter function.
     * Use it with `<yaga-geojson [filter]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-filter Original Leaflet documentation
     */
    filter: IGeoJSONFilterFn<T>;
    /**
     * Input for the pointToLayer function.
     * Use it with `<yaga-geojson [pointToLayer]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-pointtolayer Original Leaflet documentation
     */
    pointToLayer: IGeoJSONPointToLayerFn<T>;
    /**
     * Input for the styler function.
     * Use it with `<yaga-geojson [styler]="someValue">`
     *
     * *Note: The function can follow the `IGeoJSONStylerFn` interface. It enhances the leaflet ones with the default
     * style as second parameter*
     * @link http://leafletjs.com/reference-1.2.0.html#geojson-style Original Leaflet documentation
     */
    styler: IGeoJSONStylerFn<T>;
    /**
     * Input for the default style.
     * Use it with `<yaga-geojson [defaultStyle]="someValue">`
     *
     * *Note: Leaflet does not provide a default style, it just provides a style function!*
     */
    defaultStyle: PathOptions;
    /**
     * Method to apply changes to the geometries
     */
    protected redraw(): void;
}
