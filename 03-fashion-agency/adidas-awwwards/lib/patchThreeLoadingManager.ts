import * as THREE from "three";

type LoadingHandler = (...args: unknown[]) => void;

export function patchThreeLoadingManager() {
  if (typeof window === "undefined") return;

  const manager = THREE.DefaultLoadingManager;

  const orig = {
    onStart: manager.onStart as LoadingHandler | null,
    onLoad: manager.onLoad as LoadingHandler | null,
    onProgress: manager.onProgress as LoadingHandler | null,
    onError: manager.onError as LoadingHandler | null,
  };

  const defer =
    (fn?: LoadingHandler | null) =>
    (...args: unknown[]) =>
      fn && setTimeout(() => fn(...args), 0);

  manager.onStart = defer(orig.onStart);
  manager.onLoad = defer(orig.onLoad);
  manager.onProgress = defer(orig.onProgress);
  manager.onError = defer(orig.onError);
}
