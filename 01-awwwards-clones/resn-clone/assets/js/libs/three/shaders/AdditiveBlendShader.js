/**

 	Simple additive blend - sum the rgb values of 2 input textures

 	tDiffuse: 	base texture
 	tAdd: 		texture to add
 	amount: 	amount to add 2nd texture

 	@author felixturner / http://airtight.cc/

 */

THREE.AdditiveBlendShader = {

	uniforms: {

		'tDiffuse': { type: 't', value: null },
		'tAdd': { type: 't', value: null },
		'amount': { type: 'f', value: 1.0 }

	},

	vertexShader: [

		'varying vec2 vUv;',

		'void main() {',

			'vUv = uv;',
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

		'}'

	].join('\n'),

	fragmentShader: [


		'uniform sampler2D tDiffuse;',
		'uniform sampler2D tAdd;',
		'uniform float amount;',

		'varying vec2 vUv;',

		'void main() {',

			'vec4 Ca = texture2D( tDiffuse, vUv );',
			'vec4 Cb = texture2D( tAdd, vUv );',
			'gl_FragColor = Ca + Cb * (1.0 - Ca.a);',

		'}'

	].join('\n')

};
