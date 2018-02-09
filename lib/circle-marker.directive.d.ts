import { AfterContentInit, EventEmitter, OnDestroy } from '@angular/core';
import { Feature as GeoJSONFeature } from 'geojson';
import { CircleMarker, CircleMarkerOptions, FillRule, LatLng, LatLngLiteral, LatLngTuple, LeafletEvent, LeafletMouseEvent, LineCapShape, LineJoinShape, PathOptions, PopupEvent, TooltipEvent } from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';
/**
 * Angular2 directive for circle-markers of Leaflet.
 *
 * *You can use this directive in an Angular2 template after importing `YagaModule`.*
 *
 * How to use in a template:
 * ```html
 * <yaga-map>
 *     <yaga-circle-marker
 *         [(display)]="..."
 *         [(stroke)]="..."
 *         [(color)]="..."
 *         [(weight)]="..."
 *         [(opacity)]="..."
 *         [(lineCap)]="..."
 *         [(lineJoin)]="..."
 *         [(dashArray)]="..."
 *         [(dashOffset)]="..."
 *         [(fill)]="..."
 *         [(fillColor)]="..."
 *         [(fillOpacity)]="..."
 *         [(fillRule)]="..."
 *         [(className)]="..."
 *         [(lat)]="..."
 *         [(lng)]="..."
 *         [(radius)]="..."
 *
 *         (click)="..."
 *         (dblclick)="..."
 *         (mousedown)="..."
 *         (mouseup)="..."
 *         (mouseover)="..."
 *         (mouseout)="..."
 *         (mousemove)="..."
 *         (contextmenu)="..."
 *         (keypress)="..."
 *         (preclick)="..."
 *
 *         [interactive]="..."
 *         [properties]="..."
 *         >
 *     </yaga-circle-marker>
 * </yaga-map>
 * ```
 *
 * @link http://leafletjs.com/reference-1.2.0.html#circlemarker Original Leaflet documentation
 * @link https://leaflet-ng2.yagajs.org/latest/browser-test?grep=Circle-Marker%20Directive Unit-Test
 * @link https://leaflet-ng2.yagajs.org/latest/coverage/lcov-report/lib/circle-marker.directive.js.html
 * Test coverage
 * @link https://leaflet-ng2.yagajs.org/latest/typedoc/classes/circle-marker.directive.js.html API documentation
 * @example https://leaflet-ng2.yagajs.org/latest/examples/circle-marker-directive/
 */
