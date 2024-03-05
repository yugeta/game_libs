import { Header }  from "./system/header.js"
import { Asset }   from "../asset/js/asset.js"
import { Svg }     from "../asset/js/svg.js"
import { Render }  from "./3d/render.js"
import { Grid }    from "./3d/grid.js"
import { Camera }  from "./3d/camera.js"
import { Light }   from "./3d/light.js"

class Main{
  constructor(){
    this.load_asset()
  }
  
  load_asset(){
    new Asset([
      "control.html"
    ]).promise.then(()=>{this.system_setting()})
  }

  system_setting(){
    new Header()
    new Svg()
    this.screen()
  }

  screen(){
    new Render()
		new Camera()
    new Light()
		new Grid()
    Render.view()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
    break
  default:
    window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}