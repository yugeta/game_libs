import { Data }          from "../system/data.js"
import { Elements }      from "../system/elements.js"
import { MaterialPanel } from "../system/material_panel.js"
import { Model }         from "../3d/model.js"

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
    const model = Data.model_lists.get_model(uuid)
		Model.selected(model)
    Data.materials = new MaterialPanel(model)

		// 項目選択(解除)
		const li_arr = elm.parentNode.querySelectorAll(`li`)
		for(const li of li_arr){
			if(li === elm){
				li.setAttribute("data-status" , "select")
			}
			else if(li.hasAttribute("data-status")){
				li.removeAttribute("data-status")
			}
		}
	}

  click_materials(e){console.log(e.target)
    if(!Data.materials){return}
    const elm = e.target.closest(`li[data-uuid]`)
		if(!elm){return}
    Data.materials.click(e)

		// 項目選択(解除)
		const li_arr = elm.parentNode.querySelectorAll(`li`)
		for(const li of li_arr){
			if(li === elm){
				li.setAttribute("data-status" , "select")
			}
			else if(li.hasAttribute("data-status")){
				li.removeAttribute("data-status")
			}
		}
  }

	resize_window(){
		Data.render.set_screen()
		Data.camera.resize()
	}
}