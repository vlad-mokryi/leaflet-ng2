"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
function hasAsChild(root, child) {
    'use strict';
    var length = root.children.length;
    for (var i = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}
describe('Image-Overlay Directive', function () {
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        layer = new index_1.ImageOverlayDirective({ ref: map }, {});
    });
    describe('[(display)]', function () {
        it('should remove DOM container when not displaying', function () {
            layer.display = false;
            chai_1.expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(false);
        });
        it('should re-add DOM container when display is true again', function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(hasAsChild(layer.getPane(), layer.getElement())).to.equal(true);
        });
        it('should remove EventListeners when not displaying', function (done) {
            var zoomEvents = map._events.zoom;
            var length = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            var originalEventListener = layer.getEvents()['zoom'];
            /* tslint:enable */
            layer.display = false;
            for (var i = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
                return done();
            }
        });
        it('should re-add EventListeners when display is true again', function (done) {
            var zoomEvents = map._events.zoom;
            var length = zoomEvents.length;
            /* tslint:disable:no-string-literal */
            var originalEventListener = layer.getEvents()['zoom'];
            /* tslint:enable */
            layer.display = false;
            layer.display = true;
            for (var i = 0; i < length; i += 1) {
                if (zoomEvents[i] && zoomEvents[i].fn === originalEventListener) {
                    return done();
                }
            }
            /* istanbul ignore next */
            return done(new Error('There is no event on listener'));
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
    describe('[(url)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            layer.url = index_1.IMAGE_OVERLAY_URL;
            chai_1.expect(layer._url).to.equal(index_1.IMAGE_OVERLAY_URL);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.url = index_1.IMAGE_OVERLAY_URL;
            chai_1.expect(layer.url).to.equal(index_1.IMAGE_OVERLAY_URL);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            layer.setUrl(index_1.IMAGE_OVERLAY_URL);
            chai_1.expect(layer.url).to.equal(index_1.IMAGE_OVERLAY_URL);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.urlChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.IMAGE_OVERLAY_URL);
                return done();
            });
            layer.url = index_1.IMAGE_OVERLAY_URL;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.url = index_1.IMAGE_OVERLAY_URL;
            layer.urlChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.IMAGE_OVERLAY_URL + '?test');
                return done();
            });
            layer.setUrl(index_1.IMAGE_OVERLAY_URL + '?test');
        });
        it('should not emit anything when changing into same url', function (done) {
            layer.setUrl(index_1.IMAGE_OVERLAY_URL);
            setTimeout(function () {
                /* istanbul ignore next */
                layer.urlChange.subscribe(function () {
                    return done(new Error('Event fired'));
                });
                layer.setUrl(index_1.IMAGE_OVERLAY_URL);
                return done();
            }, 0);
        });
    });
    describe('[(opacity)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber();
            layer.opacity = val;
            chai_1.expect(layer.options.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber();
            layer.opacity = val;
            chai_1.expect(layer.opacity).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber();
            layer.setOpacity(val);
            chai_1.expect(layer.options.opacity).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber();
            layer.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.opacity = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber();
            layer.opacityChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setOpacity(val);
        });
    });
    describe('[(bounds)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLatLngBounds();
            layer.bounds = val;
            chai_1.expect(layer.getBounds()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLatLngBounds();
            layer.bounds = val;
            chai_1.expect(layer.bounds).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLatLngBounds();
            layer.setBounds(val);
            chai_1.expect(layer.bounds).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLatLngBounds();
            layer.boundsChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.bounds = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLatLngBounds();
            layer.boundsChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setBounds(val);
        });
    });
    describe('[(north)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(90);
            layer.north = val;
            chai_1.expect(layer.getBounds().getNorth()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(90);
            layer.north = val;
            chai_1.expect(layer.north).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(90);
            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
            chai_1.expect(layer.north).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(90);
            layer.northChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.north = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(90);
            layer.northChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setBounds([
                [0, 0],
                [val, 0],
            ]);
        });
    });
    describe('[(east)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(180);
            layer.east = val;
            chai_1.expect(layer.getBounds().getEast()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(180);
            layer.east = val;
            chai_1.expect(layer.east).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(180);
            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
            chai_1.expect(layer.east).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(180);
            layer.eastChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.east = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(180);
            layer.eastChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setBounds([
                [0, val],
                [0, 0],
            ]);
        });
    });
    describe('[(south)]', function () {
        beforeEach(function () {
            layer.setBounds(leaflet_1.latLngBounds([
                [0, 0],
                [1, 1],
            ]));
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(0, -90);
            layer.south = val;
            chai_1.expect(layer.getBounds().getSouth()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(0, -90);
            layer.south = val;
            chai_1.expect(layer.south).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(0, -90);
            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
            chai_1.expect(layer.south).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(0, -90);
            layer.southChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.south = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(0, -90);
            layer.southChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setBounds([
                [val, 0],
                [1, 1],
            ]);
        });
    });
    describe('[(west)]', function () {
        beforeEach(function () {
            layer.setBounds(leaflet_1.latLngBounds([
                [0, 0],
                [1, 1],
            ]));
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(0, -180);
            layer.west = val;
            chai_1.expect(layer.getBounds().getWest()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(0, -180);
            layer.west = val;
            chai_1.expect(layer.west).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(0, -180);
            layer.setBounds(leaflet_1.latLngBounds([
                [0, val],
                [1, 1],
            ]));
            chai_1.expect(layer.west).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(0, -180);
            layer.westChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.west = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(0, -180);
            layer.westChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setBounds([
                [0, val],
                [1, 1],
            ]);
        });
    });
    // Events
    describe('(add)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.addEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
    describe('(click)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
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
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('contextmenu', testEvent);
        });
    });
    describe('[crossOrigin]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.crossOrigin = false;
            chai_1.expect(layer.options.crossOrigin).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.crossOrigin = false;
            layer.crossOrigin = true;
            chai_1.expect(layer.options.crossOrigin).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.crossOrigin = false;
            chai_1.expect(layer.crossOrigin).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.crossOrigin = true;
            chai_1.expect(layer.crossOrigin).to.equal(true);
        });
    });
    describe('[interactive]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.interactive = false;
            chai_1.expect(layer.options.interactive).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.interactive = false;
            layer.interactive = true;
            chai_1.expect(layer.options.interactive).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.interactive = false;
            chai_1.expect(layer.interactive).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.interactive = true;
            chai_1.expect(layer.interactive).to.equal(true);
        });
    });
    describe('[alt]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'Test alt';
            layer.alt = val;
            chai_1.expect(layer.options.alt !== val || layer.getElement().getAttribute('alt') !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'Test alt';
            layer.alt = val;
            chai_1.expect(layer.alt !== val).to.equal(false);
        });
    });
    describe('[attribution]', function () {
        var attributionControl;
        beforeEach(function () {
            attributionControl = new index_1.AttributionControlDirective({ ref: map });
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'Test attribution';
            layer.attribution = val;
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
    describe('Destroying a Image-Overlay Directive', function () {
        it('should remove Image-Overlay Directive from map on destroy', function () {
            chai_1.expect(map.hasLayer(layer)).to.equal(true);
            layer.ngOnDestroy();
            chai_1.expect(map.hasLayer(layer)).to.equal(false);
        });
    });
});
//# sourceMappingURL=image-overlay.directive.spec.js.map