"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var lng2lat_1 = require("./lng2lat");
var path_directives_spec_1 = require("./path-directives.spec");
var spec_1 = require("./spec");
describe('Polyline Directive', function () {
    path_directives_spec_1.createPathTests(index_1.PolylineDirective);
    var map;
    var layer;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        map._renderer = map._renderer || new leaflet_1.SVG();
        layer = new index_1.PolylineDirective({ ref: map }, {});
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
        describe('for LineStrings', function () {
            var TEST_VALUE = [leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)];
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
                /* istanbul ignore if */
                if (layer.latLngs[3].lat !== 3 ||
                    layer.latLngs[3].lng !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.latLngs);
                }
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
        describe('for MultiLineStrings', function () {
            var TEST_VALUE = [
                [leaflet_1.latLng(1, 0), leaflet_1.latLng(1, 1), leaflet_1.latLng(0, 1)],
                [leaflet_1.latLng(0, 1), leaflet_1.latLng(1, 1), leaflet_1.latLng(1, 0)],
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
                /* istanbul ignore if */
                if (layer.latLngs[0][3].lat !== 3 ||
                    layer.latLngs[0][3].lng !== 3) {
                    throw new Error("Wrong value added: " + [3, 3] + " != " + layer.latLngs[2]);
                }
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
        describe('for LineString', function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [[0, 1], [1, 1], [0, 0]],
                    type: 'LineString',
                },
                properties: {},
                type: 'Feature',
            };
            var TEST_LINESTRING = [[0, 0], [1, 0], [1, 1]];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0].lng !== TEST_VALUE.geometry.coordinates[0][0] ||
                    layer.latLngs[0].lat !== TEST_VALUE.geometry.coordinates[0][1] ||
                    layer.latLngs[1].lng !== TEST_VALUE.geometry.coordinates[1][0] ||
                    layer.latLngs[1].lat !== TEST_VALUE.geometry.coordinates[1][1] ||
                    layer.latLngs[2].lng !== TEST_VALUE.geometry.coordinates[2][0] ||
                    layer.latLngs[2].lat !== TEST_VALUE.geometry.coordinates[2][1]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                }
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.geoJSON[0] !== TEST_VALUE[0] ||
                    layer.geoJSON[1] !== TEST_VALUE[1] ||
                    layer.geoJSON[2] !== TEST_VALUE[2]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE + " != " + layer.geoJSON);
                }
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_LINESTRING);
                chai_1.expect(lng2lat_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_LINESTRING);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_LINESTRING);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.coordinates[3][0] !== 3 ||
                    layer.geoJSON.geometry.coordinates[3][1] !== 3) {
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
                    chai_1.expect(lng2lat_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_LINESTRING);
                    return done();
                });
                layer.setLatLngs(TEST_LINESTRING);
            });
            it('should fire an event when adding in Leaflet', function (done) {
                layer.setLatLngs(TEST_LINESTRING);
                layer.geoJSONChange.subscribe(function (eventVal) {
                    var values = eventVal.geometry.coordinates;
                    /* istanbul ignore if */
                    if (values[3][0] !== 3 ||
                        values[3][1] !== 3) {
                        return done(new Error('Received wrong value'));
                    }
                    return done();
                });
                layer.addLatLng([3, 3]);
            });
        });
        describe('for MultiLineString', function () {
            var TEST_VALUE = {
                geometry: {
                    coordinates: [
                        [[1, 0], [1, 1], [0, 1]],
                        [[0, 1], [1, 1], [0, 0]],
                    ],
                    type: 'MultiLineString',
                },
                properties: {},
                type: 'Feature',
            };
            var TEST_MULTILINESTRING = [
                [[0, 0], [1, 0], [1, 1]],
                [[0, 0], [0, 1], [1, 1]],
            ];
            it('should be changed in Leaflet when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                /* istanbul ignore if */
                if (layer.latLngs[0][0].lng !== TEST_VALUE.geometry.coordinates[0][0][0] ||
                    layer.latLngs[0][0].lat !== TEST_VALUE.geometry.coordinates[0][0][1] ||
                    layer.latLngs[0][1].lng !== TEST_VALUE.geometry.coordinates[0][1][0] ||
                    layer.latLngs[0][1].lat !== TEST_VALUE.geometry.coordinates[0][1][1] ||
                    layer.latLngs[0][2].lng !== TEST_VALUE.geometry.coordinates[0][2][0] ||
                    layer.latLngs[0][2].lat !== TEST_VALUE.geometry.coordinates[0][2][1] ||
                    layer.latLngs[1][0].lng !== TEST_VALUE.geometry.coordinates[1][0][0] ||
                    layer.latLngs[1][0].lat !== TEST_VALUE.geometry.coordinates[1][0][1] ||
                    layer.latLngs[1][1].lng !== TEST_VALUE.geometry.coordinates[1][1][0] ||
                    layer.latLngs[1][1].lat !== TEST_VALUE.geometry.coordinates[1][1][1] ||
                    layer.latLngs[1][2].lng !== TEST_VALUE.geometry.coordinates[1][2][0] ||
                    layer.latLngs[1][2].lat !== TEST_VALUE.geometry.coordinates[1][2][1]) {
                    throw new Error("Wrong value setted: " + TEST_VALUE.geometry.coordinates + " != " + layer._latlngs);
                }
            });
            it('should be changed in Angular when changing in Angular', function () {
                layer.geoJSON = TEST_VALUE;
                chai_1.expect(layer.geoJSON).to.deep.equal(TEST_VALUE);
            });
            it('should be changed geoJSON in Angular when changing in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_MULTILINESTRING);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiLineString') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
                chai_1.expect(lng2lat_1.lng2lat(layer.geoJSON.geometry.coordinates)).to.deep.equal(TEST_MULTILINESTRING);
            });
            it('should be changed geoJSON in Angular when adding in latlngs Leaflet', function () {
                layer.setLatLngs(TEST_MULTILINESTRING);
                layer.addLatLng([3, 3]);
                /* istanbul ignore if */
                if (layer.geoJSON.geometry.type !== 'MultiLineString') {
                    throw new Error('Received wrong geometry type: ' + layer.geoJSON.geometry.type);
                }
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
                    chai_1.expect(lng2lat_1.lng2lat(eventVal.geometry.coordinates)).to.deep.equal(TEST_MULTILINESTRING);
                    return done();
                });
                layer.setLatLngs(TEST_MULTILINESTRING);
            });
            it('should fire an event when adding in Leaflet', function (done) {
                layer.setLatLngs(TEST_MULTILINESTRING);
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
    });
    describe('[smoothFactor]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 0);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.options.smoothFactor !== val) {
                throw new Error("Wrong value setted: " + val + " != " + layer.options.smoothFactor);
            }
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(10, 0, 0);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.smoothFactor !== val) {
                throw new Error("Wrong value setted: " + val + " != " + layer.smoothFactor);
            }
        });
    });
    describe('[properties]', function () {
        var layerWithPropertiesInterface;
        var TEST_OBJECT = {
            test: 'OK',
        };
        beforeEach(function () {
            layerWithPropertiesInterface = new index_1.PolylineDirective({ ref: map }, {});
        });
        it('should be changed in Leaflet when changing in Angular', function () {
            layerWithPropertiesInterface.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layerWithPropertiesInterface.feature.properties !== TEST_OBJECT) {
                /* tslint:disable:max-line-length */
                throw new Error("Wrong value setted: " + TEST_OBJECT + " != " + layerWithPropertiesInterface.feature.properties);
                /* tslint:enable */
            }
        });
        it('should be changed in Angular when changing in Angular', function () {
            layerWithPropertiesInterface.properties = TEST_OBJECT;
            /* istanbul ignore if */
            if (layerWithPropertiesInterface.properties !== TEST_OBJECT) {
                throw new Error("Wrong value setted: " + TEST_OBJECT + " != " + layerWithPropertiesInterface.properties);
            }
        });
        it('should emit an event for GeoJSONChange when changing in Angular', function (done) {
            layerWithPropertiesInterface.geoJSONChange.subscribe(function (val) {
                /* istanbul ignore if */
                if (val.properties !== TEST_OBJECT) {
                    return done(new Error('Wrong value received'));
                }
                done();
            });
            layerWithPropertiesInterface.properties = TEST_OBJECT;
        });
    });
    describe('[noClip]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.options.noClip) {
                throw new Error("It is not setted to false");
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            layer.options.noClip = false;
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.options.noClip) {
                throw new Error("It is not setted to true");
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.noClip) {
                throw new Error("It is not setted to false");
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.noClip) {
                throw new Error("It is not setted to true");
            }
        });
    });
    describe('Popup in Polyline Directive', function () {
        var layerWithPopup;
        var popup;
        var testDiv;
        before(function () {
            testDiv = document.createElement('div');
            layerWithPopup = new index_1.PolylineDirective({ ref: map }, {});
            popup = new index_1.PopupDirective({ nativeElement: testDiv }, { ref: layerWithPopup });
        });
        it('should bind popup', function () {
            /* istanbul ignore if */
            if (!layerWithPopup._popup) {
                throw new Error('There is no popup binded');
            }
            /* istanbul ignore if */
            if (layerWithPopup._popup !== popup) {
                throw new Error('There is a wrong popup binded');
            }
        });
    });
    describe('Tooltip in Polyline Directive', function () {
        var layerWithTooltip;
        var tooltip;
        var testDiv;
        before(function () {
            testDiv = document.createElement('div');
            layerWithTooltip = new index_1.PolylineDirective({ ref: map }, {});
            tooltip = new index_1.TooltipDirective({ ref: layerWithTooltip }, { nativeElement: testDiv });
        });
        it('should bind tooltip', function () {
            /* istanbul ignore if */
            if (!layerWithTooltip._tooltip) {
                throw new Error('There is no tooltip binded');
            }
            /* istanbul ignore if */
            if (layerWithTooltip._tooltip !== tooltip) {
                throw new Error('There is a wrong tooltip binded');
            }
        });
    });
    describe('Destroying a Polyline Directive', function () {
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
//# sourceMappingURL=polyline.directive.spec.js.map