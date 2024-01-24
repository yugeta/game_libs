// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from "three"

export class Sample{

  constructor(){
    this.init()
    this.animate();
  }

  init(){
    this.scene  = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;
  }

  animate(){
    requestAnimationFrame( this.animate.bind(this) );
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  
    this.renderer.render( this.scene, this.camera );
  }
}



