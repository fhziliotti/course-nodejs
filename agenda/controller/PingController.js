module.exports = function(app){
	return {
		ping
	}
}


function ping(req, res){
	return res.json({
		status: "OK",
		ip: req.ip,
		data: new Date()
		});
}