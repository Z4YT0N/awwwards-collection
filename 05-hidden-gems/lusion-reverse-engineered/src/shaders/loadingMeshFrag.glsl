#include "./common.glsl"

#define EPSILON 0.000001
#define PI 3.14159265358979
#define LOADING_TRACK_COLOUR vec3(0.12, 0.12, 0.12)
#define LOADING_PROGRESS_COLOUR vec3(1.0, 1.0, 1.0)
#define LETTER_LENGTH 0.3
#define LETTER_THICKNESS 0.1

uniform float aspect;
uniform float letterScale;
uniform float backgroundAlpha;
uniform float loadingProgress;
uniform float postLoadSequenceProgress;

varying vec2 vUv;

const vec2 LoadingBarBl = vec2(-LETTER_LENGTH, -LETTER_THICKNESS * 0.5);
const vec2 LoadingBarTr = vec2(LETTER_LENGTH, LETTER_THICKNESS * 0.5);

// the start and end points of the rect that make up the vertical
// Because UVs are defined from bottom left to bottom right, that how we'll define our rect corners
const vec2 Letter1Bl = vec2(-LETTER_LENGTH, -LETTER_THICKNESS * 0.5);
const vec2 Letter1Tr = vec2(0.0, LETTER_THICKNESS * 0.5);

const vec2 Letter2Bl = vec2(0.0, -LETTER_THICKNESS * 0.5);
const vec2 Letter2Tr = vec2(LETTER_LENGTH, LETTER_THICKNESS * 0.5);

const vec2 Letter1RotateAnchor = vec2(0.0, LETTER_THICKNESS * 0.5);

float calculateRect(vec2 bl, vec2 tr, vec2 uv) {
    float rect = 1.0;

    rect -= step(uv.x, bl.x);
    rect -= step(tr.x, uv.x);
    rect -= step(uv.y, bl.y);
    rect -= step(tr.y, uv.y);

    return clamp(rect, 0.0, 1.0);
}

float calculateRectPercent(vec2 bl, vec2 tr, vec2 uv, float percent) {
    float rect = 1.0;
    float width = tr.x - bl.x;

    rect -= step(uv.x, bl.x);
    rect -= step(bl.x + width * percent, uv.x);
    rect -= step(uv.y, bl.y);
    rect -= step(tr.y, uv.y);

    return clamp(rect, 0.0, 1.0);
}

void main() {
    float showLoadingBar = step(loadingProgress, 1.0 - EPSILON);
    float showPostLoadSequence = step(1.0 - EPSILON, loadingProgress);

    float letterRotationCurve = smoothstep(0., 0.1, postLoadSequenceProgress);
    float letterDiscardCurve = smoothstep(0.0, 0.5, postLoadSequenceProgress);
    float scaleAndRotateCurve = smoothstep(0.6, 1.0, postLoadSequenceProgress);
    float backgroundAlphaCurve = smoothstep(0.8, 1.0, postLoadSequenceProgress);

    float letterRotation = mix(0.0, -PI * 0.5, letterRotationCurve);

    // Scale uv so they cater for different aspects
    vec2 ndcUv = getNdcUV(vUv);
    ndcUv.x *= aspect;
    ndcUv /= mix(1.0, 10.0, scaleAndRotateCurve);
    ndcUv = rotateAroundAnchor(ndcUv, vec2(0.0), mix(0.0, PI / 16., scaleAndRotateCurve));
    ndcUv += mix(vec2(0.), vec2(0., 0.1), scaleAndRotateCurve);

    vec2 verticalUv = ndcUv;
    verticalUv = rotateAroundAnchor(verticalUv, Letter1RotateAnchor, letterRotation);

    // remove everything outside the defined rectangle
    float loadingTrackRect = calculateRect(LoadingBarBl, LoadingBarTr, ndcUv);
    float loadingProgressRect = calculateRectPercent(LoadingBarBl, LoadingBarTr, ndcUv, loadingProgress);

    float l1Rect = calculateRect(Letter1Bl, Letter1Tr, verticalUv);
    float l2Rect = calculateRect(Letter2Bl, Letter2Tr, ndcUv);
    float l1l2Rect = l1Rect + l2Rect;

    vec3 trackColour = loadingTrackRect * LOADING_TRACK_COLOUR * showLoadingBar;
    vec3 progressColour = loadingTrackRect * loadingProgressRect * LOADING_PROGRESS_COLOUR * showLoadingBar;

    vec3 l1l2Colour = vec3(1.15 - postLoadSequenceProgress) * l1l2Rect * showPostLoadSequence;
    float alpha = 1.0;
    alpha -= l1l2Rect * letterDiscardCurve;
    alpha -= backgroundAlphaCurve;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(trackColour + progressColour + l1l2Colour, alpha);
}