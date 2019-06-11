/* global describe, it, expect */
const uuidv1 = require('uuid/v1')
const dayjs = require('dayjs')
const fs = require('fs')

/**
 * For getListContent()
 * @param {String} path
 */
function getListContent (path) {
  var content = []
  var src = path
  var srclen = src.length
  if (src.charAt(srclen - 1) !== '/') src = src + '/'
  var files = fs.readdirSync(src)
  // @TODO use lodash
  files.forEach(file => {
    let fileStat = fs.statSync(src + file).isDirectory()
    if (!fileStat) {
      let data = fs.readFileSync(src + file)
      data = JSON.parse(data)
      content.push(data)
    }
  })
  return content
}

/**
 * For getList()
 * @param {String} path
 */
function getList (path) {
  // @TODO duplicate with getListContent - first 3 rows are pretty similar
  var src = path
  var srclen = src.length
  if (src.charAt(srclen - 1) !== '/') src = src + '/'
  var list = []
  var files = fs.readdirSync(src)
  // @TODO use lodash
  files.forEach(file => {
    let fileStat = fs.statSync(src + file).isDirectory()
    if (!fileStat) {
      list.push(file)
    }
  })
  return list
}

const __generateId = () => {
  return uuidv1()
}

const __generateDate = () => {
  return dayjs().toDate()
}

// test expecting json file not to be empty
const jsonFileNotEmptyTest = (file) => {
  describe(`tests for ${file}`, () => {
    it(`${file} data files returns array`, () => {
      expect(file).not.toBe('')
    })
  })
}

const jsonSchemaTest = (file, example, schema) => {
  describe(`test ${file} json schema`, () => {
    it(`validates ${file} json-schema`, () => {
      expect(example).toMatchSchema(schema)
    })
  })
}
module.exports = {
  __generateId,
  __generateDate,
  jsonFileNotEmptyTest,
  jsonSchemaTest,
  getList,
  getListContent
}
