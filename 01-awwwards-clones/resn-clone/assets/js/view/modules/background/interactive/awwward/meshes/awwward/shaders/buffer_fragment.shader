uniform sampler2D u_diffuse;
uniform vec2 u_resolution;

uniform float intensity;

const int samples = 64; //multiple of 2

varying vec2 vUv;

vec4 directionalBlur(in vec2 uv, in vec2 direction, in float Intensity, in sampler2D texture) {
    
    vec4 color = vec4(0.0);

    for (int i=1; i<=samples/2; i++) {
        color += texture2D(texture,uv+float(i)*Intensity/float(samples/2)*direction);
        color += texture2D(texture,uv-float(i)*Intensity/float(samples/2)*direction);
    }

    return color / float(samples);
}

void main() {
	
	float intensity = 0.006;

	vec2 uv = vUv;

    vec2 direction = vec2(-1.0, 1.0);

    vec4 color = directionalBlur(uv, normalize(direction), intensity, u_diffuse);
    // vec4 color = directionalBlur(uv, normalize(direction), intensity, u_diffuse);
    // vec4 color = texture2D( u_diffuse, uv);

    // color.rgb -= color.rgb;
    // color.rgb *= -1.0;
    color.rgb += color.rgb / 100.0;

    // vec3 colorOut = color.rgb + (color.rgb / 400.0);
    // vec3 colorOut = color.rgb + (color.rgb * 0.004);
    // 
    // float alpha = 1.;

    // gl_FragColor = color;
    gl_FragColor = vec4(color.rgb, 1.0);
    // gl_Fragcolor = vec4(1.0,0.0,0.0,1.0);
}
