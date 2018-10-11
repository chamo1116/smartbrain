const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.APi_CLARIFAI
});


const handleApiCall = (req, res) => {
	console.log(app.apiKey);
	app.models
    	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    	.then(data => {
    		res.json(data)
    	})
    	.catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (req, res, db)=>{
	const { id }= req.body;
	let found = false;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('Enable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}