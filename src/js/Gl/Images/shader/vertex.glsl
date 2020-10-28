varying vec2 vUv;
uniform float uTime;
uniform float uDistortion;
uniform float uCenter;
uniform float uVisibility;

float M_PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  float roundblend = sin(M_PI*uDistortion);
	float stepblend = clamp(2.*(-pos.x + pos.y) +5.*uDistortion - 2., 0.,1.);

  pos.z += 0.2*stepblend + roundblend*0.1*sin(2.*(-pos.x + pos.y) +3.*uDistortion - 1. + uTime/50.);

  pos.x -= uCenter * 0.3 * uDistortion;
  pos.y -= (1. - uVisibility)*0.08;

  vec2 posXY = vec2(pos.x, pos.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(posXY, pos.z, 1.0);
}


