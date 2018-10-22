import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import glob = require('tiny-glob')
import { Parser } from '../src/index'

const parser = new Parser()

const baseDir = path.join(__dirname, '..')

const testsPath = path.join(__dirname, 'resource', 'valid')

function cleanup (data : any) {
  return JSON.parse(JSON.stringify(data))
}

glob('./**/*.ftl', { cwd: testsPath, filesOnly: true, absolute: true })
  .then((files : string[]) => {
    for (const file of files) {
      describe(file, () => {
        const dirname = path.dirname(file)
        const basename = path.basename(file).replace(path.extname(file), '')

        const template = fs.readFileSync(file, 'utf8')
        const data = parser.parse(template)

        it('should have no errors', () => {
          if (data.ast.errors) {
            for (const error of data.ast.errors) {
              assert.fail(`${error.message}\n\tfile:.\\${path.relative(baseDir, file)}:${error.start ? `${error.start.line}:${error.start.column}` : '0:0'}`)
            }
          }
        })

        it('should have correct tokens', () => {
          const code = JSON.parse(fs.readFileSync(path.join(dirname, `${basename}-tokens.json`), 'utf8'))
          assert.deepStrictEqual(cleanup(data.tokens), code, 'tokens do not match')
        })

        it('should have correct ast', () => {
          const code = JSON.parse(fs.readFileSync(path.join(dirname, `${basename}-ast.json`), 'utf8'))
          assert.deepStrictEqual(cleanup(data.ast), code, 'ast do not match')
        })
      })
    }
  })
