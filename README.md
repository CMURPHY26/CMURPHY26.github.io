# CMURPHY26.github.io

# Technologies used
### HTML, CSS, JavaScript, jQuery

# Approach taken
Weather and traffic are closely tied to our daily lives. Everyday, the weather influences what your commute to work will be like and/or what you can do on your day off. I thought it might be useful to have both types of information displayed as an app that you can check anytime you are leaving the house or the office.

A weather widget was built and connected to the Open Weather API to bring in current local weather data. The user also has the ability to input a new zipcode to view the weather for that area. You will first see information for the current weather including an icon, weather status, temperature, and feels like temperature. The block below displays hourly related weather information for every 3 hours starting approximately 5 hours from the current time. The weather widget has sticky CSS so that when the user scrolls to view the traffic information on desktop, it stays visible.

A separate traffic widget was built, to display transportation related information. The first block displays NY MTA service information (from an iframe or js script) for a variety of transportation types - Subway, Rail, Bus, Bridges & Tunnels. Below the service alerts, you will find an iframe of a traffic map from NY511 that also displays road, and transportation related information. There is a button below the map that opens a modal to display a larger map.

# Live site
https://cmurphy26.github.io/

# Installation instructions
Open the link above in your browser.

# Unsolved problems
There is a mixed content error that is preventing the service alerts from displaying on Github pages. Github pages uses a secure link (https) and the script/iframe from the MTA is unsecure (http). It works locally but not when viewed on github pages.