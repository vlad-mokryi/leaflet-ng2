"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
function createPathTests(Constr) {
    describe('Path compatibility tests', function () {
        var map;
        var layer;
        beforeEach(function () {
            map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
            map._size = leaflet_1.point(100, 100);
            map._pixelOrigin = leaflet_1.point(50, 50);
            map._renderer = map._renderer || new leaflet_1.SVG();
            layer = new Constr({ ref: map }, {});
        });
        describe('[(display)]', function () {
            it('should remove DOM container when not displaying', function () {
                layer.display = false;
                chai_1.expect(layer.getElement().style.display).to.equal('none');
            });
            it('should re-add DOM container when display is true again', function () {
                layer.display = false;
                layer.display = true;
                chai_1.expect(layer.getElement().style.display).not.equal('none');
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
        describe('[(color)]', function () {
            var TEST_VALUE = '#123456';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.color = TEST_VALUE;
                chai_1.expect(layer.options.color).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.color = TEST_VALUE;
                chai_1.expect(layer.color).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ color: TEST_VALUE });
                chai_1.expect(layer.color).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.colorChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.color = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.colorChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ color: TEST_VALUE });
            });
        });
        describe('[(lineCap)]', function () {
            var TEST_VALUE = 'butt';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.lineCap = TEST_VALUE;
                chai_1.expect(layer.options.lineCap).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.lineCap = TEST_VALUE;
                chai_1.expect(layer.lineCap).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ lineCap: TEST_VALUE });
                chai_1.expect(layer.lineCap).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.lineCapChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.lineCap = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.lineCap = TEST_VALUE;
                layer.lineCapChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ lineCap: TEST_VALUE });
            });
        });
        describe('[(lineJoin)]', function () {
            var TEST_VALUE = 'bevel';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.lineJoin = TEST_VALUE;
                chai_1.expect(layer.options.lineJoin).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.lineJoin = TEST_VALUE;
                chai_1.expect(layer.lineJoin).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ lineJoin: TEST_VALUE });
                chai_1.expect(layer.lineJoin).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.lineJoinChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.lineJoin = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.lineJoin = TEST_VALUE;
                layer.lineJoinChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ lineJoin: TEST_VALUE });
            });
        });
        describe('[(dashArray)]', function () {
            var TEST_VALUE = '1, 2';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.dashArray = TEST_VALUE;
                chai_1.expect(layer.options.dashArray).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.dashArray = TEST_VALUE;
                chai_1.expect(layer.dashArray).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ dashArray: TEST_VALUE });
                chai_1.expect(layer.dashArray).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.dashArrayChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.dashArray = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.dashArray = TEST_VALUE;
                layer.dashArrayChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ dashArray: TEST_VALUE });
            });
        });
        describe('[(dashOffset)]', function () {
            var TEST_VALUE = '7px';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.dashOffset = TEST_VALUE;
                chai_1.expect(layer.options.dashOffset).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.dashOffset = TEST_VALUE;
                chai_1.expect(layer.dashOffset).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ dashOffset: TEST_VALUE });
                chai_1.expect(layer.dashOffset).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.dashOffsetChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.dashOffset = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.dashOffset = TEST_VALUE;
                layer.dashOffsetChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ dashOffset: TEST_VALUE });
            });
        });
        describe('[(fillColor)]', function () {
            var TEST_VALUE = '#123456';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.fillColor = TEST_VALUE;
                chai_1.expect(layer.options.fillColor).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.fillColor = TEST_VALUE;
                chai_1.expect(layer.fillColor).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ fillColor: TEST_VALUE });
                chai_1.expect(layer.fillColor).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.fillColorChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.fillColor = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.fillColor = TEST_VALUE;
                layer.fillColorChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ fillColor: TEST_VALUE });
            });
        });
        describe('[(fillRule)]', function () {
            var TEST_VALUE = 'nonzero';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.fillRule = TEST_VALUE;
                chai_1.expect(layer.options.fillRule).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.fillRule = TEST_VALUE;
                chai_1.expect(layer.fillRule).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ fillRule: TEST_VALUE });
                chai_1.expect(layer.fillRule).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.fillRuleChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.fillRule = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.fillRule = TEST_VALUE;
                layer.fillRuleChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ fillRule: TEST_VALUE });
            });
        });
        describe('[(className)]', function () {
            var TEST_VALUE = 'testclass';
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.className = TEST_VALUE;
                chai_1.expect(layer.options.className).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.className = TEST_VALUE;
                chai_1.expect(layer.className).to.equal(TEST_VALUE);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle({ className: TEST_VALUE });
                chai_1.expect(layer.className).to.equal(TEST_VALUE);
            });
            it('should fire an event when changing in Angular', function (done) {
                layer.classNameChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.className = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                layer.className = TEST_VALUE;
                layer.classNameChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(TEST_VALUE);
                    return done();
                });
                layer.setStyle({ className: TEST_VALUE });
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
                layer.setStyle({ opacity: val });
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
                layer.setStyle({ opacity: val });
            });
        });
        describe('[(weight)]', function () {
            it('should be changed in Leaflet when changing in Angular', function () {
                var val = spec_1.randomNumber(10, 0, 0);
                layer.weight = val;
                chai_1.expect(layer.options.weight).to.equal(val);
            });
            it('should be changed in Angular when changing in Angular', function () {
                var val = spec_1.randomNumber(10, 0, 0);
                layer.weight = val;
                chai_1.expect(layer.weight).to.equal(val);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                var val = spec_1.randomNumber(10, 0, 0);
                layer.setStyle({ weight: val });
                chai_1.expect(layer.weight).to.equal(val);
            });
            it('should fire an event when changing in Angular', function (done) {
                var val = spec_1.randomNumber(10, 0, 0);
                layer.weightChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.weight = val;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                var val = spec_1.randomNumber(10, 0, 0);
                layer.weightChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.setStyle({ weight: val });
            });
        });
        describe('[(fillOpacity)]', function () {
            it('should be changed in Leaflet when changing in Angular', function () {
                var val = spec_1.randomNumber();
                layer.fillOpacity = val;
                chai_1.expect(layer.options.fillOpacity).to.equal(val);
            });
            it('should be changed in Angular when changing in Angular', function () {
                var val = spec_1.randomNumber();
                layer.fillOpacity = val;
                chai_1.expect(layer.fillOpacity).to.equal(val);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                var val = spec_1.randomNumber();
                layer.setStyle({ fillOpacity: val });
                chai_1.expect(layer.fillOpacity).to.equal(val);
            });
            it('should fire an event when changing in Angular', function (done) {
                var val = spec_1.randomNumber();
                layer.fillOpacityChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.fillOpacity = val;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                var val = spec_1.randomNumber();
                layer.fillOpacityChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.setStyle({ fillOpacity: val });
            });
        });
        describe('[(stroke)]', function () {
            it('should be changed in Leaflet when changing in Angular to false', function () {
                var val = false;
                layer.stroke = val;
                chai_1.expect(layer.options.stroke).to.equal(val);
            });
            it('should be changed in Leaflet when changing in Angular to true', function () {
                layer.options.stroke = false;
                var val = true;
                layer.stroke = val;
                chai_1.expect(layer.stroke).to.equal(val);
            });
            it('should be changed in Angular when changing in Angular to false', function () {
                var val = false;
                layer.stroke = val;
                chai_1.expect(layer.stroke).to.equal(val);
            });
            it('should be changed in Angular when changing in Angular to true', function () {
                layer.options.stroke = false;
                var val = true;
                layer.stroke = val;
                chai_1.expect(layer.stroke).to.equal(val);
            });
            it('should be changed in Angular when changing in Leaflet to false', function () {
                var val = false;
                layer.setStyle({ stroke: val });
                chai_1.expect(layer.stroke).to.equal(val);
            });
            it('should be changed in Angular when changing in Leaflet to true', function () {
                layer.options.stroke = false;
                var val = true;
                layer.setStyle({ stroke: val });
                chai_1.expect(layer.stroke).to.equal(val);
            });
            it('should fire an event when changing in Angular', function (done) {
                var val = false;
                layer.strokeChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.stroke = val;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                var val = false;
                layer.strokeChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.setStyle({ stroke: val });
            });
        });
        describe('[(fill)]', function () {
            it('should be changed in Leaflet when changing in Angular to false', function () {
                var val = false;
                layer.fill = val;
                chai_1.expect(layer.options.fill).to.equal(val);
            });
            it('should be changed in Leaflet when changing in Angular to true', function () {
                layer.options.fill = false;
                var val = true;
                layer.fill = val;
                chai_1.expect(layer.fill).to.equal(val);
            });
            it('should be changed in Angular when changing in Angular to false', function () {
                var val = false;
                layer.fill = val;
                chai_1.expect(layer.fill).to.equal(val);
            });
            it('should be changed in Angular when changing in Angular to true', function () {
                layer.options.fill = false;
                var val = true;
                layer.fill = val;
                chai_1.expect(layer.fill).to.equal(val);
            });
            it('should be changed in Angular when changing in Leaflet to false', function () {
                var val = false;
                layer.setStyle({ fill: val });
                chai_1.expect(layer.fill).to.equal(val);
            });
            it('should be changed in Angular when changing in Leaflet to true', function () {
                layer.options.fill = false;
                var val = true;
                layer.setStyle({ fill: val });
                chai_1.expect(layer.fill).to.equal(val);
            });
            it('should fire an event when changing in Angular', function (done) {
                var val = false;
                layer.fillChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.fill = val;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                var val = false;
                layer.fillChange.subscribe(function (eventVal) {
                    chai_1.expect(eventVal).to.equal(val);
                    return done();
                });
                layer.setStyle({ fill: val });
            });
        });
        describe('[(style)]', function () {
            var TEST_VALUE = { opacity: 0.5, weight: 3, dashArray: '1, 2' };
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.style = TEST_VALUE;
                chai_1.expect(layer.options.opacity).to.equal(TEST_VALUE.opacity);
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.style = TEST_VALUE;
                chai_1.expect(layer.style.opacity).to.equal(TEST_VALUE.opacity);
            });
            it('should be changed in Angular when changing in Leaflet', function () {
                layer.setStyle(TEST_VALUE);
                chai_1.expect(layer.style.opacity).to.equal(TEST_VALUE.opacity);
            });
            it('should fire an event when changing in Angular', function (done) {
                Promise.all([
                    new Promise(function (fulfill, reject) {
                        layer.styleChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise(function (fulfill, reject) {
                        layer.opacityChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.opacity) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise(function (fulfill, reject) {
                        layer.weightChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.weight) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise(function (fulfill, reject) {
                        layer.dashArrayChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.dashArray) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                ]).then(function () { done(); }).catch(done);
                layer.style = TEST_VALUE;
            });
            it('should fire an event when changing in Leaflet', function (done) {
                Promise.all([
                    new Promise(function (fulfill, reject) {
                        layer.styleChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise(function (fulfill, reject) {
                        layer.opacityChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.opacity) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise(function (fulfill, reject) {
                        layer.weightChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.weight) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                    new Promise(function (fulfill, reject) {
                        layer.dashArrayChange.subscribe(function (eventVal) {
                            /* istanbul ignore if */
                            if (eventVal !== TEST_VALUE.dashArray) {
                                return reject(new Error('Received wrong value'));
                            }
                            return fulfill();
                        });
                    }),
                ]).then(function () { done(); }).catch(done);
                layer.setStyle(TEST_VALUE);
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
    });
}
exports.createPathTests = createPathTests;
//# sourceMappingURL=path-directives.spec.js.map