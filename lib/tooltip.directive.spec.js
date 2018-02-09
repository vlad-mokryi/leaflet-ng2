"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
describe('Tooltip Directive', function () {
    var map;
    var tooltip;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        tooltip = new index_1.TooltipDirective({ ref: leaflet_1.marker([0, 0]) }, { nativeElement: document.createElement('div') });
        tooltip._contentNode = document.createElement('div');
        tooltip._container = document.createElement('div');
    });
    describe('[(opened)]', function () {
        beforeEach(function () {
            tooltip._wrapper = document.createElement('div');
            tooltip.setLatLng(leaflet_1.latLng(0, 0));
            map.openTooltip(tooltip);
        });
        it('should remove DOM container when not opened', function () {
            tooltip.opened = false;
            /* istanbul ignore if */
            if (tooltip._container.parentNode) {
                throw new Error('Map is still parent element of the tooltip');
            }
        });
        it('should re-add DOM container when opened is true again', function () {
            tooltip.opened = true;
            /* istanbul ignore if */
            if (!tooltip._container.parentNode) {
                throw new Error('Map is still parent element of the tooltip');
            }
        });
    });
    describe('[(content)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            tooltip.content = index_1.EXAMPLE_CONTENT;
            chai_1.expect(tooltip._content).to.equal(index_1.EXAMPLE_CONTENT);
        });
        it('should be changed in Angular when changing in Angular', function () {
            tooltip.content = index_1.EXAMPLE_CONTENT;
            chai_1.expect(tooltip.content).to.equal(index_1.EXAMPLE_CONTENT);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            tooltip.setContent(index_1.EXAMPLE_CONTENT);
            chai_1.expect(tooltip.content).to.equal(index_1.EXAMPLE_CONTENT);
        });
        it('should fire an event when changing in Angular', function (done) {
            tooltip.contentChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.EXAMPLE_CONTENT);
                return done();
            });
            tooltip.content = index_1.EXAMPLE_CONTENT;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            tooltip.content = index_1.EXAMPLE_CONTENT;
            tooltip.contentChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.EXAMPLE_CONTENT + '?test');
                return done();
            });
            tooltip.setContent(index_1.EXAMPLE_CONTENT + '?test');
        });
    });
    describe('[(opacity)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber();
            tooltip.opacity = val;
            chai_1.expect(tooltip.options.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber();
            tooltip.opacity = val;
            chai_1.expect(tooltip.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber();
            tooltip.setOpacity(val);
            chai_1.expect(tooltip.opacity).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber();
            tooltip.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            tooltip.opacity = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber();
            tooltip.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            tooltip.setOpacity(val);
        });
    });
    describe('[(lat)]', function () {
        beforeEach(function () {
            tooltip.setLatLng(leaflet_1.latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLat();
            tooltip.lat = val;
            chai_1.expect(tooltip.getLatLng().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLat();
            tooltip.lat = val;
            chai_1.expect(tooltip.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLat();
            tooltip.setLatLng([val, 0]);
            chai_1.expect(tooltip.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLat();
            tooltip.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            tooltip.lat = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLat();
            tooltip.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            tooltip.setLatLng([val, 0]);
        });
    });
    describe('[(lng)]', function () {
        beforeEach(function () {
            tooltip.setLatLng(leaflet_1.latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLng();
            tooltip.lng = val;
            chai_1.expect(tooltip.getLatLng().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLng();
            tooltip.lng = val;
            chai_1.expect(tooltip.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLng();
            tooltip.setLatLng([0, val]);
            chai_1.expect(tooltip.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLng();
            tooltip.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            tooltip.lng = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLng();
            tooltip.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            tooltip.setLatLng([0, val]);
        });
    });
    describe('[(position)]', function () {
        beforeEach(function () {
            tooltip.setLatLng(leaflet_1.latLng(0, 0));
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLatLng();
            tooltip.position = val;
            chai_1.expect(tooltip.getLatLng().equals(val)).to.equal(true);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLatLng();
            tooltip.position = val;
            chai_1.expect(tooltip.position.equals(val)).to.equal(true);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLatLng();
            tooltip.setLatLng(val);
            chai_1.expect(tooltip.position.equals(val)).to.equal(true);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLatLng();
            tooltip.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.equals(val)).to.equal(true);
                return done();
            });
            tooltip.position = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLatLng();
            tooltip.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal.equals(val)).to.equal(true);
                return done();
            });
            tooltip.setLatLng(val);
        });
    });
    // Events
    describe('(open)', function () {
        beforeEach(function () {
            tooltip.setLatLng(leaflet_1.latLng(0, 0));
        });
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            tooltip.openEvent.subscribe(function (event) {
                chai_1.expect(event.target).to.equal(tooltip);
                return done();
            });
            map.openTooltip(tooltip);
        });
    });
    describe('(close)', function () {
        beforeEach(function () {
            tooltip.setLatLng(leaflet_1.latLng(0, 0));
            map.openTooltip(tooltip);
        });
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            tooltip.closeEvent.subscribe(function (event) {
                chai_1.expect(event.target).to.equal(tooltip);
                return done();
            });
            tooltip._close();
        });
    });
    // Inputs
    describe('[className]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'test-class';
            tooltip.className = val;
            chai_1.expect(tooltip.options.className).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'test-class';
            tooltip.className = val;
            chai_1.expect(tooltip.className).to.equal(val);
        });
    });
    describe('[pane]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'test-class';
            tooltip.pane = val;
            chai_1.expect(tooltip.options.pane).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'test-class';
            tooltip.pane = val;
            chai_1.expect(tooltip.pane).to.equal(val);
        });
    });
    describe('[direction]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'top';
            tooltip.direction = val;
            chai_1.expect(tooltip.options.direction).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'right';
            tooltip.direction = val;
            chai_1.expect(tooltip.direction).to.equal(val);
        });
    });
    describe('[offset]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.point(12, 34);
            tooltip.offset = val;
            chai_1.expect(tooltip.options.offset).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.point(12, 34);
            tooltip.offset = val;
            chai_1.expect(tooltip.offset).to.equal(val);
        });
    });
    describe('[interactive]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            tooltip.interactive = false;
            chai_1.expect(tooltip.options.interactive).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            tooltip.options.interactive = false;
            tooltip.interactive = true;
            chai_1.expect(tooltip.options.interactive).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            tooltip.interactive = false;
            chai_1.expect(tooltip.interactive).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            tooltip.interactive = true;
            chai_1.expect(tooltip.interactive).to.equal(true);
        });
    });
    describe('[sticky]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            tooltip.sticky = false;
            chai_1.expect(tooltip.options.sticky).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            tooltip.options.sticky = false;
            tooltip.sticky = true;
            chai_1.expect(tooltip.options.sticky).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            tooltip.sticky = false;
            chai_1.expect(tooltip.sticky).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            tooltip.sticky = true;
            chai_1.expect(tooltip.sticky).to.equal(true);
        });
    });
    describe('[permanent]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            tooltip.permanent = false;
            chai_1.expect(tooltip.options.permanent).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            tooltip.options.permanent = false;
            tooltip.permanent = true;
            chai_1.expect(tooltip.options.permanent).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            tooltip.permanent = false;
            chai_1.expect(tooltip.permanent).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            tooltip.permanent = true;
            chai_1.expect(tooltip.permanent).to.equal(true);
        });
    });
    describe('Remove from source element on destroy', function () {
        it('should call unbindPopup on destroy', function (done) {
            tooltip._source = {
                unbindTooltip: done,
            };
            tooltip.ngOnDestroy();
        });
    });
});
//# sourceMappingURL=tooltip.directive.spec.js.map