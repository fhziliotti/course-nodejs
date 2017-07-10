module.exports = function(app){
	let pingController = app.controller.PingController;

	app.route("/ping").get(pingController.ping);
}