import { Model }  from "../3d/model.js"
import { Camera } from "../3d/camera.js"
import { Light }  from "../3d/light.js"
import { Grid }   from "../3d/grid.js"

export class Header{
  get elm_import_file(){
    return document.getElementById("import")
  }
  elm_grid_button   = document.querySelector(`[name="grid"]`)
  elm_wire_button   = document.querySelector(`[name="wire"]`)
  elm_light_ambient = document.querySelector(`[name="ambient"]`)

  constructor(){
    this.set_event()
    this.control()
  }

  set_event(){
    window.addEventListener("click" , this.click_header.bind(this))
    const header_menus = document.querySelectorAll(`header > ul > li`)
    for(const header_menu of header_menus){
      header_menu.addEventListener("mouseover" , this.mouseover_header.bind(this))
    }
  }

  control(){
    this.elm_import_file.addEventListener("change"   , this.model_import.bind(this))
    this.elm_grid_button.addEventListener("click"    , this.click_grid.bind(this))
    this.elm_wire_button.addEventListener("click"    , ((e)=> Model.click_wire(e.target.checked)))
    this.elm_light_ambient.addEventListener("change" , ((e)=> Light.change_ambient(e.target.value)))
  }

  click_grid(){
    Grid.toggle()
  }

  model_import(e){
    for(const file of e.target.files){
      new Model(file)
    }
  }

  click_header(e){
    const target = e.target
    const li     = target.closest(`header > ul li`)
    this.header_menu_toggle(li)
    this.header_menu_toggle_flg = li && li.hasAttribute("data-open") ? true : false
  }

  mouseover_header(e){
    if(this.header_menu_toggle_flg !== true){return}
    const target = e.target
    const li     = target.closest(`header > ul > li`)
    if(!li || li.hasAttribute("data-open")){return}
    this.header_menu_toggle(li)
  }

  header_menu_toggle(li){
    if(li){
      li.toggleAttribute("data-open")
      this.close_menus(li)
    }
    else{
      this.close_menus()
    }
  }

  close_menus(exlusion_li){
    const li_arr = document.querySelectorAll(`header ul.lists li`)
    for(const li of li_arr){
      if(exlusion_li && exlusion_li === li){continue}
      if(!li.hasAttribute("data-open")){continue}
      if(this.include_element(li, exlusion_li)){continue}
      li.removeAttribute("data-open")
    }
  }

  include_element(parent_elm , target_elm){
    const li_arr = parent_elm.querySelectorAll(`li`)
    for(const li of li_arr){
      if(li === target_elm){return true}
    }
  }

}