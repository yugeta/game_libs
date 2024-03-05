import * as THREE      from "three"
import { Data }          from "../system/data.js"
import { Model }         from "../3d/model.js"
import { Camera }        from "../3d/camera.js"
import { Light }         from "../3d/light.js"
import { Render }        from "../3d/render.js"
import { Select }        from "../3d/select.js"

export class Control{
  plane        = new THREE.Plane()
  raycaster    = new THREE.Raycaster()
  vector       = new THREE.Vector2()
  offset       = new THREE.Vector3()
  intersection = new THREE.Vector3()

  // elm_import_button = document.querySelector(`[name="import"]`)
  get elm_import_file(){
    return document.getElementById("import")
  }
  elm_grid_button   = document.querySelector(`[name="grid"]`)
  elm_wire_button   = document.querySelector(`[name="wire"]`)
  elm_light_ambient = document.querySelector(`[name="ambient"]`)

  mouse = {
    vector : new THREE.Vector2(),
    pos : {
      x : null,
      y : null,
      z : null,
    },
    drag : null,
  }

  constructor(){
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

    // light-direct
    this.vector = new THREE.Vector2(
      (e.clientX / Data.root.elm.offsetWidth ) *  2 - 1,
      (e.clientY / Data.root.elm.offsetHeight) * -2 + 1
    )
    this.raycaster.setFromCamera(this.vector, Camera.obj)
    const intersects = this.raycaster.intersectObjects(Render.scene.children)
    if(!intersects.length){return}
    Camera.obj.getWorldDirection(this.plane.normal) // 平面の角度をカメラの向きに対して垂直に維持する(plane.normalにカメラの方向ベクトルを設定)

    switch(intersects[0].object.name){
      case "direct_light":
        // Light.sphere.material.color = Data.color(Light.direct.color_select) // 選択時に色変更
        Camera.control.enabled = false // ライトクリックの場合は、画面操作を無効にする。
        this.mouse.drag = intersects[0].object
        if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)){ // rayとplaneの交点を求めてintersectionに設定
          this.offset.copy(this.intersection).sub(this.mouse.drag.position) // ドラッグ中のオブジェクトとplaneの距離
        }

        // edgeの表示
        Select.view(Light.sphere, Light.direct.pos)
      break

      // default:
      //   if(Light.direct.move_flg){
      //     Light.sphere.material.color = Data.color(Light.direct.color)
      //     Light.direct.move_flg = false
      //   }
    }
  }

  mousemove(e){
    // mouse
    if(this.mouse.drag){
      e.preventDefault()
      this.vector.x =   (e.clientX / Data.root.elm.offsetWidth ) * 2 - 1
      this.vector.y = - (e.clientY / Data.root.elm.offsetHeight) * 2 + 1
      this.raycaster.setFromCamera(this.vector, Camera.obj)
      if(this.raycaster.ray.intersectPlane(this.plane, this.intersection)){ // rayとplaneの交点をintersectionに設定
        this.mouse.drag.position.copy(this.intersection.sub(this.offset)) // オブジェクトをplaneに対して平行に移動させる
        // console.log(this.mouse.drag.position)
        Light.set_direct_pos(this.mouse.drag.position)
        Select.position(Light.direct.pos)
      }
    }

    else{
      // const intersects = this.raycaster.intersectObjects(Render.scene.children) // オブジェクトをドラッグしないでマウスを動かしている場合
      // if(intersects.length > 0) {
      //   if(this.mouse.drag != intersects[0].object){
      //     this.mouse.drag = intersects[0].object // マウスオーバー中のオブジェクトを入れ替え
      //   }
      // }
      // else{
      //   mouseoveredObj = null;
      // }
    }
  }

  mouseup(){
    // light-direct
    const light_sphere = Light.sphere
    if(this.mouse.drag){
      light_sphere.material.color = Data.color(Light.direct.color)
      light_sphere.flg = false
      Camera.control.enabled = true
      this.mouse.drag = null
      // edgeの削除
      Select.clear()
    }
    
  }

  control(){
    window.addEventListener('resize'       , this.resize.bind(this)    , false)
    // this.elm_import_button.addEventListener("click"  , ((e)=> {this.elm_upload_file.click(e)}))
    // console.log(this.elm_import_file)
    this.elm_import_file.addEventListener("change"   , ((e)=> new Model(e)))
    this.elm_grid_button.addEventListener("click"    , ((e)=> Camera.click_grid(e)))
    this.elm_wire_button.addEventListener("click"    , ((e)=> Model.click_wire(e.target.checked)))
    this.elm_light_ambient.addEventListener("change" , ((e)=> Light.change_ambient(e.target.value)))
  }

  resize() {
    Camera.obj.aspect = window.innerWidth / window.innerHeight
    Camera.obj.updateProjectionMatrix()
    Render.renderer.setSize( window.innerWidth, window.innerHeight )
  }

}