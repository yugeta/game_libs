import * as THREE      from "three"
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
   
    this.control()
    this.mesh_click()
  }

  mesh_click(){
    // const mouse = new THREE.Vector2()

    //レイキャストを生成
    
    Data.root.elm.addEventListener('mousedown', this.mousedown.bind(this))
    Data.root.elm.addEventListener('mousemove', this.mousemove.bind(this))
    Data.root.elm.addEventListener('mouseup'  , this.mouseup.bind(this))
 
    // //マウスイベントを登録
    // Data.root.elm.addEventListener('click', this.click_canvas.bind(this))

  }

  mousedown(e){
    const raycaster = new THREE.Raycaster()
    const vector = new THREE.Vector2(
      (e.clientX / Data.root.elm.offsetWidth) * 2 - 1,
      (e.clientY / Data.root.elm.offsetHeight) * -2 + 1
    )
    raycaster.setFromCamera(vector, Camera.obj)
    const intersects = raycaster.intersectObjects(Render.scene.children)
    if(!intersects.length){return}
    const light_sphere = Light.sphere
    switch(intersects[0].object.name){
      case "direct_light":
        light_sphere.material.color = Data.color(Light.direct.color_select)
        Light.direct.move_flg = true
        Camera.control.enabled = false
      break

      default:
        if(Light.direct.move_flg){
          light_sphere.material.color = Data.color(Light.direct.color)
          Light.direct.move_flg = false
        }
    }
  }

  mousemove(){

  }

  mouseup(){
    const light_sphere = Light.sphere
    if(Light.direct.move_flg){
      light_sphere.material.color = Data.color(Light.direct.color)
      light_sphere.flg = false
      Camera.control.enabled = true
    }
  }


  control(){
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

}