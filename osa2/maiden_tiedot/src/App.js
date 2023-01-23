import { useEffect,useState} from 'react'
import axios from 'axios'
import Filter from './components/filter.js'
import { OneResult,TenOrUnderResults,TooManyResults } from './components/result.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)})
  },[])



  const handleNewFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const skipWriting = (string) => {
    setFilter(string)
  }

  if (filteredCountries.length === 0) {
    return(
      <div>
      <Filter filter = {filter} handleNewFilter = {handleNewFilter} />
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return(
      <div>
        <Filter filter = {filter} handleNewFilter = {handleNewFilter} />
        <OneResult filteredCountries={filteredCountries} />
      </div>
    )
  }

  if (filteredCountries.length <= 10) {
    return(
      <div>
      <Filter filter = {filter} handleNewFilter = {handleNewFilter} />
      <TenOrUnderResults filteredCountries={filteredCountries} myfunction = {skipWriting}/>
    </div>
    )
  }

  else {
    return(
      <div>
      <Filter filter = {filter} handleNewFilter = {handleNewFilter} />
      <TooManyResults />
    </div>
    )
  }
}















export default App