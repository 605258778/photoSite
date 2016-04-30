var _ = require('underscore')
var Phoslider = require('../models/phoslider')
var fs = require('fs')
var path = require('path')

exports.index = function(req,res){
    res.render('./manager/manager', {
            title: '系统管理',
        })
}
//上传轮播图片
exports.saveSliderPho = function (req, res, next) {
	console.log('hello')
	console.log(req.body)
	var PhoData = req.files.uploadPho
	var filePath = PhoData.path
	var originalFilename = PhoData.originalFilename

	if (originalFilename) {
		fs.readFile(filePath, function (err, data) {
			var timestamp = Date.now()
			var type = PhoData.type.split('/')[1]
			var Pho = timestamp + '.' + type	
			var newPath = path.join(__dirname, '../../', 'upload/' + Pho)

			fs.writeFile(newPath, data, function (err) {
				req.pholink = Pho
				next()
			})
		})
	} else {
		next()
	}
}
//保存轮播图片
exports.saveSlider = function(req, res) {
  var id = req.body.Phoslider._id
  var PhosliderObj = req.body.Phoslider
  var _Phoslider
  if (req.pholink) {
    PhosliderObj.pholink = req.pholink
  }
  if (id) {
    Phoslider.findById(id, function(err, Phoslider) {
      if (err) {
        console.log(err)
      }

      _Phoslider = _.extend(Phoslider, PhosliderObj)
      _Phoslider.save(function(err, Phoslider) {
        if (err) {
          console.log(err)
        }
        res.redirect('/manager')
      })
    })
  }
  else {
    _Phoslider = new Phoslider(PhosliderObj)
    _Phoslider.save(function(err, category) {
        if (err) {
          console.log(err)
        }
        res.redirect('/manager')
    })
  }
}