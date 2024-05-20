import React from 'react';
import "./CityCard.css";

// coordinates = {[mockData.coord.lat, mockData.coord.lon]}
// weather = {mockData.weather[0].main}
// description = {mockData.weather[0].description}
// city = {mockData.name}
// icon = {mockData.weather[0].icon}
// temp = {mockData.main.temp}

const CityCard = (props) => {

    const showOnMapHandler = () => {
        props.setCoords(props.coordinates, `${props.city}`);
        document.getElementsByClassName("map")[0].scrollIntoView({behavior: "smooth"})
    }
    return (
        <div className='city-card'>
            <img src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`}/>
            <div className='city-card__body'>
                <p className='city-card__body-name'>{props.city}</p>
                <h4 className='city-card__body-weather'>{props.weather}</h4>
                <p className='city-card__body-description'>{props.description}</p>
                <p className='city-card__body-temp'>{props.temp} F</p>
                <button onClick={showOnMapHandler}>Show on Map</button>
            </div>
        </div>
    )
}

export default CityCard