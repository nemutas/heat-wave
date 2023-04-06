uniform float uTime;
varying vec3 vNormal;
varying vec3 vEye;

#include '../glsl/noise.glsl'

vec3 displace(vec3 pos) {
  vec3 result = pos;
  float n = cnoise(result * 4.0 + uTime * 0.3);
  result.y = sin(n * 2.0) * 0.05 + sin((pos.x * 0.5 + pos.z) * 8.0 + uTime * 0.5) * 0.02;
  return result;
}

#include '../glsl/recalcNormal.glsl'

void main() {
  vec3 pos = displace(position);
  vNormal = normalMatrix * recalcNormal(pos);
  vEye = (modelViewMatrix * vec4( pos, 1.0 )).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}