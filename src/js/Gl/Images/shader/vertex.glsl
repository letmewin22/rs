varying vec2 vUv;
uniform float uTime;
uniform float uDistortion;
uniform float uTransition;
uniform float uCenter;
uniform float uVisibility;

float M_PI = 3.1415926535897932384626433832795;


float distort(float uType, vec3 pos, float multiplier, float time) {
  float roundblend = sin(M_PI*uType);
	float stepblend = clamp(2.*(-pos.x + pos.y) +5.*uType - 2., 0.,1.);

  float timeSpeed = uTime / time;
  float displacement = sin(2.*(-pos.x + pos.y) +3.*uType - 1. + timeSpeed);

  return multiplier*stepblend + roundblend*0.1*displacement;
}

void main() {
  vUv = uv;
  vec3 pos = position;

  pos.z += distort(uDistortion, pos, 0.2, 50.);
  pos.z += distort(uTransition, pos, 0.4, 20.)*uTransition;

  pos.x -= uCenter * 0.3 * uDistortion;
  pos.y -= (1. - uVisibility)*0.08;

  vec2 posXY = vec2(pos.x, pos.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(posXY, pos.z, 1.0);
}


