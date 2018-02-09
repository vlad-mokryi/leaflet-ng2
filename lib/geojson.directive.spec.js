"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
describe('GeoJSON Directive', function () {
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.GeoJSONDirective({ ref: map }, new index_1.LayerGroupProvider(), {});
    });
    var TEST_VALUE = {
        features: [
            {
                geometry: {
                    coordinates: [7, 51],
                    type: 'Point',
                },
                properties: {
                    test: 'OK',
                },
                type: 'Feature',
            },
        ],
        type: 'FeatureCollection',
    };
    describe('[(data)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.data = TEST_VALUE;
            chai_1.expect(layer.toGeoJSON()).to.deep.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.data = TEST_VALUE;
            chai_1.expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should be changed data in Angular when changing in Leaflet', function () {
            layer.setData(TEST_VALUE);
            chai_1.expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
            layer.addData(TEST_VALUE.features[0]);
            chai_1.expect(layer.data).to.deep.equal(TEST_VALUE);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.ngAfterContentInit();
            layer.dataChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.data = TEST_VALUE;
        });
        it('should fire an event when changing internal setData function', function (done) {
            layer.ngAfterContentInit();
            layer.dataChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.setData(TEST_VALUE);
        });
        it('should fire an event when adding in Leaflet', function (done) {
            layer.ngAfterContentInit();
            layer.dataChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.deep.equal(TEST_VALUE);
                return done();
            });
            layer.addData(TEST_VALUE.features[0]);
        });
    });
    describe('[filter]', function () {
        /* istanbul ignore next */
        var FILTER_FN = function () {
            return true;
        };
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.filter = FILTER_FN;
            chai_1.expect((layer.middleware).filter)
                .to.equal(FILTER_FN);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.filter = FILTER_FN;
            chai_1.expect(layer.filter).to.equal(FILTER_FN);
        });
        it('should use the filter function when adding data', function (done) {
            var TEST_POINT = {
                geometry: {
                    coordinates: [0, 1],
                    type: 'Point',
                },
                properties: {},
                type: 'Feature',
            };
            /* tslint:disable:max-line-length */
            layer.filter = function (elem) {
                chai_1.expect(elem).to.equal(TEST_POINT);
                done();
                return true;
            };
            /* tslint:enable */
            layer.data = {
                features: [TEST_POINT],
                type: 'FeatureCollection',
            };
        });
    });
    describe('[pointToLayer]', function () {
        /* istanbul ignore next */
        var POINT_TO_LAYER_FN = function (feature) {
            return new leaflet_1.Marker({ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] });
        };
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.pointToLayer = POINT_TO_LAYER_FN;
            chai_1.expect((layer.middleware).pointToLayer)
                .to.equal(POINT_TO_LAYER_FN);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.pointToLayer = POINT_TO_LAYER_FN;
            chai_1.expect(layer.pointToLayer).to.equal(POINT_TO_LAYER_FN);
        });
        it('should use the filter function when adding data', function (done) {
            var TEST_POINT = {
                geometry: {
                    coordinates: [0, 1],
                    type: 'Point',
                },
                properties: {},
                type: 'Feature',
            };
            layer.pointToLayer = function (feature) {
                chai_1.expect(feature).to.equal(TEST_POINT);
                done();
                return new leaflet_1.Marker({ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] });
            };
            layer.data = {
                features: [TEST_POINT],
                type: 'FeatureCollection',
            };
        });
    });
    describe('[styler]', function () {
        /* istanbul ignore next */
        var STYLER_FN = function (feature, defaultStyle) {
            return {};
        };
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.styler = STYLER_FN;
            chai_1.expect((layer.middleware).styler)
                .to.equal(STYLER_FN);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.styler = STYLER_FN;
            chai_1.expect(layer.styler).to.equal(STYLER_FN);
        });
        it('should use the filter function when adding data', function (done) {
            var TEST_POINT = {
                geometry: {
                    coordinates: [0, 1],
                    type: 'Point',
                },
                properties: {},
                type: 'Feature',
            };
            /* tslint:disable:max-line-length */
            layer.styler = function (feature, defaultStyle) {
                chai_1.expect(feature).to.equal(TEST_POINT);
                done();
                return {};
            };
            /* tslint:enable */
            layer.data = {
                features: [TEST_POINT],
                type: 'FeatureCollection',
            };
        });
    });
    describe('[defaultStyle]', function () {
        var NEW_DEFAULT_STYLE = {};
        it('should have the default style from consts as fallback', function () {
            chai_1.expect(layer.defaultStyle)
                .to.equal(index_1.DEFAULT_STYLE);
            chai_1.expect((layer.middleware).defaultStyle)
                .to.equal(index_1.DEFAULT_STYLE);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.defaultStyle = NEW_DEFAULT_STYLE;
            chai_1.expect((layer.middleware).defaultStyle)
                .to.equal(NEW_DEFAULT_STYLE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.defaultStyle = NEW_DEFAULT_STYLE;
            chai_1.expect(layer.defaultStyle).to.equal(NEW_DEFAULT_STYLE);
        });
        it('should use the default style from consts as fallback in the styler function', function (done) {
            var TEST_POINT = {
                geometry: {
                    coordinates: [0, 1],
                    type: 'Point',
                },
                properties: {},
                type: 'Feature',
            };
            layer.styler = function (feature, defaultStyle) {
                chai_1.expect(defaultStyle).to.equal(index_1.DEFAULT_STYLE);
                done();
                return {};
            };
            layer.data = {
                features: [TEST_POINT],
                type: 'FeatureCollection',
            };
        });
        it('should use the given default style in the styler function', function (done) {
            var TEST_POINT = {
                geometry: {
                    coordinates: [0, 1],
                    type: 'Point',
                },
                properties: {},
                type: 'Feature',
            };
            layer.styler = function (feature, defaultStyle) {
                chai_1.expect(defaultStyle).to.equal(NEW_DEFAULT_STYLE);
                done();
                return {};
            };
            layer.defaultStyle = NEW_DEFAULT_STYLE;
            layer.data = {
                features: [TEST_POINT],
                type: 'FeatureCollection',
            };
        });
    });
    var testHandle = {};
    var testEvent = { testHandle: testHandle };
    describe('(add)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.removeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.popupopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.popupcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.tooltipopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.tooltipcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.dbclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.mousedownEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.mouseoverEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.mouseoutEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            layer.contextmenuEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });
    describe('Popup in GeoJSON Directive', function () {
        var popup;
        var testDiv;
        var puLayer;
        before(function () {
            testDiv = document.createElement('div');
            puLayer = new index_1.GeoJSONDirective({ ref: map }, new index_1.LayerGroupProvider(), {});
            popup = new index_1.PopupDirective({ nativeElement: testDiv }, { ref: puLayer });
        });
        it('should bind popup', function () {
            chai_1.expect(puLayer._popup).to.equal(popup);
        });
    });
    describe('Tooltip in GeoJSON Directive', function () {
        var tooltip;
        var testDiv;
        var ttLayer;
        before(function () {
            testDiv = document.createElement('div');
            ttLayer = new index_1.GeoJSONDirective({ ref: map }, new index_1.LayerGroupProvider(), {});
            tooltip = new index_1.TooltipDirective({ ref: ttLayer }, { nativeElement: testDiv });
        });
        it('should bind tooltip', function () {
            chai_1.expect(ttLayer._tooltip).to.equal(tooltip);
        });
    });
    describe('Destroying a GeoJSON Directive', function () {
        it('should remove Polyline Directive from map on destroy', function () {
            /* istanbul ignore if */
            if (!map.hasLayer(layer)) {
                throw new Error('The layer is not part of the map before destroying');
            }
            layer.ngOnDestroy();
            /* istanbul ignore if */
            if (map.hasLayer(layer)) {
                throw new Error('The layer is still part of the map after destroying');
            }
        });
    });
});
//# sourceMappingURL=geojson.directive.spec.js.map