uniform sampler2D uTexture;
uniform float uDistortion;
uniform float uVisibility;
varying vec2 vUv;

float M_PI = 3.1415926535897932384626433832795;

void main()	{

	float roundblend = sin(M_PI*uDistortion);
	float stepblend = clamp( 2.*(-vUv.x + vUv.y) +3.*uDistortion - 1., 0.,1.);

	vec4 originTexture = texture2D(uTexture, vUv);
	vec4 multiplyTexture = texture2D(uTexture, vUv) * stepblend * roundblend * 0.25;

	originTexture.a = uVisibility;
	multiplyTexture.a = uVisibility;
	// multiplyTexture.gr = originTexture.gb * roundblend * 0.05;

	gl_FragColor = originTexture + multiplyTexture;
}