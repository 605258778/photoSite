var Index = require('../app/controllers/index')
var Zxkz = require('../app/controllers/zxkz')
var Guest = require('../app/controllers/guest')
var Manager = require('../app/controllers/manager')
//路由处理层
module.exports = function(app) {
	//pre hander user持久化逻辑预处理
	app.use(function(req, res, next) {
		next();
	})
	//index page
	app.get('/',Index.index)
	app.get('/zxkz',Zxkz.index)
	//guest page
	app.get('/guest',Guest.index)
	//manager
	app.get('/manager',Manager.index)
	app.post('/manager/Phoslider',Manager.saveSliderPho,Manager.saveSlider)
}