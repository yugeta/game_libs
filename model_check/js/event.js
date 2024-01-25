import { Data }          from "./data.js"
import { Model }         from "./model.js"
import { Camera }        from "./camera.js"
import { Light }         from "./light.js"
import { Render }        from "./render.js"

export class Event{
  constructor(){
    // document.addEventListener('mousedown'  , this.mousedown.bind(this) , false)
    // document.addEventListener('mousemove'  , this.mousemove.bind(this) , false)
    // document.addEventListener('mouseup'    , this.mouseup.bind(this)   , false)
    // document.addEventListener('touchstart' , this.mousedown.bind(this) , false)
    // document.addEventListener('touchmove'  , this.mousemove.bind(this) , false)
    // document.addEventListener('touchend'   , this.mouseup.bind(this)   , false)
    window.addEventListener('resize'       , this.resize.bind(this)    , false)
    Data.elm_upload_button.addEventListener("click" , ((e)=> {Data.elm_upload_file.click(e)}))
    Data.elm_upload_file.addEventListener("change"  , ((e)=> new Model(e)))
    Data.elm_grid_button.addEventListener("click"   , ((e)=> Camera.click_grid(e)))
    Data.elm_wire_button.addEventListener("click"   , ((e)=> Model.click_wire(e.target.checked)))
    Light.ambient.elm.addEventListener("change"     , ((e)=> Light.change_ambient(e.target.value)))
  }

  resize() {
    Camera.obj.aspect = window.innerWidth / window.innerHeight
    Camera.obj.updateProjectionMatrix()
    Render.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  // mousedown(e){

  // }

  // mousemove(e){
   
  // }

  // mouseup(){
    
  // }

}