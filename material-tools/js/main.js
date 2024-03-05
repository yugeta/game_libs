import { Header }  from "./system/header.js"
import { Screen }  from "./system/screen.js"
import { Asset }   from "../asset/js/asset.js"
import { Svg }     from "../asset/js/svg.js"

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
    new Screen()
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