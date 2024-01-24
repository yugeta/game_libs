import * as THREE      from "three"
import { GLTFLoader }  from "GLTFLoader"
// import { DRACOLoader } from "DRACOLoader"

import { Data }        from "./data.js"

export class Light{
  constructor(){
    this.set_light()
  }

  //光源を作成
  set_light(){
    Data.light   = new THREE.DirectionalLight("#ffffff", 5)
    Data.ambient = new THREE.AmbientLight("#aaaaaa")
    Data.light.position.set( 0, 70, 100 ).normalize()
    Data.scene.add(Data.light)
    Data.scene.add(Data.ambient)
  }

}