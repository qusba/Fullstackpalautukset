import { useEffect,useState } from "react"
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const OneResult = ({filteredCountries}) => {

    const country = filteredCountries[0]
    const countrysLanguages = Object.keys(country.languages)
    const latlng = country.capitalInfo.latlng
    const [weather_data, setWeather] = useState('')
    
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
        .then(response => {
            setWeather(response.data)
            })
        },[])

    return(
        <div>
            <h2>{country.name.common}</h2>
            <p>
                capital {country.capital}
            </p>
            <p>
                area {country.area}
            </p>
            <p>
                <b>languages:</b>
            </p>
            <ul>
                {countrysLanguages.map(language =>
                    <li key={language}>{language}</li>)}
            </ul>
            <img src = {country.flags.png} alt = "Flag of the county" width="200" height="150"></img>
            <Weather weather_data={weather_data} country = {country} />
               
       
        </div>
        )
    }

const Weather = ({weather_data, country}) => {
    if (typeof weather_data === 'string'){
        return(
            <></>
        )
    }
    else {
    return(
        <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {weather_data.main.temp} celsius</p>
        <img src = {`http://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`} alt = "weather icon"></img>
        <p>wind {weather_data.wind.speed} m/s</p>
        </div>
    )
    }
}
    
const TenOrUnderResults = ({filteredCountries, myfunction}) => {
    return(
        <div>
            <ul>
                {filteredCountries.map(country =>
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={ () => myfunction(country.name.common)}>Show</button>
                    </li>)}
            </ul>     
        </div>
        )
    }
 
const TooManyResults = () => {
    return (
        <div>
            Too many results, specify
        </div>
    )
}

export {OneResult,TenOrUnderResults,TooManyResults}