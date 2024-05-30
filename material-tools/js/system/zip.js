

export class Zip{
  files = [
    "asset/zip/zip.min.js",
    "asset/zip/unzip.min.js",
  ]
  count = 0

  constructor(){
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject  = reject
      for(const file of this.files){
        this.load(file)
      }
    })
  }

  load(file){
    const script = document.createElement("script")
    script.src = file
    script.onload = this.loaded.bind(this)
    document.querySelector("head").appendChild(script)
  }

  loaded(){
    this.count++
    if(this.count < this.files.length){return}
    this.finish()
  }

  finish(){
    this.resolve()
  }
}