const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex =require('knex');
const register =require('./controllers/register');
const Signin=require('./controllers/Signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const db=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'abhishek',
        password:'abhi968611',
        database:'smart-brain'
    }
})
db.select('*').from('users').then(data =>{
    // console.log(data);
});
const app=express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res)=> {Signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleprofile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });
app.listen(process.env.PORT || 3001,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
});

/*
/ res=this is working
/signin --> POST=sucess/fail
/register --> POST=user
/profile/:userId --> GET = user
/image --> PUT --> user

*/