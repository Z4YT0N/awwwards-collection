Notes taken from https://threejs.org/manual/#en/fundamentals

There is a **scenegraph** which is a *tree like structure*, consisting of various objects like a Scene object, multiple Mesh objects, Light objects, Group, Object3D, and Camera objects. \n

**Scene** object defines the root of the scenegraph and contains properties like the background color and fog. \n

**Mesh** is drawing a Greometry with a Material. \n
Both Material objects and Geometry objects can be used by multiple Mesh objects.

**Gemoetry** vertex data of a geometry. \n
The library has built in geometries and you can create [custom](https://threejs.org/manual/#en/custom-buffergeometry) ones. \n

**Material** surface properties used to draw geometry. \n
A material can reference multiple textures. \n

**Texutre** in genral, images. \n

**Lights** lights... \n

```ts
const geometry = new BoxGeometry();
const material = new MeshBasicMaterial( { color: 0x0000ff } );
const cube = new Mesh( geometry, material );
```

