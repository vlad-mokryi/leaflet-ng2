"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var path_directives_spec_1 = require("./path-directives.spec");
var spec_1 = require("./spec");
describe('Polygon Directive', function () {
    path_directives_spec_1.createPathTests(index_1.PolygonDirective);
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.PolygonDirective({ ref: map }, {});
    });
    describe('[(display)]', function () {
        it('should set DOM container style to display:none when not displaying', function () {
            layer.display = false;
            chai_1.expect(layer.getElement().style.display).to.equal('none');
        });
        it('should reset DOM container style when display is true again', function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(layer.getElement().style.display).to.not.equal('none');
        });
        it('should set to false by removing from map', function (done) {
            layer.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(false);
                chai_1.expect(layer.display).to.equal(false);
                done();
            });
            map.removeLayer(layer);
        });
        it('should set to true when adding to map again', function (done) {
            map.removeLayer(layer);
            layer.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(true);
                chai_1.expect(layer.display).to.equal(true);
                done();
            });
            map.addLayer(layer);
        });
    });
    describe('[(latlngs)]', function () {
        describe('for Polygons', function () {
            var TEST_VALUE = [[leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)]];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer._latlngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when adding in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                chai_1.expect(layer.latLngs[0][3].lat).to.equal(3);
                chai_1.expect(layer.latLngs[0][3].lng).to.equal(3);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygons', function () {
            var TEST_VALUE = [
                [[leaflet_1.latLng(1, 0), leaflet_1.latLng(1, 1), leaflet_1.latLng(0, 1)]],
                [[leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)]],
            ];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer._latlngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.latLngs = TEST_VALUE;
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                chai_1.expect(layer.latLngs).to.deep.equal(TEST_VALUE);
            });
            it('should be changed in Angular when adding in Leaflet', function () {
                layer.setLatLngs(TEST_VALUE);
                layer.addLatLng([3, 3]);
                chai_1.expect(layer.latLngs[0][0][3].lat).to.equal(3);
                chai_1.expect(layer.latLngs[0][0][3].lng).to.equal(3);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.latLngsChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire geoJSON-change event when changing in Angular', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    return done();
                });
                layer.latLngs = TEST_VALUE;
            });
            it('should fire geoJSON-change event when changing in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    return done();
                });
                layer.setLatLngs(TEST_VALUE);
            });
            it('should fire an change event when adding in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function () {
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });
    describe('[(geoJSON)]', function () {
        describe('for Polygon', function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    type: 'Polygon',
                },
                properties: {},
                type: 'Feature',
            };
            var TEST_POLYGON = [[[0, 0], [1, 0], [1, 1], [0, 0]]];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    layer.latLngs[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    layer.latLngs[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    layer.latLngs[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    layer.latLngs[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    layer.latLngs[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                }
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_POLYGON);
                chai_1.expect(index_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_POLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][3][1] !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.geoJSON.geometry.coordinates);
                }
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.geoJSON = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(index_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_POLYGON);
                    return done();
                });
                layer.setLatLngs(TEST_POLYGON);
            });
            it('should fire an event when adding in Leaflet', function (done) {
                layer.setLatLngs(TEST_POLYGON);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[0][3][0] !== 3 ||
                        values[0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiPolygon', function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [
                        [[[1, 0], [1, 1], [0, 1], [1, 0]]],
                        [[[0, 1], [1, 1], [0, 0], [0, 1]]],
                    ],
                    type: 'MultiPolygon',
                },
                properties: {},
                type: 'Feature',
            };
            var TEST_MULTIPOLYGON = [
                [[[0, 0], [1, 0], [1, 1], [0, 0]]],
                [[[0, 0], [0, 1], [1, 1], [0, 0]]],
            ];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0][0] ||
                    layer.latLngs[0][0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][0][1] ||
                    layer.latLngs[0][0][1].lng !== TEST_VALUE.geometry.coordinates[0][0][1][0] ||
                    layer.latLngs[0][0][1].lat !== TEST_VALUE.geometry.coordinates[0][0][1][1] ||
                    layer.latLngs[0][0][2].lng !== TEST_VALUE.geometry.coordinates[0][0][2][0] ||
                    layer.latLngs[0][0][2].lat !== TEST_VALUE.geometry.coordinates[0][0][2][1] ||
                    layer.latLngs[1][0][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0][0] ||
                    layer.latLngs[1][0][0].lat !== TEST_VALUE.geometry.coordinates[1][0][0][1] ||
                    layer.latLngs[1][0][1].lng !== TEST_VALUE.geometry.coordinates[1][0][1][0] ||
                    layer.latLngs[1][0][1].lat !== TEST_VALUE.geometry.coordinates[1][0][1][1] ||
                    layer.latLngs[1][0][2].lng !== TEST_VALUE.geometry.coordinates[1][0][2][0] ||
                    layer.latLngs[1][0][2].lat !== TEST_VALUE.geometry.coordinates[1][0][2][1]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                }
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                chai_1.expect(index_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiPolygon') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[0][0][3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[0][0][3][1] !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.geoJSON.geometry.coordinates);
                }
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                    return done();
                });
                layer.geoJSON = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.geoJSONChange.subscribe(function (eventVal) {
                    chai_1.expect(index_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTIPOLYGON);
                    return done();
                });
                layer.setLatLngs(TEST_MULTIPOLYGON);
            });
            it('should fire an event when adding in Leaflet', function (done) {
                layer.setLatLngs(TEST_MULTIPOLYGON);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[0][0][3][0] !== 3 ||
                        values[0][0][3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
    });
    describe('[smoothFactor]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 0);
            layer.smoothFactor = val;
            chai_1.expect(layer.options.smoothFactor).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 0);
            layer.smoothFactor = val;
            chai_1.expect(layer.smoothFactor).to.equal(val);
        });
    });
    describe('[properties]', function () {
        var TEST_OBJECT = {
            test: 'OK',
        };
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.properties = TEST_OBJECT;
            chai_1.expect(layer.feature.properties).to.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.properties = TEST_OBJECT;
            chai_1.expect(layer.properties).to.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', function (done) {
            layer.geoJSONChange.subscribe(function (val) {
                chai_1.expect(val.properties).to.equal(TEST_OBJECT);
                return done();
            });
            layer.properties = TEST_OBJECT;
        });
    });
    describe('[noClip]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.noClip = false;
            chai_1.expect(layer.options.noClip).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.noClip = false;
            layer.noClip = true;
            chai_1.expect(layer.options.noClip).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.noClip = false;
            chai_1.expect(layer.noClip).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.noClip = true;
            chai_1.expect(layer.noClip).to.equal(true);
        });
    });
    describe('Popup in Polygon Directive', function () {
        var layerWithPopup;
        var popup;
        var testDiv;
        before(function () {
            testDiv = document.createElement('div');
            layerWithPopup = new index_1.PolygonDirective({ ref: map }, {});
            popup = new index_1.PopupDirective({ nativeElement: testDiv }, { ref: layerWithPopup });
        });
        it('should bind popup', function () {
            chai_1.expect(layerWithPopup._popup).to.equal(popup);
        });
    });
    describe('Tooltip in Polygon Directive', function () {
        var layerWithTooltip;
        var tooltip;
        var testDiv;
        before(function () {
            testDiv = document.createElement('div');
            layerWithTooltip = new index_1.PolygonDirective({ ref: map }, {});
            tooltip = new index_1.TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it('should bind tooltip', function () {
            chai_1.expect(layerWithTooltip._tooltip).to.equal(tooltip);
        });
    });
    describe('Destroying a Polygon Directive', function () {
        it('should remove Polygon Directive from map on destroy', function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            chai_1.expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
//# sourceMappingURL=polygon.directive.spec.js.map