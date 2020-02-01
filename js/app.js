
console.log("It's working!")

$(() => {
    console.log($)
    $.ajax({
        url:"http://api.openweathermap.org/data/2.5/weather?zip=11746,us&units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b"
    }).then( data => {
        console.log(data);
        let icon = $("<img>").attr("src", `img/${data.weather[0].icon}@2x.png`).attr("id", "current-icon");
        // let degreeF = $("<span>").append("&#8457");
        let temperature = $("<h3>").text(`Temperature: ${Math.floor(data.main.temp)}`);
        let feelsLikeTemp = $("<h3>").text(`Feels Like: ${Math.floor(data.main.feels_like)}`);
        $("#current-weather").append(icon);
        $("#current-weather").append(temperature);
        $("#current-weather").append(feelsLikeTemp);
    });

});