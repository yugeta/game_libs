import { Model }         from "../3d/model.js"
import { Camera }        from "../3d/camera.js"
import { Light }         from "../3d/light.js"

export class Header{
  get elm_import_file(){
    return document.getElementById("import")
  }
  elm_grid_button   = document.querySelector(`[name="grid"]`)
  elm_wire_button   = document.querySelector(`[name="wire"]`)
  elm_light_ambient = document.querySelector(`[name="ambient"]`)

  constructor(){
    this.control()
    this.set_event()
  }

  control(){
    this.elm_import_file.addEventListener("change"   , ((e)=> new Model(e)))
    this.elm_grid_button.addEventListener("click"    , ((e)=> Camera.click_grid(e)))
    this.elm_wire_button.addEventListener("click"    , ((e)=> Model.click_wire(e.target.checked)))
    this.elm_light_ambient.addEventListener("change" , ((e)=> Light.change_ambient(e.target.value)))
  }

  set_event(){
    window.addEventListener("click" , this.click.bind(this))
  }

  click(e){

    if(e.pointerId !== 1){return}

    const elm = e.target.closest(`#control ul li`)
    
    if(elm){
      // if(e.target.closest(`#control ul li label`)){
        const input = elm.querySelector(`input.sub-menu`)
        // console.log(input)
        // if(input && input.checked === true){
        //   // console.log(input.checked)
        //   // input.checked = false
        // }
        this.close_menus(input)
      // }
    }
    else{
      this.close_menus()
    }
  }

  close_menus(exlusion_input){
    const menus_inputs = document.querySelectorAll(`#control input.sub-menu`)
    for(const menus_input of menus_inputs){
      if(exlusion_input && exlusion_input === menus_input){continue}
      menus_input.checked = false
    }
  }

}