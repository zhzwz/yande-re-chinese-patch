const version = process.env['npm_package_version'] || ''

console.log(`\u001b[35m版本号：${version}`)

const fs = require('fs')
const filePath = './source/data/tags.json'

const origin = JSON.parse(fs.readFileSync(filePath))
const data = Object()

Object.keys(origin).sort().forEach(key => data[key.replace(/ /g, '_')] = origin[key])

fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

console.log(`\u001b[34m格式化标签数据文件完成！[${filePath}]`)