export declare class CircleMarkerDirective<T> extends CircleMarker implements OnDestroy, AfterContentInit {
    /**
     * Two-Way bound property for the display status of the geometry.
     * Use it with `<yaga-circle-marker [(display)]="someValue">`
     * or `<yaga-circle-marker (displayChange)="processEvent($event)">`
     */
    displayChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the stroke state of the geometry.
     * Use it with `<yaga-circle-marker [(stroke)]="someValue">`
     * or `<yaga-circle-marker (strokeChange)="processEvent($event)">`
     */
    strokeChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the line-color of the geometry.
     * Use it with `<yaga-circle-marker [(color)]="someValue">`
     * or `<yaga-circle-marker (colorChange)="processEvent($event)">`
     */
    colorChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the weight of the geometry.
     * Use it with `<yaga-circle-marker [(weight)]="someValue">`
     * or `<yaga-circle-marker (weightChange)="processEvent($event)">`
     */
    weightChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the opacity of the geometry.
     * Use it with `<yaga-circle-marker [(opacity)]="someValue">`
     * or `<yaga-circle-marker (opacityChange)="processEvent($event)">`
     */
    opacityChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the lineCap of the geometry.
     * Use it with `<yaga-circle-marker [(lineCap)]="someValue">`
     * or `<yaga-circle-marker (lineCapChange)="processEvent($event)">`
     */
    lineCapChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the lineJoin of the geometry.
     * Use it with `<yaga-circle-marker [(lineJoin)]="someValue">`
     * or `<yaga-circle-marker (lineJoinChange)="processEvent($event)">`
     */
    lineJoinChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the dashArray of the geometry.
     * Use it with `<yaga-circle-marker [(dashArray)]="someValue">`
     * or `<yaga-circle-marker (dashArrayChange)="processEvent($event)">`
     */
    dashArrayChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the dashOffset of the geometry.
     * Use it with `<yaga-circle-marker [(dashOffset)]="someValue">`
     * or `<yaga-circle-marker (dashOffsetChange)="processEvent($event)">`
     */
    dashOffsetChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the fill state of the geometry.
     * Use it with `<yaga-circle-marker [(fill)]="someValue">`
     * or `<yaga-circle-marker (fillChange)="processEvent($event)">`
     */
    fillChange: EventEmitter<boolean>;
    /**
     * Two-Way bound property for the fill-color of the geometry.
     * Use it with `<yaga-circle-marker [(fillColor)]="someValue">`
     * or `<yaga-circle-marker (fillColorChange)="processEvent($event)">`
     */
    fillColorChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the fill-opacity of the geometry.
     * Use it with `<yaga-circle-marker [(fillOpacity)]="someValue">`
     * or `<yaga-circle-marker (fillOpacityChange)="processEvent($event)">`
     */
    fillOpacityChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the fill-rule of the geometry.
     * Use it with `<yaga-circle-marker [(fillRule)]="someValue">`
     * or `<yaga-circle-marker (fillRuleChange)="processEvent($event)">`
     */
    fillRuleChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the className of the geometry.
     * Use it with `<yaga-circle-marker [(className)]="someValue">`
     * or `<yaga-circle-marker (classNameChange)="processEvent($event)">`
     */
    classNameChange: EventEmitter<string>;
    /**
     * Two-Way bound property for the css-style of the geometry.
     * Use it with `<yaga-circle-marker [(style)]="someValue">`
     * or `<yaga-circle-marker (styleChange)="processEvent($event)">`
     */
    styleChange: EventEmitter<PathOptions>;
    /**
     * Two-Way bound property for the latlng-position of the geometry.
     * Use it with `<yaga-circle-marker [(position)]="someValue">`
     * or `<yaga-circle-marker (positionChange)="processEvent($event)">`
     */
    positionChange: EventEmitter<LatLng>;
    /**
     * Two-Way bound property for the latitude of the geometry.
     * Use it with `<yaga-circle-marker [(lat)]="someValue">`
     * or `<yaga-circle-marker (latChange)="processEvent($event)">`
     */
    latChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the longitude of the geometry.
     * Use it with `<yaga-circle-marker [(lng)]="someValue">`
     * or `<yaga-circle-marker (lngChange)="processEvent($event)">`
     */
    lngChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the radius of the geometry.
     * Use it with `<yaga-circle-marker [(radius)]="someValue">`
     * or `<yaga-circle-marker (radiusChange)="processEvent($event)">`
     */
    radiusChange: EventEmitter<number>;
    /**
     * Two-Way bound property for the geometry represented as GeoJSON.
     * Use it with `<yaga-circle-marker [(geoJSON)]="someValue">`
     * or `<yaga-circle-marker (geoJSONChange)="processEvent($event)">`
     */
    geoJSONChange: EventEmitter<GeoJSONFeature<GeoJSON.Point, T>>;
    /**
     * From leaflet fired add event.
     * Use it with `<yaga-circle-marker (add)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-add Original Leaflet documentation
     */
    addEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired remove event.
     * Use it with `<yaga-circle-marker (remove)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-remove Original Leaflet documentation
     */
    removeEvent: EventEmitter<LeafletEvent>;
    /**
     * From leaflet fired popupopen event.
     * Use it with `<yaga-circle-marker (popupopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-popupopen Original Leaflet documentation
     */
    popupopenEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired popupclose event.
     * Use it with `<yaga-circle-marker (popupclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-popupclose Original Leaflet documentation
     */
    popupcloseEvent: EventEmitter<PopupEvent>;
    /**
     * From leaflet fired tooltipopen event.
     * Use it with `<yaga-circle-marker (tooltipopen)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-tooltipopen Original Leaflet documentation
     */
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired tooltipclose event.
     * Use it with `<yaga-circle-marker (tooltipclose)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-tooltipclose Original Leaflet documentation
     */
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    /**
     * From leaflet fired click event.
     * Use it with `<yaga-circle-marker (click)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-click Original Leaflet documentation
     */
    clickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired dbclick event.
     * Use it with `<yaga-circle-marker (dbclick)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-dbclick Original Leaflet documentation
     */
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mousedown event.
     * Use it with `<yaga-circle-marker (mousedown)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-mousedown Original Leaflet documentation
     */
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseover event.
     * Use it with `<yaga-circle-marker (mouseover)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-mouseover Original Leaflet documentation
     */
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired mouseout event.
     * Use it with `<yaga-circle-marker (mouseout)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-mouseout Original Leaflet documentation
     */
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    /**
     * From leaflet fired contextmenu event.
     * Use it with `<yaga-circle-marker (contextmenu)="processEvent($event)">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-contextmenu Original Leaflet documentation
     */
    contextmenuEvent: EventEmitter<LeafletMouseEvent>;
    private initialized;
    constructor(layerGroupProvider: LayerGroupProvider, layerProvider: LayerProvider);
    /**
     * Internal method that provides the initialization of the child popup or tooltip
     */
    ngAfterContentInit(): void;
    /**
     * Internal method to provide the removal of the layer in Leaflet, when removing it from the Angular template
     */
    ngOnDestroy(): void;
    /**
     * Derived method of the original setLatLng.
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-setlatlng Original Leaflet documentation
     */
    setLatLng(val: LatLng | LatLngTuple | LatLngLiteral): this;
    /**
     * Two-Way bound property for the position of the circle.
     * Use it with `<yaga-circle-marker [(position)]="someValue">` or `<yaga-circle-marker [position]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-l-circlemarker Original Leaflet documentation
     */
    position: LatLng | LatLngTuple | LatLngLiteral;
    /**
     * Two-Way bound property for the latitude (position) of the circle.
     * Use it with `<yaga-circle-marker [(lat)]="someValue">` or `<yaga-circle-marker [lat]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-l-circlemarker Original Leaflet documentation
     */
    lat: number;
    /**
     * Two-Way bound property for the longitude (position) of the circle.
     * Use it with `<yaga-circle-marker [(lng)]="someValue">` or `<yaga-circle-marker [lng]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-l-circlemarker Original Leaflet documentation
     */
    lng: number;
    /**
     * Derived method of the original setRadius.
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-setradius Original Leaflet documentation
     */
    setRadius(val: number): this;
    /**
     * Two-Way bound property for the radius of the circle.
     * Use it with `<yaga-circle-marker [(radius)]="someValue">` or `<yaga-circle-marker [radius]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-radius Original Leaflet documentation
     */
    radius: number;
    /**
     * Two-Way bound property for the geoJSON data.
     * Use it with `<yaga-circle-marker [(geoJSON)]="someValue">` or `<yaga-circle-marker [geoJSONChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-togeojson Original Leaflet documentation
     */
    geoJSON: GeoJSONFeature<GeoJSON.Point, T>;
    /**
     * Derived method of the original setStyle.
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-setstyle Original Leaflet documentation
     */
    setStyle(style: PathOptions): this;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-circle-marker [(opacity)]="someValue">` or `<yaga-circle-marker [opacityChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-opacity Original Leaflet documentation
     */
    opacity: number;
    /**
     * Two-Way bound property for the stroke.
     * Use it with `<yaga-circle-marker [(stroke)]="someValue">` or `<yaga-circle-marker [strokeChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-stroke Original Leaflet documentation
     */
    stroke: boolean;
    /**
     * Two-Way bound property for the color.
     * Use it with `<yaga-circle-marker [(color)]="someValue">` or `<yaga-circle-marker [colorChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-color Original Leaflet documentation
     */
    color: string;
    /**
     * Two-Way bound property for the weight.
     * Use it with `<yaga-circle-marker [(weight)]="someValue">` or `<yaga-circle-marker [weightChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-weight Original Leaflet documentation
     */
    weight: number;
    /**
     * Two-Way bound property for the lineCap.
     * Use it with `<yaga-circle-marker [(lineCap)]="someValue">` or `<yaga-circle-marker [lineCapChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-linecap Original Leaflet documentation
     */
    lineCap: LineCapShape;
    /**
     * Two-Way bound property for the lineJoin.
     * Use it with `<yaga-circle-marker [(lineJoin)]="someValue">`
     * or `<yaga-circle-marker [lineJoinChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-linejoin Original Leaflet documentation
     */
    lineJoin: LineJoinShape;
    /**
     * Two-Way bound property for the dashArray.
     * Use it with `<yaga-circle-marker [(dashArray)]="someValue">`
     * or `<yaga-circle-marker [dashArrayChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-dasharray Original Leaflet documentation
     */
    dashArray: string;
    /**
     * Two-Way bound property for the dashOffset.
     * Use it with `<yaga-circle-marker [(dashOffset)]="someValue">`
     * or `<yaga-circle-marker [dashOffsetChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-dashoffset Original Leaflet documentation
     */
    dashOffset: string;
    /**
     * Two-Way bound property for the fill.
     * Use it with `<yaga-circle-marker [(fill)]="someValue">` or `<yaga-circle-marker [fillChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-fill Original Leaflet documentation
     */
    fill: boolean;
    /**
     * Two-Way bound property for the fillColor.
     * Use it with `<yaga-circle-marker [(fillColor)]="someValue">`
     * or `<yaga-circle-marker [fillColorChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-fillcolor Original Leaflet documentation
     */
    fillColor: string;
    /**
     * Two-Way bound property for the fillOpacity.
     * Use it with `<yaga-circle-marker [(fillOpacity)]="someValue">`
     * or `<yaga-circle-marker [fillOpacityChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-fillopacity Original Leaflet documentation
     */
    fillOpacity: number;
    /**
     * Two-Way bound property for the fillRule.
     * Use it with `<yaga-circle-marker [(fillRule)]="someValue">`
     * or `<yaga-circle-marker [fillRuleChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-fillrule Original Leaflet documentation
     */
    fillRule: FillRule;
    /**
     * Two-Way bound property for the className.
     * Use it with `<yaga-circle-marker [(className)]="someValue">`
     * or `<yaga-circle-marker [classNameChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-classname Original Leaflet documentation
     */
    className: string;
    /**
     * Two-Way bound property for the opacity.
     * Use it with `<yaga-circle-marker [(style)]="someValue">` or `<yaga-circle-marker [styleChange]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#circlemarker-style Original Leaflet documentation
     */
    style: CircleMarkerOptions;
    /**
     * Two-Way bound property for the display state.
     * Use it with `<yaga-circle-marker [(display)]="someValue">` or `<yaga-circle-marker [displayChange]="someValue">`
     */
    display: boolean;
    /**
     * Input for the GeoJSON properties.
     * Use it with `<yaga-circle-marker [interactive]="someValue">`
     * @link http://leafletjs.com/reference-1.2.0.html#tilelayer-interactive Original Leaflet documentation
     */
    interactive: boolean;
    properties: T;
}
