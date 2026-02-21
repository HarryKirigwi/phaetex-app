"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const NODES_COUNT = 100;
const CONNECT_RADIUS = 2.2;
const SPREAD = 5;
const DRIFT_SPEED = 0.12;
const NODE_SIZE = 0.04;
const LINE_OPACITY = 0.35;

function initScene(container: HTMLDivElement) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#04091e");
  scene.fog = new THREE.Fog("#04091e", 6, 18);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  function setSize() {
    const w = container.offsetWidth || window.innerWidth;
    const h = container.offsetHeight || window.innerHeight;
    if (w > 0 && h > 0) {
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
  }
  setSize();
  const ro = new ResizeObserver(setSize);
  ro.observe(container);

  const positions = new Float32Array(NODES_COUNT * 3);
  for (let i = 0; i < NODES_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2 * SPREAD;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * SPREAD;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * SPREAD;
  }

  const connections: [number, number][] = [];
  for (let i = 0; i < NODES_COUNT; i++) {
    for (let j = i + 1; j < NODES_COUNT; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < CONNECT_RADIUS * CONNECT_RADIUS) {
        connections.push([i, j]);
      }
    }
  }

  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointsMat = new THREE.PointsMaterial({
    size: NODE_SIZE,
    color: "#b8d4e8",
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  scene.add(points);

  const lineArr = new Float32Array(connections.length * 6);
  connections.forEach(([a, b], idx) => {
    const o = idx * 6;
    lineArr[o] = positions[a * 3];
    lineArr[o + 1] = positions[a * 3 + 1];
    lineArr[o + 2] = positions[a * 3 + 2];
    lineArr[o + 3] = positions[b * 3];
    lineArr[o + 4] = positions[b * 3 + 1];
    lineArr[o + 5] = positions[b * 3 + 2];
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(lineArr, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: "#8ab8d4",
    transparent: true,
    opacity: LINE_OPACITY,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  const clock = new THREE.Clock();
  let rafId: number;

  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime() * DRIFT_SPEED;
    const pos = pointsGeo.attributes.position!.array as Float32Array;

    for (let i = 0; i < NODES_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += Math.sin(t + i * 0.7) * 0.002;
      pos[i3 + 1] += Math.cos(t * 0.9 + i * 0.5) * 0.002;
      pos[i3 + 2] += Math.sin(t * 0.8 + i * 0.3) * 0.0015;
    }
    pointsGeo.attributes.position!.needsUpdate = true;

    const linePos = lineGeo.attributes.position!.array as Float32Array;
    connections.forEach(([a, b], idx) => {
      const o = idx * 6;
      linePos[o] = pos[a * 3];
      linePos[o + 1] = pos[a * 3 + 1];
      linePos[o + 2] = pos[a * 3 + 2];
      linePos[o + 3] = pos[b * 3];
      linePos[o + 4] = pos[b * 3 + 1];
      linePos[o + 5] = pos[b * 3 + 2];
    });
    lineGeo.attributes.position!.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", setSize);

  return () => {
    cancelAnimationFrame(rafId);
    ro.disconnect();
    window.removeEventListener("resize", setSize);
    renderer.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}

export default function PlexusBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    return initScene(container);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full min-h-[100vh]"
      style={{ minHeight: "100vh" }}
      aria-hidden
    />
  );
}
