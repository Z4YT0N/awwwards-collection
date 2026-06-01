uniform vec2 u_resolution;
uniform vec2 u_scrollOffset;
uniform vec2 u_domXY;
uniform vec2 u_domWH;
varying vec2 v_uv;

void main() {
    vec2 pixelXY = u_domXY - u_scrollOffset + u_domWH * 0.5;
    pixelXY.y = u_resolution.y - pixelXY.y;
    pixelXY += position.xy * u_domWH;
    vec2 xy = pixelXY / u_resolution * 2. - 1.;
    v_uv = uv;
    gl_Position = vec4(xy, 0., 1.0);
}
