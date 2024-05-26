import * as THREE      from "three"
import { Data }        from "../system/data.js"
import { Elements }    from "../system/elements.js"
import { Camera }      from "../3d/camera.js"
import { Material }    from "../3d/material.js"

export class Render{
  static renderer = null
  static scene    = null

  get screen_size(){
    return {
      w : Elements.screen.offsetWidth,
      h : Elements.screen.offsetHeight,
    }
  }

  constructor(){
    Render.clock    = new THREE.Clock();
    Render.scene    = new THREE.Scene()
    Render.renderer = new THREE.WebGLRenderer()
    this.set_screen()
    Elements.screen.appendChild(Render.renderer.domElement)
    // //背景色を設定
    Render.renderer.setClearColor(Data.screen_bg_color, 1)
  }

  set_screen(){
    // Render.renderer.setPixelRatio(window.devicePixelRatio);
    Render.renderer.setSize(this.screen_size.w, this.screen_size.h)
  }
  

  // //レンダラーを作成
  // set_renderer(){
  //   Render.renderer = new THREE.WebGLRenderer()
  //   Render.renderer.setSize(window.innerWidth, window.innerHeight)
  //   this.root.appendChild(Render.renderer.domElement)
  //   //背景色を設定
  //   Render.renderer.setClearColor(Data.root.bg_color, 1)
  // }

  //毎フレーム時に実行されるループイベント
  static view() {
    requestAnimationFrame(Render.view)
    if(Data.mixer){
      Data.mixer.update(Render.clock.getDelta())
    }
    // Render.material_animations()
    Material.animation()
    Render.renderer.render(Render.scene, Camera.obj)
  }

  // static material_animations(){
  //   if(!Data.material_animations.length){return}
  //   for(const object of Data.material_animations){
  //     Material.animation(object)
  //   }
  // }
}