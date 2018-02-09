"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var path_directives_spec_1 = require("./path-directives.spec");
var spec_1 = require("./spec");
describe('Circle-Marker Directive', function () {
    var map;
    var layer;
    var TEST_VALUE = leaflet_1.latLng(0, 1);
    var TEST_POINT = [3, 4];
    var TEST_GEOJSON = {
        geometry: {
            coordinates: [1, 3],
            type: 'Point',
        },
        properties: {},
        type: 'Feature',
    };
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.CircleMarkerDirective({ ref: map }, {});
        layer.ngAfterContentInit();
    });
    path_directives_spec_1.createPathTests(index_1.CircleMarkerDirective);
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
    describe('[(position)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.position = TEST_VALUE;
            chai_1.expect(layer._latlng).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.position = TEST_VALUE;
            chai_1.expect(layer.position).to.equal(TEST_VALUE);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            layer.setLatLng(TEST_VALUE);
            chai_1.expect(layer.position).to.equal(TEST_VALUE);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(TEST_VALUE);
                done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(TEST_VALUE);
                done();
            });
            layer.setLatLng(TEST_VALUE);
        });
        it('should fire geoJSON-change event when changing in Angular', function (done) {
            layer.geoJSONChange.subscribe(function () {
                done();
            });
            layer.position = TEST_VALUE;
        });
        it('should fire geoJSON-change event when changing in Leaflet', function (done) {
            layer.geoJSONChange.subscribe(function () {
                done();
            });
            layer.setLatLng(TEST_VALUE);
        });
    });
    describe('[(lat)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLat();
            layer.lat = val;
            chai_1.expect(layer.getLatLng().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLat();
            layer.lat = val;
            chai_1.expect(layer.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLat();
            layer.setLatLng([val, 0]);
            chai_1.expect(layer.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLat();
            layer.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.lat = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLat();
            layer.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLng();
            layer.lng = val;
            chai_1.expect(layer.getLatLng().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLng();
            layer.lng = val;
            chai_1.expect(layer.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLng();
            layer.setLatLng([0, val]);
            chai_1.expect(layer.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLng();
            layer.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.lng = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLng();
            layer.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.setLatLng([0, val]);
        });
    });
    describe('[(radius)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(100);
            layer.radius = val;
            chai_1.expect(layer.getRadius()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(100);
            layer.radius = val;
            chai_1.expect(layer.radius).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(100);
            layer.setRadius(val);
            chai_1.expect(layer.radius).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(100);
            layer.radiusChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.radius = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(100);
            layer.radiusChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                done();
            });
            layer.setRadius(val);
        });
    });
    describe('[(geoJSON)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.geoJSON = TEST_GEOJSON;
            chai_1.expect(layer.position.lng).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
            chai_1.expect(layer.position.lat).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.geoJSON = TEST_GEOJSON;
            chai_1.expect(layer.geoJSON.geometry.coordinates[0]).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
            chai_1.expect(layer.geoJSON.geometry.coordinates[1]).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
        });
        it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
            layer.setLatLng(TEST_POINT);
            chai_1.expect(layer.geoJSON.geometry.coordinates[0]).to.equal(TEST_POINT[1]);
            chai_1.expect(layer.geoJSON.geometry.coordinates[1]).to.equal(TEST_POINT[0]);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.geoJSONChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.geometry.coordinates[0]).to.equal(TEST_GEOJSON.geometry.coordinates[0]);
                chai_1.expect(eventVal.geometry.coordinates[1]).to.equal(TEST_GEOJSON.geometry.coordinates[1]);
                done();
            });
            layer.geoJSON = TEST_GEOJSON;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.geoJSONChange.subscribe(function (eventVal) {
                var values = eventVal.geometry.coordinates;
                chai_1.expect(values[0]).to.equal(TEST_POINT[1]);
                chai_1.expect(values[1]).to.equal(TEST_POINT[0]);
                done();
            });
            layer.setLatLng(TEST_POINT);
        });
    });
    describe('[properties]', function () {
        var layerWithProps;
        var TEST_OBJECT = {
            test: 'OK',
        };
        beforeEach(function () {
            layerWithProps = new index_1.CircleMarkerDirective({ ref: map }, {});
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            layerWithProps.properties = TEST_OBJECT;
            chai_1.expect(layerWithProps.feature.properties).to.equal(TEST_OBJECT);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layerWithProps.properties = TEST_OBJECT;
            chai_1.expect(layerWithProps.properties).to.equal(TEST_OBJECT);
        });
        it('should emit an event for GeoJSONChange when changing in Angular', function (done) {
            layerWithProps.geoJSONChange.subscribe(function (val) {
                chai_1.expect(val.properties).to.equal(TEST_OBJECT);
                done();
            });
            layerWithProps.properties = TEST_OBJECT;
        });
    });
    // Events
    describe('(add)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('add', testEvent);
        });
    });
    describe('(remove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.removeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('remove', testEvent);
        });
    });
    describe('(popupopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.popupopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.popupcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('popupclose', testEvent);
        });
    });
    describe('(tooltipopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tooltipopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tooltipcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('click', testEvent);
        });
    });
    describe('(dbclick)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.dbclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('dbclick', testEvent);
        });
    });
    describe('(mousedown)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.mousedownEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mousedown', testEvent);
        });
    });
    describe('(mouseover)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.mouseoverEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.mouseoutEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('mouseout', testEvent);
        });
    });
    describe('(contextmenu)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.contextmenuEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });
    describe('Popup in Circle Directive', function () {
        var popup;
        var testDiv;
        beforeEach(function () {
            testDiv = document.createElement('div');
            layer = new index_1.CircleMarkerDirective({ ref: map }, {});
            popup = new index_1.PopupDirective({ nativeElement: testDiv }, { ref: layer });
        });
        it('should bind popup', function () {
            layer.ngAfterContentInit();
            chai_1.expect(layer._popup).to.equal(popup);
        });
    });
    describe('Tooltip in Circle Directive', function () {
        var tooltip;
        var testDiv;
        beforeEach(function () {
            testDiv = document.createElement('div');
            layer = new index_1.CircleMarkerDirective({ ref: map }, {});
            tooltip = new index_1.TooltipDirective({ ref: layer }, { nativeElement: testDiv });
        });
        it('should bind tooltip', function () {
            chai_1.expect(layer._tooltip).to.equal(tooltip);
        });
    });
    describe('Destroying a Circle Directive', function () {
        before(function () {
            // Hack to get write-access to readonly property
            layer = new index_1.CircleMarkerDirective({ ref: map }, {});
        });
        it('should remove Circle Directive from map on destroy', function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            chai_1.expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
//# sourceMappingURL=circle-marker.directive.spec.js.map