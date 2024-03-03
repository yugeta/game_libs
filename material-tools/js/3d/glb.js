import * as THREE      from "three"
import { GLTFLoader }  from "GLTFLoader"
import { Data }        from "../system/data.js"
import { Camera }      from "../3d/camera.js"
import { Light }       from "../3d/light.js"
import { Render }      from "../3d/render.js"

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
    Render.scene  = new THREE.Scene()
    Data.texture  = new THREE.Texture()
    Data.loader   = new GLTFLoader()
    
    new Camera()
    new Light()
    new Render()
  }

  resize() {
    Camera.obj.aspect = window.innerWidth / window.innerHeight
    Camera.obj.updateProjectionMatrix()
    Render.renderer.setSize( window.innerWidth, window.innerHeight )
  }
}