import React, { useState,useEffect } from 'react';

const Forecast = (props) => {
    const [forecastData, setForeCastData] = useState([]);

    const getForecastData=()=>{
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.dataForFc.latitude}&lon=${props.dataForFc.longitude}&appid=354c90bf4df0530bbdf29f114a1ab02f&units=metric`)
        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.dataForFc.latitude}&lon=${props.dataForFc.longitude}&units=metric&exclude=hourly,minutely,alerts,current&appid=4b433a565da091875434ce6fa6027df6`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            // setForeCastData(data.daily);
            setForeCastData(data.list)
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
                <div className="col-12">
                    <h5 className="mb-2 text-white">Next 5 Days Forcast</h5>
                    <div className='day_row d-flex align-items-center text-center text-white'>
                            <span className='col-4'>Date</span>
                            <span className='col-4'>Weather</span>
                            <span className='col-4'>Min/Max Temp</span>
                        </div>
                    <div className='forecastInfo_div'>
                        {
                            forecastData?.map((data, id)=>{
                                let date = new Date(data.dt*1000)

                                return (
                                    <div className="d-flex day_row" key={id}>
                                        <div className="col-4 text-center">
                                            <span>{date.toLocaleDateString()}</span><br/>
                                            <span>{date.toLocaleTimeString()}</span>
                                        </div>
                                        <div className="col-4  text-center">
                                            <img className="img-fluid fc_weather_icon" alt="weather_icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
                                            <span>{data.weather[0].main}</span>
                                        </div>
                                        <div className="col-4  text-center">
                                            <span>{data.main.temp_max+"/"+Number(data.main.temp_min)}<sup>0</sup>c</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forecast
