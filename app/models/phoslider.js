var mongoose = require('mongoose')
var phosliderSchema = require('../schemas/phoslider.js')
var Phoslider = mongoose.model('Phoslider', phosliderSchema)

module.exports = Phoslider