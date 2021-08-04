import React, { useState,useEffect } from 'react';
import "../App.css";

const Forecast = (props) => {
const [forecastData,setForeCastData]=useState([]);
 const getForecastData=()=>{
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.dataForFc.latitude}&lon=${props.dataForFc.longitude}&units=metric&exclude=hourly,minutely,alerts,current&appid=4b433a565da091875434ce6fa6027df6`)
    .then((res)=>{
     return res.json();
    })
    .then((data)=>{
        setForeCastData(data.daily);
    })
    .catch((error)=>{
     console.log(error)
    })
}

useEffect(() => {
    getForecastData();
}, [])

    return (
        <div className="container-fluid forecast_div">
         <div className="row">
             <div className="col-4 forecast_header">
               <i onClick={()=>props.setForecast(false)} className="fas fa-long-arrow-alt-left  backBtn"></i>
             </div>
             <div className="col-8 forecast_header">
              <p><i style={{marginRight:"10px"}}className="fas fa-map-marker-alt locationImg"></i>{props.city}</p>
             </div>
         </div> 
         <div className="row mt-2">
              <div className="col-10 forecast_curWeather">
                  <div className="row">
                      <div className="col-6 my-auto">
                          <p className="mb-2">Today's Weather</p>
                          <p>{props.dataForFc.weatherType}</p>
                          <p>{props.dataForFc.minTemp}<sup>0</sup>c</p>
                      </div>
                      <div className="col-6 text-center fc_curWeatherImg">
                      <img className="img-fluid" alt="weather" src={`http://openweathermap.org/img/wn/${props.dataForFc.weatherIcon}@2x.png`}></img>
                      </div>
                  </div>
                  
              </div>
         </div>
         <div className="row mt-4">
             <div className="col-11 forecastInfo_div">
                 <h5 className="mb-4">Next Week</h5>
                 {
                   forecastData.slice(1,forecastData.length).map((data,id)=>{
                       return (
                       <div className="row day_row" key={id}>
                            <div className="col-3  fc_col ">
                                <p>{new Date(data.dt*1000).toDateString().split(" ")[1]+" "+
                                 new Date(data.dt*1000).toDateString().split(" ")[2]}</p>
                            </div>
                            <div className="col-2  fc_col "><p>{ new Date(data.dt*1000).toDateString().split(" ")[0]}</p></div>
                            <div className="col-2  fc_col "><img className="img-fluid fc_weather_icon" alt="weather_icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img></div>
                            <div className="col-2  fc_col "><p>{data.weather[0].main}</p></div>
                            <div className="col-3  fc_col "><p>{data.temp.max+"/"+Number(data.temp.min)}<sup>0</sup>c</p></div>
                       </div>
                     )
                   })
               }
             </div>
         </div>
        </div>
    )
}

export default Forecast
