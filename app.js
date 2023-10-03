const express = require('express')
const mongoose = require('mongoose');
const nodemon = require('nodemon');
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
 const Model = require('./model/schema');


app.get('/', (req, res)=>{
    res.render('index', {section: "To utilize the location finder, please sign in"})
})

app.get('/login', (req, res)=>{
    res.render('login')
})
app.post('/login/user', async(req, res)=>{
    try{
        const existenceCheck = await Model.findOne({email: req.body.email})
        if(existenceCheck ){
            res.send(`<h2>user with this email ${req.body.email} already exist! 
            click here to <a href="/login">sign up<a> with another email</h2>  ` )
        }
   const user = await new Model (req.body) 
   user.save()
   res.redirect('/location')
}
    catch(e){
    console.log(e);
}        
}) 
app.use('/location', async(req, res) => {
    try{
        const users = (await Model.find()).reverse()
        res.render('location', {username: users[0].username})
 } 
    catch(e){
    console.log(e)  
}    
})  















const uri = "mongodb+srv://showt:showtee@projects.dnjyzrl.mongodb.net/ASSIGN"
mongoose.connect(uri)
.then(()=>{
    const port = 5500;
    app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
    console.log('connected to database')
})
.catch(e=>{
    console.log(e)
});


