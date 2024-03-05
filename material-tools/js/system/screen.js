import { Render } from "../3d/render.js"
import { Grid }   from "../3d/grid.js"
import { Camera } from "../3d/camera.js"

export class Screen{
	constructor(){
		this.init()
		Render.view()
	}

	init(){
		new Render()
		new Camera()
		new Grid()
	}
	
}