var _ = require('underscore')
var Phoslider = require('../models/phoslider')

exports.index = function(req,res){
	Phoslider
    .find({})
    .exec(function (err, phoslider) {
        res.render('index/index', {
            title: '首页',
            phoslider:phoslider
        })
    })
};