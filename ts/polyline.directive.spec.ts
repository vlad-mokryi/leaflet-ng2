/// <reference path="../typings/index.d.ts" />

import { PolylineDirective,
    MapComponent,
    LatLngExpression } from './index';
import { point, SVG, PathOptions, latLng, LatLng } from 'leaflet';
import { createPathTests } from './path-directives.spec';
import { IGenericGeoJSONFeature } from './d.ts/generic-geojson';

describe('Polyline Directive', () => {
    createPathTests(PolylineDirective);

    describe('[(latlngs)]', () => {
        var map: MapComponent,
            layer: PolylineDirective<any>;
        const TEST_VALUE: LatLng[] = [latLng(0, 1), latLng(1, 1), latLng(1, 0)];
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new PolylineDirective<any>(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.latLngs = TEST_VALUE;
            /* istanbul ignore if */
            if ((<any>layer)._latlngs[0] !== TEST_VALUE[0] ||
                (<any>layer)._latlngs[1] !== TEST_VALUE[1] ||
                (<any>layer)._latlngs[2] !== TEST_VALUE[2]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ (<any>layer)._latlngs }`);
            }

        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.latLngs = TEST_VALUE;
            /* istanbul ignore if */
            if (layer.latLngs[0] !== TEST_VALUE[0] ||
                layer.latLngs[1] !== TEST_VALUE[1] ||
                layer.latLngs[2] !== TEST_VALUE[2]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.latLngs }`);
            }
        });
        it('should be changed in Angular when changing in Leaflet', () => {
            layer.setLatLngs(TEST_VALUE);
            /* istanbul ignore if */
            if (layer.latLngs[0] !== TEST_VALUE[0] ||
                layer.latLngs[1] !== TEST_VALUE[1] ||
                layer.latLngs[2] !== TEST_VALUE[2]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.latLngs }`);
            }
        });
        it('should be changed in Angular when adding in Leaflet', () => {
            layer.setLatLngs(TEST_VALUE);
            layer.addLatLng([3, 3]);
            /* istanbul ignore if */
            if (layer.latLngs[3].lat !== 3 ||
                layer.latLngs[3].lng !== 3) {
                throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.latLngs }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.latLngsChange.subscribe((eventVal: LatLng[]) => {
                /* istanbul ignore if */
                if (eventVal[0] !== TEST_VALUE[0] ||
                    eventVal[1] !== TEST_VALUE[1] ||
                    eventVal[2] !== TEST_VALUE[2]) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.latLngs = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.latLngsChange.subscribe((eventVal: LatLng[]) => {
                /* istanbul ignore if */
                if (eventVal[0] !== TEST_VALUE[0] ||
                    eventVal[1] !== TEST_VALUE[1] ||
                    eventVal[2] !== TEST_VALUE[2]) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setLatLngs(TEST_VALUE);
        });
        it('should fire geoJSON-change event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.latLngs = TEST_VALUE;
        });
        it('should fire geoJSON-change event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.setLatLngs(TEST_VALUE);
        });
        it('should fire an change event when adding in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe(() => {
                return done();
            });
            layer.addLatLng([3, 3]);
        });
    });

    describe('[(geoJSON)]', () => {
        var map: MapComponent,
            layer: PolylineDirective<any>;
        const TEST_VALUE: IGenericGeoJSONFeature<GeoJSON.LineString, any> = {
            geometry: {
                coordinates: [[0, 1], [1, 1], [0, 0]],
                type: 'LineString'
            },
            properties: {},
            type: 'Feature'
        };
        const TEST_LINESTRING: LatLngExpression[] = [[0, 0], [1, 0], [1, 1]];
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new PolylineDirective<any>(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            layer.geoJSON = TEST_VALUE;
            /* istanbul ignore if */
            if (layer.latLngs[0].lng !== TEST_VALUE.geometry.coordinates[0][0] ||
                layer.latLngs[0].lat !== TEST_VALUE.geometry.coordinates[0][1] ||
                layer.latLngs[1].lng !== TEST_VALUE.geometry.coordinates[1][0] ||
                layer.latLngs[1].lat !== TEST_VALUE.geometry.coordinates[1][1] ||
                layer.latLngs[2].lng !== TEST_VALUE.geometry.coordinates[2][0] ||
                layer.latLngs[2].lat !== TEST_VALUE.geometry.coordinates[2][1]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE.geometry.coordinates } != ${ (<any>layer)._latlngs }`);
            }

        });
        it('should be changed in Angular when changing in Angular', () => {
            layer.geoJSON = TEST_VALUE;
            /* istanbul ignore if */
            if (layer.geoJSON[0] !== TEST_VALUE[0] ||
                layer.geoJSON[1] !== TEST_VALUE[1] ||
                layer.geoJSON[2] !== TEST_VALUE[2]) {
                throw new Error(`Wrong value setted: ${ TEST_VALUE } != ${ layer.geoJSON }`);
            }
        });
        it('should be changed geoJSON in Angular when changing in latlngs Leaflet', () => {
            layer.setLatLngs(TEST_LINESTRING);
            /* istanbul ignore if */
            if (layer.geoJSON.geometry.coordinates[0][0] !== TEST_LINESTRING[0][1] ||
                layer.geoJSON.geometry.coordinates[0][1] !== TEST_LINESTRING[0][0] ||
                layer.geoJSON.geometry.coordinates[1][0] !== TEST_LINESTRING[1][1] ||
                layer.geoJSON.geometry.coordinates[1][1] !== TEST_LINESTRING[1][0] ||
                layer.geoJSON.geometry.coordinates[2][0] !== TEST_LINESTRING[2][1] ||
                layer.geoJSON.geometry.coordinates[2][1] !== TEST_LINESTRING[2][0]) {
                throw new Error(`Wrong value setted: ${ TEST_LINESTRING } != ${ layer.geoJSON.geometry.coordinates }`);
            }
        });
        it('should be changed geoJSON in Angular when adding in latlngs Leaflet', () => {
            layer.setLatLngs(TEST_LINESTRING);
            layer.addLatLng([3, 3]);
            /* istanbul ignore if */
            if (layer.geoJSON.geometry.coordinates[3][0] !== 3 ||
                layer.geoJSON.geometry.coordinates[3][1] !== 3) {
                throw new Error(`Wrong value added: ${ [3, 3] } != ${ layer.geoJSON.geometry.coordinates }`);
            }
        });
        it('should fire an event when changing in Angular', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: LatLng[]) => {
                /* istanbul ignore if */
                if (eventVal[0] !== TEST_VALUE[0] ||
                    eventVal[1] !== TEST_VALUE[1] ||
                    eventVal[2] !== TEST_VALUE[2]) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.geoJSON = TEST_VALUE;
        });
        it('should fire an event when changing in Leaflet', (done: MochaDone) => {
            layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.LineString, any>) => {
                const values: [number, number][] = (<any>eventVal.geometry.coordinates);
                /* istanbul ignore if */
                if (values[0][0] !== TEST_LINESTRING[0][1] ||
                    values[0][1] !== TEST_LINESTRING[0][0] ||
                    values[1][0] !== TEST_LINESTRING[1][1] ||
                    values[1][1] !== TEST_LINESTRING[1][0] ||
                    values[2][0] !== TEST_LINESTRING[2][1] ||
                    values[2][1] !== TEST_LINESTRING[2][0]) {
                    return done(new Error('Received wrong value'));
                }
                return done();
            });

            layer.setLatLngs(TEST_LINESTRING);
        });
        it('should fire an event when adding in Leaflet', (done: MochaDone) => {
            layer.setLatLngs(TEST_LINESTRING);
            layer.geoJSONChange.subscribe((eventVal: IGenericGeoJSONFeature<GeoJSON.LineString, any>) => {
                const values: [number, number][] = (<any>eventVal.geometry.coordinates);
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

    describe('[smoothFactor]', () => {
        var map: MapComponent,
            layer: PolylineDirective<any>;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new PolylineDirective<any>(map);
            return done();
        });
        it('should be changed in Leaflet when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.options.smoothFactor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.options.smoothFactor }`);
            }
        });
        it('should be changed in Angular when changing in Angular', () => {
            const val: number = Math.ceil(Math.random() * 10);
            layer.smoothFactor = val;
            /* istanbul ignore if */
            if (layer.smoothFactor !== val) {
                throw new Error(`Wrong value setted: ${ val } != ${ layer.smoothFactor }`);
            }
        });
    });
    describe('[noClip]', () => {
        var map: MapComponent,
            layer: PolylineDirective<any>;
        beforeEach((done) => {
            map = new MapComponent({nativeElement: document.createElement('div')});
            (<any>map)._size = point(100, 100);
            (<any>map)._pixelOrigin = point(50, 50);
            (<any>map)._renderer = (<any>map)._renderer || new SVG();

            layer = new PolylineDirective<any>(map);
            return done();
        });
        it('should be changed to false in Leaflet when changing in Angular to false', () => {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.options.noClip) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed to true in Leaflet when changing in Angular to true', () => {
            layer.options.noClip = false;
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.options.noClip) {
                throw new Error(`It is not setted to true`);
            }
        });
        it('should be changed in Angular to false when changing in Angular to false', () => {
            layer.noClip = false;
            /* istanbul ignore if */
            if (layer.noClip) {
                throw new Error(`It is not setted to false`);
            }
        });
        it('should be changed in Angular to true when changing in Angular to true', () => {
            layer.noClip = true;
            /* istanbul ignore if */
            if (!layer.noClip) {
                throw new Error(`It is not setted to true`);
            }
        });
    });
});