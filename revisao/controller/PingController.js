module.exports = (app)=>{
	return {
	ping
	}
}

function ping (req, res, next){
	return res.json({
	status: "OK",
	data: new Date()
	})
}