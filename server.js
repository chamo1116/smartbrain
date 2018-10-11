const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require ('cors');
const knex = require ('knex');
const register = require ('./Controllers/register');
const signin = require ('./Controllers/signin');
const profile = require ('./Controllers/profile');
const image = require ('./Controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'chamito',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=>{
	res.send('works');
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


// // Load hash from your password DB.

app.listen(process.env.PORT || 3000, ()=>{
	console.log('app is running on port 3000');
}) 

/*
/-->res = this is working
/signin --> POST success/fail
/register --> POST = user
/profile/:userid --> GET = user 
/image --> PUT 

*/