const request = require('postman-request');
const WeatherForecast=(longitude,lattitude ,callBack)=>
{
//const url = "http://api.weatherstack.com/current?access_key=1f102a89aeaafdde79c0e50ef0a058dc&query=37.8267,-122.4233&units=f" ;
const url = "http://api.weatherstack.com/current?access_key=1f102a89aeaafdde79c0e50ef0a058dc&query="+encodeURI(lattitude)+","+encodeURI(longitude)+"&units=m" ;
//http://api.weatherstack.com/current?access_key=1f102a89aeaafdde79c0e50ef0a058dc&query=44.1545,-75.7088,&units=f
request(url,(error,response,body)=>{
    //above the response is an object and it can also be done using SHORTHAND syntax like {body} coz body is the only property we require of the response object    
    const responseJSONObject = JSON.parse(body);
    //console.log(responseJSONObject);
    //console.log(url);
    if(error)
    {
        //issue in the network connection
        callBack('Unable to connect to the Weather Service',undefined);
    }
    else if(responseJSONObject.error)
    {
        callBack("Unable to find location",undefined);
    }
    else
    {
        callBack(undefined,            
            "The current temperature is "+responseJSONObject.current.temperature+
            ". The feels like temperature is "+responseJSONObject.current.feelslike+
            ". The weather is "+responseJSONObject.current.weather_descriptions[0]
        );
    }
})
}
module.exports = {WeatherForecast:WeatherForecast}
// or 
