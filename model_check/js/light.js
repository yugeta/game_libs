import * as THREE      from "three"
import { Data }        from "./data.js"
import { Render }      from "./render.js"

export class Light{

  static ambient = {
    obj   : null,
    color : "#ffffff",
    elm   : document.querySelector(`input[name="ambient"]`),
    intensity : 1.0,
  }
  static direct = {
    obj   : null,
    color : "#FFFFFF",
    pos   : {
      x : 50,
      y : 70,
      z : 50,
    },
  }

  constructor(){
    this.init()
    this.set_light()
    this.set_ambient()
  }

  init(){
    Light.ambient.elm.value = Light.ambient.color
  }

  set_light(){
    const color = Data.color(Light.direct.color)
    Light.direct.obj = new THREE.DirectionalLight(color, 5)
    Light.direct.obj.position.set( Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z ).normalize()
    Render.scene.add(Light.direct.obj)
  }

  set_ambient(){
    const color = Data.color(Light.ambient.elm.value)
    Light.ambient.obj = new THREE.AmbientLight(color , Light.ambient.intensity)
    Render.scene.add(Light.ambient.obj)
  }

  static change_ambient(color , intensity){
    color     = color || Light.ambient.color
    intensity = intensity || Light.ambient.intensity
    Light.ambient.obj.color     = Data.color(color)
    Light.ambient.obj.intensity = intensity
  }

}