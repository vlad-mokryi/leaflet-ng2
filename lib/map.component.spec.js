"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
describe('Map Component', function () {
    var map;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
    });
    describe('[(lat)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLat();
            map.lat = val;
            chai_1.expect(map.getCenter().lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLat();
            map.lat = val;
            chai_1.expect(map.lat).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLat();
            map.setView([val, 0], 0);
            chai_1.expect(map.lat).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLat();
            map.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.lat = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLat();
            map.latChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.setView([val, 0], 0);
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', function (done) {
            var alreadyFired = false;
            map.latChange.subscribe(function () {
                /* istanbul ignore if */
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([spec_1.randomLat(), 0], 0);
            setTimeout(function () {
                map.setView([spec_1.randomLat(), 0], 0);
            }, 10);
        });
    });
    describe('[(lng)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLng();
            map.lng = val;
            chai_1.expect(map.getCenter().lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLng();
            map.lng = val;
            chai_1.expect(map.lng).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLng();
            map.setView([0, val], 0);
            chai_1.expect(map.lng).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLng();
            map.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.lng = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLng();
            map.lngChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.setView([0, val], 0);
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', function (done) {
            var alreadyFired = false;
            map.lngChange.subscribe(function () {
                /* istanbul ignore if */
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, spec_1.randomLng()], 0);
            setTimeout(function () {
                map.setView([0, spec_1.randomLng()], 0);
            }, 10);
        });
    });
    describe('[(zoom)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.zoom = val;
            chai_1.expect(map.getZoom()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.zoom = val;
            chai_1.expect(map.zoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.setView([0, 0], val);
            chai_1.expect(map.zoom).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(15, 1, 0);
            map.zoomChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.zoom = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(15, 1, 0);
            map.zoomChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.setView([0, 0], val);
        });
        it('should threshold rapid changes in Angular when changing in Leaflet', function (done) {
            var alreadyFired = false;
            map.zoomChange.subscribe(function () {
                /* istanbul ignore if */
                if (alreadyFired) {
                    return done(new Error('Already fired event'));
                }
                alreadyFired = true;
                return done();
            });
            map.setView([0, 0], spec_1.randomNumber(15, 1, 0));
            setTimeout(function () {
                map.setView([0, 0], spec_1.randomNumber(15, 1, 0));
            }, 10);
        });
    });
    describe('[(minZoom)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.minZoom = val;
            chai_1.expect(map.getMinZoom()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.minZoom = val;
            chai_1.expect(map.minZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.setMinZoom(val);
            chai_1.expect(map.minZoom).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(15, 1, 0);
            map.minZoomChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.minZoom = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(15, 1, 0);
            map.minZoomChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.setMinZoom(val);
        });
    });
    describe('[(maxZoom)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.maxZoom = val;
            chai_1.expect(map.getMaxZoom()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.maxZoom = val;
            chai_1.expect(map.maxZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(15, 1, 0);
            map.setMaxZoom(val);
            chai_1.expect(map.maxZoom).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(15, 1, 0);
            map.maxZoomChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.maxZoom = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(15, 1, 0);
            map.maxZoomChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            map.setMaxZoom(val);
        });
    });
    describe('[(maxBounds)]', function () {
        beforeEach(function () {
            // Fix for no browser-test
            map._size = leaflet_1.point(100, 100);
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomLatLngBounds();
            map.setMaxBounds(val);
            chai_1.expect(val.equals(map.options.maxBounds)).to.equal(true);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomLatLngBounds();
            map.maxBounds = val;
            chai_1.expect(val.equals(map.maxBounds)).to.equal(true);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomLatLngBounds();
            map.setMaxBounds(val);
            chai_1.expect(val.equals(map.maxBounds)).to.equal(true);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomLatLngBounds();
            map.maxBoundsChange.subscribe(function (eventVal) {
                chai_1.expect(val.equals(eventVal)).to.equal(true);
                return done();
            });
            map.maxBounds = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomLatLngBounds();
            map.maxBoundsChange.subscribe(function (eventVal) {
                chai_1.expect(val.equals(eventVal)).to.equal(true);
                return done();
            });
            map.setMaxBounds(val);
        });
    });
    // Events
    describe('(baselayerchange)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.baselayerchangeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('baselayerchange', testEvent);
        });
    });
    describe('(overlayadd)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.overlayaddEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('overlayadd', testEvent);
        });
    });
    describe('(overlayremove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.overlayremoveEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('overlayremove', testEvent);
        });
    });
    describe('(layeradd)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.layeraddEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('layeradd', testEvent);
        });
    });
    describe('(layerremove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.layerremoveEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('layerremove', testEvent);
        });
    });
    describe('(zoomlevelschange)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.zoomlevelschangeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('zoomlevelschange', testEvent);
        });
    });
    describe('(resize)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.resizeEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('resize', testEvent);
        });
    });
    describe('(unload)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.unloadEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('unload', testEvent);
        });
    });
    describe('(viewreset)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.viewresetEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('viewreset', testEvent);
        });
    });
    describe('(load)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.loadEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('load', testEvent);
        });
    });
    describe('(zoomstart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.zoomstartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('zoomstart', testEvent);
        });
    });
    describe('(movestart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.movestartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('movestart', testEvent);
        });
    });
    describe('(zoom)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.zoomEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('zoom', testEvent);
        });
    });
    describe('(move)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.moveEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('move', testEvent);
        });
    });
    describe('(zoomend)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.zoomendEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('zoomend', testEvent);
        });
    });
    describe('(moveend)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.moveendEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('moveend', testEvent);
        });
    });
    describe('(popupopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.popupopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('popupopen', testEvent);
        });
    });
    describe('(popupclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.popupcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('popupclose', testEvent);
        });
    });
    describe('(autopanstart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.autopanstartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('autopanstart', testEvent);
        });
    });
    describe('(tooltipopen)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.tooltipopenEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('tooltipopen', testEvent);
        });
    });
    describe('(tooltipclose)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.tooltipcloseEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('tooltipclose', testEvent);
        });
    });
    describe('(click)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.clickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('click', testEvent);
        });
    });
    describe('(dblclick)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            map.doubleClickZoom.disable();
            var testHandle = {};
            var testEvent = { testHandle: testHandle, originalEvent: { shiftKey: false } };
            map.dblclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('dblclick', testEvent);
        });
    });
    describe('(mousedown)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.mousedownEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('mousedown', testEvent);
        });
    });
    describe('(mouseup)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.mouseupEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('mouseup', testEvent);
        });
    });
    describe('(mouseover)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.mouseoverEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('mouseover', testEvent);
        });
    });
    describe('(mouseout)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.mouseoutEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('mouseout', testEvent);
        });
    });
    describe('(mousemove)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.mousemoveEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('mousemove', testEvent);
        });
    });
    describe('(contextmenu)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.contextmenuEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('contextmenu', testEvent);
        });
    });
    describe('(keypress)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.keypressEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('keypress', testEvent);
        });
    });
    describe('(preclick)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            map.preclickEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('preclick', testEvent);
        });
    });
    describe('(zoomanim)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle, center: { lat: 1, lng: 1 }, zoom: 1 };
            map.zoomanimEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            map.fire('zoomanim', testEvent);
        });
    });
    describe('[closePopupOnClick]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.closePopupOnClick = false;
            chai_1.expect(map.options.closePopupOnClick).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.closePopupOnClick = false;
            map.closePopupOnClick = true;
            chai_1.expect(map.options.closePopupOnClick).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.closePopupOnClick = false;
            chai_1.expect(map.closePopupOnClick).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.closePopupOnClick = true;
            chai_1.expect(map.closePopupOnClick).to.equal(true);
        });
    });
    describe('[zoomSnap]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 1);
            map.zoomSnap = val;
            chai_1.expect(map.options.zoomSnap !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 1);
            map.zoomSnap = val;
            chai_1.expect(map.zoomSnap !== val).to.equal(false);
        });
    });
    describe('[zoomDelta]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 1);
            map.zoomDelta = val;
            chai_1.expect(map.options.zoomDelta !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 1);
            map.zoomDelta = val;
            chai_1.expect(map.zoomDelta !== val).to.equal(false);
        });
    });
    describe('[trackResize]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.trackResize = false;
            chai_1.expect(map.options.trackResize).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.trackResize = false;
            map.trackResize = true;
            chai_1.expect(map.options.trackResize).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.trackResize = false;
            chai_1.expect(map.trackResize).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.trackResize = true;
            chai_1.expect(map.trackResize).to.equal(true);
        });
    });
    describe('[boxZoomEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.boxZoomEnabled = false;
            chai_1.expect(map.boxZoom.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.boxZoom.disable();
            map.boxZoomEnabled = true;
            chai_1.expect(map.boxZoom.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.boxZoomEnabled = false;
            chai_1.expect(map.boxZoomEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.boxZoomEnabled = true;
            chai_1.expect(map.boxZoomEnabled).to.equal(true);
        });
    });
    describe('[doubleClickZoomEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.doubleClickZoomEnabled = false;
            chai_1.expect(map.doubleClickZoom.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.doubleClickZoom.disable();
            map.doubleClickZoomEnabled = true;
            chai_1.expect(map.doubleClickZoom.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.doubleClickZoomEnabled = false;
            chai_1.expect(map.doubleClickZoomEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.doubleClickZoomEnabled = true;
            chai_1.expect(map.doubleClickZoomEnabled).to.equal(true);
        });
    });
    describe('[draggingEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.draggingEnabled = false;
            chai_1.expect(map.dragging.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.dragging.disable();
            map.draggingEnabled = true;
            chai_1.expect(map.dragging.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.draggingEnabled = false;
            chai_1.expect(map.draggingEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.draggingEnabled = true;
            chai_1.expect(map.draggingEnabled).to.equal(true);
        });
    });
    describe('[fadeAnimation]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.fadeAnimation = false;
            chai_1.expect(map.options.fadeAnimation).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.fadeAnimation = false;
            map.fadeAnimation = true;
            chai_1.expect(map.options.fadeAnimation).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.fadeAnimation = false;
            chai_1.expect(map.fadeAnimation).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.fadeAnimation = true;
            chai_1.expect(map.fadeAnimation).to.equal(true);
        });
    });
    describe('[markerZoomAnimation]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.markerZoomAnimation = false;
            chai_1.expect(map.options.markerZoomAnimation).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.markerZoomAnimation = false;
            map.markerZoomAnimation = true;
            chai_1.expect(map.options.markerZoomAnimation).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.markerZoomAnimation = false;
            chai_1.expect(map.markerZoomAnimation).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.markerZoomAnimation = true;
            chai_1.expect(map.fadeAnimation).to.equal(true);
        });
    });
    describe('[transform3DLimit]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.transform3DLimit = val;
            chai_1.expect(map.options.transform3DLimit !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.transform3DLimit = val;
            chai_1.expect(map.transform3DLimit !== val).to.equal(false);
        });
    });
    describe('[zoomAnimation]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.zoomAnimation = false;
            chai_1.expect(map.options.zoomAnimation).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.zoomAnimation = false;
            map.zoomAnimation = true;
            chai_1.expect(map.options.zoomAnimation).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.zoomAnimation = false;
            chai_1.expect(map.zoomAnimation).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.zoomAnimation = true;
            chai_1.expect(map.zoomAnimation).to.equal(true);
        });
    });
    describe('[zoomAnimationThreshold]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.zoomAnimationThreshold = val;
            chai_1.expect(map.options.zoomAnimationThreshold !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.zoomAnimationThreshold = val;
            chai_1.expect(map.zoomAnimationThreshold !== val).to.equal(false);
        });
    });
    describe('[inertia]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.inertia = false;
            chai_1.expect(map.options.inertia).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.inertia = false;
            map.inertia = true;
            chai_1.expect(map.options.inertia).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.inertia = false;
            chai_1.expect(map.inertia).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.inertia = true;
            chai_1.expect(map.inertia).to.equal(true);
        });
    });
    describe('[inertiaDeceleration]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.inertiaDeceleration = val;
            chai_1.expect(map.options.inertiaDeceleration !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.inertiaDeceleration = val;
            chai_1.expect(map.inertiaDeceleration !== val).to.equal(false);
        });
    });
    describe('[inertiaMaxSpeed]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.inertiaMaxSpeed = val;
            chai_1.expect(map.options.inertiaMaxSpeed !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.inertiaMaxSpeed = val;
            chai_1.expect(map.inertiaMaxSpeed !== val).to.equal(false);
        });
    });
    describe('[easeLinearity]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.easeLinearity = val;
            chai_1.expect(map.options.easeLinearity !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.easeLinearity = val;
            chai_1.expect(map.easeLinearity !== val).to.equal(false);
        });
    });
    describe('[worldCopyJump]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.worldCopyJump = false;
            chai_1.expect(map.options.worldCopyJump).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.worldCopyJump = false;
            map.worldCopyJump = true;
            chai_1.expect(map.options.worldCopyJump).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.worldCopyJump = false;
            chai_1.expect(map.worldCopyJump).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.worldCopyJump = true;
            chai_1.expect(map.worldCopyJump).to.equal(true);
        });
    });
    describe('[maxBoundsViscosity]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.maxBoundsViscosity = val;
            chai_1.expect(map.options.maxBoundsViscosity !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.maxBoundsViscosity = val;
            chai_1.expect(map.maxBoundsViscosity !== val).to.equal(false);
        });
    });
    describe('[keyboardEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.keyboardEnabled = false;
            chai_1.expect(map.keyboard.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.keyboard.disable();
            map.keyboardEnabled = true;
            chai_1.expect(map.keyboard.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.keyboardEnabled = false;
            chai_1.expect(map.keyboardEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.keyboardEnabled = true;
            chai_1.expect(map.keyboardEnabled).to.equal(true);
        });
    });
    describe('[keyboardPanDelta]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.keyboardPanDelta = val;
            chai_1.expect(map.options.keyboardPanDelta !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.keyboardPanDelta = val;
            chai_1.expect(map.keyboardPanDelta !== val).to.equal(false);
        });
    });
    describe('[scrollWheelZoomEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.scrollWheelZoomEnabled = false;
            chai_1.expect(map.scrollWheelZoom.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.scrollWheelZoom.disable();
            map.scrollWheelZoomEnabled = true;
            chai_1.expect(map.scrollWheelZoom.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.scrollWheelZoomEnabled = false;
            chai_1.expect(map.scrollWheelZoomEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.scrollWheelZoomEnabled = true;
            chai_1.expect(map.scrollWheelZoomEnabled).to.equal(true);
        });
    });
    describe('[wheelDebounceTime]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.wheelDebounceTime = val;
            chai_1.expect(map.options.wheelDebounceTime !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.wheelDebounceTime = val;
            chai_1.expect(map.wheelDebounceTime !== val).to.equal(false);
        });
    });
    describe('[wheelPxPerZoomLevel]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.wheelPxPerZoomLevel = val;
            chai_1.expect(map.options.wheelPxPerZoomLevel !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.wheelPxPerZoomLevel = val;
            chai_1.expect(map.wheelPxPerZoomLevel !== val).to.equal(false);
        });
    });
    describe('[tapTolerance]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.tapTolerance = val;
            chai_1.expect(map.options.tapTolerance !== val).to.equal(false);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 1, 0);
            map.tapTolerance = val;
            chai_1.expect(map.tapTolerance !== val).to.equal(false);
        });
    });
    describe('[tapEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.tapEnabled = false;
            chai_1.expect(map.options.tap).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.tap = false;
            map.tapEnabled = true;
            chai_1.expect(map.options.tap).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.tapEnabled = false;
            chai_1.expect(map.tapEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.tapEnabled = true;
            chai_1.expect(map.tapEnabled).to.equal(true);
        });
    });
    describe('[bounceAtZoomLimits]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.bounceAtZoomLimits = false;
            chai_1.expect(map.options.bounceAtZoomLimits).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.options.bounceAtZoomLimits = false;
            map.bounceAtZoomLimits = true;
            chai_1.expect(map.options.bounceAtZoomLimits).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.bounceAtZoomLimits = false;
            chai_1.expect(map.bounceAtZoomLimits).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.bounceAtZoomLimits = true;
            chai_1.expect(map.bounceAtZoomLimits).to.equal(true);
        });
    });
    describe('[touchZoomEnabled]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            map.touchZoomEnabled = false;
            chai_1.expect(map.touchZoom.enabled()).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            map.touchZoom.disable();
            map.touchZoomEnabled = true;
            chai_1.expect(map.touchZoom.enabled()).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            map.touchZoomEnabled = false;
            chai_1.expect(map.touchZoomEnabled).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            map.touchZoomEnabled = true;
            chai_1.expect(map.touchZoomEnabled).to.equal(true);
        });
    });
    describe('[crs]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = leaflet_1.CRS.Simple;
            map.crs = val;
            chai_1.expect(map.options.crs).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = leaflet_1.CRS.Simple;
            map.crs = val;
            chai_1.expect(map.crs).to.equal(val);
        });
    });
});
//# sourceMappingURL=map.component.spec.js.map