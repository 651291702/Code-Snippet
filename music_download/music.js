// url : http://www.gequdaquan.net/gqss/
let zip;

function addScript(url) {
  let script = document.createElement('script')
  script.src = url
  script.type = "text/javascript"
  document.head.appendChild(script)
}

function DownLoadZip() {
  zip.generateAsync({
      type: "blob"
    })
    .then(function (blob) {
      saveAs(blob, "哈哈哈.zip")
    })
    .catch(err => console.log(err))
}

addScript('https://stuk.github.io/jszip/dist/jszip.min.js')
addScript('https://stuk.github.io/jszip/vendor/FileSaver.js')


function getUrl() {

  let getUrlCount = 0; //链接个数
  let failCount = 0;
  let zipCount = 0;
  let arr = []
  zip = new JSZip()

  let length = document.querySelectorAll('.list-mobile-menu').length
  console.log("正在获取图片链接中 O(∩_∩)O ")
  for (let i = 0; i < length; i++)
    ajaxUrl(musicList[rem.dislist].item[i], function (info) {
      getUrlCount++;
      console.log(`${length}首歌曲，目前获取${getUrlCount}首歌曲链接`)
      arr.push({
        path: info.url.replace(/^(http|https):\/\/(.+?)\//, 'http://localhost:3333/'),
        filename: info.name + '.mp3'
      })
      // 获取所有url后， 进行压缩文件
      if (length !== getUrlCount)
        return;

      console.log("获取歌曲链接完毕!! (✿◡‿◡)")
      console.log("目前正在下载歌曲中 O(∩_∩)O")

      arr.forEach(({
        path,
        filename
      }) => {
        fetch(path, {
          method: 'GET'
        }).then((res) => {
          return res.blob()
        }).then((res) => {
          zip.file(filename, res)
          zipCount++;
          console.log(`能够下载歌曲${getUrlCount}首 目前下载成功${zipCount}首 失败${failCount}首歌 还剩下${getUrlCount - zipCount - failCount}首歌曲`)
          if (zipCount + failCount === getUrlCount)
            DownLoadZip()
        }).catch(err => {
          failCount++;
          if (zipCount + failCount === getUrlCount)
            DownLoadZip()
        })
      })
    })
}

setTimeout(function () {
  getUrl();
}, 1000)

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