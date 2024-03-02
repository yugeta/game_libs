import * as THREE      from "three"
import { DRACOLoader } from "DRACOLoader"
import { Data }        from "./data.js"
import { Render }      from "./render.js"

export class Model{
  constructor(e){console.log(Data.loader)
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
    // const blob = new Blob([buf], {type: "application/octet-stream"})
    const url = URL.createObjectURL(blob)
    this.load(url)
  }

  load(url){
    Data.loader.setCrossOrigin( 'anonymous' ) // r84 以降は明示的に setCrossOrigin() を指定する必要がある
    // Data.loader.setDRACOLoader( new DRACOLoader() )
    // Data.loader.load(
    //   url,
    //   (object => {
    //     object.scale.set(1, 1, 1)
    //     //シーン内の特定のオブジェクトのアニメーション用のプレーヤー(アニメーションの調整)
    //     const mixer = new THREE.AnimationMixer( object );
        
    //     //Animation Actionを生成
    //     const action = mixer.clipAction( object.animations[ 0 ] );

    //     //ループ設定（1回のみ）
    //     //action.setLoop(THREE.LoopOnce);

    //     //アニメーションを再生する
    //     action.play();

    //     //オブジェクトとすべての子孫に対してコールバックを実行
    //     object.traverse((child)=>{
    //         //影を落とすメッシュに対して、Shadowプロパティーを有効
    //         if(child.isMesh){
    //             child.castShadow = true;
    //             child.receiveShadow = true;
    //         }
    //     });
    //     Render.scene.add( object );
    //   })
    // )
    Data.loader.load(
      url,
      this.loaded.bind(this),
      function(xhr){console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )},
      function(error){console.log( 'An error happened',error )}
    )
  }

  loaded(object){
    console.log(object)
    // const mesh = object.scene
    // console.log(Data.object_scale)

    // transform
    object.scale.set(
      Data.object_scale,
      Data.object_scale,
      Data.object_scale
    )

    // object.rotation.set(
    //   0,0,0
    // )

    // const mixer = new THREE.AnimationMixer(object)
    // const action = mixer.clipAction(object.animations[0])
    // action.play()

    Render.scene.add(object)

    // object.traverse((child)=>{
    //   //影を落とすメッシュに対して、Shadowプロパティーを有効
    //   if(child.isMesh){
    //     child.castShadow = true
    //     child.receiveShadow = true
    //   }
    // })


    // object.position.set(
    //   Data.object_pos.x,
    //   Data.object_pos.y,
    //   Data.object_pos.z,
    // )

    // const animations = object.animations
    // if ( animations && animations.length ) {
    //   Data.mixer = new THREE.AnimationMixer(object)
    //   for(const animation of animations){
    //     Data.mixer.clipAction(animation).play()
    //   }
    // }
    // Render.scene.add(object)
    // Data.mesh.push(object)
    // Model.click_wire(Data.elm_wire_button.checked)
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