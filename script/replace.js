#!/usr/bin/env node

const fs = require("fs")

const origin = fs.readFileSync("bundle/index.js", "utf8")
const result = handler(origin)

fs.writeFile("bundle/index.user.js", result, error => {
  if (error) console.log(error)
})



function handler(content) {
  // [{ path: "source/body.html" }]
  const regexp = /\[{ path: ([\S]+) }\]/i
  while (regexp.test(content)) {
    const path = JSON.parse(RegExp.$1)
    console.log(path)
    const replacement = fs.readFileSync(path, "utf8")
    content = content.replace(regexp, replacement)
  }
  return content
}
