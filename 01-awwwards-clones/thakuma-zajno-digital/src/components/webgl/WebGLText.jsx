"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import VERTEX_SHADER from "./shaders/vertexShader.glsl";
import FRAGMENT_SHADER from "./shaders/fragmentShader.glsl";

const WebGLText = () => {
  const containerRef = useRef(null);
  const rendererRef  = useRef(null);
  const requestRef   = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let easeFactor = 0.02;
    let scene, camera, renderer, planeMesh;
    let mouse       = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };
    let prevMouse   = { x: 0.5, y: 0.5 };
    let alive = true;

    // ── helpers ────────────────────────────────────────────────────────────
    const getSize = () => ({
      w: container.clientWidth  || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    const makeTexture = () => {
      const { w, h } = getSize();
      const dpr = Math.min(window.devicePixelRatio, 2);
      const cw  = w * dpr;
      const ch  = h * dpr;

      const cv  = document.createElement("canvas");
      cv.width  = cw;
      cv.height = ch;
      const ctx = cv.getContext("2d");

      // background matches page
      ctx.fillStyle = "#e9e9e9";
      ctx.fillRect(0, 0, cw, ch);

      // measure at large size then scale X to fill
      const fontSize = Math.floor(ch * 0.82);
      ctx.font      = `400 ${fontSize}px Blanquotey`;
      ctx.textAlign = "left";

      const metrics  = ctx.measureText("zajno");
      const scaleX   = (cw * 0.99) / metrics.width;

      ctx.save();
      ctx.translate(cw * 0.005, ch * 0.78);
      ctx.scale(scaleX, 1);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillText("zajno", 0, 0);
      ctx.restore();

      return new THREE.CanvasTexture(cv);
    };

    const initScene = (texture) => {
      const { w, h } = getSize();
      scene  = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, h / w, -(h / w), 0.1, 1000);
      camera.position.z = 1;

      const uniforms = {
        u_mouse:     { value: new THREE.Vector2(0.5, 0.5) },
        u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_texture:   { value: texture },
      };

      planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ uniforms, vertexShader: VERTEX_SHADER, fragmentShader: FRAGMENT_SHADER })
      );
      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0xe9e9e9, 1);
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    };

    const animate = () => {
      if (!alive) return;
      requestRef.current = requestAnimationFrame(animate);
      mouse.x += (targetMouse.x - mouse.x) * easeFactor;
      mouse.y += (targetMouse.y - mouse.y) * easeFactor;
      if (planeMesh) {
        planeMesh.material.uniforms.u_mouse.value.set(mouse.x, 1 - mouse.y);
        planeMesh.material.uniforms.u_prevMouse.value.set(prevMouse.x, 1 - prevMouse.y);
      }
      renderer.render(scene, camera);
    };

    // ── wait for font then boot ─────────────────────────────────────────────
    const boot = () => {
      const texture = makeTexture();
      initScene(texture);
      animate();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(boot);
    } else {
      setTimeout(boot, 500);
    }

    // ── events ─────────────────────────────────────────────────────────────
    const onMove = (e) => {
      easeFactor = 0.04;
      const r = container.getBoundingClientRect();
      prevMouse   = { ...targetMouse };
      targetMouse = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      };
    };
    const onEnter = (e) => {
      easeFactor  = 0.02;
      const r     = container.getBoundingClientRect();
      mouse.x = targetMouse.x = (e.clientX - r.left) / r.width;
      mouse.y = targetMouse.y = (e.clientY - r.top)  / r.height;
    };
    const onLeave = () => {
      easeFactor  = 0.02;
      targetMouse = { ...prevMouse };
    };
    const onResize = () => {
      if (!renderer) return;
      const { w, h } = getSize();
      camera.top    =  h / w;
      camera.bottom = -(h / w);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (planeMesh) planeMesh.material.uniforms.u_texture.value = makeTexture();
    };

    container.addEventListener("mousemove",  onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",        onResize);

    return () => {
      alive = false;
      cancelAnimationFrame(requestRef.current);
      container.removeEventListener("mousemove",  onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",        onResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="textContainer"
      style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}
    />
  );
};

export default WebGLText;
