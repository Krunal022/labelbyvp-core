import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { TextureLoader } from "three";

import gsap from "gsap";
import BendingPlane from "../Components/BendingPlane";
import useResponsiveRadius from "../utils/useResponsiveRadius.jsx";
import { data } from "../utils/data.js";
import Sidebar from "../Components/Sidebar";

function ScrollControlledGroup({ onPlaneClick }) {
  const groupRef = useRef();
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const lerpedScroll = useRef(0);
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const radius = useResponsiveRadius();

  const textures = useMemo(() => {
    return data.map((layer) => {
      const texturesToLoad =
        radius <= 4
          ? layer.textures.slice(0, layer.textures.length - 1)
          : layer.textures;

      return texturesToLoad.map((textureObj) =>
        new TextureLoader().load(textureObj.image)
      );
    });
  }, [radius]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(window.scrollY / maxScroll);
    };

    const handleClick = (event) => {
      const canvas = document.querySelector("canvas");
      if (!camera || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(
        groupRef.current.children
      );

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const clickedTexture = clickedMesh.material.uniforms.uTexture.value;

        // ✅ Find matching texture object from data
        for (let layer of data) {
          for (let textureObj of layer.textures) {
            if (clickedTexture.image?.src?.includes(textureObj.image)) {
              onPlaneClick(textureObj);
              return;
            }
          }
        }
      }
    };

    const handleMouseMove = (event) => {
      const rect = document.querySelector("canvas").getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [onPlaneClick, camera]);

  useFrame(() => {
    lerpedScroll.current = THREE.MathUtils.lerp(
      lerpedScroll.current,
      scrollY,
      0.05
    );

    if (groupRef.current) {
      const targetYRotation =
        lerpedScroll.current * Math.PI * 4 + mouse.current.x * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetYRotation,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.1,
        0.05
      );
      groupRef.current.position.y = lerpedScroll.current * 6;
    }
  });

  return (
    <group ref={groupRef}>
      {data.map((layer, layerIndex) => {
        const texturesToRender =
          radius <= 4
            ? layer.textures.slice(0, layer.textures.length - 1)
            : layer.textures;

        return texturesToRender.map((_, index) => {
          const angle = (index / texturesToRender.length) * Math.PI * 2;
          return (
            <BendingPlane
              key={`${layer.id}-${index}`}
              position={[
                Math.sin(angle) * radius,
                layer.offset * 1.5,
                Math.cos(angle) * radius,
              ]}
              rotation={[0, angle, 0]}
              transparent
              texture={textures[layerIndex][index]}
            />
          );
        });
      })}
    </group>
  );
}

export default function Explore() {
  const [selectedTexture, setSelectedTexture] = useState(null);

  const handlePlaneClick = useCallback((textureObj) => {
    setSelectedTexture(textureObj);

    const isMobile = window.innerWidth < 786;
    gsap.to(".sidebar", {
      width: isMobile ? "100%" : window.innerWidth < 1024 ? "70%" : "40%",
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const closeSidebar = (e) => {
    e.stopPropagation();

    gsap.to(".sidebar", {
      width: "0%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => setSelectedTexture(null),
    });
  };

  useEffect(() => {
    document.body.style.overflow = selectedTexture ? "hidden" : "auto";
  }, [selectedTexture]);

  return (
    <>
      <div style={{ height: "500vh", backgroundColor: "#111" }}></div>

      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
        camera={{ position: [0, 0, 12], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        <ScrollControlledGroup onPlaneClick={handlePlaneClick} />
      </Canvas>
      <Sidebar selectedTexture={selectedTexture} closeSidebar={closeSidebar} />
    </>
  );
}
