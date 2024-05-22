import { Data }        from "../system/data.js"
import { Elements }    from "../system/elements.js"

export class ModelList{
  num = 0

  constructor(gltf){
    console.log(gltf)
    this.view_list(gltf.scenes)
  }

  view_list(lists){
    if(!lists || !lists.length){return}
    for(const mesh of lists){
      if(mesh.userData && mesh.userData.name){
        const num = this.num++
        const li = document.createElement("li")
        li.setAttribute("data-uuid", mesh.uuid)
        li.textContent = `${num} : ${mesh.name}`
        Elements.models.appendChild(li)
      }

      else if(mesh.children){
        this.view_list(mesh.children)
      }
    }
  }

  get_model(uuid){
    if(!uuid){return null}
    return this.search_model(Data.mesh,uuid)
  }

  search_model(data, uuid){
    // 単体オブジェクトの場合の処理
    if(data.uuid === uuid){
      return data
    }

    // 配列の場合の処理
    else if(data.length){
      for(const item of data){
        const res = this.search_model(item, uuid)
        if(res){
          return res
        }
      }
    }

    // モデルオブジェクトの場合の処理
    else if(data.children){
      for(const children of data.children){
        // console.log(children)
        const res = this.search_model(children, uuid)
        if(res){
          return res
        }
      }
    }

    return null
  }

}