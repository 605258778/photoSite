var _ = require('underscore')
var Phoslider = require('../models/phoslider')
var fs = require('fs')
var path = require('path')

exports.index = function(req,res){
	Phoslider
    .find({})
    .exec(function (err, phoslider) {
        res.render('index', {
            title: '首页',
            phoslider:phoslider
        })
    })
};