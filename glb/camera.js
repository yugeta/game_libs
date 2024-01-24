import * as THREE        from "three"
import { GLTFLoader }    from "GLTFLoader"
import { DRACOLoader }   from "DRACOLoader"
import { OrbitControls } from "OrbitControls"

import { Data }          from "./data.js"

export class Camera{
  constructor(){
    this.set_camera()
  }

  //カメラを作成
  set_camera(){
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
}