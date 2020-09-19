const request = require('postman-request');
const geoCode = (address,callback)=>
{
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2FuZGVlcHByYXNhZDA3cmEiLCJhIjoiY2tlcG1qNHV2MGp3bTJ3b2UzaWszcHh4biJ9.2E4T_wWAQK-JMGE6TeezUw&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1Ijoic2FuZGVlcHByYXNhZDA3cmEiLCJhIjoiY2tlcG1qNHV2MGp3bTJ3b2UzaWszcHh4biJ9.2E4T_wWAQK-JMGE6TeezUw&limit=1'
    //console.log(url)
    request(url,(error,response,body)=>{
        //above the response is an object and we use only the body property of the response object so we can use SHORTHAND Syntax as-:
        //{body} and replce the response.body by body
            //JSON.parse(response.body);
            const jsonObjectResponse = JSON.parse(response.body);
            //console.log(jsonObjectResponse.features.length.toString());
            const length = jsonObjectResponse.features.length;            
            //console.log(jsonObjectResponse.features.value);
            if(error)
            {
                callback("Unable to connect to the location service",undefined);
                //occures when wifi/internet is not connected
            }
            //body.features.length === 0

            //else if(jsonObjectResponse.features.value === undefined)
            else if(jsonObjectResponse.features.length===0)
            {
                //occures when the url is incorrect
                //console.log("Inside the if braces")
                callback("Unable to find location.Try another search",undefined);
            }
            else
            {
                
                callback(undefined,{
                    Longitude:jsonObjectResponse.features[0].center[0],
                    Lattitude:jsonObjectResponse.features[0].center[1],
                    location:jsonObjectResponse.features[0].place_name
                })
            }
    })
    
}
module.exports = {geoCode:geoCode}