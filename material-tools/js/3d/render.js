import * as THREE      from "three"
import { Data }        from "../system/data.js"
import { Elements }    from "../system/elements.js"
import { Camera }      from "../3d/camera.js"
import { Material }    from "../3d/material.js"
// import { Outline }     from "../3d/outline.js"

export class Render{
  static renderer = null
  static scene    = null
  static gl       = null

  get screen_size(){
    return {
      w : Elements.screen.offsetWidth,
      h : Elements.screen.offsetHeight,
    }
  }

  constructor(){
    Render.clock     = new THREE.Clock();

    Render.scene     = new THREE.Scene()
    Render.renderer  = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    Render.renderer.autoClear = false
    Render.renderer.setPixelRatio( window.devicePixelRatio )
    this.set_screen(Render.renderer)
    Elements.screen.appendChild(Render.renderer.domElement)

    
    // //背景色を設定
    Render.renderer.setClearColor(Data.screen_bg_color, 1)
  }

  set_screen(renderer){
    // Render.renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this.screen_size.w, this.screen_size.h)
  }
  
  set_render(){
    
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

    // Render.renderer.clear()
    // Render.material_animations()

    // Render.gl.enable(Render.gl.STENCIL_TEST)
    // Render.gl.colorMask(false, false, false, false)
    // Render.gl.depthMask(false)
    // Render.gl.stencilFunc(Render.gl.ALWAYS, 1, ~0)
    // Render.gl.stencilOp(Render.gl.KEEP, Render.gl.REPLACE, Render.gl.REPLACE)
    Render.renderer.render(Render.scene, Camera.obj)

    // Render.gl.colorMask(false, false, false, false)
    
    // Outline.gl.enable(Outline.gl.STENCIL_TEST)
    // Outline.gl.depthMask(true)
    // Outline.gl.stencilFunc(Outline.gl.EQUAL, 0, ~0)
    // Outline.gl.stencilOp(Outline.gl.KEEP, Outline.gl.KEEP, Outline.gl.KEEP)
    // Outline.gl.stencilOp(Outline.gl.KEEP, Outline.gl.REPLACE, Outline.gl.REPLACE)
    // Outline.gl.colorMask(false, false, false, false)

    // Outline.renderer.render(Outline.scene, Camera.obj)
    // Outline.gl.enable(Outline.gl.STENCIL_TEST)
    // Outline.gl.depthMask(false)
    // Render.renderer.render(Outline.scene, Camera.obj)

    Material.animation()
  }

  // static material_animations(){
  //   if(!Data.material_animations.length){return}
  //   for(const object of Data.material_animations){
  //     Material.animation(object)
  //   }
  // }
}