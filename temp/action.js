#!/usr/bin/env node

const fs = require('fs')
const tagsData = Object()
const version = process.env['npm_package_version'] || ''

formatTagsFile()
generateReadMeFile()

function formatTagsFile() {
  info('正在格式化标签数据')
  const tagsPath = './tags.json'
  const data = JSON.parse(fs.readFileSync(tagsPath))
  Object.keys(data).sort().forEach(key => tagsData[key.replace(/ /g, '_')] = data[key])
  fs.writeFileSync(tagsPath, JSON.stringify(tagsData, null, 2))
}

function generateReadMeFile() {
  info('正在生成说明文档')
  const main = fs.readFileSync('./readme_main.md', 'utf8')
  const tags = Object.keys(tagsData).reduce((data, key, index) => {
    const en = key.replace(/_/g, ' ')
    const cn = tagsData[key]
    return `${ data }\n|${ index + 1 }|${en}|${cn}|`
  }, '||English|简体中文|\n|:-:|:-|:-|')
  fs.writeFileSync('./readme.md', main.replace('[[ TAGS ]]', tags))
}

function info(log) {
  console.log(`\u001b[35m[${version}] \u001b[34m${log}`)
}
