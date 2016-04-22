//路由处理层
module.exports = function(app) {
	//pre hander user持久化逻辑预处理
	app.use(function(req, res, next) {
		next();
	})
	//index page
	app.get('/', function(req,res){
		res.render('index', {
                title: '首页',
            })
	});

}