const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
	useNewUrlParser:true,
	useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
	
	const shortUrls = await ShortUrl.find()

	res. render ('index', {shortUrls:shortUrls})
})

app.post('/shortUrls', async (req, res) => {

	await ShortUrl.create({full: req.body.fullUrl})
	
	res.redirect('/')
})



app.get('/:shorturl', async (req, res) => {
	
	const shortobk = await ShortUrl.findOne({short: req.params.shorturl})
	
	
	if (shortobk == null) {
		return res.sendStatus(404)
	}
	
	shortobk.clicks++
	shortobk.save()
	
	res.redirect(shortobk.full)
})

app.listen(process.env.PORT || 3000);

