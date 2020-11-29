uniform sampler2D uTexture;
uniform float uDistortion;
uniform float uVisibility;
uniform float uTransition;
uniform vec2 uMouse;
uniform vec2 uRate;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

float M_PI = 3.1415926535897932384626433832795;

float distort(float uType, vec2 vUv) {
  float roundblend = sin(M_PI*uType);
	float stepblend = clamp(2.*(-vUv.x + vUv.y) +3.*uType - 1., 0.,1.);

  return stepblend * roundblend * 0.25;
}

void main()	{

	vec2 newUv = vUv;

	newUv.y+= sin(newUv.y*20. + uTime*0.02) * 0.02*uTransition;
	newUv.x+= sin(newUv.x*10. + uTime*0.05) * 0.004*uTransition;

	vec2 mouse = vec2(uMouse.x, ((1. - uMouse.y) - 0.5)*uRate.y + 0.5);
	float dist = distance(mouse, newUv);

	if (dist < 0.1 && uHover > 0.) {
		float temp = dist / 0.1;
		float abs = 1. - temp;

		newUv.x += sin(gl_FragCoord.y * 0.01 + uTime*0.005) * abs * 0.01;
		newUv.y += sin(gl_FragCoord.x * 0.015 + uTime*0.015) * abs * 0.015;
	}

	vec4 originTexture = texture2D(uTexture, newUv);
	vec4 multiplyTexture = texture2D(uTexture, newUv) * distort(uDistortion, newUv);

	originTexture.a = uVisibility;
	multiplyTexture.a = uVisibility;

	vec4 finalTexture = originTexture + multiplyTexture;



	gl_FragColor = finalTexture;
}