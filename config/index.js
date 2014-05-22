
// # config

var _ = require('underscore')
var path = require('path')

var maxAge = 24 * 60 * 60 * 1000

var config = module.exports = {}

var env = 'development'

var rootDir = path.join(__dirname, '..')

var environments = {
  development: {
    port: 3000,
    host: 'localhost',
    db: {
      host: 'localhost',
      dbname: 'mydb',
      port: '27017',
      opts: {}
    },
    api: {
      server: {
        host: 'localhost',
        port: 3001,
      }
    },
    redis: {
      host: 'localhost',
      port: 6379,
      prefix: 'TODO',
      maxAge: maxAge
    },
    cookieParser: 'TODO',
    session: {
      secret: 'TODO',
      key: 'TODO',
      cookie: {
        maxAge: maxAge
      }
    },
    publicDir: path.join(rootDir, 'assets', 'public'),
    lessMiddleware: {
      src: path.join(rootDir, 'assets', 'public'),
      force: true
    }
  },
  production: {
    port: 80,
    host: '',
    db: {},
    redis: {},
    cookieParser: '',
    session: {},
    publicDir: path.join(rootDir, 'assets', 'dist')
  }
}

if (_.isString(process.env.NODE_ENV) && _.contains(_.keys(environments), env))
  env = process.env.NODE_ENV

_.defaults(config, {
  staticServer: {
    maxAge: maxAge,
  },
  ssl: false,
  env: env,
  rootDir: rootDir,
  viewsDir: path.join(rootDir, 'app', 'views'),
})

_.extend(config, environments[config.env])

config.protocol = (config.ssl) ? 'https' : 'http'

config.favicon = path.join(config.publicDir, 'favicon.ico')

config.winstonMongoDB = _.extend(config.db, {
  // don't perform second req to verify
  safe: false,
  port: parseInt(config.db.port, 10)
})
