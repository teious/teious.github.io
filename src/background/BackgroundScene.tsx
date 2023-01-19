import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react';
import { terrainShader } from './shaders';

function BackgroundScene(){


  return <Canvas>
      <ambientLight intensity={0.2}/>
      <spotLight position={[100, 1000, 10000]} angle={0.15} penumbra={1}/>
      <pointLight position={[-10, -10, -10]} />
      <Camera />
      <Landscape/>
  </Canvas>
}

const terrain = new THREE.PlaneGeometry(500, 500, 50,50)
const terrainPosition = terrain.getAttribute('position')
function generateTerrain(){
  for (let i = 0; i < terrainPosition.array.length; i++) {
    terrainPosition.getZ(i)
    terrainPosition.setZ(i, Math.random() * 10);
  }
}
generateTerrain()

function Landscape(props: JSX.IntrinsicElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    
    const shaderMaterial = useMemo(()=> new THREE.ShaderMaterial(terrainShader),[]);
    const [clicked, setClicked] = useState(false)

    useEffect(()=>{
      const color1 = new THREE.Color(clicked ? 0xffffff : 0xffe600)
      const color2 = new THREE.Color(clicked ? 0x000000 : 0xff7b2e)
      shaderMaterial.uniforms['color1'].value = color1
      shaderMaterial.uniforms['color2'].value = color2
      shaderMaterial.uniformsNeedUpdate = true
    },[clicked, shaderMaterial])

    function handleClick(){
      setClicked(!clicked)

    }
    return <mesh
        {...props}
        ref={ref}
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0,-25,0]}
        geometry={terrain}
        material={shaderMaterial}
        onClick={handleClick}
        >
        <lineSegments>
            <wireframeGeometry args={[terrain]}/>
            <lineBasicMaterial color={0x8c0106}/>
        </lineSegments>
      </mesh>
  }

const Camera = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
    const vec = new THREE.Vector3();
    useFrame(( state )=>{
      state.camera.position.lerp(vec.set(6, 6, -100), .005 )
    })
  
    return <perspectiveCamera ref={cameraRef} args={[75, window.innerWidth / window.innerHeight, 0.1, 1000]}/>
  }



export { BackgroundScene }