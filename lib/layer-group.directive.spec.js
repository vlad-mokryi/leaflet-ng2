"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
describe('Layer-Group Directive', function () {
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        layer = new index_1.LayerGroupDirective({ ref: map }, {}, {});
    });
    describe('[(display)]', function () {
        it('should remove layer when not displaying', function () {
            layer.display = false;
            chai_1.expect(layer._map).to.equal(null);
        });
        it('should re-add layer when display is true again', function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(layer._map).to.equal(layer.parentLayerGroup);
        });
        it('should set to false by removing from map', function (done) {
            setTimeout(function () {
                layer.displayChange.subscribe(function (val) {
                    chai_1.expect(val).to.equal(false);
                    chai_1.expect(layer.display).to.equal(false);
                    done();
                });
                map.removeLayer(layer);
            }, 0);
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
    // Events
    describe('(add)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tooltipclose', testEvent);
        });
    });
    // Inputs
    describe('[attribution]', function () {
        var attributionControl;
        beforeEach(function () {
            attributionControl = new index_1.AttributionControlDirective({ ref: map });
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'Test attribution';
            layer.attribution = val;
            // TODO: fix in official type definition
            chai_1.expect(layer.options.attribution).to.equal(val);
            chai_1.expect(attributionControl.attributions).to.contain(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'Test attribution';
            layer.attribution = val;
            chai_1.expect(layer.attribution).to.equal(val);
            chai_1.expect(attributionControl.attributions).to.contain(val);
        });
        it('should remove old attribution when changing in Angular', function () {
            var oldVal = 'Old test attribution';
            var newVal = 'Test attribution';
            layer.attribution = oldVal;
            layer.attribution = newVal;
            chai_1.expect(attributionControl.attributions).to.contain(newVal);
            chai_1.expect(attributionControl.attributions).to.not.contain(oldVal);
        });
    });
    describe('Destroying a Layer-Group Directive', function () {
        it('should remove Tile-Layer Directive from map on destroy', function () {
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
//# sourceMappingURL=layer-group.directive.spec.js.map