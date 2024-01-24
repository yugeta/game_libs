import * as THREE      from "three"
import { GLTFLoader }  from "GLTFLoader"
import { DRACOLoader } from "DRACOLoader"

import { Data }        from "./data.js"
import { Camera }      from "./camera.js"
import { Light }       from "./light.js"
import { Render }      from "./render.js"

export class Glb{
  constructor(options){
    options = options || {}
    switch(options.type){
      // glb-loaded
      case "glb_data": this.load(options.url)
      break

      // init
      default : this.init()
      break
    }
  }

  init(){
    Data.clock    = new THREE.Clock();
    Data.scene    = new THREE.Scene()
    Data.texture  = new THREE.Texture()
    Data.loader   = new GLTFLoader()
    
    new Camera()
    new Light()
    new Render()
  }

  resize() {
    Data.camera.aspect = window.innerWidth / window.innerHeight
    Data.camera.updateProjectionMatrix()
    Data.renderer.setSize( window.innerWidth, window.innerHeight )
  }
}