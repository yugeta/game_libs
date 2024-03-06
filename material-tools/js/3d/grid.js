import * as THREE   from "three"
import { Render }   from "../3d/render.js"
import { Model }    from "../3d/model.js"
import { Elements } from "../system/elements.js"

export class Grid{
	constructor(){
		Grid.gridHelper = new THREE.GridHelper(50, 50, 0x888800)
		Render.scene.add(Grid.gridHelper)
		this.set_event()
	}

	set_event(){
		Elements.grid.addEventListener("click"    , this.toggle.bind(this))
	}

	toggle(){
		if(Elements.grid.checked === true){
      Grid.gridHelper.visible = true
    }
    else{
      Grid.gridHelper.visible = false
    }
	}

}