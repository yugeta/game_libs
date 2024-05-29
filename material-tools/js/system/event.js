import { Data }          from "../system/data.js"
import { Elements }      from "../system/elements.js"
import { MaterialPanel } from "../system/material_panel.js"
import { Model }         from "../3d/model.js"
import { Outline }       from "../3d/outline.js"
import { Material }      from "../3d/material.js"
import { Setting }       from "../system/setting.js"

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
		Material.unselect_all()
		MaterialPanel.clear()

		// 同じモデルの場合は選択キャンセル
		if(uuid === Outline.current_uuid){
			elm.removeAttribute("data-status")
			Outline.clear(model)
			Outline.current_uuid = null
			return
		}

		Model.selected(model)
		// material-list表示
    new MaterialPanel(model)

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

  click_materials(e){
    // if(!Data.materials){return}
    const elm = e.target.closest(`li[data-uuid]`)
		if(!elm){return}
		// const model_uuid    = document.querySelector(`.models .lists li[data-status="select"]`).getAttribute("data-uuid")
		const material_name = elm.getAttribute("data-name")
    // Data.materials.click(e)

		Material.unselect_all()
		if(Material.current_name === material_name){
			const li_arr = elm.parentNode.querySelectorAll(`li`)
			for(const li of li_arr){
				if(li.hasAttribute("data-status")){
					li.removeAttribute("data-status")
				}
			}
			Material.current_name = null
			Setting.clear()
			return
		}
		Material.select(material_name)

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

		new Setting("material")
  }

	resize_window(){
		Data.render.set_screen()
		Data.camera.resize()
	}
}