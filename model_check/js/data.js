import * as THREE      from "three"

export class Data{
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

  static elm_upload_button = document.querySelector(`button[name="upload"]`)
  static elm_upload_file   = document.querySelector(`input[type="file"][name="glb"]`)
  static elm_grid_button   = document.querySelector(`input[name="grid"]`)
  static elm_wire_button   = document.querySelector(`input[name="wire"]`)

  static color(color){
    color = color || "#000000"
    return new THREE.Color(color)
  }
}