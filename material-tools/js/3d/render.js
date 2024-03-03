import * as THREE      from "three"
import { Data }        from "../system/data.js"
import { Camera }      from "../3d/camera.js"

export class Render{
  static renderer = null
  static scene    = null

  constructor(){
    this.set_renderer()
    this.render()
  }

  //レンダラーを作成
  set_renderer(){
    Render.renderer = new THREE.WebGLRenderer()
    Render.renderer.setSize(window.innerWidth, window.innerHeight)
    Data.root.elm.appendChild(Render.renderer.domElement)
    //背景色を設定
    Render.renderer.setClearColor(Data.root.bg_color, 1)
  }

  //毎フレーム時に実行されるループイベント
  render() {
    requestAnimationFrame( this.render.bind(this) )
    if (Data.mixer) Data.mixer.update(Data.clock.getDelta())
    Render.renderer.render(Render.scene, Camera.obj)
  }
}