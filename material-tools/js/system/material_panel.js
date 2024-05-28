import { Data }      from "../system/data.js"
import { Elements }  from "../system/elements.js"

export class MaterialPanel{
  constructor(model){
    this.model = model
    // console.log(model)
    MaterialPanel.clear()
    this.view_list()
  }

  get lists(){
    if(!this.model || !this.model.children){return}
    const material_datas = []
    for(const children of this.model.children){
      if(children.isOutline){continue}
      if(children.material){
        material_datas.push(children.material)
      }
    }
    return material_datas
  }

  static clear(){
    Elements.materials.innerHTML = ""
  }

  view_list(){
    const lists = this.lists
    if(!lists){return}
    let num = 1
    for(const list of lists){
      const li = document.createElement("li")
      li.setAttribute("data-uuid", list.uuid)
      li.setAttribute("data-name", list.name)
      li.textContent = `${num} : ${list.name}`
      Elements.materials.appendChild(li)
      num++
    }
  }

  // click(e){
  //   console.log(e)

  // }
}