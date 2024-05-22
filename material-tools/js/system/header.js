import { Import }     from "../system/header/import.js"
import { Export }     from "../system/header/export.js"
import { Camera }     from "../3d/camera.js"
import { Elements }   from "../system/elements.js"

/**
 * Header
 * - 上部メニュー操作のイベント処理
 * 
 */

export class Header{
  get elm_import_file(){
    return document.getElementById("import")
  }
  get elm_export(){
    return document.querySelector(".export")
  }

  constructor(){
    this.set_event()
  }

  set_event(){
    Elements.menu_new.addEventListener("click" , this.click_new.bind(this))
    window.addEventListener("click" , this.click_header.bind(this))
    const header_menus = document.querySelectorAll(`header > ul > li`)
    for(const header_menu of header_menus){
      header_menu.addEventListener("mouseover" , this.mouseover_header.bind(this))
    }

    // import
    this.elm_import_file.addEventListener("change"  , this.model_import.bind(this))

    // export
    this.elm_export.addEventListener("click"  , this.model_export.bind(this))
    // this.elm_export.onclick = this.model_export.bind(this)

    // 
    Elements.models.addEventListener("mouseover" , this.models_scroll_on.bind(this))
    Elements.models.addEventListener("mouseout"  , this.models_scroll_off.bind(this))
    Elements.materials.addEventListener("mouseover" , this.models_scroll_on.bind(this))
    Elements.materials.addEventListener("mouseout"  , this.models_scroll_off.bind(this))
    Elements.models_resize.addEventListener("mouseover" , this.models_scroll_on.bind(this))
    Elements.models_resize.addEventListener("mouseout"  , this.models_scroll_off.bind(this))
    Elements.models_resize.addEventListener("mousedown" , this.models_resize_down.bind(this))
    Elements.models_resize.addEventListener("mousemove" , this.models_resize_move.bind(this))
    Elements.models_resize.addEventListener("mouseup"   , this.models_resize_up.bind(this))
  }

  click_new(){
    location.reload()
  }

  // import file
  model_import(e){
    // for(const file of e.target.files){
    //   new Model(file)
    // }
    new Import(e.target.files)
  }

  // export (download)
  model_export(e){
    new Export()
    this.close_menus()
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

  models_scroll_on(){
    Camera.control.enabled = false
  }
  models_scroll_off(){
    Camera.control.enabled = true
  }
  models_resize_down(e){

  }
  models_resize_move(e){

  }
  models_resize_up(e){

  }

}