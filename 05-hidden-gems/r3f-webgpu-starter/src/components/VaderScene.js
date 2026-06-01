import { Float } from "@react-three/drei";
import { Probe } from "./Probe";
import { Darth } from "./Darth";

export function VaderScene() {
  return (
    <>
      <Float speed={3.5} floatIntensity={0.2} rotationIntensity={0.3}>
        <Probe
          position={[3, 0, 1.2]}
          scale={0.05}
          rotation={[0, Math.PI / 2, 0]}
          color="red"
        />
      </Float>
      <Float speed={6.5} floatIntensity={0.4} rotationIntensity={0.5}>
        <Probe
          position={[-1.5, 0, -1.5]}
          scale={0.1}
          rotation={[0, Math.PI / 2, 0]}
          color="cyan"
        />
      </Float>
      <Float speed={3.5} floatIntensity={0.2} rotationIntensity={0.3}>
        <Probe
          position={[3.5, -0.8, -1.2]}
          scale={0.05}
          rotation={[0, Math.PI / 2, 0]}
          color="red"
        />
      </Float>
      <Float speed={3.5} floatIntensity={1.5} rotationIntensity={0.4}>
        <Probe
          position={[3, 0.2, -2.8]}
          scale={0.05}
          rotation={[0, Math.PI / 2 - 0.2, 0.1]}
          color="cyan"
        />
      </Float>
      <Float speed={3.5} floatIntensity={1.5} rotationIntensity={0.4}>
        <Probe
          position={[2.6, 0.2, 2.8]}
          scale={0.05}
          rotation={[0, Math.PI / 2 + 0.5, 0.1]}
          color="cyan"
        />
      </Float>
      <Darth
        scale={0.008}
        position={[3.5, -1.325, 0.4]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </>
  );
}
