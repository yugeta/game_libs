import * as THREE      from "three"
import { GLTFLoader }  from "GLTFLoader"
import { DRACOLoader } from "DRACOLoader"
import { Data }        from "../system/data.js"
import { Elements }    from "../system/elements.js"
import { Render }      from "../3d/render.js"

export class Model{
  constructor(file){
    this.promise = new Promise((resolve , reject) => {
      this.resolve = resolve
      this.reject  = reject
      this.loader  = new GLTFLoader()
      this.file_load(file)
      this.set_event()
    })
  }

  set_event(){
    Elements.wire.addEventListener("click"    , ((e)=>{this.click_wire(Elements.wire.checked)}))
  }

  file_load(file){
    const read  = new FileReader();
    read.onload = this.file_loaded.bind(this)
    read.readAsArrayBuffer(file)
  }

  file_loaded(e){
    const data = e.target.result
    const buf = new Uint8Array(data);
    const blob = new Blob([buf], {type: "model/gltf-binary"})
    const url = URL.createObjectURL(blob)
    this.model_load(url)
  }

  model_load(url){
    this.loader.setCrossOrigin('anonymous') // r84 以降は明示的に setCrossOrigin() を指定する必要がある
    this.loader.setDRACOLoader( new DRACOLoader() )
    this.loader.load(
      url,
      this.model_loaded.bind(this),
      function(xhr){console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )},
      function(error){console.log( 'An error happened' )}
    )
  }

  model_loaded(gltf){
    //console.log(gltf)
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
    this.click_wire(Elements.wire.checked)

    // console.log(mesh.children[0].children[1].material.map)
    // // mesh.children[0].children[1].material.map.matrix.elements[6] = 1.0
    // mesh.children[0].children[1].children[1].material.map.offset.x = 0.5
    mesh.traverse(object => {
      // Mesh
      if(object.isMesh){
        if(object.material.map
        && object.material.map.isTexture){
          console.log(object)
          // console.log(object.material.map)
          // object.material.map.offset.x += 0.5
          // object.material.map.offset.y += 0.5

          this.anim(object)

          // const name = object.name
          // let duration = 1000
          // let times = [0, duration / 2, duration],
          //     values = [0,0, .5,.5, 0,0]
          // let trackName = `${name}.material.map.offset`

          // // let track = new THREE.VectorKeyframeTrack(trackName, times, values)
          // let track = new THREE.VectorKeyframeTrack(trackName, times, values)

          // let clip = new THREE.AnimationClip('material_animation_name', duration, [track])

          // let mixer = new THREE.AnimationMixer(object)
          // mixer.clipAction(clip).play()
        }
        // if(object.material.map.isTexture){
        //   // console.log(object)
        // }
      }
      if(object.isGroup){
        // console.log("Group: ",object)
      }
    })
    this.finish()
  }

  anim(object){
    object.material.map.offset.x += 0.01
    object.material.map.offset.y += 0.01

    setTimeout(this.anim.bind(this,object) , 100)
  }

  // ワイヤーフレーム化(戻す)
  click_wire(flg){
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

  finish(){
    this.view_lists()
    this.resolve()
  }

  view_lists(){
    this.view_list(Data.mesh)
  }
  view_list(lists){
    for(const mesh of Data.mesh){
      mesh.traverse(object => {
        if(object.isMesh){
          if(object.material.map
          && object.material.map.isTexture){
            console.log(object)
          }
        }
        else if(object.isGroup){
          console.log("Group: ",object)
        }

        if(object.children){
          // this.view_list(object.children)
        }
      })
    }
  }
}