import { Data }      from "../system/data.js"
import { Elements }  from "../system/elements.js"
import { MaterialPanel } from "../system/material_panel.js"

export class Event{
  constructor(){
    if(Elements.models){
			Elements.models.addEventListener("click" , this.click_models.bind(this))
		}

    if(Elements.materials){
			Elements.materials.addEventListener("click" , this.click_materials.bind(this))
		}
		window.addEventListener("resize" , this.resize_window.bind(this))
  }

	click_models(e){
		const elm = e.target.closest(`li[data-uuid]`)
		if(!elm){return}
		const uuid = elm.getAttribute("data-uuid")
		if(!uuid){return}
		// const model = Data.mesh.find(e => e.uuid === uuid)
    const model = Data.model_lists.get_model(uuid)
		// console.log(Data.mesh,model,uuid)

    Data.materials = new MaterialPanel(model)
		// if(!model){return}
		// console.log(model)
    
	}

  click_materials(e){console.log(e.target)
    if(!Data.materials){return}
    const elm = e.target.closest(`li[data-uuid]`)
		if(!elm){return}
    Data.materials.click(e)
  }

	resize_window(){
		Data.render.set_screen()
		Data.camera.resize()
	}
}