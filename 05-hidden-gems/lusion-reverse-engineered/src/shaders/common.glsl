vec2 getNdcUV(vec2 uv) {
    return uv * 2.0 - 1.0;
}

float roundedCornerMask(vec2 uv, float borderRadius, float aspect, float taper) {
    // Convert to normalised device coordinates (i.e center = 0, 0),
    vec2 uv_ndc = getNdcUV(uv);

    // then treat corners as distances from the center with abs
    uv_ndc = abs(uv_ndc);

    // If we didn't include the mask taper, we could simply do this: (easier to explain in the video, perhaps?)
    // vec2 corner = uv_ndc - (1.0 - borderRadius);

    // For the current uv, which now ranges from 0 at the center to 1 at the edges,
    // subtract 1 - borderRadius, such that everything inside the border has a value of 0 or less
    // and everything else (e.g the bits we want to not render) have a value > 0 

    vec2 corner;
    corner.x = uv_ndc.x - (1.0 - borderRadius - taper);
    corner.y = uv_ndc.y - (1.0 - borderRadius);

    // Now we say the max value can be 0.0, so anything above is truncated, this is also known as "clipping"
    corner = max(corner, vec2(0.0, 0.0));
    corner.x *= aspect;

    // Clever little trick to convert vec2 values in a float. This does two things: let's us treat negative values as positive
    // then tells us how far from the corner this fragment is.
    // in the line above we set all the corner values to 0, so they'lll remain zero.
    float distanceFromCorner = length(corner);

    // Now we return 0 if distanceFromCorner is less than borderRadius.
    // And return 1 for everything equal or greater - that's everything inside the border
    return step(distanceFromCorner, borderRadius);
}

float roundedCornerMask(vec2 uv, float borderRadius, float aspect) {
    return roundedCornerMask(uv, borderRadius, aspect, 0.0);
}

vec2 rotate(vec2 pos, float radians) {
    float cosTheta = cos(radians);
    float sinTheta = sin(radians);
    mat2 rotMat = mat2(cosTheta, -sinTheta, sinTheta, cosTheta);

    pos.xy = rotMat * pos.xy;
    return pos;
}

vec2 rotateAroundAnchor(vec2 pos, vec2 anchor, float radians) {
    vec2 newPos = pos - anchor;
    newPos = rotate(newPos, radians);
    newPos += anchor;

    return newPos;
}

vec2 scaleAroundAnchor(vec2 pos, vec2 anchor, float scale) {
    vec2 newPos = pos - anchor;
    newPos /= scale;
    return newPos;
}