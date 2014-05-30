
//-- package.add('./config/app.js', 'middleware-last', 1) --//

var cdn = require('./packages/cdnMiddleware.js')
cdn(app)