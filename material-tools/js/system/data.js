import * as THREE      from "three"
import { Jsonc } from "../../asset/js/jsonc.js"

export class Data{
  static files = []

  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.setting()
    })
  }

  setting(){
    new Jsonc({
      file : './data/setting.jsonc'
    }).promise.then((json)=>{
      Data.setting = json
      this.finish()
    })
  }

  finish(){
    console.log(this)
    this.resolve()
  }

  static assets         = []
  static setting        = {}

  static clock          = null
  static texture        = null
  static loader         = null
  static mesh           = []
  static objects        = []
  static mixer          = null
  static object_scale   = 1.0
  static object_pos     = { x:0, y:0, z:0 }
  static screen_bg_color = 0x444444

  static material_animations = []

  static color(color){
    color = color || "#000000"
    return new THREE.Color(color)
  }
}