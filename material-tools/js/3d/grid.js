import * as THREE      from "three"
import { Render } from "../3d/render.js"

export class Grid{
	constructor(){
		Grid.gridHelper = new THREE.GridHelper(50, 50, 0x888800)
		Render.scene.add(Grid.gridHelper)
	}
}