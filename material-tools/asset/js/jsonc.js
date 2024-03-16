export class Jsonc{
  constructor(options){
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject  = reject
      if(options.file){
        this.load(options.file)
      }
      else if(options.data){
        this.set_jsonc(options.data)
      }
    })
  }

  load(filepath){
    const xhr  = new XMLHttpRequest()
    const dt   = (+new Date()) // キャッシュ回避
    xhr.open("get" , `${filepath}?${dt}` , true)
    xhr.setRequestHeader("Content-Type", "text/json")
		xhr.onload = this.loaded.bind(this)
    xhr.send()
  }

  loaded(e){
    this.set_jsonc(e.target.response)
  }

  set_jsonc(jsonc){
    jsonc = this.convert(jsonc)
    this.json = this.parse(jsonc)
    this.finish()
  }

  convert(jsonc){
		// 複数行コメントの排除
		jsonc = jsonc.replace(/\/\*.*?\*\//gms , '')

		// コメント行の排除
    jsonc = jsonc.replace(/\/\/.*?$/gm , '')
    
    return jsonc
  }

  parse(jsonc){
    try{
      return JSON.parse(jsonc)
    }
    catch(err){
      console.warn(jsonc,err)
			return null
    }
  }

  finish(){
    this.resolve(this.json)
  }
}