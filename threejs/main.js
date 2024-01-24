import { Sample }  from "./sample.js"
// import { LoadGlb } from "./load_glb.js"


class Main{
  constructor(){
    new Sample()
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