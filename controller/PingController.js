module.exports = function(app){
	return {
		ping
	}
}


function ping(req, res){
	return res.json({
		status: "OK",
		data: new Date()
		});
}