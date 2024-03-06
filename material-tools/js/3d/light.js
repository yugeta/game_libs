import * as THREE      from "three"
import { Elements }    from "../system/elements.js"
import { Common }      from "../system/common.js"
import { Data }        from "../system/data.js"
import { Render }      from "../3d/render.js"
import { Camera }      from "../3d/camera.js"
import { Select }      from "../3d/select.js"

export class Light{

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

  plane        = new THREE.Plane()
  raycaster    = new THREE.Raycaster()
  vector       = new THREE.Vector2()
  offset       = new THREE.Vector3()
  intersection = new THREE.Vector3()

  constructor(){
    this.set_light()
    this.view_light()
    this.view_light_line()
    this.set_event()
    Light.toggle()
  }

  set_light(){
    const color = Common.color(Data.setting.light.color)
    Data.setting.light.obj = new THREE.DirectionalLight(color, 5)
    Data.setting.light.obj.position.set(Data.setting.light.pos.x, Data.setting.light.pos.y, Data.setting.light.pos.z).normalize()
    Render.scene.add(Data.setting.light.obj)
  }

  view_light(){
    const geometry = new THREE.SphereGeometry(Data.setting.light.size, Data.setting.light.segment, Data.setting.light.segment)
    const material = new THREE.MeshBasicMaterial({
      color   : Common.color(Data.setting.light.color),
      opacity : Data.setting.light.opacity,
      transparent: true,
    })
    const sphere   = new THREE.Mesh(geometry, material)
    sphere.position.set(Data.setting.light.pos.x, Data.setting.light.pos.y, Data.setting.light.pos.z)
    sphere.name = Data.setting.light.name
    Render.scene.add(sphere)
  }
  view_light_line(){
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Data.setting.light.pos.x, Data.setting.light.pos.y, Data.setting.light.pos.z),
    ]
    const color = Common.color(Data.setting.light.color)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color   : color,
      opacity : Data.setting.light.opacity,
      transparent: true,
    })
    const line = new THREE.Line(geometry, material)
    line.name = Data.setting.light.line_name
    Render.scene.add(line)  }

  

  set_event(){
    Elements.screen.addEventListener('mousedown', this.mousedown.bind(this))
    Elements.screen.addEventListener('mousemove', this.mousemove.bind(this))
    Elements.screen.addEventListener('mouseup'  , this.mouseup.bind(this))
    Elements.light.addEventListener("change"      , (()=>{Light.toggle()}))
  }



  mousedown(e){
    const mouse = this.mouse.calc({x : e.clientX, y : e.clientY})
    this.vector = new THREE.Vector2(mouse.x, mouse.y)

    this.raycaster.setFromCamera(this.vector, Camera.obj)
    const intersects = this.raycaster.intersectObjects(Render.scene.children)
    if(!intersects.length){return}
    Camera.obj.getWorldDirection(this.plane.normal) // 平面の角度をカメラの向きに対して垂直に維持する(plane.normalにカメラの方向ベクトルを設定)

    if(intersects[0].object.name === Data.setting.light.name){
      Camera.control.enabled = false // ライトクリックして移動させる場合は、画面操作を無効にする。
      this.mouse.drag = intersects[0].object
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)){ // rayとplaneの交点を求めてintersectionに設定
        this.offset.copy(this.intersection).sub(this.mouse.drag.position) // ドラッグ中のオブジェクトとplaneの距離
      }

      // edgeの表示
      Select.view(Light.sphere, Data.setting.light.pos)
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
      Select.position(Data.setting.light.pos)
    }
  }

  mouseup(){
    // light-direct
    const light_sphere = Light.sphere
    if(this.mouse.drag){
      light_sphere.material.color = Common.color(Data.setting.light.color)
      light_sphere.flg = false
      Camera.control.enabled = true
      this.mouse.drag = null
      // edgeの削除
      Select.clear()
    }
  }

  static get sphere(){
    return Render.scene.children.find(e => e.name === Data.setting.light.name)
  }
  static get sphere_line(){
    return Render.scene.children.find(e => e.name === Data.setting.light.line_name)
  }

  static set_direct_pos(pos){
    Data.setting.light.pos.x = pos.x
    Data.setting.light.pos.y = pos.y
    Data.setting.light.pos.z = pos.z
    Data.setting.light.obj.position.x = pos.x
    Data.setting.light.obj.position.y = pos.y
    Data.setting.light.obj.position.z = pos.z
    this.set_line_pos()
  }

  static get line(){
    return Render.scene.children.find(e => e.name === Data.setting.light.line_name)
  }
  static set_line_pos(){ 
    const line = Light.line
    const line_position = line.geometry.getAttribute("position")
    line_position.setXYZ(1, Data.setting.light.pos.x, Data.setting.light.pos.y, Data.setting.light.pos.z)
    line_position.needsUpdate = true;
  }

  static toggle(){
    const flg = Elements.light.checked
    if(flg){
      Light.sphere.material.opacity = Data.setting.light.opacity
      Light.sphere_line.material.opacity = Data.setting.light.opacity
    }
    else{
      Light.sphere.material.opacity = 0
      Light.sphere_line.material.opacity = 0
    }
  }
}