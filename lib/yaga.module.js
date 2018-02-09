"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var attribution_control_directive_1 = require("./attribution-control.directive");
var base_layer_directive_1 = require("./base-layer.directive");
var circle_marker_directive_1 = require("./circle-marker.directive");
var circle_directive_1 = require("./circle.directive");
var div_icon_directive_1 = require("./div-icon.directive");
var feature_group_directive_1 = require("./feature-group.directive");
var geojson_directive_1 = require("./geojson.directive");
var icon_directive_1 = require("./icon.directive");
var image_overlay_directive_1 = require("./image-overlay.directive");
var layer_group_directive_1 = require("./layer-group.directive");
var layers_control_directive_1 = require("./layers-control.directive");
var map_component_1 = require("./map.component");
var marker_directive_1 = require("./marker.directive");
var overlay_layer_directive_1 = require("./overlay-layer.directive");
var polygon_directive_1 = require("./polygon.directive");
var polyline_directive_1 = require("./polyline.directive");
var popup_directive_1 = require("./popup.directive");
var rectangle_directive_1 = require("./rectangle.directive");
var scale_control_directive_1 = require("./scale-control.directive");
var tile_layer_directive_1 = require("./tile-layer.directive");
var tooltip_directive_1 = require("./tooltip.directive");
var wms_layer_directive_1 = require("./wms-layer.directive");
var zoom_control_directive_1 = require("./zoom-control.directive");
/**
 * Angular 2++ module that you can use to import all directives of YAGA's leaflet-ng2 into your Angular application.
 *
 * ```
 * import { NgModule } from '@angular/core';
 * import { YagaModule } from '@yaga/leaflet-ng2';
 *
 * ; @NgModule({
 *     imports: [
 *         YagaModule,
 *     ],
 * })
 * export class AppModule {}
 * ```
 */
var YagaModule = /** @class */ (function () {
    function YagaModule() {
    }
    YagaModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        attribution_control_directive_1.AttributionControlDirective,
                        circle_marker_directive_1.CircleMarkerDirective,
                        circle_directive_1.CircleDirective,
                        div_icon_directive_1.DivIconDirective,
                        feature_group_directive_1.FeatureGroupDirective,
                        geojson_directive_1.GeoJSONDirective,
                        icon_directive_1.IconDirective,
                        image_overlay_directive_1.ImageOverlayDirective,
                        layer_group_directive_1.LayerGroupDirective,
                        layers_control_directive_1.LayersControlDirective,
                        map_component_1.MapComponent,
                        marker_directive_1.MarkerDirective,
                        overlay_layer_directive_1.OverlayLayerDirective,
                        polygon_directive_1.PolygonDirective,
                        polyline_directive_1.PolylineDirective,
                        popup_directive_1.PopupDirective,
                        rectangle_directive_1.RectangleDirective,
                        scale_control_directive_1.ScaleControlDirective,
                        tile_layer_directive_1.TileLayerDirective,
                        tooltip_directive_1.TooltipDirective,
                        wms_layer_directive_1.WmsLayerDirective,
                        zoom_control_directive_1.ZoomControlDirective,
                        base_layer_directive_1.BaseLayerDirective,
                    ],
                    exports: [
                        attribution_control_directive_1.AttributionControlDirective,
                        circle_marker_directive_1.CircleMarkerDirective,
                        circle_directive_1.CircleDirective,
                        div_icon_directive_1.DivIconDirective,
                        feature_group_directive_1.FeatureGroupDirective,
                        geojson_directive_1.GeoJSONDirective,
                        icon_directive_1.IconDirective,
                        image_overlay_directive_1.ImageOverlayDirective,
                        layer_group_directive_1.LayerGroupDirective,
                        layers_control_directive_1.LayersControlDirective,
                        map_component_1.MapComponent,
                        marker_directive_1.MarkerDirective,
                        overlay_layer_directive_1.OverlayLayerDirective,
                        polygon_directive_1.PolygonDirective,
                        polyline_directive_1.PolylineDirective,
                        popup_directive_1.PopupDirective,
                        rectangle_directive_1.RectangleDirective,
                        scale_control_directive_1.ScaleControlDirective,
                        tile_layer_directive_1.TileLayerDirective,
                        tooltip_directive_1.TooltipDirective,
                        wms_layer_directive_1.WmsLayerDirective,
                        zoom_control_directive_1.ZoomControlDirective,
                        base_layer_directive_1.BaseLayerDirective,
                    ],
                },] },
    ];
    /** @nocollapse */
    YagaModule.ctorParameters = function () { return []; };
    return YagaModule;
}());
exports.YagaModule = YagaModule;
//# sourceMappingURL=yaga.module.js.map