export default class Page {
  constructor (req, content = []) {
    // console.log(req)
    const { page, size } = ((req.method === 'POST') ? req.body : req.query) || {}
    this.totalNum = content.length
    this.page = +page || 1
    this.size = +size || 10
    const start = (this.page - 1) * this.size
    this.items = content.slice(start, start + this.size)
  }
}
