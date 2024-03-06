

export class Elements{

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
		return document.querySelector("models ul")
	}
}