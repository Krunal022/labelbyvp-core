import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { useRef, useEffect } from "react";

export default function LandingPage() {
  const mountRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    let scene,
      camera,
      renderer,
      controls,
      clock,
      composer,
      gridPass,
      chromaPass;
    let modelRef = null;
    let app;

    // Existing Grid Shader (unchanged)
    const gridShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform float uTime;
        void main() {
          vec4 tex = texture2D(tDiffuse, vUv);
          float gridX = step(0.99, abs(fract(vUv.x * 20.0 + uTime * 0.05) - 0.5));
          float gridY = step(0.99, abs(fract(vUv.y * 20.0 + uTime * 0.05) - 0.5));
          float grid = max(gridX, gridY);
          vec3 gridColor = mix(tex.rgb, vec3(0.2, 1.0, 0.2), grid * 0.5);
          gl_FragColor = vec4(gridColor, tex.a);
        }
      `,
    };

    const chromaShader = {
      uniforms: {
        tDiffuse: { value: null },
        aberrationAmount: { value: 0.007 }, // Adjust for more/less color offset
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float aberrationAmount;
        varying vec2 vUv;
        void main() {
          vec2 offset = aberrationAmount * (vUv - vec2(0.5));
          // Shift red channel one way, blue channel the opposite way
          float r = texture2D(tDiffuse, vUv + offset).r;
          float g = texture2D(tDiffuse, vUv).g;
          float b = texture2D(tDiffuse, vUv - offset).b;
          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    };

    class App {
      constructor(container) {
        this.container = container;
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        this.init();
      }

      init() {
        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000);
        this.container.appendChild(renderer.domElement);

        // Camera
        camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(10.5, 0.5, 0);

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.enabled = false;

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 4.2));
        const pointLight = new THREE.PointLight(0xffffff, 5);
        pointLight.position.set(0, 2, 0);
        scene.add(pointLight);
        const spotLight = new THREE.SpotLight(0xffffff, 5, 20, Math.PI / 4);
        spotLight.position.set(2, 5, 2);
        scene.add(spotLight);

        this.loadModel();

        this.container.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("scroll", this.onScroll);

        this.animate();
      }

      createWhiteShaderMaterial() {
        const video = document.createElement("video");
        video.src =
          "https://ik.imagekit.io/td7bvvb4j/Don_t%20miss%20out!%20Shop%20the%20LBVP%20Sale%20now%20and%20enjoy%20up%20to%2070_%20off%20on%20your%20favorite%20styles.%20Limited%20.mp4?updatedAt=1753262770119";
        video.crossOrigin = "anonymous";
        video.loop = false; // Set this to false to handle restart manually
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        // Ensure it plays on load
        video.addEventListener("canplaythrough", () => {
          video.play();
        });

        // Manually restart the video when it ends
        video.addEventListener("ended", () => {
          video.currentTime = 0;
          video.play();
        });

        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;

        return new THREE.ShaderMaterial({
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D uTexture;
            void main() {
              vec4 texColor = texture2D(uTexture, vUv);
              gl_FragColor = texColor;
            }
          `,
          side: THREE.DoubleSide,
          uniforms: {
            uTexture: { value: texture },
          },
        });
      }

      applyShaderToChild(index) {
        const mesh = modelRef.children[index];
        if (mesh?.isMesh) {
          mesh.material = this.createWhiteShaderMaterial();
          mesh.position.y = 2.6;
          mesh.scale.set(1.1, 1, 1.2); // scale uniformly
        }
      }

      applyReflectorToChild(index, rotateFn = null) {
        const source = modelRef.children[index];
        if (source?.isMesh) {
          source.visible = false;
          const bbox = new THREE.Box3().setFromObject(source);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          bbox.getSize(size);
          bbox.getCenter(center);
          const [w, h] = [...[size.x, size.y, size.z]].sort((a, b) => b - a);
          const geometry = new THREE.PlaneGeometry(w, h);
          const mirror = new Reflector(geometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: 0x777777,
            side: THREE.DoubleSide,
          });
          mirror.position.copy(center);
          mirror.rotation.copy(source.rotation);
          if (typeof rotateFn === "function") {
            rotateFn(mirror.rotation);
          }
          mirror.scale.copy(source.scale);
          modelRef.add(mirror);
        }
      }

      loadModel() {
        const manager = new THREE.LoadingManager();
        manager.onStart = () => console.log("Started loading...");
        manager.onLoad = () => {
          console.log("All assets loaded.");
          scene.add(modelRef);
        };
        manager.onError = (url) => console.error(`Error loading ${url}`);

        const loader = new GLTFLoader(manager);
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("/draco/");
        loader.setDRACOLoader(dracoLoader);

        const textureLoader = new THREE.TextureLoader(manager);
        const shadowMap = textureLoader.load("/shadows.webp");
        // const normalMap = textureLoader.load("/normal.webp");

        loader.load(
          "/scene (1).glb",
          (gltf) => {
            modelRef = gltf.scene;
            modelRef.scale.set(1, 1, 1);
            modelRef.position.set(0, -1, 0);

            modelRef.traverse((child) => {
              if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0x000000,
                  roughness: 0.5,
                  metalness: 0.3,
                });
              }
            });

            // Apply custom materials/effects
            this.applyShaderToChild(6);
            this.applyReflectorToChild(7, (r) => (r.z += Math.PI / 2));
            this.applyReflectorToChild(8, (r) => {
              r.x += Math.PI / 2;
              r.z = Math.PI / 2;
            });
            this.applyReflectorToChild(9, (r) => {
              r.y = Math.PI;
              r.z = Math.PI / 2;
            });

            const mesh5 = modelRef.children[5];
            if (mesh5?.isMesh) {
              mesh5.material = new THREE.ShaderMaterial({
                vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `,
                fragmentShader: `
                  varying vec2 vUv;
                  void main() {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                  }
                `,
                side: THREE.DoubleSide,
              });
            }

            const child3 = modelRef.children[3];
            if (child3?.isMesh) {
              shadowMap.encoding = THREE.sRGBEncoding;
              normalMap.encoding = THREE.LinearEncoding;
              child3.material = new THREE.MeshStandardMaterial({
                map: shadowMap,
                normalMap: normalMap,
                roughness: 0.6,
                metalness: 0.3,
                color: new THREE.Color("#6e6e6e"),
                side: THREE.DoubleSide,
              });
              child3.castShadow = true;
              child3.receiveShadow = true;
            }

            // ✅ Add model to scene in `manager.onLoad` to ensure everything is ready
          },
          undefined,
          (err) => console.error("Model loading failed:", err)
        );

        // 🔄 Post-processing setup
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        gridPass = new ShaderPass(gridShader);
        chromaPass = new ShaderPass(chromaShader);

        composer.addPass(renderPass);
        composer.addPass(gridPass);
        composer.addPass(chromaPass);
      }

      onScroll = () => {
        if (!modelRef) return;
        const maxRotation = Math.PI / 20;
        const scrollRatio = Math.min(window.scrollY / window.innerHeight, 10);
        modelRef.rotation.z = scrollRatio * maxRotation * 0.75;
      };

      onMouseMove = (() => {
        let lastCall = 0;
        return (event) => {
          const now = performance.now();
          if (now - lastCall < 16) return;
          lastCall = now;

          if (!modelRef || !this.container) return;
          const rect = this.container.getBoundingClientRect();
          const mouseX =
            (((event.clientX - rect.left) / rect.width) * 2 - 1) * 0.55;
          modelRef.position.z = THREE.MathUtils.lerp(
            modelRef.position.z,
            mouseX * 0.8,
            0.1
          );
        };
      })();

      onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      animate = () => {
        const elapsedTime = clock.getElapsedTime();
        controls.update();
        gridPass.uniforms.uTime.value = elapsedTime;
        composer.render();
        rafIdRef.current = requestAnimationFrame(this.animate);
      };
    }

    app = new App(mountRef.current);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", app.onWindowResize);
      window.removeEventListener("scroll", app.onScroll);
      app.container.removeEventListener("mousemove", app.onMouseMove);
      app.container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
      }}
    />
  );
}
