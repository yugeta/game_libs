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
      x : 5,
      y : 7,
      z : 5,
    },
    size : 0.5,
  }

  constructor(){
    this.init()
    this.set_light()
    this.view_lisht()
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

  view_lisht(){
    const geometry = new THREE.SphereGeometry( Light.direct.size, 10, 10)
    // const material = new THREE.MeshNormalMaterial()
    const sphere   = new THREE.Mesh(geometry)
    sphere.position.set(Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z)
    Render.scene.add(sphere);
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