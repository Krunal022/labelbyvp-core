// Custom Shader Material
import * as THREE from "three";
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float bendAmount = sin(vUv.x * 3.14) * 0.3;
    pos.z += bendAmount;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    texColor.a = 0.95; // Set alpha to 0.9
    gl_FragColor = texColor;
  }
`;

function BendingPlane({ position, rotation, texture, onClick, radius }) {
  return (
    <mesh position={position} rotation={rotation} onClick={onClick}>
      <planeGeometry args={[radius < 4 ? 2.8 : 3.2, 2, 10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
        uniforms={{ uTexture: { value: texture } }}
      />
    </mesh>
  );
}

export default BendingPlane;
