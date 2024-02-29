import * as THREE      from "three"
import { DRACOLoader } from "DRACOLoader"
import { Data }        from "./data.js"
import { Render }      from "./render.js"

export class Model{
  constructor(e){
    this.read(e.target.files[0])
  }

  read(file){
    const read  = new FileReader();
    read.onload = this.readed.bind(this)
    read.readAsArrayBuffer(file)
  }

  readed(e){
    const data = e.target.result
    const buf = new Uint8Array(data);
    const blob = new Blob([buf], {type: "model/gltf-binary"})
    const url = URL.createObjectURL(blob)
    // new Glb({
    //   type : "glb_data",
    //   url  : url,
    // })
    this.load(url)
  }

  load(url){
    Data.loader.setCrossOrigin( 'anonymous' ) // r84 以降は明示的に setCrossOrigin() を指定する必要がある
    Data.loader.setDRACOLoader( new DRACOLoader() )
    Data.loader.load(
      url,
      this.loaded.bind(this),
      function(xhr){console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )},
      function(error){console.log( 'An error happened' )}
    )
  }

  loaded(gltf){console.log(gltf)
    const mesh = gltf.scene

    // transform
    mesh.scale.set(
      Data.object_scale,
      Data.object_scale,
      Data.object_scale
    )
    mesh.rotation.set(
      0,0,0
    )
    mesh.position.set(
      Data.object_pos.x,
      Data.object_pos.y,
      Data.object_pos.z,
    )

    const animations = gltf.animations
    if ( animations && animations.length ) {
      Data.mixer = new THREE.AnimationMixer(mesh)
      for(const animation of animations){
        Data.mixer.clipAction(animation).play()
      }
    }
    Render.scene.add(mesh)
    Data.mesh.push(mesh)
    Model.click_wire(Data.elm_wire_button.checked)
  }

  // ワイヤーフレーム化(戻す)
  static click_wire(flg){
    for(const obj of Data.mesh){
      obj.traverse((obj3d) => {
        if(obj3d.material){
          obj3d.material.wireframe = flg
        }
        if(Array.isArray(obj3d.material)){
          obj3d.material.forEach(function(mat, idx){
            mat.wireframe = flg
          })
        }
      })
    }
  }
}