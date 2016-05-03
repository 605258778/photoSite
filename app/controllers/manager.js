var _ = require('underscore')
var Phoslider = require('../models/phoslider')
var fs = require('fs')
var path = require('path')

exports.index = function(req,res){
  Phoslider
    .find({})
    .exec(function (err, phoslider) {
        res.render('./manager/manager', {
            title: '系统管理',
            phoslider:phoslider
        })
    })
}
//上传轮播图片
exports.saveSliderPho = function (req, res, next) {
	console.log('保存图片')
	var PhoData = req.files.uploadPho
	var filePath = PhoData.path
	var originalFilename = PhoData.originalFilename

	if (originalFilename) {
		fs.readFile(filePath, function (err, data) {
			var timestamp = Date.now()
			var type = PhoData.type.split('/')[1]
			var Pho = timestamp + '.' + type	
			var newPath = path.join(__dirname, './', 'upload/' + Pho)

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
  console.log('保存到数据库')
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
        console.log('ok')
      })
    })
  }
  else {
    _Phoslider = new Phoslider(PhosliderObj)
    _Phoslider.save(function(err, Phoslider) {
        if (err) {
          console.log(err)
        }
        res.redirect('/manager')
        console.log('ok')
    })
  }
}
exports.tplbEdit = function(req, res){
  console.log(req.params)
  res.render('./manager/tplb_form', {
            title: '系统管理',
            phoslider:req.params
        })
}
exports.tplbDel = function(req, res) {
  debugger;
    var delObj = req.body;
    console.log(req.body);
      var count=0;
      if (delObj) {
        console.log(delObj.id[0]);
        Phoslider.remove({
          _id: delObj.id[0]
        }, function(err, movie) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              success: count
            });
          }
        });
      }
    res.redirect('/manager')
  }