const server = require('./config/server')
require('./config/databse')
require('./config/routes')(server)