import * as THREE      from "three"

export class Common{
	static color(string){
		string = string || "#000000"
    return new THREE.Color(string)
	}
}