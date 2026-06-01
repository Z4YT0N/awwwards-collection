import { Engine } from "./engine";
import { MenuScene } from "./scenes/menu";
import { SpaceShipsScene } from "./scenes/space-ships";

const engine = new Engine({
  document
});

engine.start();

document.body.style.margin = '0';
document.body.appendChild( engine.renderer.domElement );

const scene = new MenuScene();
engine.setScene(scene);

const gameScene = new SpaceShipsScene();
engine.setScene(gameScene);