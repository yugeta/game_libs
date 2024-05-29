import * as THREE         from "three"
import { Camera }         from "../3d/camera.js"
import { Render }         from "../3d/render.js"

export class Outline{
  static scene    = null
  static renderer = null
  static model    = null
  static gl       = null
  static current_uuid  = null

  constructor(model){
    if(model.uuid === Outline.current_uuid){return}
    model.traverse((child) => {
      if(child.isMesh) {
        const outlineMesh = new THREE.Mesh(child.geometry, this.shaderMaterial)
        outlineMesh.isOutline = true
        outlineMesh.position.copy(child.position)
        outlineMesh.rotation.copy(child.rotation)
        outlineMesh.scale.copy(child.scale).multiplyScalar(1.05)  // オブジェクトを少し拡大してアウトラインを作成
        model.add(outlineMesh)
      }
    })
    Outline.current_uuid = model.uuid
  }

  // シェーダーマテリアルの作成
  get shaderMaterial(){
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.95 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 6.0);
          gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide
    })
  }

  static clear(model){
    for (let i = model.children.length-1; i>=0; i--){
      if (model.children[i].isOutline) {
        model.remove(model.children[i])
      }
    }
    // Outline.current_uuid = null
  }
}