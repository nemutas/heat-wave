uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vEye;

float fresnel(vec3 eye, vec3 normal, float power) {
  return pow(1.0 + dot(eye, normal), power);
}

void main() {
  vec3 eye = gl_FrontFacing ? vEye : -vEye;

  float f = fresnel(eye, vNormal, 5.0);
  float f2 = fresnel(eye, vNormal, 10.0);
  vec3 color = uColor * f * f2 * 6.0;

  gl_FragColor = vec4(color, 0.5);
}