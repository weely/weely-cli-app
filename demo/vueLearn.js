const data = {
  text: 'hello world'
}

function effect(){
  document.body.innerHTML = data.text
}

const obj = new Proxy(data, {
  get(target, key){
    
  },
  set(target, key, value) {

  }
})
