import * as THREE      from "three"
import { Elements }    from "../system/elements.js"
import { Common }      from "../system/common.js"
import { Render }      from "../3d/render.js"
import { Camera }      from "../3d/camera.js"
import { Select }      from "../3d/select.js"

export class Light{

  static ambient = {
    obj   : null,
    color : "#ffffff",
    elm   : document.querySelector(`input[name="ambient"]`),
    intensity : 1.0,
  }
  static direct = {
    name  : "direct_light",
    obj   : null,
    color : "#FFFFFF",
    color_select : "#FF0000",
    pos   : {
      x : 5,
      y : 7,
      z : 5,
    },
    segment: 8,
    size : 0.3,
    line_name : "direct-light-line",
  }

  mouse = {
    vector : new THREE.Vector2(),
    pos : {
      x : null,
      y : null,
      z : null,
    },
    drag : null,
    calc : ((pos)=>{
      const x = pos.x - Elements.screen.offsetLeft
      const y = pos.y - Elements.screen.offsetTop
      const w = Elements.screen.offsetWidth
      const h = Elements.screen.offsetHeight
      return {
        x :  (x / w) * 2 - 1,
        y : -(y / h) * 2 + 1,
      }
    })
  }

  // target_name = "direct_light"
  // target_name = "direct-light-line"

  plane        = new THREE.Plane()
  raycaster    = new THREE.Raycaster()
  vector       = new THREE.Vector2()
  offset       = new THREE.Vector3()
  intersection = new THREE.Vector3()

  constructor(){
    Elements.ambient.value = Light.ambient.color

    this.set_ambient()
    this.set_light()
    this.view_light()
    this.view_light_line()
    this.set_event()
  }

  set_ambient(){
    const color = Common.color(Elements.ambient.value)
    Light.ambient.obj = new THREE.AmbientLight(color , Light.ambient.intensity)
    Render.scene.add(Light.ambient.obj)
  }

  set_light(){
    const color = Common.color(Light.direct.color)
    Light.direct.obj = new THREE.DirectionalLight(color, 5)
    Light.direct.obj.position.set( Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z ).normalize()
    Render.scene.add(Light.direct.obj)
  }

  view_light(){
    const geometry = new THREE.SphereGeometry(Light.direct.size, Light.direct.segment, Light.direct.segment)
    const material = new THREE.MeshBasicMaterial({
      color   : Common.color(Light.direct.color),
      opacity : 0.5,
      transparent: true,
    })
    const sphere   = new THREE.Mesh(geometry, material)
    sphere.position.set(Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z)
    sphere.name = Light.direct.name
    Render.scene.add(sphere)
  }
  view_light_line(){
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z),
    ]
    const color = Common.color(Light.direct.color)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color   : color,
      opacity : 0.5,
      transparent: true,
    })
    const line = new THREE.Line(geometry, material)
    line.name = Light.direct.line_name
    Render.scene.add(line)  }

  

  set_event(){
    Elements.screen.addEventListener('mousedown', this.mousedown.bind(this))
    Elements.screen.addEventListener('mousemove', this.mousemove.bind(this))
    Elements.screen.addEventListener('mouseup'  , this.mouseup.bind(this))
  }



  mousedown(e){
    const mouse = this.mouse.calc({x : e.clientX, y : e.clientY})
    this.vector = new THREE.Vector2(mouse.x, mouse.y)

    this.raycaster.setFromCamera(this.vector, Camera.obj)
    const intersects = this.raycaster.intersectObjects(Render.scene.children)
// console.log(intersects.map(e => e.object.name))
    if(!intersects.length){return}
    Camera.obj.getWorldDirection(this.plane.normal) // 平面の角度をカメラの向きに対して垂直に維持する(plane.normalにカメラの方向ベクトルを設定)

    if(intersects[0].object.name === Light.direct.name){
      Camera.control.enabled = false // ライトクリックして移動させる場合は、画面操作を無効にする。
      this.mouse.drag = intersects[0].object
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)){ // rayとplaneの交点を求めてintersectionに設定
        this.offset.copy(this.intersection).sub(this.mouse.drag.position) // ドラッグ中のオブジェクトとplaneの距離
      }

      // edgeの表示
      Select.view(Light.sphere, Light.direct.pos)
    }
  }

  mousemove(e){
    // mouse
    if(!this.mouse.drag){return}
    e.preventDefault()
    const mouse = this.mouse.calc({x : e.clientX, y : e.clientY})
    this.vector.x = mouse.x
    this.vector.y = mouse.y
    this.raycaster.setFromCamera(this.vector, Camera.obj)
    if(this.raycaster.ray.intersectPlane(this.plane, this.intersection)){ // rayとplaneの交点をintersectionに設定
      this.mouse.drag.position.copy(this.intersection.sub(this.offset)) // オブジェクトをplaneに対して平行に移動させる
      Light.set_direct_pos(this.mouse.drag.position)
      Select.position(Light.direct.pos)
    }
  }

  mouseup(){
    // light-direct
    const light_sphere = Light.sphere
    if(this.mouse.drag){
      light_sphere.material.color = Common.color(Light.direct.color)
      light_sphere.flg = false
      Camera.control.enabled = true
      this.mouse.drag = null
      // edgeの削除
      Select.clear()
    }
    
  }

  static change_ambient(color , intensity){
    color     = color || Light.ambient.color
    intensity = intensity || Light.ambient.intensity
    Light.ambient.obj.color     = Common.color(color)
    Light.ambient.obj.intensity = intensity
  }

  static get sphere(){
    return Render.scene.children.find(e => e.name === Light.direct.name)
  }

  static set_direct_pos(pos){
    Light.direct.pos.x = pos.x
    Light.direct.pos.y = pos.y
    Light.direct.pos.z = pos.z
    Light.direct.obj.position.x = pos.x
    Light.direct.obj.position.y = pos.y
    Light.direct.obj.position.z = pos.z
    this.set_line_pos()
  }

  static get line(){
    return Render.scene.children.find(e => e.name === Light.direct.line_name)
  }
  static set_line_pos(){ 
    const line = Light.line
    const line_position = line.geometry.getAttribute("position")
    line_position.setXYZ(1, Light.direct.pos.x, Light.direct.pos.y, Light.direct.pos.z)
    line_position.needsUpdate = true;
  }

}