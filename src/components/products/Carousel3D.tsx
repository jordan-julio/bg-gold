import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface Product {
  name: string;
  gltfPath: string;
}
const products: Product[] = [
  { name: 'Tungsten Ring',   gltfPath: '/models/a.gltf' },
  { name: 'Gold Band',       gltfPath: '/models/a.gltf' },
  { name: 'Silver Ring',     gltfPath: '/models/a.gltf' },
  { name: 'Platinum Ring',   gltfPath: '/models/a.gltf' },
  { name: 'Rose Gold Ring',  gltfPath: '/models/deathring.glb' },
  { name: 'White Gold Ring', gltfPath: '/models/deathring.glb' },
  { name: 'Titanium Ring',   gltfPath: '/models/deathring.glb' },
  { name: 'Copper Ring',     gltfPath: '/models/deathring.glb' },
  { name: 'Tungsten Ring',   gltfPath: '/models/deathring.glb' },
  { name: 'Silver Ring',     gltfPath: '/models/deathring.glb' },
  { name: 'Rose Gold Ring',  gltfPath: '/models/deathring.glb' },
  { name: 'White Gold Ring', gltfPath: '/models/deathring.glb' },
  { name: 'Titanium Ring',   gltfPath: '/models/deathring.glb' },
  { name: 'Copper Ring',     gltfPath: '/models/deathring.glb' },
  { name: 'Titanium Ring',   gltfPath: '/models/deathring.glb' },
  { name: 'Copper Ring',     gltfPath: '/models/deathring.glb' },
];

