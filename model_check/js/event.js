import * as THREE        from "three"
import { GLTFLoader }    from "GLTFLoader"
import { DRACOLoader }   from "DRACOLoader"
// import { OrbitControls } from "OrbitControls"

import { Data }          from "./data.js"
import { Load }          from "./load.js"
import { Camera }        from "./camera.js"
import { Light }         from "./light.js"

export class Event{
  constructor(){
    document.addEventListener('mousedown'  , this.mousedown.bind(this) , false)
    document.addEventListener('mousemove'  , this.mousemove.bind(this) , false)
    document.addEventListener('mouseup'    , this.mouseup.bind(this)   , false)
    document.addEventListener('touchstart' , this.mousedown.bind(this) , false)
    document.addEventListener('touchmove'  , this.mousemove.bind(this) , false)
    document.addEventListener('touchend'   , this.mouseup.bind(this)   , false)
    window.addEventListener('resize'       , this.resize.bind(this)    , false)
    Data.elm_upload_button.addEventListener("click" , ((e)=> {Data.elm_upload_file.click(e)}))
    Data.elm_upload_file.addEventListener("change"  , ((e)=> new Load(e)))
    Data.elm_grid_button.addEventListener("click"   , ((e)=> Camera.click_grid(e)))
    Data.elm_ambient.addEventListener("change"      , ((e)=>Light.change_ambient(e)))
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