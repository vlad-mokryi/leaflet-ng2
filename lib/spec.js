"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var leaflet_1 = require("leaflet");
function randomNumber(max, min, after) {
    if (max === void 0) { max = 1; }
    if (min === void 0) { min = 0; }
    if (after === void 0) { after = 3; }
    return (Math.floor(Math.random() * (Math.abs(max) + Math.abs(min)) * Math.pow(10, after)) / Math.pow(10, after)) + min;
}
exports.randomNumber = randomNumber;
function randomLat() {
    return randomNumber(90, -90);
}
exports.randomLat = randomLat;
function randomLng() {
    return randomNumber(180, -180);
}
exports.randomLng = randomLng;
function randomLatLng() {
    return new leaflet_1.LatLng(randomLat(), randomLng());
}
exports.randomLatLng = randomLatLng;
function randomLatLngBounds() {
    var lat1 = randomLat();
    var lat2 = randomLat();
    var lng1 = randomLng();
    var lng2 = randomLng();
    return new leaflet_1.LatLngBounds(new leaflet_1.LatLng(lat1 < lat2 ? lat1 : lat2, lng1 < lng2 ? lng1 : lng2), new leaflet_1.LatLng(lat1 < lat2 ? lat2 : lat1, lng1 < lng2 ? lng2 : lng1));
}
exports.randomLatLngBounds = randomLatLngBounds;
function hasAsChild(root, child) {
    var length = root.children.length;
    for (var i = 0; i < length; i += 1) {
        /* istanbul ignore else */
        if (root.children.item(i) === child) {
            return true;
        }
    }
    return false;
}
exports.hasAsChild = hasAsChild;
//# sourceMappingURL=spec.js.map