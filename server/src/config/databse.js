const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set("strictQuery", true);
module.exports = mongoose.connect('mongodb://127.0.0.1/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


