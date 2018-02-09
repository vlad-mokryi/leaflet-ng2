"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function enhanceMouseEvent(originalEvent, map) {
    return __assign({ containerPoint: map.mouseEventToContainerPoint(originalEvent), latlng: map.mouseEventToLatLng(originalEvent), layerPoint: map.mouseEventToLayerPoint(originalEvent) }, originalEvent, { originalEvent: originalEvent });
}
exports.enhanceMouseEvent = enhanceMouseEvent;
//# sourceMappingURL=mouse-event-helper.js.map