// import { Main }      from './main.js'
// import { Data }     from '../system/data.js'

export class Asset{
  static datas = []

  constructor(files){
    this.files = files || []
    if(!this.files){
      this.finish()
      return
    }
    this.promise = new Promise((resolve,reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }

	dir = "asset/html"

  load(){
		if(!this.files.length){
			this.set_elmements()
			return
		}
		const file = this.files.shift()
    const dt   = (+new Date()) // キャッシュ回避
    const xhr  = new XMLHttpRequest()
    xhr.open("get" , `${this.dir}/${file}?${dt}` , true)
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // xhr.setRequestHeader("Content-Type", "text/html")
		xhr.onload = this.loaded.bind(this,file)
    xhr.send()
  }

  loaded(file,e){
    if(file === "test.html"){
    console.log(file,e.target.response)
    }
		Asset.datas.push({
			name : file,
			value : e.target.response
		})
		this.load()
  }
  // convert_string(str){
  //   str = str.replace(/{{page_name}}/g, this.page_name)
  //   str = str.replace(/{{file_name}}/g, this.file_name)
  //   return str
  // }

  set_scripts(elm){console.log(elm)
    const scripts = Array.from(elm.querySelectorAll('script'))
    this.set_script(scripts)
  }

  set_script(scripts){
    if(!scripts || !scripts.length){return}
    const target_script = scripts.shift()
    if(target_script.getAttribute('src')){
      this.set_script_src(target_script , scripts)
    }
    else{
      this.set_script_inner(target_script , scripts)
    }
  }

  set_script_src(berfore_script , scripts){
    const new_script = document.createElement('script')
    new_script.onload = (scripts => {
      this.set_script(scripts)
    }).bind(this , scripts)
    this.copy_attributes(berfore_script , new_script)
    // new_script.setAttribute('data-set',1)
    berfore_script.parentNode.insertBefore(new_script , berfore_script)
    berfore_script.parentNode.removeChild(berfore_script)
  }
  set_script_inner(berfore_script , scripts){
    const script_value = berfore_script.textContent
    try{
      Function('(' + script_value + ')')();
    }
    catch(err){
      console.warn(err)
    }
    this.set_script(scripts)
  }

  copy_attributes(before_elm , after_elm){
    if(!before_elm || !after_elm){return}
    const attributes = before_elm.attributes
    if(!attributes || !attributes.length){return}
    for(const attr of attributes){
      after_elm.setAttribute(attr.nodeName , attr.nodeValue)
    }
  }

  finish(){
    this.resolve()
  }

  is_login_page(html){
    if(!html){return}
    const dom = new DOMParser();
    const doc = dom.parseFromString(html, 'text/html')
    const check_login = doc.querySelector(`input[name='check_login']`)
    if(check_login){return true}
  }

  set_elmements(){
    for(const asset of Asset.datas){
      const id = asset.name.replace(/.html$/ , "")
      const elm = document.getElementById(id)
      if(!elm){continue}
      elm.innerHTML = asset.value
      this.set_scripts(elm)
    }
    this.finish()
  }
}