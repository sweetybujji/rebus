var redis = require('redis');
var client = redis.createClient('9009', '192.168.4.92');

exports.Redis_Connection=function(cb){
	client.on('connect', function(err) {
		if(!err)
			{
			console.log("hai");
	    cb("Successfully Connected to redis database");
			}
		else
			{
			cb(err);
			console.log(err);
			}
	});
}

exports.SetData=function(Key,value,cb){

	client.on('connect', function(err) {
		if(!err)
			{

	    cb("Successfully Connected to redis database");
		client.set(Key, value, function(err, reply) {
			  cb(reply);
			  });
			}
		else
			{
			cb(err);
			console.log(err);
			}
	});
	

}
