import * as THREE from 'three'
export const  terrainShader: THREE.ShaderMaterialParameters = {
    uniforms: {
      color1: {
      value: new THREE.Color(0xffe600)
     },
      color2: {
      value: new THREE.Color(0xff7b2e)
     }

    },
    vertexShader:`
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader:`
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;

      void main() {

        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
  ` 
  }