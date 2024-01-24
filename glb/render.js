import * as THREE      from "three"
import { GLTFLoader }  from "GLTFLoader"
import { DRACOLoader } from "DRACOLoader"

import { Data }        from "./data.js"

export class Render{
  constructor(){
    this.set_renderer()
    this.render()
  }

  //レンダラーを作成
  set_renderer(){
    Data.renderer = new THREE.WebGLRenderer()
    Data.renderer.setSize(window.innerWidth, window.innerHeight)
    Data.root.elm.appendChild(Data.renderer.domElement)
    //背景色を設定
    Data.renderer.setClearColor(Data.root.bg_color, 1)
  }

  //毎フレーム時に実行されるループイベント
  render() {
    requestAnimationFrame( this.render.bind(this) )
    if (Data.mixer) Data.mixer.update(Data.clock.getDelta())
    Data.renderer.render(Data.scene, Data.camera)
  }
}