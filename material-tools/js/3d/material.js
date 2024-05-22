import { Data } from "../system/data.js"

export class Material{
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
    console.log(Data.setting.material_animations)
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
            this.anim_scroll(object, data)
          break
        }
        
      }
    }
  }

  static anim_scroll(object, data){
    object.material.map.offset.x += data.direction.x
    object.material.map.offset.y += data.direction.y
  }
}