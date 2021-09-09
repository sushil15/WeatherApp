
# FastWeather

FastWeather is simple weather wep app.It gives you information 
about current weather according to city and also weather forecast 
for next 7 days. 


## 

![App Screenshot](https://www.linkpicture.com/q/fastwether.png)

  
## Demo

https://fastweather.herokuapp.com/

  
## Features

- Simple and clean UI
- Live weather information
- Next 7 days weather forecast
- Different themes according different weather conditions


  
## Tech Stack

 React, HTML,CSS and Bootstrap



  
## Installation

Command to install required packages

```bash
  npm install react-beutiful-dnd
```
```bash
  npm install bootstrap
```
```bash
  npm install react-toastify
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/sushil15/ApalKaam.git
```

Go to the project directory

```bash
  cd ApalKaam
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
## API Reference

### Api to get weather information by city name

```http
  GET api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```




### Api to get forecast information

```http
  GET api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid={API key}
```


  
