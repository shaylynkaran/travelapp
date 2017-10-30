$( document ).ready(function() {
  $('button').click(function () {
    var city = (this).innerHTML;

    var xhr_images = new XMLHttpRequest();
    xhr_images.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20has_geo%3D%22true%22%20and%20text%3D%22" + city + "%2C%20ES%22%20and%20api_key%3D%2292bd0de55a63046155c09f1a06876875%22%3B&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", false);
    xhr_images.send();


    var xhr_forecast = new XMLHttpRequest();
    xhr_forecast.open("GET", "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'" + city + "'%2C%20FL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", false);
    xhr_forecast.send();


    var json_images = JSON.parse(xhr_images.responseText);
    
    var json_forecast = JSON.parse(xhr_forecast.responseText);

    //document.write("<h2>" + city + "</h2>");
    
    // do while loop for 6 images of city
    var all_forecast = "", all_img = "", img_src, counter = 0;
    do{
      img_src = "https://farm" + json_images.query.results.photo[counter].farm + ".staticflickr.com/" + json_images.query.results.photo[counter].server + "/" + json_images.query.results.photo[counter].id + "_" + json_images.query.results.photo[counter].secret + "_q.jpg";
      all_img += "<img src='" + img_src + "'>";
      counter++;
    }while(counter <= 5);
    // end of do while loop - IMAGES
    
    document.getElementById("images").innerHTML = "<h2>Images for " + city + "</h2><br>" + all_img;
    
    
    /*document.write("<h1>"+ city + "</h1><br>");
    document.write("<h2>5-day Forecast:</h2> ");*/
    
    // do while loop for 5 day forecast
    counter = 0;
    do{
      all_forecast += "<ul><li>" + json_forecast.query.results.channel.item.forecast[counter].day + ", " + json_forecast.query.results.channel.item.forecast[counter].date +"<br><li>High: " + json_forecast.query.results.channel.item.forecast[counter].high +"<br><li>Low: " + json_forecast.query.results.channel.item.forecast[counter].low +"<br><li>" + json_forecast.query.results.channel.item.forecast[counter].text +"<br></ul>";
      counter++;
    } while ( counter < 5);
    // end of do while loop - FORECAST
    
    document.getElementById("forecast").innerHTML = "<h2>5-day Forecast for " + city + ":</h2><br>" + all_forecast;
    
  });// end of click
});//end of ready