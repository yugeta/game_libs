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
    name  : "direct_light",
    obj   : null,
    color : "#FFFFFF",
    color_select : "#FF0000",
    pos   : {
      x : 5,
      y : 7,
      z : 5,
    },
    size : 0.3,
    line_name : "direct-light-line",
  }

  constructor(){
    this.init()
    this.set_ambient()
    this.set_light()
    this.view_light()
    this.view_light_line()
    
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

  view_light(){
    const geometry = new THREE.SphereGeometry(Light.direct.size, 10, 10)
    const material = new THREE.MeshBasicMaterial({
      color   : Data.color(Light.direct.color),
      opacity : 0.5,
      transparent: true,
    })
    const sphere   = new THREE.Mesh(geometry, material)
    sphere.position.set(Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z)
    sphere.name = Light.direct.name
    Render.scene.add(sphere)
  }
  view_light_line(){
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z),
    ]
    const color = Data.color(Light.direct.color)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color   : color,
      opacity : 0.5,
      transparent: true,
    })
    const line = new THREE.Line(geometry, material)
    line.name = Light.direct.line_name
    Render.scene.add(line)  }

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

  static get sphere(){
    return Render.scene.children.find(e => e.name === Light.direct.name)
  }

  static set_direct_pos(pos){
    Light.direct.pos.x = pos.x
    Light.direct.pos.y = pos.y
    Light.direct.pos.z = pos.z
    Light.direct.obj.position.x = pos.x
    Light.direct.obj.position.y = pos.y
    Light.direct.obj.position.z = pos.z
    this.set_line_pos()
  }

  static get line(){
    return Render.scene.children.find(e => e.name === Light.direct.line_name)
  }
  static set_line_pos(){ 
    const line = Light.line
    const line_position = line.geometry.getAttribute("position")
    line_position.setXYZ(1, Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z)
    line_position.needsUpdate = true;
  }

}