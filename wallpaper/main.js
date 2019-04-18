const fs = require('fs')
const sizeOf = require('image-size')


const USERNAME = 'USERNAME'
const SOURCEDIR = `C:\\Users\\${USERNAME}\\AppData\\Local\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets`
const TARGETDIR = './images'
const IMGRequire = {
  width: 1920,
  height: 1080,
  type: ['jpg', 'png']
}

function cpFilesFromSource(oldDir, newDir, imgReqObj) {
  if(!fs.existsSync(newDir)) 
    fs.mkdir(newDir)
  // 获取所有源路径下图片
  let arr = fs.readdirSync(oldDir)
  arr.forEach( file => {
    // 生成路径
    let oldPath = `${oldDir}/${file}`
    let width, height, type
    try {
      let info = sizeOf(oldPath)
      width = info.width
      height = info.height
      type = info.type

    } catch (err) {
      let msg = err.message
      if (!msg.indexOf('unsupported file type')) return;
      else console.log(err.message)

      return;
    }
    let newPath = `${newDir}/${file}.${type}`
    // 筛选图片
    if (width !== imgReqObj.width || height !== imgReqObj.height) return;
    if (!~imgReqObj.type.indexOf(type)) return;
    // 复制图片
    fs.copyFile(oldPath, newPath, (err) => {
      if (err) {
        let msg = err.message
        if (!msg.indexOf('unsupported file type')) return;
        else console.log(err.message)
      }
    })
  })
}


function main() {
  // 复制文件到目标文件夹
  cpFilesFromSource(SOURCEDIR, TARGETDIR, IMGRequire)
}

main()