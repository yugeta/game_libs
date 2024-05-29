import * as THREE        from "three"
import { OrbitControls } from "OrbitControls"
import { Data }          from "../system/data.js"
import { Elements }      from "../system/elements.js"
// import { Render }        from "../3d/render.js"

export class Camera{

  static obj        = null
  static control    = null
  static gridHelper = null
  static center     = {x:0, y:0, z:0}
  static position   = {x:50, y:30, z:50}

  constructor(){
    // this.init()
    // this.grid()

    // カメラ作成
    Camera.obj     = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000)
    Camera.control = new OrbitControls(Camera.obj, Elements.screen)
    Camera.pos()
  }

  // window resize
  resize(){
    // if(!Data.camera){return}
    // console.log(Data.camera)
    Camera.obj.aspect = Data.render.screen_size.w / Data.render.screen_size.h
    Camera.obj.updateProjectionMatrix()
  }

  // //カメラを作成
  // init(){
  //   Camera.obj = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000)
  //   Camera.control = new OrbitControls(Camera.obj, Data.root.elm)
  //   Camera.pos()
  // }

  static pos(){
    Camera.obj.position.z = Camera.position.z
    Camera.obj.position.y = Camera.position.y
    Camera.obj.position.x = Camera.position.x
    const center_pos = new THREE.Vector3(Camera.center.x, Camera.center.y, Camera.center.z)
    Camera.obj.lookAt(center_pos)
  }

  // grid(){
  //   Camera.gridHelper = new THREE.GridHelper(50, 50, 0x888800)
  //   Render.scene.add(Camera.gridHelper)
  // }

  // static click_grid(){
  //   if(Data.elm_grid_button.checked === true){
  //     Camera.gridHelper.visible = true
  //   }
  //   else{
  //     Camera.gridHelper.visible = false
  //   }
  // }
}