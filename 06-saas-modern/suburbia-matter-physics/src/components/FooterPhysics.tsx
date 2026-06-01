"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bodies,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} from "matter-js";

type FooterPhysicsProps = {
  boardTextureURLs: string[];
  className?: string;
};

export function FooterPhysics({
  boardTextureURLs = [],
  className,
}: FooterPhysicsProps) {
  // The div we'll inject our canvas into
  const scene = useRef<HTMLDivElement>(null);
  // Engine handles the physics simulations
  const engine = useRef(Engine.create());
  // Intersection Observer state
  const [inView, setInView] = useState(false);
  // We show fewer boards on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fewer boards on mobile
  const limitedBoardTextures = isMobile
    ? boardTextureURLs.slice(0, 3)
    : boardTextureURLs;

  // Intersection Observer to start/stop the physics simulation
  useEffect(() => {
    const currentScene = scene.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger at 50% so users see the boards drop
    );

    if (currentScene) observer.observe(currentScene);

    return () => {
      if (currentScene) observer.unobserve(currentScene);
    };
  }, []);

  useEffect(() => {
    if (!scene.current || !inView) return;

    // If the user prefers reduced motion, don't run the physics simulation
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;

    engine.current.gravity.y = 0.5; // Gravity on vertical axis

    // Create Matter.js renderer
    const render = Render.create({
      element: scene.current, // attach to our scene div
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        pixelRatio: window.devicePixelRatio,
        wireframes: false,
        background: "transparent",
      },
    });

    // Add boundaries to the scene
    let boundaries = createBoundaries(cw, ch);
    World.add(engine.current.world, boundaries);

    // Add mouse interaction for dragging boards
    const mouse = Mouse.create(render.canvas);
    // @ts-expect-error - matter.js has incorrect types
    mouse.element.removeEventListener("wheel", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(engine.current.world, mouseConstraint);

    window.addEventListener("resize", onResize);

    function onResize() {
      if (!scene.current) return;

      const cw = scene.current.clientWidth;
      const ch = scene.current.clientHeight;

      // Update canvas and renderer dimensions
      render.canvas.width = cw;
      render.canvas.height = ch;
      render.options.width = cw;
      render.options.height = ch;
      Render.setPixelRatio(render, window.devicePixelRatio);

      World.remove(engine.current.world, boundaries);
      boundaries = createBoundaries(cw, ch);
      World.add(engine.current.world, boundaries);
    }

    // Create walls/boundaries around the scene to keep boards in
    function createBoundaries(width: number, height: number) {
      return [
        Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true }), // Top
        Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true }), // Left
        Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true }), // Bottom
        Bodies.rectangle(width + 10, height / 2, 20, height, {
          isStatic: true,
        }), // Right
      ];
    }

    // Runner manages the animation loop and updates engine 60 times per second
    const runner = Runner.create();
    Runner.run(runner, engine.current);
    Render.run(render);

    const currentEngine = engine.current;

    // Clean up
    return () => {
      window.removeEventListener("resize", onResize);

      Render.stop(render);
      Runner.stop(runner);
      if (currentEngine) {
        World.clear(currentEngine.world, false);
        Engine.clear(currentEngine);
      }
      render.canvas.remove();
      render.textures = {};
    };
  }, [inView]);

  // Add boards to the scene
  useEffect(() => {
    if (!scene.current || !inView) return;

    const world = engine.current.world;
    const cw = scene.current.clientWidth;
    const ch = scene.current.clientHeight;

    const boards = limitedBoardTextures.map((texture) => {
      // Randomize board position and rotation
      const x = Math.random() * cw;
      const y = Math.random() * (ch / 2 - 100) + 50;
      const rotation = ((Math.random() * 100 - 50) * Math.PI) / 180;

      return Bodies.rectangle(x, y, 80, 285, {
        chamfer: { radius: 40 }, // Rounded corners for accurate collision
        angle: rotation,
        restitution: 0.8, // Bounciness
        friction: 0.005, // minimal friction
        render: {
          sprite: {
            texture,
            xScale: 0.5, // Scale texture down
            yScale: 0.5,
          },
        },
      });
    });

    if (boards.length > 0) {
      World.add(engine.current.world, boards); // Add boards to the world
    }

    return () => {
      World.remove(world, boards);
    };
  }, [limitedBoardTextures, inView]);

  return <div ref={scene} className={className} />;
}
