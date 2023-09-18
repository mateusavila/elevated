<script setup lang="ts">
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

if (typeof window !== 'undefined') {

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera()
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  const canvas = document.getElementById('canvas') ?? null
  canvas && canvas.appendChild(renderer.domElement)

  renderer.setSize(560, 520)
  scene.background = new THREE.Color(0xffffff)
  
  const loader = new FontLoader()
  loader.load('/fonts/flexible.json', (font: any) => {
    const geometry = new TextGeometry('ELEVATED\nBY DESIGN', {
      font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5
    })
    geometry.computeBoundingBox()
    const materials  = [
      new THREE.MeshPhongMaterial({ 
        color: 0xffffff, 
        flatShading: true 
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xffffff 
      })
    ]
    const textMesh1 = new THREE.Mesh(geometry, materials)
    scene.add(textMesh1)
    renderer.render(scene, camera)
  })
  
}
</script>

<template>
  <div id="canvas" class="canvas"></div>
</template>

<style>
  .canvas{
    position: absolute;
    top: 50%;
    background: #333;
    left: 200px;
    transform: translateY(-50%);
  }
</style>
