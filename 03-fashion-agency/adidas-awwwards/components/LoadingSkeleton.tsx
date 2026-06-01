import { Html, useProgress } from "@react-three/drei";
import Bars from "./Bars";

const LoadingSkeleton = () => {
  const { progress } = useProgress();
  return (
    <Html position={[0, 0.7, 0]} center prepend>
      <div className="flex items-center justify-center bg-black w-screen h-screen">
        <div className="flex flex-col items-center w-40 md:w-3xs mt-5 gap-4">
          <Bars />
          <div className="w-full">
            <p className="mt-2 text-sm text-white/50 text-center">
              {Math.floor(progress)}% loaded
            </p>
            <div className="h-2 bg-white/50 transition-all duration-200 rounded-full" />
          </div>
        </div>
      </div>
    </Html>
  );
};

export default LoadingSkeleton;
