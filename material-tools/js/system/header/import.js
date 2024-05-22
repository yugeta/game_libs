import { Model }      from "../../3d/model.js"

export class Import{
  constructor(files){
    for(const file of files){
      new Model(file)
    }
  }
  
}