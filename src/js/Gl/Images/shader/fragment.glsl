uniform sampler2D uTexture;
uniform float uDistortion;
uniform float uVisibility;
uniform vec3 uMouse;
varying vec2 vUv;
varying vec3 vPosition;

float M_PI = 3.1415926535897932384626433832795;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float distort(float uType, vec2 vUv) {
  float roundblend = sin(M_PI*uType);
	float stepblend = clamp(2.*(-vUv.x + vUv.y) +3.*uType - 1., 0.,1.);

  return stepblend * roundblend * 0.25;
}

void main()	{

	float dist = length(vPosition - uMouse);
	float prox = 1. - map(dist, 0., 0.15, 0., 1.);
	prox = clamp(prox, 0., 1.);

	vec2 zoomedUv = mix(vUv, uMouse.xy + vec2(0.5), prox);

	vec4 originTexture = texture2D(uTexture, vUv);
	vec4 multiplyTexture = texture2D(uTexture, vUv) * distort(uDistortion, vUv);

	originTexture.a = uVisibility;
	multiplyTexture.a = uVisibility;

	vec4 finalTexture = originTexture + multiplyTexture;

	gl_FragColor = finalTexture;
}