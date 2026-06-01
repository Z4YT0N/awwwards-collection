import GUI from "lil-gui";

export const debugGui = new GUI();
debugGui.close();

if (!import.meta.env.DEV) {
    debugGui.hide();
}