import React,{useEffect, useState}from 'react';
import "../App.css";
import Loader from './Loader';
import Forecast from './Forecast';


const Weather=()=>{
const [city,setCity]=useState("satara");
const [issue,setIssue]=useState(0);
const [loader,setLoader]=useState(false);
const [showForecast,setShowForecast]=useState(false);
const [search,setSearch]=useState(false);
const [data,setData]=useState({
    mainTemp:"",
    minTemp:"",
    maxTemp:"",
    pressure:"",
    humidity:"",
    weatherType:"",
    windSpeed:"",
    latitude:"",
    longitude:"",
    weatherIcon:""
})

const Theme1=()=>{
    document.body.style.setProperty("background-color","#F3B07C")
    document.querySelector(".weather_div").style.setProperty("background-image","linear-gradient(#FAE177 50%,#FEC58E,#FFBE94)"); 
    document.querySelectorAll(".bottom_div").forEach(element => {
        element.style.setProperty("background-color","#FFCCA5");
    }); 
}
const Theme2=()=>{
    document.body.style.setProperty("background-color","#5BD9D7");
    document.getElementsByClassName("weather_div")[0].style.setProperty("background-image","linear-gradient(#6DFAE5 50%,#6FF2E9,#72EFED)");
    document.querySelectorAll(".bottom_div").forEach(element => {
       element.style.setProperty("background-color","#95F7F5");
   }); 
}
const Theme3=()=>{
    document.body.style.setProperty("background-color","#5AC9FA");
    document.getElementsByClassName("weather_div")[0].style.setProperty("background-image","linear-gradient(#5BDEFD 50%,#5BCEFC,#5ACBF9)");
    document.querySelectorAll(".bottom_div").forEach(element => {
       element.style.setProperty("background-color","#88D9FB");
   }); 

}

let getWeatherData=(city)=>{     
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=354c90bf4df0530bbdf29f114a1ab02f&units=metric`)
    .then((data)=>{
     setLoader(false);
     return data.json();
    })
    .then((res)=>{
        setData({
            mainTemp:res.main.temp,
            minTemp:res.main.temp_min,
            maxTemp:res.main.temp_max,
            pressure:res.main.pressure,
            humidity:res.main.humidity,
            weatherType:res.weather[0].main,
            windSpeed:res.wind.speed,
            latitude:res.coord.lat,
            longitude:res.coord.lon,
            weatherIcon:res.weather[0].icon
        })
        setIssue(0);
        setSearch(true);
        if(res.weather[0].main==="Clear"  || res.weather[0].main==="Dust"){
            Theme1();
        }
        if(res.weather[0].main==="Snow" || res.weather[0].main==="Haze" || res.weather[0].main==="Mist"){
            Theme2();
        }
        if(res.weather[0].main==="Thunderstorm" || res.weather[0].main==="Clouds" || res.weather[0].main==="Rain"){
            Theme3();
        }
        
    })
    .catch((error)=>{
        console.log(error);
        setIssue(1);
        setSearch(false);
    })

}

const setCurLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat=position.coords.latitude;
        let lon=position.coords.longitude;
        fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.bb289ca8543786ac196ffd1355b8022f&lat=${lat}3&lon=${lon}&format=json`)
        .then((data)=>{
         return data.json();
        })
        .then((res)=>{
            try{
                if(res.address.city!==undefined){
                     setCity(res.address.city.toLowerCase());
                     getWeatherData(res.address.city.toLowerCase());
                }else{
                    setCity(res.address.county.toLowerCase());
                    getWeatherData(res.address.county.toLowerCase()); 
                }
            }
            catch(err){
                console.log(Error);
            }
        })
        .catch((error)=>{
         console.log(error);
        })


      });
}


useEffect(()=>{
    setLoader(true);
    setCurLocation();
    getWeatherData(city);   
},[])

useEffect(()=>{
setLoader(true);
if(showForecast===false){
getWeatherData(city);
}
},[showForecast])


const getCity=(e)=>{
setCity(e.target.value.toLowerCase());
setSearch(false);
}

const getData=()=>{
if(city!==""){
    setLoader(true);
    setTimeout(()=>{
        setLoader(false);
        getWeatherData(city);
    },1000)   
}

}

const setForecast=(val)=>{
    if(city!=="" && search===true){
        setShowForecast(val);
    }
}

 return(
showForecast===true?
<Forecast 
setForecast={setForecast} dataForFc={data} city={city}/>
:
<div className="container weather_div">
<div className="row">
    <div className="col-12 top_div d-flex justify-content-center pl-4">
         <div className="input_div">
          <i className="fas fa-map-marker-alt locationImg"></i>
          <input className="text-center" type="text" value={city} onChange={getCity} placeholder="Enter city name" required/>
       </div>
        <div className="button_div">
          <button onClick={getData}>Search</button>
       </div>
    </div>
     {
      loader===true?<Loader/>
      :
       issue===1?
       <div className="issue">
        <p>No data Found</p>
       </div>
      :
     <>
    <div className="col-12 weather_img ">
     <img className="img-fluid"  src={`http://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`} alt="weather" />
    </div>
    <div className="col-12 weather_info text-center">
        <p className="weather_type">It's {data.weatherType}</p>
        <p onClick={()=>setForecast(true)} className="forecast_btn">see forecast</p>
        <p className="temp">{data.mainTemp}<sup>0</sup>c</p>
        <div className=" weather_info_2">
            <div>
             <i className="fas fa-wind"></i>
             <p className="wind_speed">{data.windSpeed} m/sec</p>
            </div>
            <div>
            <i className="fas fa-tint"></i>
             <p className="humiduty">{data.humidity}%</p>
            </div> 
        </div>
    </div>
    <div className="col-12 weather_info_3 text-center">
        <div className="min_temp bottom_div">
           <p className="min_temp_p1">Min Temp</p>
           <i className="fas fa-temperature-low"></i>
           <p className="min_temp_p2">{data.minTemp}<sup>0</sup>c</p>
        </div>
        <div className="max_temp bottom_div"> 
          <p className="max_temp_p1">Max Temp</p>
           <i className="fas fa-temperature-high"></i>
           <p className="max_temp_p2">{data.maxTemp}<sup>0</sup>c</p> 
        </div>
        <div className="pres bottom_div"> 
           <p className="pres_p1">Pressure</p>
           <i className="fas fa-tachometer-alt"></i>
           <p className="pres_p2">{data.pressure} hPa</p>
        </div>
    </div>
    </>
    }
</div>

</div>   
);
}

export default Weather;
