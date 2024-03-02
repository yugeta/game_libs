import * as THREE      from "three"
import { FBXLoader }   from "FBXLoader"
import { Data }        from "./data.js"
import { Camera }      from "./camera.js"
import { Light }       from "./light.js"
import { Render }      from "./render.js"

export class Fbx{
	constructor(options){
    options = options || {}
    switch(options.type){
      // // fbx-loaded
      // case "fbx_data": this.load(options.url)
      // break

      // init
      default : this.init()
      break
    }
  }

  init(){
    Data.clock    = new THREE.Clock();
    Render.scene  = new THREE.Scene()
    Data.texture  = new THREE.Texture()
    Data.loader   = new FBXLoader()
    
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