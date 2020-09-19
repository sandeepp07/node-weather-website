const path = require('path')
//here we're going to load in Express
//create a new constant so we can load the library 
//grab the library express\
const express = require('express');
//express is actually a function as opposed to something like an object and we call it to create a new express application
const port = process.env.PORT || 3000;

//process.env.PORT will be availbale on heroku and will be used to listen to our server and on local port 3000 is used to listen for the local server

//the process.env.PORT is our environment port and will be used by heroku to listen to our server and or 3000 is for our local application

//create a new variable to store our Express application.
const app = express();
//call it app and all we do to generate the application is called Express.
//we configure our server by using various methods provided on the application itself.
//we can start to tell our Express application what exactly it should do.
const hbs = require('hbs');

//Goal : Create a partial for the folder 
//1.Set up the template for the footer partial
//2.Render the partial at the bottom of all three pages
//3.Test your work by visiting all three pages



//Define path for Express config
const publicDirectoryPath =   path.join(__dirname,'../Public');

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));
//Express is going to find index.html and that's going to match the route
//on setting the above path into the app.use the application will load the index.html page in the public directory path
//In the case of our Express static call it is indeed going to find a match.
//is that it's a way to customize your server.
//And here we're going to customize the server to serve out that folder.
//definitions and applications will be explained in the upcoming lecture

//For this example imagine we owned the following domain.App dot com.
//Now obviously when someone visits app dot com we want to show them something maybe the home page
//So right here we have one domain app dot com and all of it's going to run on a single express server.What we have setup though are multiple routes.
//route/help
//app.get('',(req,res)=>{
//res.send("Hello Express")
//})

//the name of the dynamic html folder must always be views, if the name is other than views then it must be specified to the express
//using the following syntax
//const viewsPath = path.join(__dirname,'../templates') old path 
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')
//Section7.6 dynamic pages with templating     
//1)Setting up HandleBars
//a)All we need to do is tell Express which templating engine we installed
//b)we do that by using a new method on app that is app.set now set allows you to set a value for a given express setting
//c)add key value
//d)value we use is the name of the module we installed in this case HBS and there we go that single line is all we need to get handlebars set up.

//Set up handlebar engine and the views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath);
//Now we actually use HB S. here HB S. dot register partials register partials takes a path to the directory where your partials live.
//The partials path variable contains the path that the handlebars module needs.

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sandeep Prasad'
    })
   })
//Now it's important to note that so far no one is gonna be able to access index.hbs page from our web server
//to actually serve up this template.
//We need to set up a route.
//So once again that'll be an app dot get call.We're going to show this one on the home page so I'll leave that first string empty.
//1)The only way we've ever sent information back to the requester is via response dot sent.

//2)The goal is to not use to send but to use render render allows us to render one of our views.

//3)We've configured express to use the view engine HP s so with render we can render one of our handlebars templates right here.
//All we need to do is provide as the first argument the name of the particular view we want to use right here inside of quotes.
//That is index.
//So by calling response dot render express goes off and it gets that do it then converts it into htML and to make sure that each html gets back to the requester.
   //////////

//in the above get function consist of 2 arguments 1)its the route of the page eg-:app.com/help ; app.com/about
//2)seond argument is the funciton it consists of the 2 arguments the request and the response.using response we
//return back the data to the requesting entity

//Goal Create a template for help page
//1.Set up a help template to render a help message to the screen 
//2.Set up the help route and render the template with an example message 
//3.Visit the route in the browser and see your help message print
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is the text of the help hbs!',
        name:'Sandeep Prasad'
    })
   })

   app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sandeep Prasad'
    })
   })

app.get('/help',(req,res)=>{
    res.send("Help")
})
//Setup the two new Routes
//1)Set up an about route and render a page title
//2)Set up a weather route and render a page title
app.get('/about',(req,res)=>{
    res.send("About Me")
})
//Goal:Update weather end point to accept address  
//1.No address?Send back an error message
//2.Address Send back the static json 
//--Add address property into the json which returns the provided address 
//3.Test/weather and /weather?address=philadelphia

//Goal : Wire up / Weather
//
//1.Require geocode /forecast into app.js
//2.Use the address to geocode
//3.Use the coordinates to get forecast
//4.Send back the real forecast and location
//var WeatherForecast = require('./Utils/Forecast');
var geoCode = require('./Utils/Geocode');
const Forecast = require('./Utils/Forecast');
app.get('/Weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            Error:"Please provide the address"
        }
        )
    }
    geoCode.geoCode(req.query.address,(error,{Longitude,Lattitude,location}={})=>{
        //above the destructured object default value is empty object in case the null object is passed in the function
        //to prevent the error in case no object was passed in the function argument
        //else exception is thrown that it canot destructure an undefined object 
    if(error)
    {
        return res.send({Error:error})}
    
        Forecast.WeatherForecast(Longitude,Lattitude,(error,forecast)=>{
            if(error){
                return res.send({
                    Error:error
                })}
                return res.send({forecast,
                    location,
                    address:req.query.address});            
        })
        //res.send({
        //Address:req.query.address,
        //Longitude:Longitude,
      //  Lattitude:Lattitude
    })
});
//})

app.get('/help/*',(req,res)=>{
    res.render('404 Not Found',{
        title:'404',
        title1:"Help article not found!",
        name:"Sandeep Prasad"})
})

app.get('*',(req,res)=>{
    res.render('404 Not Found',{
        title:'404',
        name:"Sandeep Prasad",
        title1:"Page not found!"})
})

//Goal:Create and render a 404 page with handlebars
//1)Set up template to render header and footer
//2)Set up template to render the error message in the paragraph
//3)Render the templates for both 404 routes
//-Page was not found
//-Help article not found 
//4)Test your work.Visit /what and /help/units

//create a new Error page header and footer in the views and render it in our response using the handlebars(the path has already been set above)
//A new template to render the error message for both the routes


app.listen(port,()=>{
    console.log('Server is up on the port'+port);
})

console.log(__dirname);
//consist of the path from root of the hard drive to the source folder
console.log(__filename);
//it provides the path to the file itself
//Goal is Now we're going to use the dir name variable to get the correct path to the public directory.
//Goal is We need it to point to the public folder so we can provide express with that path.
//But there's actually a core node module called Path that provides us a ton of great utilities for working with paths.
//find more on nodejs.org->DOCS->here scroll down till p for path->Here we will use only one that is path.join method
//require the node module as const path = require('path'); at the top
//if I want to go up a folder I can use path.join(__dirname,..)  so it will point to web-server
//to go up to another directory use path.join(__dirname,../..)
//go up to single folder , get out of the source directory and then use /public to point to the public directory
//console.log(path.join(__dirname,'../Public'))
//now we can go ahead and configure express to serve that directory up (go above to app.use)

