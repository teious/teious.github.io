import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react';
import { terrainShader } from './shaders';
import { useTheme } from '../theme';
function BackgroundScene() {


  return <Canvas>
    <ambientLight intensity={0.2} />
    <spotLight position={[100, 1000, 10000]} angle={0.15} penumbra={1} />
    <pointLight position={[-10, -10, -10]} />
    <Camera />
    <SuspendedParticles />
    <Landscape />
  </Canvas>
}

const terrain = new THREE.PlaneGeometry(500, 500, 50, 50)
const terrainPosition = terrain.getAttribute('position')
function generateTerrain() {
  for (let i = 0; i < terrainPosition.array.length; i++) {
    terrainPosition.getZ(i)
    terrainPosition.setZ(i, Math.random() * 10);
  }
}
generateTerrain()

function generateVertices() {
  const vertices = []
  for (let i = 0; i < 5000; i++) {

    const x = THREE.MathUtils.randFloatSpread(1500);
    const y = THREE.MathUtils.randFloatSpread(1500);
    const z = THREE.MathUtils.randFloatSpread(1500);

    vertices.push(x, y, z);

  }
  return vertices
}
const vertices = generateVertices()


function SuspendedParticles() {

  const { palette } = useTheme()

  return <points>
    <bufferGeometry attributes={{
      position: new THREE.Float32BufferAttribute(vertices, 3)
    }} />
    <pointsMaterial color={palette.landBorderColor} />
  </points>
}

function Landscape(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)

  const { palette } = useTheme()

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial(terrainShader), []);

  useEffect(() => {
    shaderMaterial.uniforms['color1'].value = new THREE.Color(palette.landColor1)
    shaderMaterial.uniforms['color2'].value = new THREE.Color(palette.landColor2)
    shaderMaterial.uniformsNeedUpdate = true
  }, [palette, shaderMaterial])

  return <mesh
    {...props}
    ref={ref}
    rotation={[-0.5 * Math.PI, 0, 0]}
    position={[0, -25, 0]}
    geometry={terrain}
    material={shaderMaterial}
  >
    <lineSegments>
      <wireframeGeometry args={[terrain]} />
      <lineBasicMaterial color={palette.landBorderColor} />
    </lineSegments>
  </mesh>
}

function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const vec = new THREE.Vector3();
  useFrame((state) => {
    state.camera.position.lerp(vec.set(6, 6, -100), .005)
  })

  return <perspectiveCamera ref={cameraRef} args={[75, window.innerWidth / window.innerHeight, 0.1, 1000]} />
}



export { BackgroundScene }