import { Data } from "../system/data.js"

export class Material{
  static current_name = null

  constructor(options){//console.log(options,Data.setting.material_animations)
    this.options = options
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.init()
    })
    
  }

  init(){
    if(Data.setting && Data.setting.material_animations){
      this.data_set(Data.setting.material_animations)
    }
    this.finish()
  }

  data_set(setting_datas=[]){
    // console.log(Data.objects)
    for(const data of setting_datas){
      // console.log(data)
      const meshes = this.get_mesh(data)
      if(!data.objects){
        data.objects = []
      }
      // console.log(data,mesh)
      data.objects = data.objects.concat(meshes)
      // if(this.options.model){
      //   console.log(this.options.model)
      // }
    }
    // console.log(Data.setting.material_animations)
  }

  get_mesh(setting_data){
    if(setting_data.model && setting_data.material){
      const mesh = Data.objects.find(e => e.parent.name === setting_data.model && e.material.name === setting_data.material)
      return [mesh]
    }
    else if(setting_data.material){
      const meshes = Data.objects.filter(e => e.material.name === setting_data.material)
      return meshes
    }
    
  }

  finish(){
    this.resolve()
  }

  static animation(){
    for(const data of Data.setting.material_animations){
      if(!data.objects || !data.objects.length){continue}
      for(const object of data.objects){
        switch(data.type){
          case "scroll":
            Material.anim_scroll(object, data)
          break
        }
        
      }
    }
  }

  static anim_scroll(object, data){
    object.material.map.offset.x += data.direction.x
    object.material.map.offset.y += data.direction.y
  }

  static select(name){
    for(const mesh of Data.mesh){
      mesh.traverse((model) => {
        if(!model.isMesh){return}
        if(!model.material || model.material.name !== name){return}
        model.material.isSelect = true
// console.log(model)

        // model.material.flatShading = true
        model.material.color_backup = {
          r: model.material.color.r,
          g: model.material.color.g,
          b: model.material.color.b,
        }

        const color = {
          r:0.2,
          g:0.2,
          b:0.2,
        }
        model.material.color.r = color.r
        model.material.color.g = color.g
        model.material.color.b = color.b

        // 半透明にする
        model.material.transparent = true
        model.material.alphaToCoverage = true
        model.material.opacity = 0.8
      })
    }
    Material.current_name = name
  }

  static unselect_all(){
    for(const mesh of Data.mesh){
      mesh.traverse((model) => {
        if(!model.isMesh){return}
        if(!model.material || !model.material.isSelect){return}
        model.material.isSelect = false

        
        model.material.color.r = model.material.color_backup.r
        model.material.color.g = model.material.color_backup.g
        model.material.color.b = model.material.color_backup.b

        // 半透明を戻す
        model.material.transparent = false
        model.material.alphaToCoverage = false
        model.material.opacity = 1.0


      })
    }
  }
}