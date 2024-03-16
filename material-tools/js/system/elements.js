

export class Elements{

	static get menu_new(){
		return document.querySelector(`header .lists .new`)
	}

	static get control(){
		return document.getElementById("control")
	}

	static get screen(){
		return document.getElementById("screen")
	}

	static get grid(){
		return document.querySelector(`[name="grid"]`)
	}

	static get wire(){
		return document.querySelector(`[name="wire"]`)
	}

	static get ambient(){
		return document.querySelector(`[name="ambient"]`)
	}

	static get light(){
		return document.querySelector(`[name="light"]`)
	}

	static get models(){
		return document.querySelector("#models ul")
	}
	static get models_resize(){
		return document.querySelector("#models .resize")
	}
}