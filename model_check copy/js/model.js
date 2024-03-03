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
  }

  anim(object){
    object.material.map.offset.x += 0.01
    object.material.map.offset.y += 0.01

    setTimeout(this.anim.bind(this,object) , 100)
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