import * as THREE        from "three"
import { GLTFLoader }    from "GLTFLoader"
import { DRACOLoader }   from "DRACOLoader"
import { OrbitControls } from "OrbitControls"

import { Data }          from "./data.js"

export class Camera{

  static gridHelper = null

  constructor(){
    this.setting()
    this.grid()
  }

  //カメラを作成
  setting(){
    Data.camera = new THREE.PerspectiveCamera( 20, window.innerWidth/window.innerHeight, 0.1, 1000 )
    Data.camera_control = new OrbitControls(Data.camera, Data.root.elm);
    Camera.pos()
  }

  static pos(){
    Data.camera.position.z = Data.camera_pos.z
    Data.camera.position.y = Data.camera_pos.y
    Data.camera.position.x = Data.camera_pos.x
    const center_pos = new THREE.Vector3(Data.camera_center.x, Data.camera_center.y, Data.camera_center.z)
    Data.camera.lookAt(center_pos);
  }

  grid(){
    // gridHelper 
    Camera.gridHelper = new THREE.GridHelper(50, 50, 0x888800)
    Data.scene.add(Camera.gridHelper)

    // // axisHelper
    // const axisHelper = new THREE.AxesHelper(200)  // 軸のサイズ
    // Data.scene.add(axisHelper)
  }

  static click_grid(){
    if(Data.elm_grid_button.checked === true){
      Camera.gridHelper.visible = true
    }
    else{
      Camera.gridHelper.visible = false
    }
  }
}