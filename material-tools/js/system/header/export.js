import { Data }     from "../../system/data.js"

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
    // setting.json
    this.zip.addFile(this.create_setting_data(), {
      filename: this.stringToByteArray("setting.json"),
    })
    const url = window.URL || window.webkitURL

    // glb-files
    // console.log(Data.files)
    for(const glb_file of Data.files){
      const data = this.convert_buffer2data(glb_file.buf)
      this.zip.addFile(data, {
        filename: this.stringToByteArray(glb_file.name),
      })
    }
  }

  // bufferデータを分割してデータ変換する処理
  max_buffer = 1024
  convert_buffer2data(data){
    const buf  = new Uint8Array(data)
    let res = '';
    for(var i=0; i<buf.length; i+=this.max_buffer){
      res += String.fromCharCode.apply(null, buf.slice(i, i+this.max_buffer))
    }
    return this.stringToByteArray(res)
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
    document.body.removeChild(a)
  }

  get download_name(){
    return "data_"+ (+new Date()) +".zip"
  }

  
  /**
   * setting.jsonの作成
   */
  create_setting_data(){
    const data = Data.setting ? {
      material_animations : Data.setting.material_animations ? Data.setting.material_animations.map(e => ({
        material  : e.material,
        type      : e.type,
        direction : e.direction,
      })) : [],
    }: {}
    const setting_json = JSON.stringify(data , null , "  ")
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