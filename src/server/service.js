import express from 'express'
import http, { IncomingMessage } from 'http'
import _defaultsDeep from 'lodash.defaultsdeep'
import debug from 'debug'
import { AppError, notFound, internal } from './error'

import './express/express'
import './express/response'

const debugServer = debug('excore:server')
const debugRouter = debug('excore:router')

export default class Server {
  static service = '@server'

  configure = null

  config = {}
  defaults = {
    apiBaseUrl: '/api',
    port: 3000
  }

  constructor(provider, options) {
    this.core = provider.service('core')
    // Create app instances
    this.appRoot = express()
    this.appApi = express()
    // Attach provider to apps
    this.appRoot.$provider = provider
    this.appApi.$provider = provider
    // Apply configs
    this.config = _defaultsDeep({},
      typeof options === 'function' ? options(this) : options,
      this.defaults)

    // First middleware. Attach scoped provider.
    this.appRoot.use((req, res, next) => {
      debugRouter(req.method + ' ' + req.url)
      // Attache new scoped provider
      req.provider = this.core.createProvider()
      next()
    })
    debugServer('created')
  }

  listen() {
    debugServer('starting http')

    if (!this.http)
      this.http = http.createServer(null, this.appRoot)

    // Run configuration for app
    if (this.configure) this.configure(this.appRoot)

    // Infuse di container to request
    this.appRoot.use(this.core.init(IncomingMessage.prototype))

    // Attach primary routers
    this.appRoot.use(this.config.apiBaseUrl, this.appApi)

    // Last middleware
    this.appApi.use((req, res) => {
      res.jsonError(notFound('Route not found'))
    })

    // Catch and flush error for API
    // eslint-disable-next-line no-unused-vars
    this.appApi.use((err, req, res, next) => {
      if (err instanceof AppError) {
        return err.send(res)
      }
      res.jsonError(internal())
      debugServer('error', err)
    })

    const httpPort = this.config.port
    const httpsPort = this.config.portSecure || parseInt(httpPort) + 1

    const listenServer = () => {
      return new Promise((resolve, reject) => {
        this.http.listen(httpPort, err => {
          if (err) return reject(err)
          debugServer('started http at port %d', httpPort)
          resolve()
        })
      })
    }

    const listenServerSecure = () => {
      return new Promise((resolve, reject) => {
        this.https.listen(httpsPort, err => {
          if (err) return reject(err)
          debugServer('started https at port %d', httpsPort)
          resolve()
        })
      })
    }

    return Promise.resolve()
      .then(listenServer)
      .then(() => {
        if (this.https)
          return listenServerSecure()
      })
  }

}