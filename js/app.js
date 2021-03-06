
console.log("It's working!")

// const getZipCode = (event) => {
//     event.preventDefault();
//     let userInput = $("#zipcode").val();
//     console.log(userInput);
// }

//function to display default weather data for Huntington Station, NY
//so there is content to fill before user submits new Zip Code
const defaultWeather = () => {
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b&zip=11746"
    }).then( data => {
        //CONSOLE LOG data response
        console.log(data);
        //CREATE image tag and add src attribute to be dynamic icon value to connect 

        let icon = $("<img>").attr("src", `img/${data.weather[0].icon}@2x.png`).attr("id", "current-icon");
        let degreeF = $("<span>").html("&#8457;");
        let degreeF2 = $("<span>").html("&#8457;");
        
        //CREATE variable for weather status and
        //APPEND to div with h2
        let weatherStatus = $("<span>").attr("id", "weather-description").text(data.weather[0].description);
        $("#current-weather").children().eq(1).append(weatherStatus);
        //CREATE variable for current temperature
        let temperature = $("<h3>").text(`Temperature: ${Math.floor(data.main.temp)}`);
        temperature.append(degreeF);
        //CREATE variable for current feelsLikeTemp
        let feelsLikeTemp = $("<h3>").text(`Feels Like: ${Math.floor(data.main.feels_like)}`);
        feelsLikeTemp.append(degreeF2);
        //APPEND current icon
        $("#current-weather").append(icon);
        //APPEND current temp 
        $("#current-weather").append(temperature);
        //APPEND current feelsLikeTemp
        $("#current-weather").append(feelsLikeTemp);
        let location = $("<h4>").css("margin", "0").text(data.name);
        $('#current-weather').prepend(location);
    });

    //GET AJAX call for local hourly weather data by my zipcode
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b&zip=11746"
    }).then( data => {
        //CONSOLE LOG the data of an array of 40 objects of hourly weather forecast
        console.log(data);
        //LOOP through the data array of objects to access the properties of each hourly object
        for(let i = 0; i < data.list.length; i++) {
            //CREATE img tag and add icon source dynamically
            let icon = $("<img>").attr("src", `img/${data.list[i].weather[0].icon}@2x.png`);
            //create div for hourly card
            let $div = $("<div>").addClass("hour-card");
            //STORE current iteration date in fullDate variable
            let $fullDate = new Date(data.list[i].dt_txt);
            //STORE date in variable
            let $hour1 = $fullDate.getDate();
            //GET day index from fulldate and store in variable
            let dayIndex = $fullDate.getDay();
            //Days array
            let daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
            //SET day variable to dayIndex of daysArray
            let day = daysArray[dayIndex];
            //CREATE dateDiv with day text
            let $dateDiv = $("<div>").attr("id", "day").text(day);

            //Get hour from full date and change to a number to be used in displaying the hourly information
            let $hour = $fullDate.getHours();

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


            if (i === 0) {
                $("#hourly-weather").append($dateDiv);
            }

            //CREATE p tag and add rounded down temp
            let $p = $("<p>").text(`${Math.ceil(data.list[i].main.temp)}`);
            let degreeF = $('<span>').html("&#8457;");
            $p.append(degreeF);
            //APPEND hour string, icon and p tag to div
            $div.append($hour, icon, $p);
            //APPEND div to #hourly-weather
            $("#hourly-weather").append($div);
            //CONDITIONAL IF hour1 date does not match hour2 date
            //THEN prepend the date to that div to show the new day
            if(i > 0) { 
                let $prevfullDate = new Date(data.list[i-1].dt_txt);
                let $hour2 = $prevfullDate.getDate();
                // let $hour2 = (data.list[i-1].dt_txt).substring(5,10);
                if ($hour1 !== $hour2) {
                    $($div).before($dateDiv);
                }
            } 

        }
    });
}

const openModal = () => {
    $(".modal").css("display", "block");
}

const closeModal = () => {
    $(".modal").css("display", "none");
}

