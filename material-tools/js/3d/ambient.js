import * as THREE      from "three"
import { Elements }    from "../system/elements.js"
import { Common }      from "../system/common.js"
import { Data }        from "../system/data.js"
import { Render }      from "../3d/render.js"

export class Ambient{
	constructor(){
		Elements.ambient.value = Data.setting.ambient.color
		this.set_ambient()
		this.set_event()
	}

	set_ambient(){
    const color = Common.color(Elements.ambient.value)
    Data.setting.ambient.obj = new THREE.AmbientLight(color , Data.setting.ambient.intensity)
    Render.scene.add(Data.setting.ambient.obj)
  }

	set_event(){
		Elements.ambient.addEventListener("change" , ((e)=> this.change_ambient(e.target.value)))
	}

	change_ambient(color , intensity){
    color     = color || Data.setting.ambient.color
    intensity = intensity || Data.setting.ambient.intensity
    Data.setting.ambient.obj.color     = Common.color(color)
    Data.setting.ambient.obj.intensity = intensity
  }
}