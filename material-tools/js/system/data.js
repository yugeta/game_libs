import * as THREE      from "three"
import { Jsonc } from "../../asset/js/jsonc.js"

export class Data{
  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load_setting()
    })
  }

  load_setting(){
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , 'data/setting.json' , true)
    xhr.setRequestHeader("Content-Type", "text/json")
    xhr.onload = this.loaded_setting.bind(this)
    xhr.send()
  }

  loaded_setting(e){
    try{
      Data.setting = new Jsonc(e.target.response).json
    }
    catch(err){
      console.warn(err)
    }
    this.finish()
  }

  finish(){
    this.resolve()
  }

  static assets         = []
  static setting        = {}

  static clock          = null
  static texture        = null
  static loader         = null
  static mesh           = []
  static mixer          = null
  static object_scale   = 1.0
  static object_pos     = { x:0, y:0, z:0 }
  // static root         = {
  //   elm : document.getElementById("screen"),
  //   bg_color : 0x444444,
  // }
  static screen_bg_color = 0x444444

  

  static color(color){
    color = color || "#000000"
    return new THREE.Color(color)
  }
}