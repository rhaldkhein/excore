import path from 'path'
import fs from 'fs'
import _defaultsDeep from 'lodash.defaultsdeep'
import _get from 'lodash.get'
import debug from 'debug'

const debugConfig = debug('excore:config')
const prod = process.env.NODE_ENV === 'production'

export default class Config {
  static service = '@config'

  config = null

  constructor(provider, opt) {
    const core = provider.service('core')
    const option = _defaultsDeep({}, opt, {
      file: './config.js',
      devFile: './config.dev.js'
    })
    const file = path.resolve(core.path, option.file)
    const devFile = path.resolve(core.path, option.devFile)
    let config = {}
    let devConfig = {}
    try {
      if (fs.existsSync(file)) {
        config = require(file)
        config = config.default || config
      }
      if (fs.existsSync(devFile)) {
        devConfig = require(devFile)
        devConfig = devConfig.default || devConfig
      }
    } catch (e) {
      // Nothing
    }
    this.config = _defaultsDeep(prod ? {} : devConfig, config)
    debugConfig('created ...%s', file.substr(file.length - 24))
  }

  get(path, defaultValue) {
    return _get(this.config, path, defaultValue)
  }

}