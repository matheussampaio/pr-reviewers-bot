const fs = require('fs-extra')
const path = require('path')
const yaml = require('yaml')

class Config {
  constructor(configPath) {
    this.configPath = configPath

    this.data = null
  }

  async read() {
    const file = await this.readFile()

    this.data = yaml.eval(file)
  }

  readFile() {
    return fs.readFile(path.join(__dirname, this.configPath), 'utf-8')
  }
}

module.exports = Config
