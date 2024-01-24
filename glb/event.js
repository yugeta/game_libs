import * as THREE        from "three"
import { GLTFLoader }    from "GLTFLoader"
import { DRACOLoader }   from "DRACOLoader"
import { OrbitControls } from "OrbitControls"

import { Data }          from "./data.js"
import { Load }          from "./load.js"
import { Camera }        from "./camera.js"

export class Event{
  constructor(){
    document.addEventListener('mousedown'  , this.mousedown.bind(this) , false)
    document.addEventListener('mousemove'  , this.mousemove.bind(this) , false)
    document.addEventListener('mouseup'    , this.mouseup.bind(this)   , false)
    document.addEventListener('touchstart' , this.mousedown.bind(this) , false)
    document.addEventListener('touchmove'  , this.mousemove.bind(this) , false)
    document.addEventListener('touchend'   , this.mouseup.bind(this)   , false)
    window.addEventListener('resize'       , this.resize.bind(this)    , false)
    Data.elm_upload_button.addEventListener("click" , (()=> {Data.elm_upload_file.click()}))
    Data.elm_upload_file.addEventListener("change" , ((e)=> new Load(e)))
  }

  resize() {
    Data.camera.aspect = window.innerWidth / window.innerHeight
    Data.camera.updateProjectionMatrix()
    Data.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  mousedown(e){

  }

  mousemove(e){
   
  }

  mouseup(){
    
  }

}