import { Data }     from "../../system/data.js"
// import { Zip }      from "../../../asset/zip/zip.min.js"

export class Export{
  constructor(){
    if(!this.check()){return}
    this.zip = new Zlib.Zip()
    this.make_data()
    this.download()
  }

  check(){return true
    if(!this.data || !this.data.length){
      alert("保存するデータがありません。")
      return false
    }
    else{
      return true
    }
  }

  make_data(){
    this.zip.addFile(this.create_setting_data(), {
      filename: this.stringToByteArray("setting.json"),
    })
  }

  download(){
    const url = window.URL || window.webkitURL
    const buf  = this.zip.compress()
    const blob = new Blob([buf], {type: "application/zip"})
    const href = url.createObjectURL(blob);

    const a = document.createElement("a")
    a.href = href
    a.download = this.download_name
    document.body.appendChild(a)
    a.click()
    // 
    // url.revokeObjectURL(href)
    document.body.removeChild(a)
  }

  // get data_url(){
  //   const buf  = this.zip.compress()
  //   const blob = new Blob([buf], {type: "application/zip"})
  //   return URL.createObjectURL(blob);
  // }

  get download_name(){
    return "data_"+ (+new Date()) +".zip"
  }

  
  /**
   * setting.jsonの作成
   */
  create_setting_data(){
    // const setting_json = JSON.stringify(Data.setting.material_animations.map(e => {
    //   e.material,
    //   e.direction,
    //   e.type,
    // }) , null , "  ")
    const setting_json = JSON.stringify("{a:1,b:2}" , null , "  ")
    console.log(setting_json)
    const str = unescape(encodeURIComponent(setting_json))
    return this.stringToByteArray(str)
  }

  stringToByteArray(str) {
    const array = new (window.Uint8Array !== void 0 ? Uint8Array : Array)(str.length)
    for (let i = 0, il = str.length; i < il; ++i) {
        array[i] = str.charCodeAt(i) & 0xff
    }
    return array
  }
}