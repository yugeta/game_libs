// import * as THREE        from "https://unpkg.com/three@0.141.0/build/three.module.js"
// import { OrbitControls } from "https://unpkg.com/three@0.139.2/examples/jsm/controls/OrbitControls.js"
// import * as THREE        from "three"
// import { OrbitControls } from "OrbitControls"

class Main{
  width  = window.innerWidth
  height = window.innerHeight

  constructor(){
    this.mixer    = null
    this.renderer = new THREE.WebGLRenderer()
    this.clock    = new THREE.Clock()
    this.scene    = new THREE.Scene()
    this.texture  = new THREE.Texture()
    this.set_renderer()
    this.set_camera()
    this.set_grid()
    this.set_light()
    this.set_ambient()
    this.set_object()
    this.render()
  }

  get root(){
    return document.body
  }

  set_renderer(){
    this.renderer.setSize(this.width, this.height)
    this.root.appendChild(this.renderer.domElement)
    this.renderer.setClearColor(0x444444, 1) //背景色を設定
  }

  set_camera(){
    this.camera  = new THREE.PerspectiveCamera( 20, this.width/this.height, 1.0, 1000 )
    this.camera.position.set(50, 50, 50)
    const center_pos = new THREE.Vector3({x:0, y:0, z:0})
    this.camera.lookAt(center_pos)
    // this.control = new OrbitControls(this.camera, this.root)
  }

  set_grid(){
    this.gridHelper = new THREE.GridHelper(50, 50, 0x888800)
    this.scene.add(this.gridHelper)
  }

  set_light(){
    const color_light = new THREE.Color("#ffffff")
    this.light = new THREE.DirectionalLight(color_light, 1.0)
    this.light.position.set(10,10,10 ).normalize()
    this.scene.add(this.light)
  }

  set_ambient(){
    const color_ambient = new THREE.Color("#ff8800")
    this.ambient = new THREE.AmbientLight(color_ambient , 1,0)
    this.scene.add(this.ambient)
  }

  set_object(){
    const mesh     = new THREE.BoxGeometry(3, 3, 3);// 立方体
    const material = new THREE.MeshLambertMaterial({color: 0x00ddff});// 影が表示される
    const cube     = new THREE.Mesh(mesh, material);// それらをまとめて3Dオブジェクトにします
    this.scene.add(cube);
  }

  render() {
    requestAnimationFrame( this.render.bind(this) )
    if (this.mixer){this.mixer.update(this.clock.getDelta())}
    this.renderer.render(this.scene, this.camera)
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
  break
  default:
    window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}