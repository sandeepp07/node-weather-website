//console.log("client side javascript file is loaded!")
//fetch('https://puzzle.mead.io/puzzle').then((response)=>{response.json().then((data)=>{
//console.log(data)})})

//Task->
//1)Create a Search form on Index.hbs
//2)Using querySelector fetch the form inside app.js
//3)Using query Selector fetch the value of the input text and console it.
//4)Using event function stop the page from refreshing on submitting the form 
//5)console the valuse of the location in the console
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.querySelector('#message-1');
const para2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    para2.textContent="";
    para1.textContent="Loading...";
    const location = search.value;
    //console.log(search.value);
    //functioning of the fetch method . we pass the api endpoint to the argument of the fetch function and in then callback the function
//the response is returned to the argument of then function and this data is logged to the console

//Goal : Fetch Weather
//1.Set up a call to fetch to fetch weather for boston
//2.Get the parse JSON response
//- if error property print the error -If no error property print location and forecast

//url - http://localhost:3000/Weather?address=Boston this is the api end point on hitting this api we get the 
//weather details in form of json in the response
fetch('http://localhost:3000/Weather?address='+location).then((response)=>{
    response.json().then((data)=>
    {
        if(data.Error)
        {
            //console.log(data);
            //console.log(data.Error)
            para1.textContent=data.Error;
        }
        else
        {
            //console.log(data);
            //console.log(data.Location)
            //console.log(data.forecast)}})})
            para1.textContent=data.location;
            para2.textContent=data.forecast;
}
})
})
})



//Use the input value to get the weather
//1.Migrate fetch call into the submit call back
//2.Use the search text as the address query string value
//3.Submi the form with valid and invalid value to test!













