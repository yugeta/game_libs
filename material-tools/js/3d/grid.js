import * as THREE   from "three"
import { Render }   from "../3d/render.js"
import { Elements } from "../system/elements.js"

export class Grid{
	constructor(){
		Grid.gridHelper = new THREE.GridHelper(50, 50, 0x888800)
		Render.scene.add(Grid.gridHelper)
	}

	static toggle(){
		if(Elements.grid.checked === true){
      Grid.gridHelper.visible = true
    }
    else{
      Grid.gridHelper.visible = false
    }
	}

}