import * as THREE from 'three'
import { lightPalette } from './theme'


export const terrainShader: THREE.ShaderMaterialParameters = {
  uniforms: {
    color1: {
      value: lightPalette.landColor1
    },
    color2: {
      value: lightPalette.landColor2
    }

  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;

      void main() {

        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
  `
}

