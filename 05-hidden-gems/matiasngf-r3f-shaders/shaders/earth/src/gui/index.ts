import GUI from 'lil-gui'; 
import { Vector3 } from 'three';
import { lightDirection, originalLightDirection } from '../materials/globals';

export const gui = new GUI();

export const guiData = {
  sunRotation: 0,
  autoSunRotation: false
}

export const handleSunRotationChange = (value: number) => {
  lightDirection.copy(originalLightDirection)
  const axis = new Vector3(0, 1, 0);
  const angle = Math.PI * (-value / 180);
  lightDirection.applyAxisAngle(axis, angle);
}

export const sunRotationGui = gui.add(guiData, 'sunRotation', 0, 360).onChange(handleSunRotationChange)

gui.add(guiData, 'autoSunRotation')