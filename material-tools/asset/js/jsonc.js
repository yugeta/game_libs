export class Jsonc{
  constructor(jsonc){
    jsonc = this.convert(jsonc)
    this.jsonc = jsonc
    this.json = this.parse(jsonc)
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
      console.warn(this.jsonc,err)
			return null
    }
  }
}