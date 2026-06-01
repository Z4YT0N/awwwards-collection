import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

const useFirstAnimation = (
  groupRef: RefObject<THREE.Group | null>,
  shirtRef: RefObject<THREE.Mesh | null>,
  maskRef: RefObject<THREE.Mesh | null>
) => {
  useGSAP(() => {
    if (!shirtRef.current || !groupRef.current || !maskRef.current) return;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#first-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          // markers: true,
        },
      })
      .to(groupRef.current.position, { y: 1.5 })
      .to(shirtRef.current.rotation, { y: Math.PI / 2 }, 0)
      .to(maskRef.current.position, { y: 5 }, 0)
      .to(maskRef.current.rotation, { z: -0.2 }, 0);
  }, []);
};

export default useFirstAnimation;
