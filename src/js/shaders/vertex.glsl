uniform float uDistortion;
varying vec2 vUv;


void main() {

	vec3 pos = position;
	float M_PI = 3.1415926535897932384626433832795;

	// pos.x = pos.x + (cos(uv.y * M_PI) * uDistortion / 65.);
	pos.y = pos.y + (sin(uv.x * M_PI) * uDistortion / 13.);

	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}