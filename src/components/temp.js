import React,{useState,useEffect} from 'react';
import './style.css';
import Weathercard from './weathercard';
const Temp = () => {
    const [searchValue, setSearchValue] = useState("bhopal");
    const [tempInfo, setTempInfo] = useState({})
    const getWeatherInfo=async()=>{
        try{
            let url=URI;
            let res=await fetch(url);
            let data=await res.json();
            console.log(data);
            const{ temp,humidity,pressure }=data.main;
            const{ main:weathermood }= data.weather[0];
            const { name }=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const myWeatherInfo ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            myWeatherInfo.temp=(myWeatherInfo.temp-273).toPrecision(4);
            setTempInfo(myWeatherInfo)
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        getWeatherInfo();
    }, []);
    return (
        <>
        <div className="main_div">
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='search your city' autoFocus id="search" className="searchItem" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                <button className="searchButton" onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
        </div>
        <Weathercard tempInfo={tempInfo} />

        </div>
        </>
    );
};

export default Temp;
