import * as THREE      from "three"
import { GLTFLoader }  from "GLTFLoader"
// import { DRACOLoader } from "DRACOLoader"

import { Data }        from "./data.js"

export class Light{

  static color_ambient = "#aaaaaa"

  constructor(){
    this.set_control()
    this.set_light()
    this.set_ambient()
  }

  static get ambient_color(){
    return Data.elm_ambient.value
  }

  set_control(){
    Data.elm_ambient.value = Light.color_ambient
  }

  //光源を作成
  set_light(){
    Data.light = new THREE.DirectionalLight("#ffffff", 5)
    Data.light.position.set( 0, 70, 100 ).normalize()
    Data.scene.add(Data.light)
  }

  set_ambient(){
    Data.ambient = new THREE.AmbientLight(Light.color_ambient)
    Data.scene.add(Data.ambient)
  }

  static change_ambient(){
    const color = new THREE.Color(Light.ambient_color)
    Data.ambient.color = color
  }

}