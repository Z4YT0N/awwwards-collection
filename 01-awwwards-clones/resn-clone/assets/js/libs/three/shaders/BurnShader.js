THREE.BurnShader = {

	uniforms: {

		"tDiffuse": { value: null },
		"u_burn":  { value: null },
		"u_offset_tex":  { value: null },

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D u_burn;",

		"uniform sampler2D tDiffuse;",
		
		"uniform vec2 u_offset_tex;",

		"varying vec2 vUv;",

		"void main() {",

			"vec2 uv = vUv;",
			"vec2 uvOffseted = uv + u_offset_tex;",

			"vec4 texel = texture2D( tDiffuse, uvOffseted );",
			"vec4 texel_burn = texture2D( u_burn, uv );",
			
			"gl_FragColor = texel * texel_burn;",

		"}"

	].join( "\n" )

};
