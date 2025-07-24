import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

import BendingPlane from "./BendingPlane";
import useResponsiveRadius from "../utils/useResponsiveRadius";
import Paragraph from "./Paragraph";
import Button from "./Button";
import { BsArrow90DegRight } from "react-icons/bs";

function ScrollControlledGroup({ isVisible, containerRef }) {
  const groupRef = useRef();
  const targetRotation = useRef(0);
  const targetYPosition = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const radius = useResponsiveRadius();
  const totalPlanes = radius > 4 ? 7 : 6;
  const heightGap = 1.3;
  const texturesLayer1 = useLoader(THREE.TextureLoader, [
    "https://static.wixstatic.com/media/9b38ca_83b91031e53d4af585bb0246da94aa5d~mv2.jpg/v1/fit/w_1428,h_1904,q_90,enc_avif,quality_auto/9b38ca_83b91031e53d4af585bb0246da94aa5d~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_a19240bed2e2472a97dd64529b071fb3~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_a19240bed2e2472a97dd64529b071fb3~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_33b61a2fe12843cf81da7f382c546f55~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_33b61a2fe12843cf81da7f382c546f55~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_ca65f3c33b3b4f2fa132e42f349d21cb~mv2.jpg/v1/fit/w_1742,h_2614,q_90,enc_avif,quality_auto/9b38ca_ca65f3c33b3b4f2fa132e42f349d21cb~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_7246a2142f7949878dec202e492d6c37~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_7246a2142f7949878dec202e492d6c37~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_a4ef3ad4dfc1481083bbf7ed063c40d0~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_a4ef3ad4dfc1481083bbf7ed063c40d0~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_1559ffa3211d44ac9f65bc9b396da016~mv2.jpg/v1/fit/w_1428,h_1904,q_90,enc_avif,quality_auto/9b38ca_1559ffa3211d44ac9f65bc9b396da016~mv2.jpg",
  ]);

  const texturesLayer2 = useLoader(THREE.TextureLoader, [
    "https://static.wixstatic.com/media/9b38ca_c88fdad1841844d1a22bb0f17676583f~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_c88fdad1841844d1a22bb0f17676583f~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_2b056f5cb42242d9b69c4e098901804f~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_2b056f5cb42242d9b69c4e098901804f~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_7df9aaabc7004e1c9f2cbbac8196e74c~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_7df9aaabc7004e1c9f2cbbac8196e74c~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_3ee92ceeafe64d70b428ae2388b45abe~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_3ee92ceeafe64d70b428ae2388b45abe~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_3f8cdabfcb334ca6997d1a537b7752fa~mv2.jpg/v1/fit/w_1960,h_2614,q_90,enc_avif,quality_auto/9b38ca_3f8cdabfcb334ca6997d1a537b7752fa~mv2.jpg",
    "https://static.wixstatic.com/media/9b38ca_b4221d47edaa4ce4ae5b052bdc51b557~mv2.jpg/v1/fit/w_2712,h_1256,q_90/9b38ca_b4221d47edaa4ce4ae5b052bdc51b557~mv2.webp",
    "https://static.wixstatic.com/media/9b38ca_0a1db75adc6142f9b22f243d5ef10856~mv2.jpg/v1/fit/w_2880,h_3842,q_90,enc_avif,quality_auto/9b38ca_0a1db75adc6142f9b22f243d5ef10856~mv2.jpg",
  ]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      targetRotation.current = (scrollTop / scrollHeight) * (Math.PI * 2);
      targetYPosition.current = (scrollTop / scrollHeight) * 3.5;
    };

    const handleMouseMove = (event) => {
      const bounds = containerRef.current.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      mouseX.current = (x / bounds.width - 0.5) * 2;
      mouseY.current = (y / bounds.height - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll);
    containerRef.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isVisible, containerRef]);

  useFrame(() => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current + mouseX.current * 0.2,
        0.075
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY.current * 0.1,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetYPosition.current,
        0.08
      );
    }
  });

  const layers = [
    { yOffset: -2.5, textures: texturesLayer1 },
    { yOffset: -4.5, textures: texturesLayer2 },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {layers.map(({ yOffset, textures }, layerIdx) =>
        Array.from({ length: totalPlanes }).map((_, index) => {
          const angle = (index / totalPlanes) * Math.PI * 2;
          const textureIndex = index % textures.length;

          return (
            <BendingPlane
              key={`${layerIdx}-${index}`}
              position={[
                Math.sin(angle) * radius,
                yOffset * heightGap,
                Math.cos(angle) * radius,
              ]}
              rotation={[0, angle, 0]}
              texture={textures[textureIndex]}
              radius={radius}
            />
          );
        })
      )}
    </group>
  );
}

export default function HomeExplore() {
  const homeRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const radius = useResponsiveRadius();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (homeRef.current) observer.observe(homeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={homeRef}
      id="home-explore"
      className="relative w-full flex items-center justify-center h-screen max-md:h-[70vh]"
    >
      <div className="absolute top-10 max-md:top-5 z-[1] text-white flex flex-col justify-center items-center gap-4">
        <Paragraph
          phrases={[
            "Where fabric breathes",
            "and stories unfold. Know the makers.",
            "Explore drops.",
          ]}
          className="text-[3.5vw] max-md:text-[7vw] text-center font-bold font-['Secondary'] leading-[4vw] max-md:leading-[8vw]"
        />
        <Button
          navigate={"/explore"}
          className="bg-white/10 border-white/15 rounded-sm text-white p-3 text-xl rotate-x-180"
        >
          <BsArrow90DegRight />
        </Button>
      </div>
      <Canvas
        style={{
          width: "96%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "transparent",
          borderRadius: "12px",
        }}
        camera={{ position: [0, -0.5, 10] }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <ScrollControlledGroup isVisible={isVisible} containerRef={homeRef} />
      </Canvas>
    </div>
  );
}
