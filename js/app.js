
console.log("It's working!")

$(() => {
    console.log($)
    //GET AJAX call for local current weather by my zipcode
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?zip=11746,us&units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b"
    }).then( data => {
        //CONSOLE LOG data response
        console.log(data);
        //CREATE image tag and add src attribute to be dynamic icon value to connect 
        let icon = $("<img>").attr("src", `img/${data.weather[0].icon}@2x.png`).attr("id", "current-icon");
        // let degreeF = $("<span>").append("&#8457");
        //CREATE variable for current temperature
        let temperature = $("<h3>").text(`Temperature: ${Math.floor(data.main.temp)}`);
        //CREATE variable for current feelsLikeTemp
        let feelsLikeTemp = $("<h3>").text(`Feels Like: ${Math.floor(data.main.feels_like)}`);
        //APPEND current icon
        $("#current-weather").append(icon);
        //APPEND current temp 
        $("#current-weather").append(temperature);
        //APPEND current feelsLikeTemp
        $("#current-weather").append(feelsLikeTemp);
    });

    //GET AJAX call for local hourly weather data by my zipcode
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/forecast?zip=11746,us&units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b"
    }).then( data => {
        //CONSOLE LOG the data of an array of 40 objects of hourly weather forecast
        console.log(data);
        //LOOP through the data array of objects to access the properties of each hourly object
        for(let i = 0; i < data.list.length; i++) {
            //CREATE img tag and add icon source dynamically
            let icon = $("<img>").attr("src", `img/${data.list[i].weather[0].icon}@2x.png`);
            //create div for hourly card
            let $div = $("<div>").addClass("hour-card");
            //Get full date and time from each hourly object
            let $fullDateTime = data.list[i].dt_txt;
            //Get month and day info from full date
            let $fullDate = $fullDateTime.substring(5,10);
            console.log($fullDate);
            //Get hour from full date and change to a number to be used in displaying the hourly information
            let $hour = Number($fullDateTime.substring(11,13));

            //Conditional IF hour === 12 
            //THEN hour = hour + PM
            if($hour === 12) {
                $hour = `${$hour} PM`;
            //ELSE IF hour < 12
            //THEN hour = hour + AM
            } else if ($hour < 12) {
                //IF hour === 0 (24:00)
                //THEN hour = 12 + AM
                if($hour === 0) {
                    $hour = "12 AM"
                    //ELSE hour = hour + AM
                } else {
                $hour = `${$hour} AM`;
                }
                //IF hour > 12
                //THEN hour - 12 and hour = hour + PM
            } else if ($hour > 12) {
                $hour -= 12;
                $hour = `${$hour} PM`;
            }

            // console.log(typeof $hour)
            //CREATE p tag and add rounded down temp
            let $p = $("<p>").text(`${Math.ceil(data.list[i].main.temp)}`);
            //APPEND hour string, icon and p tag to div
            $div.append($hour, icon, $p);
            //APPEND div to #hourly-weather
            $("#hourly-weather").append($div);
        }
     
    });

});


/* <script type="text/javascript" src="http://www.mta.info/sites/all/libraries/mta_WidgetScripts/serviceStatusWidget.js"></script>  */