const CircularProductCarousel = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number>(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const [, setIsMoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const selectedModelRef = useRef<THREE.Object3D | null>(null);
  const spinningRef = useRef(false);
  const spinStartRef = useRef({ x: 0, y: 0 });
  const spinStartRotationRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const ringMeshesRef = useRef<THREE.Object3D[]>([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const intersectedModelRef = useRef<THREE.Object3D | null>(null);

  // FIX: Add a flag to track if we're in the middle of scrolling
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalizeModelSize = (model: THREE.Object3D<THREE.Object3DEventMap>, targetSize = 6.0) => {
    const savedRotation = model.rotation.clone();
    model.rotation.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);
    if (maxDimension > 0) {
      const scaleFactor = targetSize / maxDimension;
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    model.rotation.copy(savedRotation);

    const finalBox = new THREE.Box3().setFromObject(model);
    const center = finalBox.getCenter(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.z -= center.z;

    const minY = finalBox.min.y;
    model.position.y = -minY + 0.3;
  };

  useEffect(() => {
    const mountEl: {
      appendChild(domElement: HTMLCanvasElement): unknown;
      removeChild(canvas: HTMLCanvasElement): unknown;
      clientWidth: number;
      clientHeight: number
    } | null = mountRef.current;
    if (!mountEl) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      500
    );
    camera.position.set(0, 15, 40);
    camera.lookAt(0, 10, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountEl.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const env = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(env).texture;
    scene.environment = envMap;

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(5, 10, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.ShadowMaterial({ opacity: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -2, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    const group = new THREE.Group();
    scene.add(group);

    const gltfLoader = new GLTFLoader();
    const radius = 34;
    const ringMeshes: THREE.Object3D[] = [];
    ringMeshesRef.current = ringMeshes;

    let loadedCount = 0;
    const angleStep = (Math.PI * 2) / products.length;

    products.forEach((product, index) => {
      const angle = index * angleStep;
      gltfLoader.load(product.gltfPath, (gltf) => {
        const model = gltf.scene;

        // First normalize the model size
        normalizeModelSize(model, 6.0);
        
        // Calculate bounding sphere
        const tempBox = new THREE.Box3().setFromObject(model);
        const tempSphere = new THREE.Sphere();
        tempBox.getBoundingSphere(tempSphere);
        model.userData.boundingRadius = tempSphere.radius;

        // Now position the model in the circle AFTER normalization
        const adjustedY = model.position.y; // Keep the Y adjustment from normalization
        model.position.set(Math.cos(angle) * radius, adjustedY, Math.sin(angle) * radius);
        model.rotation.y = angle + Math.PI / 2;

        // Store original values after final positioning
        model.userData.originalScale = model.scale.clone();
        model.userData.originalPosition = model.position.clone();
        model.userData.originalRotation = model.rotation.clone();
        model.userData.renderOrderSet = false;

        model.traverse(child => {
          // at runtime this filters to Mesh instances…
          if (child instanceof THREE.Mesh) {
            child.castShadow    = true;
            child.receiveShadow = true;
            child.material.transparent = true;
          }
        });

        model.userData.index = index;
        model.userData.autoRotationSpeed = 0.01;
        model.userData.isHighlighted = false;

        group.add(model);
        ringMeshes.push(model);

        loadedCount += 1;
        if (loadedCount === products.length) {
          setIsLoading(false);
        }
      });
    });

    const raycaster = raycasterRef.current;
    const centerPoint = new THREE.Vector2(0, 0);

    let currentRotation = 0;
    let targetRotation = 0;

    let lastIntersectedModel: THREE.Object3D<THREE.Object3DEventMap> | null = null;
    let raycastFrame = 0;
    const raycastFrequency = 30;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // 1) Rotate the entire carousel if no model is actively selected
      if (!selectedModelRef.current) {
        currentRotation += (targetRotation - currentRotation) * 0.1;
        group.rotation.y = currentRotation;
      }

      if (!isScrollingRef.current && !selectedModelRef.current) {
        raycastFrame++;
        if (raycastFrame % raycastFrequency === 0) {
          raycaster.setFromCamera(centerPoint, camera);
          const intersects = raycaster.intersectObjects(ringMeshes, true);
          let newIntersected: THREE.Object3D | null = null;

          if (intersects.length > 0) {
            let picked = intersects[0].object;
            while (picked.parent && !ringMeshes.includes(picked)) {
              picked = picked.parent;
            }
            if (ringMeshes.includes(picked)) {
              newIntersected = picked;
            }
          }

          if (newIntersected !== lastIntersectedModel) {
            // un-highlight the old one
            if (lastIntersectedModel) {
              lastIntersectedModel.traverse(child => {
                if (child instanceof THREE.Mesh) {
                  // cast material to MeshStandardMaterial (or your material type)
                  const mat = child.material as THREE.MeshStandardMaterial;
                  mat.emissive.setHex(0x000000);
                }
              });
            }
            // highlight the new one
            if (newIntersected) {
              newIntersected.traverse(child => {
                if (child instanceof THREE.Mesh) {
                  const mat = child.material as THREE.MeshStandardMaterial;
                  mat.emissive.setHex(0x111111);
                }
              });
            }
            lastIntersectedModel = newIntersected;
            intersectedModelRef.current = newIntersected;
          }
        }
      }

      // 3) Auto-spin each ring (only non-selected ones)
      for (let i = 0; i < ringMeshes.length; i++) {
        const model = ringMeshes[i];
        if (model !== selectedModelRef.current) {
          model.rotation.y += model.userData.autoRotationSpeed;
        }
      }

      // 4) Zoom/overlay logic for the selected ring
      for (let i = 0; i < ringMeshes.length; i++) {
        const model = ringMeshes[i];
        const isSelected = model === selectedModelRef.current;

        if (isSelected) {
          if (model.parent === group) {
            scene.attach(model);
          }

          const worldCenter = new THREE.Vector3(0, 10, 0);
          const toCenter = worldCenter.clone().sub(camera.position).normalize();

          const bbox = new THREE.Box3().setFromObject(model);
          const sphere = new THREE.Sphere();
          bbox.getBoundingSphere(sphere);
          const boundingRadius = sphere.radius;

          const vFOV = THREE.MathUtils.degToRad(camera.fov);
          const safetyFactor = 2;
          const distance = (boundingRadius / Math.tan(vFOV / 2)) * safetyFactor;

          const targetWorld = camera.position.clone().add(toCenter.multiplyScalar(distance));
          model.position.lerp(targetWorld, 0.1);

          // Keep Y position stable - no bouncing
          const targetY = 5;
          model.position.y = targetY;

          const baseScale = model.userData.originalScale;
          const desiredScale = baseScale.clone().multiplyScalar(1.5);
          model.scale.lerp(desiredScale, 0.1);

          if (!model.userData.renderOrderSet) {
            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const mats = Array.isArray(child.material)
                  ? child.material
                  : [child.material];

                mats.forEach(mat => {
                  const m = mat as THREE.MeshStandardMaterial; 
                  m.depthTest = true;
                });
              }
            });
            model.userData.renderOrderSet = true;
          }
        } else {
          if (model.parent === scene) {
            group.attach(model);
          }

          const origPos = model.userData.originalPosition;
          model.position.lerp(origPos, 0.1);

          const baseScale = model.userData.originalScale;
          model.scale.lerp(baseScale, 0.1);

          // Reset rotation to original when deselected
          if (!spinningRef.current || model !== selectedModelRef.current) {
            const origRot = model.userData.originalRotation;
            if (origRot) {
              // Only reset X and Z rotations, keep Y rotation for auto-spin
              model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, origRot.x, 0.1);
              model.rotation.z = THREE.MathUtils.lerp(model.rotation.z, origRot.z, 0.1);
            }
          }

          if (model.userData.renderOrderSet) {
            model.traverse((child) => {
              // inside your traverse…
              if (child instanceof THREE.Mesh) {
                const mats = Array.isArray(child.material)
                  ? child.material
                  : [child.material];

                mats.forEach(mat => {
                  const m = mat as THREE.MeshStandardMaterial; 
                  m.depthTest = true;
                });
              }
            });
            model.userData.renderOrderSet = false;
          }
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    const canvas = renderer.domElement;

    const onWheel = (e: { preventDefault: () => void; deltaY: number; }) => {
      e.preventDefault();
      if (selectedModelRef.current) selectedModelRef.current = null;
      
      // FIX: Set scrolling flag immediately
      isScrollingRef.current = true;
      setIsMoving(true);
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      const delta = e.deltaY > 0 ? 1 : -1;
      targetRotation += delta * angleStep;
      const newIndex = ((Math.round(-targetRotation / angleStep) % products.length) + products.length) % products.length;
      setCurrentIndex(newIndex);
      
      // FIX: Clear scrolling flag after delay
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsMoving(false);
      }, 300);
    };

    const onPointerDown = (e: { clientX: number; clientY: number; }) => {
      // FIX: Don't allow selection while scrolling
      if (isScrollingRef.current) return;
      
      const picked = intersectedModelRef.current;
      if (!picked) return;
      if (picked === selectedModelRef.current) {
        selectedModelRef.current = null;
      } else {
        selectedModelRef.current = picked;
        setCurrentIndex(picked.userData.index);
        spinningRef.current = true;
        spinStartRef.current = { x: e.clientX, y: e.clientY };
        spinStartRotationRef.current = { 
          x: picked.rotation.x, 
          y: picked.rotation.y 
        };
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e: { clientX: number; clientY: number; shiftKey: unknown; }) => {
      if (spinningRef.current && selectedModelRef.current) {
        const dx = e.clientX - lastPointerRef.current.x;
        const dy = e.clientY - lastPointerRef.current.y;
        
        // Update rotation based on mouse movement
        selectedModelRef.current.rotation.y += dx * 0.01;
        selectedModelRef.current.rotation.x += dy * 0.01;
        
        // Optional: Add rotation on z-axis with shift key
        if (e.shiftKey) {
          selectedModelRef.current.rotation.z += dx * 0.01;
        }
        
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => { 
      if (spinningRef.current) {
        spinningRef.current = false;
      }
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      camera.aspect = mountEl.clientWidth / mountEl.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      pmremGenerator.dispose();
      renderer.dispose();
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      mountEl.removeChild(canvas);
    };
  }, [products.length]);

  return (
    <div className="pt-24 w-full h-screen bg-white relative overflow-hidden" style={{ cursor: 'default' }}>
      <div className="none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-gray-400 opacity-50"></div>
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 opacity-50 -translate-y-1/2"></div>
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-400 opacity-50 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-600 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div ref={mountRef} className="w-full h-full select-none" />

      <div className="absolute top-0 left-0 right-0 p-8 pointer-events-none">
        <h1 className="text-4xl text-gray-800 font-light">{products[currentIndex]?.name}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Click to select • Drag to rotate • Hold Shift + drag for Z-axis rotation
        </p>
      </div>

      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center">
            <div className="w-10 h-10 border-t-2 border-gray-500 rounded-full animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularProductCarousel;