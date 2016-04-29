var Index = require('../app/controllers/index')
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
	//guest page
	app.get('/guest',Guest.index)
	app.get('/manager',Manager.index)
}