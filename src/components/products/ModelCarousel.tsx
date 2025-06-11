'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ModelCarouselProps {
    modelPaths: string[];
  }

const ModelCarousel = ({ modelPaths = [] } : ModelCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    // Only run if we have model paths and a container
    if (modelPaths.length === 0 || !containerRef.current) return

    // Initialize Three.js scene
    const initScene = () => {
      // Create scene
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0xf5f5f5)
      sceneRef.current = scene

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current ? containerRef.current.clientWidth / containerRef.current.clientHeight : 1,
        0.1,
        1000
      )
      camera.position.z = 5
      cameraRef.current = camera

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight
      )
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.shadowMap.enabled = true
      containerRef.current!.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(1, 1, 1)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      // Add controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.25
      controlsRef.current = controls

      // Load initial model
      loadModel(modelPaths[currentModelIndex])

      // Animation loop
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate)

        if (controlsRef.current) {
          controlsRef.current.update()
        }

        // Rotate model slightly for showcase effect
        if (modelRef.current) {
          modelRef.current.rotation.y += 0.005
        }

        renderer.render(scene, camera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (!containerRef.current) return
        
        if (cameraRef.current) {
          cameraRef.current.aspect = 
            containerRef.current.clientWidth / containerRef.current.clientHeight
          cameraRef.current.updateProjectionMatrix()
        }
        
        if (rendererRef.current) {
          rendererRef.current.setSize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          )
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    initScene()

    // Cleanup function
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [modelPaths])

  // Change model
  // Load GLTF model
  const loadModel = (path: string) => {
    const loader = new GLTFLoader()
    
    if (modelRef.current && sceneRef.current) {
      sceneRef.current.remove(modelRef.current)
      modelRef.current = null
    }
    
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene
        
        // Center model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        
        // Adjust scale if needed
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim > 2) {
          const scale = 2 / maxDim
          model.scale.set(scale, scale, scale)
        }
        
        if (sceneRef.current) {
          sceneRef.current.add(model)
        }
        modelRef.current = model
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )
  }
  useEffect(() => {
    if (sceneRef.current && modelPaths.length > 0) {
      loadModel(modelPaths[currentModelIndex])
    }
  }, [currentModelIndex, modelPaths])

  const nextModel = () => {
    setCurrentModelIndex((prev) => 
      (prev + 1) % modelPaths.length
    )
  }

  const prevModel = () => {
    setCurrentModelIndex((prev) => 
      (prev - 1 + modelPaths.length) % modelPaths.length
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={containerRef} 
        className="w-full h-96 relative"
      >
        {/* 3D canvas will be appended here */}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={prevModel}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Previous
        </button>
        
        <span className="text-gray-700">
          {currentModelIndex + 1} / {modelPaths.length}
        </span>
        
        <button 
          onClick={nextModel}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ModelCarousel