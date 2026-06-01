import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import ProjectTile from "./projectTiles/ProjectTile";
import Tile1Glb from "../assets/project-tiles/tile-1.glb";
import Tile2Glb from "../assets/project-tiles/tile-2.glb";
import Tile3Glb from "../assets/project-tiles/tile-3.glb";
import Tile4Glb from "../assets/project-tiles/tile-4.glb";

const ELEMENT_IDS = ["tile-1", "tile-2", "tile-3", "tile-4"];

export default class ProjectTiles extends THREE.Group {
    renderTarget;
    portalScene;
    portalCamera;
    projectTiles = [];
    homeScene;

    constructor(homeScene) {
        super();

        this.homeScene = homeScene;
        this.initTiles();
    }

    initTiles = async () => {
        this.projectTiles.forEach(projectTile => {
            this.remove(projectTile);
            projectTile.cleanup();
        });

        const projectTile1 = new ProjectTile("tile-1", this.homeScene);
        const projectTile2 = new ProjectTile("tile-2", this.homeScene);
        const projectTile3 = new ProjectTile("tile-3", this.homeScene,);
        const projectTile4 = new ProjectTile("tile-4", this.homeScene);

        const loader = new GLTFLoader();

        const tile1 = loader.loadAsync(Tile1Glb)
        const tile2 = loader.loadAsync(Tile2Glb);
        const tile3 = loader.loadAsync(Tile3Glb)
        const tile4 = loader.loadAsync(Tile4Glb)
        const results = await Promise.all([tile1, tile2, tile3, tile4]);

        projectTile1.addToPortalScene(results[0].scene);
        projectTile2.addToPortalScene(results[1].scene);
        projectTile3.addToPortalScene(results[2].scene);
        projectTile4.addToPortalScene(results[3].scene);

        this.add(projectTile1, projectTile2, projectTile3, projectTile4);

        this.projectTiles.push(projectTile1);
        this.projectTiles.push(projectTile2);
        this.projectTiles.push(projectTile3);
        this.projectTiles.push(projectTile4);
    }

    adjustLightingInGlb = (glb) => {
        const lights = glb.scene.getObjectsByProperty("type", "PointLight");
        const meshes = glb.scene.getObjectsByProperty("type", "Mesh");

        lights.forEach(light => {
            light.castShadow = true;
            light.intensity /= 40;
            light.shadow.radius = 16;
        });

        meshes.forEach(mesh => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        })

        console.log(meshes)
    }

    resize = () => {
        this.projectTiles.forEach(projectTile => projectTile.resize());
    }

    /**
     * @param {THREE.Renderer} renderer 
     */
    update(dt, renderer) {
        this.projectTiles.forEach(projectTile => projectTile.update(dt, renderer));
    }
}