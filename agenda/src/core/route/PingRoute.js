module.exports = function(app){
	let pingController = app.src.api.ping.PingController;

	app.route("/ping").get(pingController.ping);
}