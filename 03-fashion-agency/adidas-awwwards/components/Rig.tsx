import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Rig = () => {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 0.5, 0.7, 3 - Math.abs(state.pointer.x * 0.2)],
      1,
      delta
    );
    state.camera.lookAt(0, 0.7, 0);
  });
};
export default Rig;
