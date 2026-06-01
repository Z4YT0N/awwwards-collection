uniform vec3 color;
uniform vec2 resolution;
uniform sampler2D texture;
uniform float time;
uniform float rotation;
uniform float swapped;
uniform float coloured;

varying vec2 vUv;

void main( void ) {

    vec2 uv = vUv;
    // vec2 coords = ( gl_FragCoord.xy / resolution.xy );
    vec2 coords = ( gl_FragCoord.xy / vec2( resolution.x, resolution.x ) );



    // SCALING
    // -------

    float scale = 0.48;
    float animRange = 0.15;
    float animTime = sin( time * 0.0001 );
    float animScale = scale + animRange * animTime;

    coords.x += coords.x * ( ( 1.0 - animScale ) * 0.5 );
    coords.y += coords.y * ( ( 1.0 - animScale ) * 0.5 );

    coords.x /= animScale;
    coords.y /= animScale;


    // ROTATION
    // --------

    float sin_factor = sin(rotation);
    float cos_factor = cos(rotation);

    coords = 0.5 + ( coords - 0.5 ) * mat2( cos_factor, sin_factor, -sin_factor, cos_factor );

    // This adds a slight offset to each face
    // coords += uv * 0.001;

    // vec4 tColor = texture2D( texture, uv );
    vec4 tColor = texture2D( texture, coords );

    if ( swapped > 0.0 ) {

        tColor.r = 1.0 - tColor.r;
        tColor.g = 1.0 - tColor.g;
        tColor.b = 1.0 - tColor.b;
    }

    if ( coloured == 1.0 ) {

        tColor.g -= 1.0;
        tColor.b -= 1.0;
    }
    else if ( coloured == 2.0 ) {

        tColor.r -= 0.9765;
        tColor.g -= 1.0;
    }

    gl_FragColor = tColor;
}