import { Glb }     from "./3d/glb.js"
import { Control } from "./system/control.js"
import { Asset }   from "./system/asset.js"

class Main{
  constructor(){
    new Asset([
      "header.html"
    ])
    new Glb()
    new Control()
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