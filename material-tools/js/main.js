import { Glb }     from "./3d/glb.js"
import { Control } from "./system/control.js"
import { Asset }   from "../asset/js/asset.js"
import { Svg }     from "../asset/js/svg.js"

class Main{
  constructor(){
    this.load_asset()
  }
  load_asset(){
    new Asset([
      "control.html",
      "test.html"
    ]).promise.then(()=>{this.system_setting()})
  }
  system_setting(){
    new Control()
    new Svg()
    
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