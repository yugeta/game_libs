export class Svg{
  constructor(options){
    this.options = options || {}
    this.init()
  }

  get targets(){
    return document.querySelectorAll('img , svg[src]')
  }

  mime = 'image/svg+xml'
  
  init(){
    for(const target of this.targets){
      const src = target.getAttribute('src')
      const ext = this.get_ext(src)
      if(!ext || ext.toLowerCase() !== 'svg'){continue}
      switch(target.nodeName){
        case 'svg':
          this.load_svg(target , src)
          target.removeAttribute('src')
          break
        case 'img':
          this.load_img(target , src)
          break
      }
    }
  }

  load_svg(elm , src , callback){
    this.datas = this.datas || []
    if(typeof this.datas[src] !== 'undefined'){
      if(callback){
        callback(this.datas[src])
      }
      else{
        this.loaded_svg(elm , {
          target:{response:this.datas[src]}
        })
      }
      return 
    }

    const xhr = new XMLHttpRequest()
    xhr.open('get' , src , true)
    // xhr.setRequestHeader('Content-Type', this.mime);
    xhr.setRequestHeader('Content-Type', "text/plane");
    xhr.onreadystatechange = ((elm , e) => {
      if(xhr.readyState !== XMLHttpRequest.DONE){return}
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        this.datas[src] = e.target.response
        if(callback){
          callback(e.target.response)
        }
        else{
          this.loaded_svg(elm , e)
        }
      }
    }).bind(this , elm)
    // xhr.onload = this.loaded_svg.bind(this, elm)
    xhr.send()
  }
  
	loaded_svg(elm , res){
    if(!res || !res.target || !res.target.response){return}
    // console.log(res.target.response)
    const parser = new DOMParser()
    let svg = parser.parseFromString(res.target.response, this.mime).querySelector('svg')
    this.copy_attributes(elm , svg)
    svg = this.remove_style(svg)
    elm.parentNode.insertBefore(svg , elm)
    elm.parentNode.removeChild(elm)
  }

  load_img(elm , src){

  }

  get_ext(file){
    if(!file){return}
    const sp = file.split("#")[0].split('?')[0].split('.')
    return sp[sp.length-1]
  }

  create_svg(){
    return document.createElementNS('http://www.w3.org/2000/svg' , 'svg')
  }

  remove_style(svg){
    var styles = svg.getElementsByTagName("style");
    for(var i=styles.length-1; i>=0; i--){
      styles[i].parentNode.removeChild(styles[i]);
    }
    return svg
  }

  copy_attributes(target , new_svg){
    if(!target || !new_svg){return}
    const attributes = target.attributes
    if(!attributes || !attributes.length){return}
    for(const attr of attributes){
      new_svg.setAttribute(attr.nodeName , attr.nodeValue)
    }
  }

  get_svg(elm , src , callback){
    const svg = this.load_svg(elm , src , callback)
  }

}