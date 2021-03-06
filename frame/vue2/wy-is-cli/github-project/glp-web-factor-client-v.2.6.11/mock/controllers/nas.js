import { Controller, RequestMapping, ResData, upload } from '@pat-fet/mock-server'
import path from 'path'
import fs from 'fs'

const dir = '../nas'

// eslint-disable-next-line @typescript-eslint/class-name-casing
export default class nas extends Controller {
  @RequestMapping({ url: '/nas/upload', method: 'post', cbs: upload.single('file') })
  upload (req, res, context) {
    const file = req.file
    const name = file.originalname
    const filePath = path.join(__dirname, dir, name)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fs.writeFile(filePath, file.buffer, function (err) {
          if (err) reject(err)
          else resolve({ url: `http://localhost:3000/nas/download/${name}` })
        })
      }, 750)
    })
  }

  @RequestMapping({ url: '/nas/download/:name', method: 'get' })
  download (req, res, context) {
    const name = req.params.name
    const filePath = path.join(__dirname, dir, name)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        res.download(filePath, name, function (err) {
          if (err) reject(err)
        })
      }, 750)
    })
  }
}
