const express=require('express');
const hbs= require('hbs');
const fs=require('fs');

var app=express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err)=>{
    if (err){
      console.log('Unable to append server.log');
    }
  });
  console.log();
  next();
});
//----------------only when maintenance is required
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs',{
//     errorTitle:'Maintenance of the page is going on',
//     errorBody:'Sorry for the inconvienience ,we will be back soon'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    welcomeMessage:'Welcome to my Website',
    titleName:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    titleName:'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'unable to handle requests'
  });
});
app.listen(3000,()=>{
  console.log('Server is set up on port 3000');
});
