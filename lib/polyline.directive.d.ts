import { EventEmitter, OnDestroy } from '@angular/core';
import { Feature as GeoJSONFeature } from 'geojson';
import { FillRule, LatLng, LatLngExpression, LatLngTuple, LeafletEvent, LeafletMouseEvent, LineCapShape, LineJoinShape, PathOptions, Polyline, PolylineOptions, PopupEvent, TooltipEvent } from 'leaflet';
import { LayerGroupProvider } from './layer-group.provider';
import { LayerProvider } from './layer.provider';
export declare class PolylineDirective<T> extends Polyline implements OnDestroy {
    displayChange: EventEmitter<boolean>;
    strokeChange: EventEmitter<boolean>;
    colorChange: EventEmitter<string>;
    weightChange: EventEmitter<number>;
    opacityChange: EventEmitter<number>;
    lineCapChange: EventEmitter<string>;
    lineJoinChange: EventEmitter<string>;
    dashArrayChange: EventEmitter<string>;
    dashOffsetChange: EventEmitter<string>;
    fillChange: EventEmitter<boolean>;
    fillColorChange: EventEmitter<string>;
    fillOpacityChange: EventEmitter<number>;
    fillRuleChange: EventEmitter<string>;
    classNameChange: EventEmitter<string>;
    styleChange: EventEmitter<PathOptions>;
    latLngsChange: EventEmitter<LatLng[]>;
    geoJSONChange: EventEmitter<GeoJSONFeature<GeoJSON.LineString | GeoJSON.MultiLineString, T>>;
    addEvent: EventEmitter<LeafletEvent>;
    removeEvent: EventEmitter<LeafletEvent>;
    popupopenEvent: EventEmitter<PopupEvent>;
    popupcloseEvent: EventEmitter<PopupEvent>;
    tooltipopenEvent: EventEmitter<TooltipEvent>;
    tooltipcloseEvent: EventEmitter<TooltipEvent>;
    clickEvent: EventEmitter<LeafletMouseEvent>;
    dbclickEvent: EventEmitter<LeafletMouseEvent>;
    mousedownEvent: EventEmitter<LeafletMouseEvent>;
    mouseoverEvent: EventEmitter<LeafletMouseEvent>;
    mouseoutEvent: EventEmitter<LeafletMouseEvent>;
    contextmenuEvent: EventEmitter<LeafletMouseEvent>;
    constructor(layerGroupProvider: LayerGroupProvider, layerProvider: LayerProvider);
    ngOnDestroy(): void;
    setLatLngs(val: (Array<(LatLng | LatLngTuple | LatLngExpression)> | Array<Array<(LatLng | LatLngTuple | LatLngExpression)>>)): this;
    addLatLng(val: (LatLng | LatLngTuple | LatLngExpression) | Array<(LatLng | LatLngTuple | LatLngExpression)>): this;
    latLngs: LatLng[] | LatLng[][];
    geoJSON: GeoJSONFeature<GeoJSON.LineString | GeoJSON.MultiLineString, T>;
    setStyle(style: PathOptions): this;
    opacity: number;
    stroke: boolean;
    color: string;
    weight: number;
    lineCap: LineCapShape;
    lineJoin: LineJoinShape;
    dashArray: string;
    dashOffset: string;
    fill: boolean;
    fillColor: string;
    fillOpacity: number;
    fillRule: FillRule;
    className: string;
    style: PolylineOptions;
    display: boolean;
    interactive: boolean;
    smoothFactor: number;
    noClip: boolean;
    properties: T;
}