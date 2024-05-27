import * as THREE         from "three"
import { Camera }         from "../3d/camera.js"
import { Render }         from "../3d/render.js"

export class Outline{
  static scene    = null
  static renderer = null
  static model    = null
  static gl       = null

  constructor(model){
    // this.model
    this.model = model.clone()
    this.model.traverse(function (child) {
      // if (child.isMesh) {
      //   // console.log(child)
      //   // オブジェクトを単一色にする
      //   child.material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
      //   // child.material = new THREE.MeshBasicMaterial({ color: 0x000000 })
      //   // child.position.x += 0.2
      // }
      if ( child.isMesh ) {
        child.material = new THREE.ShaderMaterial({
          vertexShader: document.getElementById('vshader').textContent,
          fragmentShader: document.getElementById('fshader').textContent,
        });
      }
    })
    // console.log(this.model)
    // this.model.position.x += 1
    this.model.scale.set(1.05, 1.05, 1.05)

    Outline.scene.add(this.model)
    // Outline.scene = new THREE.Scene()
    // Outline.scene.add(objectStencil)

    // Outline.renderer = new THREE.WebGLRenderer()
    // Render.renderer.clear();
    // Render.renderer.render(Outline.scene, Camera.obj)


    

    // Render.scene.add(objectStencil)

    // model.traverse(function (child) {
    //   if (child.isMesh) {
    //     child.material = new THREE.ShaderMaterial({
    //       vertexShader: document.getElementById('vshader').textContent,
    //       fragmentShader: document.getElementById('fshader').textContent,
    //     })
    //   }
    // )}
  }

  // static get scene(){
  //   if(Outline.scene_data){
  //     return Outline.scene_data
  //   }
  //   else{
  //     new THREE.Scene()
  //   }
  // }

}