import * as THREE         from "three"
import { GLTFLoader }     from "GLTFLoader"
import { DRACOLoader }    from "DRACOLoader"
import { Data }           from "../system/data.js"
import { Elements }       from "../system/elements.js"
import { Render }         from "../3d/render.js"
import { ModelList }      from "../3d/model_list.js"
import { Material }       from "../3d/material.js"
import { Outline }        from "../3d/outline.js"

// import { EffectComposer } from "EffectComposer"
// import { RenderPass }     from "RenderPass"
// import { GlitchPass }     from "GlitchPass"
// import { OutputPass }     from "OutputPass"

export class Model{
  constructor(file){
    this.file = file
    this.promise = new Promise((resolve , reject) => {
      this.resolve = resolve
      this.reject  = reject
      this.loader  = new GLTFLoader()
      this.file_load(file)
      this.set_event()
    })
  }

  get ext(){
    return this.file.name.split(".").pop()
  }

  set_event(){
    Elements.wire.addEventListener("click"    , ((e)=>{this.toggle_wire(Elements.wire.checked)}))
  }

  file_load(file){
    const read  = new FileReader();
    read.onload = this.file_loaded.bind(this)
    read.readAsArrayBuffer(file)
  }

  file_loaded(e){
    const data = e.target.result
    const buf  = new Uint8Array(data);

    let blob = null
    switch(this.ext){
      case "dat":
        blob = new Blob([buf], {type: "octet/stream"})
        this.model_dat_load(URL.createObjectURL(blob))
      break

      case "glb":
        blob = new Blob([buf], {type: "model/gltf-binary"})
        this.model_load(URL.createObjectURL(blob))
      break
    }

    // 保存用データ格納
    Data.files.push({
      name   : this.file.name,
      // data   : data,
      buffer : buf,
      // blob   : blob,
      // file : this.file,
    })
  }

  model_load(url){
    this.loader.setCrossOrigin('anonymous') // r84 以降は明示的に setCrossOrigin() を指定する必要がある
    this.loader.setDRACOLoader( new DRACOLoader() )
    this.loader.load(
      url,
      this.model_loaded.bind(this),
      function(xhr){
        // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
      },
      function(error){console.log( 'An error happened' )},
    )
  }

  model_loaded(gltf){
    // console.log(gltf)
    Data.model_lists = new ModelList(gltf)

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
    this.toggle_wire(Elements.wire.checked)

    mesh.traverse(object => {
      // Mesh
      if(object.isMesh){
        if(object.material.map
        && object.material.map.isTexture){
          Data.objects.push(object)
        }
      }
      if(object.isGroup){
        // console.log("Group: ",object)
      }
    })

    new Material()

    this.finish()
  }

  model_dat_load(url){
    this.loader.setCrossOrigin('anonymous') // r84 以降は明示的に setCrossOrigin() を指定する必要がある
    this.loader.setDRACOLoader( new DRACOLoader() )
    this.loader.load(
      url,
      this.model_dat_loaded.bind(this),
      function(xhr){console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )},
      function(error){console.log( 'An error happened' )}
    )
  }
  model_dat_loaded(models){
    Data.model_lists = new ModelList(gltf)

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
    this.toggle_wire(Elements.wire.checked)
    mesh.traverse(object => {
      // Mesh
      if(object.isMesh){
        if(object.material.map
        && object.material.map.isTexture){
          // this.anim(object)
          Data.material_animations.push(object)
        }
      }
      if(object.isGroup){
      }
    })
    this.finish()
  }

  // ワイヤーフレーム化(or 戻す)
  toggle_wire(flg){
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

  // model-panelからObject(model)を選択した時の処理
  static selected(model){
    if(!model){return}
    for(const obj of Data.mesh){
      obj.traverse((mesh) => {
        if(mesh.uuid === model.uuid){
          new Outline(mesh)
        }
        else{
          Outline.clear(mesh)
        }
      })
    }
  }

  finish(){
    this.resolve()
  }
}