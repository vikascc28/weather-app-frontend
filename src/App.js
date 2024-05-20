import React, { useCallback, useEffect, useState } from 'react';
import Map from './components/Map';
import LoadingSpinner from './components/LoadingSpinner';
import "./App.css";
import CityCard from './components/CityCard';

const maxPageNo = 3;

const App = () => {
  const [data, setData] = useState([]);
  const [coordinates, setCoordinates] = useState([24.8167, 93.95]);
  const [pageNo, setPageNo] = useState(1);
  const [popUpInfo, setPopUpInfo] = useState(""); 
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [error, setError] = useState(false);

  const coordinatesChangeHandler = (coordinates, popInfo) => {
    setCoordinates(coordinates);
    setPopUpInfo(popInfo);
  }

  const getPageData = useCallback(async (page) => {
    try{
      setError(false);
      setShowLoadingSpinner(true);
      const response = await fetch(`http://localhost:8080/weather?page=${page}&limit=10`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })

      if(!response.ok){                         //handling errors
        throw new Error("Data Not fetched");
      }
    
    const val = await response.json();
    
    setShowLoadingSpinner(false);
    setData(val.data);

  }catch(err){
    console.log(err);
    setShowLoadingSpinner(false);
    setError(true);
  }

  }, [])

  const pageNoDecreaseHandler = () => {
    if(pageNo > 1){
      setPageNo(prev => prev-1);
    }
  }

  const pageNoIncreaseHandler = () => {
    if(pageNo < maxPageNo){
      setPageNo(prev => prev + 1);
    }
  }

  useEffect(() => {
    getPageData(pageNo);
  }, [pageNo])

  return (
    <div>
      <h1 className='app-head'>Weather App With Paginated API</h1>
      <Map center = {coordinates} popUpShow = {popUpInfo}/>       {/** sending the data from a high level component */}
      <div className='pagination'>                                {/** increasing and decreasing pageNo */}
          <button onClick={pageNoDecreaseHandler}>{`<`}</button>
            <p><span className='page-no'>{pageNo}</span> of {maxPageNo}</p>
          <button onClick={pageNoIncreaseHandler}>{`>`}</button>
      </div>
      <div className='cities'>
      {error && <h1>Could Not Fetch Data</h1>}
      {showLoadingSpinner && <LoadingSpinner/>}                   
        {!showLoadingSpinner && !error && data.map((city) => {
          return(
            <CityCard             // making city cards
              key = {city.id}
              coordinates = {[city.coord.lat, city.coord.lon]}
              weather = {city.weather[0].main}
              description = {city.weather[0].description}
              city = {city.name}
              icon = {city.weather[0].icon}
              temp = {city.main.temp}
              setCoords = {coordinatesChangeHandler}
        />
          )
        })}
      </div>
    </div>
  )
}

export default App