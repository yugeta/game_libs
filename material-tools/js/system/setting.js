import { Data }     from "../system/data.js"
import { Material } from "../3d/material.js"
import { Asset }    from "../../asset/js/asset.js"
import { Convert }  from "../../asset/js/convert.js"

export class Setting{
  constructor(type){
    if(!Setting.area){return}

    Setting.clear()

    switch(type){
      case "material":
        this.view_material()
      break
    }
  }

  static get area(){
    return document.querySelector(`#setting .setting-forms`)
  }

  static clear(){
    Setting.area.innerHTML = ""
  }

  /**
   * Material
   */

  view_material(){
    if(!Data.setting.material_animations){
      Data.setting.material_animations = []
    }

    const asset = Asset.datas.find(e => e.name === "setting/material.html")
    if(!asset){return}
    const material_name = Material.current_name

    const setting_data = Data.setting.material_animations.find(e => e.material === material_name) || {}
    const data = {
      material_name : material_name,
      type_scroll_checked : "checked",
      direction: setting_data.direction,
    }
    const html = new Convert(asset.value).double_bracket(data)
    Setting.area.insertAdjacentHTML("beforeend", html)

    this.set_event_material()
  }

  get form_direction_x(){
    return Setting.area.querySelector(`[name="direction_x"]`)
  }
  get form_direction_y(){
    return Setting.area.querySelector(`[name="direction_y"]`)
  }

  set_event_material(){
    this.form_direction_x.addEventListener("change" , this.change_direction.bind(this))
    this.form_direction_y.addEventListener("change" , this.change_direction.bind(this))
  }

  change_direction(){
    const material_name = Material.current_name
    if(!material_name){return}
    
    if(!Data.setting){
      Data.setting = {}
    }
    if(!Data.setting.material_animations){
      Data.setting.material_animations = []
    }
    // if(!Data.setting.material_animations.direction){
    //   Data.setting.material_animations.direction = {}
    // }

    const setting_data = Data.setting.material_animations.find(e => e.material === material_name) || {}
    if(!Object.keys(setting_data).length){
      Data.setting.material_animations.push(setting_data)
    }
    
    if(!setting_data.direction){
      setting_data.material  = material_name
      setting_data.type      = "scroll"
      setting_data.direction = {}
      setting_data.objects   = Material.get_mesh({material:material_name})
    }
    setting_data.direction.x = Number(this.form_direction_x.value)
    setting_data.direction.y = Number(this.form_direction_y.value)
    console.log(Data.setting.material_animations)
  }


}