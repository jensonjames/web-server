const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err){
      console.log('unable to append');
    }
  })
  next();
});

app.use((req,res,next)=>{
  //res.send('<h1>Hello Express!!!</h1>');
  res.render('maintenance.hbs',{
    pageTitle : 'Maintenance'
  })
});

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamit', (test) =>{
  return text.toUpperCase();
});

app.get('/', (req,res) =>{
  //res.send('<h1>Hello Express!!!</h1>');
  res.render('home.hbs',{
    pageTitle : 'Home page',
    welcomemsg : 'Welcome to my Website',
      currentyear : new Date().getFullYear()
  })
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle : 'About Page',
    currentyear : new Date().getFullYear()  }
    );
} )


app.get('/bad',(req,res) =>{
  res.send ({
    errorMessage: 'Unable to handle'
  })
} );


app.listen(3000, ()=>{
  console.log('Server up on port 3000');
});
