import { Data }     from "../../system/data.js"

export class Export{
  constructor(){
    if(!this.check()){return}
    this.download()
  }

  check(){
    if(!this.data || !this.data.length){
      alert("保存するObjectがありません。")
      return false
    }
    else{
      return true
    }
  }

  get url(){
    return window.URL || window.webkitURL
  }

  get data(){
    return Data.mesh
  }

  get url_str(){
    const json = JSON.stringify(this.data)
    const uint8Array = new TextEncoder().encode(json)
    const blob = new Blob([uint8Array.buffer], {type: "text/plain"});
    return this.url.createObjectURL(blob)
  }

  get link(){
    const a = document.createElement("a")
    // a.target = "_blank"
    a.href = this.url_str
    a.download = this.download_name
    return a
  }

  get download_name(){
    return "sample_"+ (+new Date()) +".txt"
  }


  download(){
    const link = this.link
    document.body.appendChild(link)
    link.click()
    this.url.revokeObjectURL(this.url_str)
    document.body.removeChild(link)
  }
}