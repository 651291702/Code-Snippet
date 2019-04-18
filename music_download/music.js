
// url : http://www.gequdaquan.net/gqss/


function addScript(url){
  let script = document.createElement('script')
  script.src = url
  script.type = "text/javascript"
  document.head.appendChild(script)
}

addScript('https://stuk.github.io/jszip/dist/jszip.min.js')
addScript('https://stuk.github.io/jszip/vendor/FileSaver.js')


let arr = []
let zip = new JSZip()  


function getUrl(){
  let link, moreBnt, shareBnt, closeBnt, name;
  [...link] = document.querySelectorAll('.list-mobile-menu')
  for(let i = 0; i < link.length; i ++)
    setTimeout(function(){
      let item = link[i]
      // 触发点击 弹框 为减少由于事件处理导致延迟，在700ms后进行操作 
      item.click();
      setTimeout(function(){
        // 触发外链链接 获得该歌曲链接
        moreBnt = document.querySelector('.info-btn:nth-of-type(6)')
        moreBnt.click();
        name = document.querySelector('.layui-layer-content p')
        shareBnt = document.querySelector('.share-url')
        closeBnt = document.querySelector('.layui-layer-close')
        let filename = name.innerText;
        let path = shareBnt.value
        let length = filename.length - 7;
        filename = filename.slice(0, length).replace(/\s/, '') + '.mp3'
        closeBnt.click()
        arr.push({
         path: path,
         filename: filename
        })
      }, 500)
    }, i * 700)
}

function DownLoadSingle(remoteUrl, filename) {
  // or use saveAs(remoteUrl, filename)
  let xhr = new XMLHttpRequest()
  xhr.open('GET', remoteUrl);
  xhr.responseType = "blob";
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4 || xhr.status !== 200)
      return;
    let a = document.createElement('a')
    let url = window.URL.createObjectURL(xhr.response)
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }
  xhr.send()
}

function pushFile(){
  arr.forEach( ({path, filename}) =>{
    fetch(path, {
      method: 'GET'
    }).then((res) =>{
      return res.blob()
    }).then( (res) => {
      zip.file(filename, res)
    })
  })
}


// 遍历文件夹 
zip.forEach(function (relativePath){
  console.log(relativePath);
});

// 下载文件夹
zip.generateAsync({type:"blob"})
  .then(function (blob) {
  saveAs(blob, "one.zip");
});

getUrl();


Array.from($('.list-item')).forEach( item => {
  let span = document.createElement('span')
  span.className = 'list-icon icon-share'
  span.dataset.function = 'share'
  span.title = '分享这首歌'
  span.innerText = '123'
  item.appendChild(span)
})