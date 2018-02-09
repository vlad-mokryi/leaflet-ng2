"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
describe('Tile-Layer Directive', function () {
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        layer = new index_1.TileLayerDirective({ ref: map }, {});
    });
    describe('[(display)]', function () {
        it('should remove DOM container when not displaying', function () {
            layer.display = false;
            chai_1.expect(spec_1.hasAsChild(layer.getPane(), layer._container)).to.equal(false);
        });
        it('should re-add DOM container when display is true again', function () {
            layer.display = false;
            layer.display = true;
            chai_1.expect(spec_1.hasAsChild(layer.getPane(), layer._container)).to.equal(true);
        });
        it('should remove EventListeners when not displaying', function (done) {
            var moveEvents = map._events.move;
            var length = moveEvents.length;
            /* tslint:disable:no-string-literal */
            var originalEventListener = layer.getEvents()['move'];
            /* tslint:enable */
            layer.display = false;
            for (var i = 0; i < length; i += 1) {
                /* istanbul ignore if */
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
                    return done(new Error('There is still an event on listener'));
                }
            }
            done();
        });
        it('should re-add EventListeners when display is true again', function (done) {
            var moveEvents = map._events.move;
            var length = moveEvents.length;
            /* tslint:disable:no-string-literal */
            var originalEventListener = layer.getEvents()['move'];
            /* tslint:enable */
            layer.display = false;
            layer.display = true;
            for (var i = 0; i < length; i += 1) {
                if (moveEvents[i] && moveEvents[i].fn === originalEventListener) {
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
            layer.url = index_1.OSM_TILE_LAYER_URL;
            chai_1.expect(layer._url).to.equal(index_1.OSM_TILE_LAYER_URL);
        });
        it('should be changed in Angular when changing in Angular', function () {
            layer.url = index_1.OSM_TILE_LAYER_URL;
            chai_1.expect(layer.url).to.equal(index_1.OSM_TILE_LAYER_URL);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            layer.setUrl(index_1.OSM_TILE_LAYER_URL);
            chai_1.expect(layer.url).to.equal(index_1.OSM_TILE_LAYER_URL);
        });
        it('should fire an event when changing in Angular', function (done) {
            layer.urlChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.OSM_TILE_LAYER_URL);
                return done();
            });
            layer.url = index_1.OSM_TILE_LAYER_URL;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            layer.url = index_1.OSM_TILE_LAYER_URL;
            layer.urlChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(index_1.OSM_TILE_LAYER_URL + '?test');
                return done();
            });
            layer.setUrl(index_1.OSM_TILE_LAYER_URL + '?test');
        });
        it('should not emit anything when changing into same url', function (done) {
            layer.setUrl(index_1.OSM_TILE_LAYER_URL);
            setTimeout(function () {
                /* istanbul ignore next */
                layer.urlChange.subscribe(function () {
                    return done(new Error('Event fired'));
                });
                layer.setUrl(index_1.OSM_TILE_LAYER_URL);
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
            chai_1.expect(layer.opacity).to.equal(val);
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
    describe('[(zIndex)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            layer.zIndex = val;
            chai_1.expect(layer.options.zIndex).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            layer.zIndex = val;
            chai_1.expect(layer.zIndex).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            layer.setZIndex(val);
            chai_1.expect(layer.zIndex).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = spec_1.randomNumber(255, 1, 0);
            layer.zIndexChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.zIndex = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = spec_1.randomNumber(255, 1, 0);
            layer.zIndexChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            layer.setZIndex(val);
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
    describe('(loading)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.loadingEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('loading', testEvent);
        });
    });
    describe('(tileunload)', function () {
        beforeEach(function () {
            layer.off('tileunload', layer._onTileRemove); // Hack to disable another listener
        });
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tileunloadEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tileunload', testEvent);
        });
    });
    describe('(tileloadstart)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tileloadstartEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tileloadstart', testEvent);
        });
    });
    describe('(tileerror)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            layer.tileerrorEvent.subscribe(function (event) {
                chai_1.expect(event.testHandle).to.equal(testEvent.testHandle);
                return done();
            });
            layer.fire('tileerror', testEvent);
        });
    });
    describe('(tileload)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { testHandle: testHandle };
            var called; // this event is called multiple times in the life-circle of leaflet
            setTimeout(function () {
                layer.tileloadEvent.subscribe(function (event) {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    /* istanbul ignore if */
                    if (event.testHandle !== testEvent.testHandle) {
                        return done(new Error('Wrong event returned'));
                    }
                    called = true;
                    return done();
                });
                layer.fire('tileload', testEvent);
            }, 1);
        });
    });
    describe('(load)', function () {
        it('should fire event in Angular when firing event in Leaflet', function (done) {
            var testHandle = {};
            var testEvent = { target: layer, testHandle: testHandle, type: 'load' };
            var called; // this event is called multiple times in the life-circle of leaflet
            setTimeout(function () {
                layer.loadEvent.subscribe(function (event) {
                    /* istanbul ignore if */
                    if (called) {
                        return;
                    }
                    /* istanbul ignore if */
                    if (event.testHandle !== testEvent.testHandle) {
                        return done(new Error('Wrong event returned'));
                    }
                    called = true;
                    return done();
                });
                layer.fire('load', testEvent);
            }, 1);
        });
    });
    // Inputs
    describe('[tileSize]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var num = spec_1.randomNumber(1000, 1, 0);
            var val = leaflet_1.point(num, num);
            layer.tileSize = val;
            chai_1.expect(layer.options.tileSize).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var num = spec_1.randomNumber(1000, 1, 0);
            var val = leaflet_1.point(num, num);
            layer.tileSize = val;
            chai_1.expect(layer.tileSize).to.equal(val);
        });
    });
    describe('[bounds]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var num = spec_1.randomNumber(1000, 1, 0);
            var val = leaflet_1.latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            chai_1.expect(layer.options.bounds).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var num = spec_1.randomNumber(1000, 1, 0);
            var val = leaflet_1.latLngBounds([num, num], [num, num]);
            layer.bounds = val;
            chai_1.expect(layer.bounds).to.equal(val);
        });
    });
    describe('[subdomains]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = ['a', 'b', 'c', 'd'];
            layer.subdomains = val;
            chai_1.expect(layer.options.subdomains).to.deep.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = ['a', 'b', 'c', 'd'];
            layer.subdomains = val;
            chai_1.expect(layer.subdomains).to.deep.equal(val);
        });
        it('should get an array of strings even if it has a string value', function () {
            var val = 'abcdefg';
            layer.options.subdomains = val;
            chai_1.expect(layer.subdomains).to.deep.equal(val.split(''));
        });
    });
    describe('[className]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'test-class';
            layer.className = val;
            chai_1.expect(layer.options.className).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'test-class';
            layer.className = val;
            chai_1.expect(layer.className).to.equal(val);
        });
    });
    describe('[errorTileUrl]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'http://test';
            layer.errorTileUrl = val;
            chai_1.expect(layer.options.errorTileUrl).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'http://test';
            layer.errorTileUrl = val;
            chai_1.expect(layer.errorTileUrl).to.equal(val);
        });
    });
    describe('[updateInterval]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.updateInterval = val;
            chai_1.expect(layer.options.updateInterval).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.updateInterval = val;
            chai_1.expect(layer.updateInterval).to.equal(val);
        });
    });
    describe('[keepBuffer]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.keepBuffer = val;
            chai_1.expect(layer.options.keepBuffer).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.keepBuffer = val;
            chai_1.expect(layer.keepBuffer).to.equal(val);
        });
    });
    describe('[maxZoom]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(20, 0, 0);
            layer.maxZoom = val;
            chai_1.expect(layer.options.maxZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(20, 0, 0);
            layer.maxZoom = val;
            chai_1.expect(layer.maxZoom).to.equal(val);
        });
    });
    describe('[minZoom]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(5, 0, 0);
            layer.minZoom = val;
            chai_1.expect(layer.options.minZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(5, 0, 0);
            layer.minZoom = val;
            chai_1.expect(layer.minZoom).to.equal(val);
        });
    });
    describe('[maxNativeZoom]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.maxNativeZoom = val;
            chai_1.expect(layer.options.maxNativeZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.maxNativeZoom = val;
            chai_1.expect(layer.maxNativeZoom).to.equal(val);
        });
    });
    describe('[minNativeZoom]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(5, 0, 0);
            layer.minNativeZoom = val;
            chai_1.expect(layer.options.minNativeZoom).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(5, 0, 0);
            layer.minNativeZoom = val;
            chai_1.expect(layer.minNativeZoom).to.equal(val);
        });
    });
    describe('[zoomOffset]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.zoomOffset = val;
            chai_1.expect(layer.options.zoomOffset).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(1000, 1, 0);
            layer.zoomOffset = val;
            chai_1.expect(layer.zoomOffset).to.equal(val);
        });
    });
    describe('[tms]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.tms = false;
            chai_1.expect(layer.options.tms).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.tms = false;
            layer.tms = true;
            chai_1.expect(layer.options.tms).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.tms = false;
            chai_1.expect(layer.tms).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.tms = true;
            chai_1.expect(layer.tms).to.equal(true);
        });
    });
    describe('[zoomReverse]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.zoomReverse = false;
            chai_1.expect(layer.options.zoomReverse).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.zoomReverse = false;
            layer.zoomReverse = true;
            chai_1.expect(layer.options.zoomReverse).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.zoomReverse = false;
            chai_1.expect(layer.zoomReverse).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.zoomReverse = true;
            chai_1.expect(layer.zoomReverse).to.equal(true);
        });
    });
    describe('[detectRetina]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.detectRetina = false;
            chai_1.expect(layer.options.detectRetina).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.detectRetina = false;
            layer.detectRetina = true;
            chai_1.expect(layer.options.detectRetina).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.detectRetina = false;
            chai_1.expect(layer.detectRetina).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.detectRetina = true;
            chai_1.expect(layer.detectRetina).to.equal(true);
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
    describe('[updateWhenIdle]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.updateWhenIdle = false;
            chai_1.expect(layer.options.updateWhenIdle).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.updateWhenIdle = false;
            layer.updateWhenIdle = true;
            chai_1.expect(layer.options.updateWhenIdle).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.updateWhenIdle = false;
            chai_1.expect(layer.updateWhenIdle).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.updateWhenIdle = true;
            chai_1.expect(layer.updateWhenIdle).to.equal(true);
        });
    });
    describe('[updateWhenZooming]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.updateWhenZooming = false;
            chai_1.expect(layer.options.updateWhenZooming).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.updateWhenZooming = false;
            layer.updateWhenZooming = true;
            chai_1.expect(layer.options.updateWhenZooming).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.updateWhenZooming = false;
            chai_1.expect(layer.updateWhenZooming).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.updateWhenZooming = true;
            chai_1.expect(layer.updateWhenZooming).to.equal(true);
        });
    });
    describe('[noWrap]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.noWrap = false;
            chai_1.expect(layer.options.noWrap).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.noWrap = false;
            layer.noWrap = true;
            chai_1.expect(layer.options.noWrap).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.noWrap = false;
            chai_1.expect(layer.noWrap).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.noWrap = true;
            chai_1.expect(layer.noWrap).to.equal(true);
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
    describe('Destroying a Tile-Layer Directive', function () {
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
//# sourceMappingURL=tile-layer.directive.spec.js.map