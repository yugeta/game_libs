import * as THREE      from "three"
import { Render } from "./render.js"

export class Select{
  static edge = null

  static view(object, pos){
    if(Select.edge){
      Select.clear(object)
    }
    const geometry = new THREE.EdgesGeometry(object.geometry)
    const material = new THREE.LineBasicMaterial({color: 0xffff00})
    const edge     = new THREE.LineSegments(geometry, material)
    Select.edge = edge
    Select.position(pos)
    Render.scene.add(edge)
  }

  static position(pos){
    if(!Select.edge){return}
    Select.edge.position.x = pos.x
    Select.edge.position.y = pos.y
    Select.edge.position.z = pos.z
  }

  static clear(object){
    if(!Select.edge){return}
    Render.scene.remove(Select.edge)
    Select.edge = null
  }
}