uniform sampler2D uTexture;
uniform float uDistortion;
uniform float uTransition;
uniform float uVisibility;
varying vec2 vUv;

float M_PI = 3.1415926535897932384626433832795;

float distort(float uType, vec2 vUv) {
  float roundblend = sin(M_PI*uType);
	float stepblend = clamp(2.*(-vUv.x + vUv.y) +3.*uType - 1., 0.,1.);

  return stepblend * roundblend * 0.25;
}

void main()	{

	vec4 originTexture = texture2D(uTexture, vUv);
	vec4 multiplyTexture = texture2D(uTexture, vUv) * distort(uDistortion, vUv);
	vec4 multiplyTexture2 = texture2D(uTexture, vUv) * distort(uTransition, vUv);

	originTexture.a = uVisibility;
	multiplyTexture.a = uVisibility;
	multiplyTexture2.a = uVisibility;

	vec4 finalTexture = originTexture + multiplyTexture + multiplyTexture2;

	gl_FragColor = finalTexture;
}