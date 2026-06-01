define(function() {

    "use strict";

    var Rectangle = {

        create: function(x, y, width, height) {
            return { x: x, y: y, width: width, height: height };
        },

        move: function(r, x, y) {
            return Rectangle.create(r.x + x, r.y + y, r.width, r.height);
        },

        resize: function(r, width, height) {
            return Rectangle.create(r.x, r.y, width, height);
        },

        scale: function(r, scaleX, scaleY, pivot) {

            var width = r.width * scaleX;
            var height = r.height * scaleY;

            var offsetX = ((pivot.x * width) - (pivot.x * r.width));
            var offsetY = ((pivot.y * height) - (pivot.y * r.height));

            var x = r.x - offsetX;
            var y = r.y - offsetY;

            return Rectangle.create(x, y, width, height);
        },

        union: function(r1, r2) {

            var x = Math.min(r1.x, r2.x);
            var y = Math.min(r1.y, r2.y);

            var width = Math.max(r1.x + r1.width, r2.x + r2.width) - x;
            var height = Math.max(r1.y + r1.height, r2.y + r2.height) - y;

            return Rectangle.create(x, y, width, height);
        },

        contains: function(r, point) {
            return (point.x >= r.x && point.x <= r.x + r.x + r.width) && (point.y >= r.y && point.y <= r.y + r.height);
        },

        intersects: function(r1, r2) {
            return !(r1.x > r2.x + r2.width || r1.x + r1.width < r2.x || r1.y > r2.y + r2.height || r1.y + r1.height < r2.y);
        },

        getOverlap: function(r1, r2) {

            var overlapX = Math.max(0, Math.min(r1.x + r1.width, r2.x + r2.width) - Math.max(r1.x, r2.x));
            var overlapY = Math.max(0, Math.min(r1.y + r1.height, r2.y + r2.height) - Math.max(r1.y, r2.y));

            return overlapX * overlapY;
        },

        valueInRange: function(value, min, max) {
            return (value >= min) && (value <= max);
        },

        rectOverlap: function(r0, r1) {
            
            var xOverlap = this.valueInRange(r0.x, r1.x, r1.x + r1.width) || this.valueInRange(r1.x, r0.x, r0.x + r0.width);
            var yOverlap = this.valueInRange(r0.y, r1.y, r1.y + r1.height) || this.valueInRange(r1.y, r0.y, r0.y + r0.height);

            return xOverlap && yOverlap;
        },

        clone: function(r) {
            return Rectangle.create(r.x, r.y, r.width, r.height);
        }
    };

    return Rectangle;
});