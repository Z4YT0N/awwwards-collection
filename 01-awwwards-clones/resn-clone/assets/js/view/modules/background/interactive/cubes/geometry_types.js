define([

    'three'


], function(

    THREE

) { 'use strict';

    /*

        - name: ID of the geometry type
        - geo: THREE geometry instance
        - faceMap: array of which geometry faces should be textured, 1 is textured, 0 is blank

    */

    return {

        COUNT: 3,

        getCube: function (geoSize) {

            return {
                'name': 'CUBE',
                'geo': new THREE.BoxGeometry(geoSize, geoSize, geoSize),
                'faceMap': [1, 0, 1, 0, 1, 0]
            };
        },

        getPrism: function (geoSize) {

            geoSize *= 0.85;

            return {
                'name': 'PRISM',
                'geo': new THREE.TetrahedronGeometry( geoSize, 0 ),
                'faceMap': [1, 1, 1, 0]
            };
        },

        getTube: function (geoSize) {

            geoSize *= 0.2;

            return {
                'name': 'TUBE',
                'geo': new THREE.CylinderGeometry( geoSize, geoSize, geoSize * 12, 50, 1, false ),
                'length': 12,
                'faceMap': [1]
            };
        },

        // getSphere: function (geoSize) {

        //     geoSize *= 0.8;

        //     return {
        //         'name': 'SPHERE',
        //         'geo': new THREE.SphereGeometry( geoSize, 32, 32 ),
        //         'length': 12,
        //         'faceMap': [1]
        //     };
        // },

        // getDiamond: function (geoSize) {

        //     geoSize *= 0.9;

        //     return {
        //         'name': 'DIAMOND',
        //         'geo': new THREE.OctahedronGeometry( geoSize, 0 ),
        //         'faceMap': [1, 1, 0, 0, 0, 0, 1, 1]
        //     };
        // }

    };

});