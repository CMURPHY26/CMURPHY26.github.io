# CMURPHY26.github.io

# Technologies used
### HTML, CSS, JavaScript, jQuery

# Approach taken
I created a weather widget connected to the Open Weather API to bring in current local weather data. The user also has the ability to input a new zipcode to view the weather for that area. 

I created a separate traffic widget, that displays current MTA service information (from an iframe or js script) for a variety of transportation types - Subway, Rail, Bus, Bridges & Tunnels. Below the service alerts, you will find an iframe of a traffic map from NY511 that also displays road, and transportation related information.

# live site
https://cmurphy26.github.io/

# installation instructions
Open the link above in your browser.

# unsolved problems
There is a mixed content error that is preventing the service alerts from displaying on Github pages. Github pages uses a secure link (https) and the script/iframe from the MTA is unsecure (http). It works locally but not when viewed on github pages.