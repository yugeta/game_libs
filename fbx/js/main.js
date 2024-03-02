// import { Glb }    from "./glb.js"
import { Fbx }    from "./fbx.js"
import { Event }  from "./event.js"

class Main{
  constructor(){
    // new Glb()
    new Fbx()
    new Event()
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