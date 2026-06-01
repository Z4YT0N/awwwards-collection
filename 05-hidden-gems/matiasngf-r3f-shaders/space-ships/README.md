# space ships

A small 3D game and game engine.

## Engine usage

Create scene
```ts
import { EngineScene } from '../../engine'

export class SpaceShipsScene extends EngineScene {
  constructor() {
    super();
    // add objects
  }
  public onStart = () => {
    // when scene starts
    this.spawnPlayerShip();
    this.addBackgroundScene();
  }
  public onWindowResize = (width: number, height: number) => {
    // when window gets rezised
  };
  public onUpdate = (time: number): void => {
    // code to execute on each frame
  }
}
```

Start the engine and add the scene
```ts
import { Engine } from "./engine";
import { SpaceShipsScene } from "./scenes/space-ships";

const engine = new Engine({
  document
});

engine.start();

document.body.style.margin = '0';
document.body.appendChild( engine.renderer.domElement );

const gameScene = new SpaceShipsScene();
engine.setScene(gameScene);
```
You can now change scenes
```ts
export class SpaceShipsScene extends EngineScene {
  /* ... */
  public onUpdate = (time: number): void => {
    if(gameOver) {
      this.engine.setScene(new MenuScene());
      // the current scene will stop before starting the next one
    }
  }
}
```

## Captures
![image](https://user-images.githubusercontent.com/29680544/172023190-72ad8199-8f30-4d0f-98e8-fac0f014fc0f.png)


## Models and textures
- Planets and sky: https://www.solarsystemscope.com/textures/
- "Space Ship" (https://skfb.ly/6WSsW) by Pump is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
- "Space Ship" (https://skfb.ly/ETJs) by Comrade1280 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
