import * as THREE      from "three"

export class Data{
  static assets         = []

  static clock          = null
  static texture        = null
  static loader         = null
  static mesh           = []
  static mixer          = null
  static object_scale   = 1.0
  static object_pos     = { x:0, y:0, z:0 }
  static root           = {
    elm : document.getElementById("screen"),
    bg_color : 0x444444,
  }

  

  static color(color){
    color = color || "#000000"
    return new THREE.Color(color)
  }
}