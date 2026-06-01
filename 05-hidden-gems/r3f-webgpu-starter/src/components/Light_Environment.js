import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

export function Light_Environment() {
  return (
    <>
      <directionalLight
        position={[-0.7, 1.8, 0.1]}
        intensity={6}
        castShadow
        shadow-mapSize={[128, 128]}
        shadow-camera-near={2}
        shadow-camera-far={100}
        shadow-camera-top={3}
        shadow-camera-right={3}
        shadow-camera-bottom={-3}
        shadow-camera-left={-3}
        shadow-bias={-0.002}
      />
      <OrbitControls
        target={[2, -0.6, 0]}
        // zoomSpeed={0.8}
        screenSpacePanning={false}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 1.75}
        minPolarAngle={Math.PI / 2.7}
        maxDistance={2.4}
        minDistance={1}
        minZoom={0.5}
        maxZoom={1}
      />
      <Environment
        preset="warehouse"
        environmentIntensity={0.2}
        environmentRotation={[0.4, 0, 1.4]}
      />
    </>
  );
}
