@import ./bgCover;

uniform sampler2D uTexture;
uniform float uDistortion;
uniform float uScale;
uniform float uTime;
uniform float uState;
uniform float uShift;
varying vec2 vUv;

void main() {

	float angle = 1.55;
	vec2 newUv = vUv;

	newUv+= (sin(newUv.y*10. + (uTime / 5.)) / 500.) * (uState);
	newUv+= (sin(newUv.x*10. + (uTime / 15.)) / 500.) * (uState);

	vec2 p = (newUv - vec2(0.5, 0.5)) * (1.0 - uScale) + vec2(0.5, 0.5);
	vec2 offset = uDistortion / 50.0 * vec2(cos(angle), sin(angle));

	vec4 cr = texture2D(uTexture, p + offset + uShift);
	vec4 cga = texture2D(uTexture, p);
	vec4 cb = texture2D(uTexture, p - offset + uShift);

	gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
}