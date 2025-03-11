import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000); // Set background to black
    mountRef.current.appendChild(renderer.domElement);

    // Add a Galaxy of Stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Add a Nebula Effect
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaVertices = [];
    const nebulaColors = [];
    for (let i = 0; i < 500; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      nebulaVertices.push(x, y, z);

      // Random colors for nebula effect
      const r = Math.random() * 0.5 + 0.5; // Red (0.5 to 1)
      const g = Math.random() * 0.5;       // Green (0 to 0.5)
      const b = Math.random() * 0.5 + 0.5; // Blue (0.5 to 1)
      nebulaColors.push(r, g, b);
    }
    nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
    nebulaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
    const nebulaMaterial = new THREE.PointsMaterial({ 
      size: 3, 
      vertexColors: true, 
      transparent: true, 
      opacity: 0.8 
    });
    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Add Floating Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleVertices = [];
    for (let i = 0; i < 300; i++) {
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 1000;
      particleVertices.push(x, y, z);
    }
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 2 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Camera Position
    camera.position.z = 100;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the nebula and stars for a dynamic effect
      nebula.rotation.x += 0.0005;
      nebula.rotation.y += 0.0005;
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;

      // Move particles for a floating effect
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.5; // Random movement
        positions[i + 1] += (Math.random() - 0.5) * 0.5;
        positions[i + 2] += (Math.random() - 0.5) * 0.5;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Render the scene
      renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera aspect ratio and projection matrix
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer size
      renderer.setSize(width, height);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ThreeJSBackground;