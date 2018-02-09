"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var leaflet_1 = require("leaflet");
var index_1 = require("./index");
var spec_1 = require("./spec");
describe('Scale-Control Directive', function () {
    var map;
    var control;
    beforeEach(function () {
        map = new index_1.MapComponent({ nativeElement: document.createElement('div') }, new index_1.LayerGroupProvider(), new index_1.MapProvider());
        map._size = leaflet_1.point(100, 100);
        map._pixelOrigin = leaflet_1.point(50, 50);
        control = new index_1.ScaleControlDirective({ ref: map });
    });
    describe('[(display)]', function () {
        it('should set DOM container style to display:none when not displaying', function () {
            control.display = false;
            chai_1.expect(control.getContainer().style.display).to.equal('none');
        });
        it('should reset DOM container style when display is true again', function () {
            control.display = false;
            control.display = true;
            chai_1.expect(control.getContainer().style.display).to.not.equal('none');
        });
        it('should set to false by removing from map', function (done) {
            control.displayChange.subscribe(function (val) {
                chai_1.expect(val).to.equal(false);
                chai_1.expect(control.display).to.equal(false);
                done();
            });
            map.removeControl(control);
        });
        // it.skip('should set to true when adding to map again', (done: MochaDone) => {
        //     /* tslint:disable */
        //     control.displayChange.subscribe((x) => { console.log('aslkdnasnldknaskldnlkd ', x); });
        //     map.removeControl(control);
        //     setTimeout(() => {
        //         control.displayChange.subscribe((val: boolean) => {
        //             expect(val).to.equal(true);
        //             expect(control.display).to.equal(true);
        //             done();
        //         });
        //         map.addControl(control);
        //     }, 0);
        // });
    });
    describe('[(position)]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = 'topright';
            control.position = val;
            chai_1.expect(control.getPosition()).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = 'topright';
            control.position = val;
            chai_1.expect(control.position).to.equal(val);
        });
        it('should be changed in Angular when changing in Leaflet', function () {
            var val = 'topright';
            control.setPosition(val);
            chai_1.expect(control.position).to.equal(val);
        });
        it('should fire an event when changing in Angular', function (done) {
            var val = 'topleft';
            control.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            control.position = val;
        });
        it('should fire an event when changing in Leaflet', function (done) {
            var val = 'topleft';
            control.positionChange.subscribe(function (eventVal) {
                chai_1.expect(eventVal).to.equal(val);
                return done();
            });
            control.setPosition(val);
        });
    });
    describe('[maxWidth]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            control.maxWidth = val;
            chai_1.expect(control.options.maxWidth).to.equal(val);
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            control.maxWidth = val;
            chai_1.expect(control.maxWidth).to.equal(val);
        });
    });
    describe('[zIndex]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            control.zIndex = val;
            chai_1.expect(control.getContainer().style.zIndex).to.equal(val.toString());
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber(255, 1, 0);
            control.zIndex = val;
            chai_1.expect(control.zIndex).to.equal(val);
        });
    });
    // Events
    describe('(add)', function () {
        it('should fire an event when adding to map', function (done) {
            map.removeControl(control);
            control.addEvent.subscribe(function () {
                done();
            });
            map.addControl(control);
        });
    });
    describe('(remove)', function () {
        it('should fire an event when removing from map', function (done) {
            control.removeEvent.subscribe(function () {
                done();
            });
            map.removeControl(control);
        });
    });
    describe('(click)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.clickEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('click', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(dbclick)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.dbclickEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('dbclick', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(mousedown)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.mousedownEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('mousedown', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(mouseover)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.mouseoverEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('mouseover', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('(mouseout)', function () {
        it('should fire an event when firing event from DOM', function (done) {
            control.mouseoutEvent.subscribe(function () {
                done();
            });
            control.getContainer().dispatchEvent(new MouseEvent('mouseout', {
                clientX: 3,
                clientY: 4,
                screenX: 1,
                screenY: 2,
            }));
        });
    });
    describe('[opacity]', function () {
        it('should be changed in Leaflet when changing in Angular', function () {
            var val = spec_1.randomNumber();
            control.opacity = val;
            chai_1.expect(control.getContainer().style.opacity).to.equal(val.toString());
        });
        it('should be changed in Angular when changing in Angular', function () {
            var val = spec_1.randomNumber();
            control.opacity = val;
            chai_1.expect(control.opacity).to.equal(val);
        });
    });
    describe('[metric]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            control.metric = false;
            chai_1.expect(control.options.metric).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            control.options.metric = false;
            control.metric = true;
            chai_1.expect(control.options.metric).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            control.metric = false;
            chai_1.expect(control.metric).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            control.metric = true;
            chai_1.expect(control.metric).to.equal(true);
        });
    });
    describe('[imperial]', function () {
        it('should be changed to false in Leaflet when changing in Angular to false', function () {
            control.imperial = false;
            chai_1.expect(control.options.imperial).to.equal(false);
        });
        it('should be changed to true in Leaflet when changing in Angular to true', function () {
            control.options.imperial = false;
            control.imperial = true;
            chai_1.expect(control.options.imperial).to.equal(true);
        });
        it('should be changed in Angular to false when changing in Angular to false', function () {
            control.imperial = false;
            chai_1.expect(control.imperial).to.equal(false);
        });
        it('should be changed in Angular to true when changing in Angular to true', function () {
            control.imperial = true;
            chai_1.expect(control.imperial).to.equal(true);
        });
    });
    describe('Destroying a Scale Control Directive', function () {
        it('should remove Tile-Layer Directive from map on destroy', function () {
            /* istanbul ignore if */
            if (control.getContainer().parentElement.parentElement.parentElement !== map.getContainer()) {
                throw new Error('The control is not part of the map before destroying');
            }
            control.ngOnDestroy();
            /* istanbul ignore if */
            if (control.getContainer() &&
                control.getContainer().parentElement &&
                control.getContainer().parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement &&
                control.getContainer().parentElement.parentElement.parentElement === map.getContainer()) {
                throw new Error('The layer is still part of the map after destroying');
            }
        });
    });
});
//# sourceMappingURL=scale-control.directive.spec.js.map