$(() => {
    //Click listener to open modal by button
    $("#open-modal").on("click", openModal)
    // $("#close").on("click", closeModal)
    //Click listener on body to close modal
    $(".modal").on("click", closeModal)

    //displays default weather data for zip code: 11746
    defaultWeather();
    //Event listener for form submission to update current weather and hourly forecast based on userInput zip code
    $("form").on("submit", (event) => {
        event.preventDefault();
        let userInput = $("#zipcode").val();
        $('#zipcode').val("");
        
        if(userInput.length === 5) {
            $("#current-weather").children().eq(5).remove();
            $("#current-weather").children().eq(4).remove();
            $("#current-weather").children().eq(3).remove();
            $("#current-weather").children().eq(0).remove();
            $("#weather-status").children().eq(1).remove();

            $("#hourly-weather").empty();
            let $hourlyWeatherH2 = $("<h2>").text("Hourly Forecast");
            $("#hourly-weather").append($hourlyWeatherH2);
            
            //GET AJAX call for local current weather by my zipcode
            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b&zip=" + userInput
            }).then( data => {
                //CONSOLE LOG data response
                console.log(data);
                //CREATE image tag and add src attribute to be dynamic icon value to connect 
        
                let icon = $("<img>").attr("src", `img/${data.weather[0].icon}@2x.png`).attr("id", "current-icon").css("height", "100px");
                let degreeF = $("<span>").html("&#8457;");
                let degreeF2 = $("<span>").html("&#8457;");



                //CREATE variable for current temperature
                let temperature = $("<h3>").text(`Temperature: ${Math.floor(data.main.temp)}`);
                temperature.append(degreeF);
                //CREATE variable for current feelsLikeTemp
                let feelsLikeTemp = $("<h3>").text(`Feels Like: ${Math.floor(data.main.feels_like)}`);
                feelsLikeTemp.append(degreeF2);
                //APPEND current icon
                $("#current-weather").append(icon);
                //APPEND current temp 
                $("#current-weather").append(temperature);
                //APPEND current feelsLikeTemp
                $("#current-weather").append(feelsLikeTemp);
                //CREATE variable for location and
                //PREPEND location to top of div
                let location = $("<h4>").css("margin", "0").text(data.name);
                $('#current-weather').prepend(location);

                //CREATE variable for weather status and
                //APPEND to div with h2
                let weatherStatus = $("<span>").attr("id", "weather-description").text(data.weather[0].description);
                $("#current-weather").children().eq(2).append(weatherStatus);
            });



            //GET AJAX call for local hourly weather data by my zipcode
            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=d8ef3b8d18705a7d1fa4cf253411f06b&zip=" + userInput
            }).then( data => {
                //CONSOLE LOG the data of an array of 40 objects of hourly weather forecast
                console.log(data);
                //LOOP through the data array of objects to access the properties of each hourly object
                for(let i = 0; i < data.list.length; i++) {
                    //CREATE img tag and add icon source dynamically
                    let icon = $("<img>").attr("src", `img/${data.list[i].weather[0].icon}@2x.png`);
                    //create div for hourly card
                    let $div = $("<div>").addClass("hour-card");
                    //STORE current iteration date in fullDate variable
                    let $fullDate = new Date(data.list[i].dt_txt);
                    //STORE date in variable
                    let $hour1 = $fullDate.getDate();
                    //GET day index from fulldate and store in variable
                    let dayIndex = $fullDate.getDay();
                    //Days array
                    let daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
                    //SET day variable to dayIndex of daysArray
                    let day = daysArray[dayIndex];
                    //CREATE dateDiv with day text
                    let $dateDiv = $("<div>").attr("id", "day").text(day);
        
                    //Get hour from full date and change to a number to be used in displaying the hourly information
                    let $hour = $fullDate.getHours();
        
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
        
                    if (i === 0) {
                        $("#hourly-weather").append($dateDiv);
                    }

                    //CREATE p tag and add rounded down temp
                    let $p = $("<p>").text(`${Math.ceil(data.list[i].main.temp)}`);
                    let degreeF = $('<span>').html("&#8457;");
                    $p.append(degreeF);
                    //APPEND hour string, icon and p tag to div
                    $div.append($hour, icon, $p);
                    //APPEND div to #hourly-weather
                    $("#hourly-weather").append($div);
                    //CONDITIONAL IF hour1 date does not match hour2 date
                    //THEN prepend the date to that div to show the new day
                    if(i > 0) { 
                        let $prevfullDate = new Date(data.list[i-1].dt_txt);
                        let $hour2 = $prevfullDate.getDate();
                        // let $hour2 = (data.list[i-1].dt_txt).substring(5,10);
                        if ($hour1 !== $hour2) {
                            $($div).before($dateDiv);
                        }
                    }
        
                }
            
            });
        }

    });


});

