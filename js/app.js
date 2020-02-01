
console.log("It's working!")

$(() => {
    console.log($)
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?zip=11746,us&units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b"
    }).then( data => {
        //Console log data response
        console.log(data);
        //Create image tag and add src attribute to be dynamic icon value to connect 
        let icon = $("<img>").attr("src", `img/${data.weather[0].icon}@2x.png`).attr("id", "current-icon");
        // let degreeF = $("<span>").append("&#8457");
        let temperature = $("<h3>").text(`Temperature: ${Math.floor(data.main.temp)}`);
        let feelsLikeTemp = $("<h3>").text(`Feels Like: ${Math.floor(data.main.feels_like)}`);
        $("#current-weather").append(icon);
        $("#current-weather").append(temperature);
        $("#current-weather").append(feelsLikeTemp);
    });

    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/forecast?zip=11746,us&units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b"
    }).then( data => {
        console.log(data);
        for(let i = 0; i < data.list.length; i++) {
            let icon = $("<img>").attr("src", `img/${data.list[i].weather[0].icon}@2x.png`);
            let $div = $("<div>").addClass("hour-card");
            let $fullDateTime = data.list[i].dt_txt;
            let $hour = Number($fullDateTime.substring(11,13));
            if($hour === 12) {
                $hour = `${$hour} PM`;
            } else if ($hour < 12) {
                if($hour === 0) {
                    $hour = "12 AM"
                } else {
                $hour = `${$hour} AM`;
                }
            } else if ($hour > 12) {
                $hour -= 12;
                $hour = `${$hour} PM`;
            }

            // console.log(typeof $hour)
            let $p = $("<p>").text(`${Math.ceil(data.list[i].main.temp)}`);
            $div.append($hour, icon, $p);
            $("#hourly-weather").append($div);
        }
     
    });

});


/* <script type="text/javascript" src="http://www.mta.info/sites/all/libraries/mta_WidgetScripts/serviceStatusWidget.js"></script>  */