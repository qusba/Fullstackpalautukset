import { useEffect, useState } from 'react'
import Filter from './components/filterform.js'
import PersonForm from './components/personform.js'
import PersonList from './components/personlist.js'
import numberService from './services/numbers.js'
import Notification from './components/notification.js'

const App = () => {
  
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState(true)

  useEffect(() => {
    numberService
      .getAllNumbers()
      .then(initialNumbers =>
        setPersons(initialNumbers))
    },[]
    )

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(person => person.name)
    if(names.includes(numberObject.name)){
      if(window.confirm(`${numberObject.name} already exists in the phonebook, do you want to replace the number?`)){
        changeNumber(numberObject)
      }
      else{
        return
      }
    } 
    else{
    
    numberService
    .addNewNumber(numberObject)
    .then(returnedNumber => {
      setPersons(persons.concat(returnedNumber))
      setNewNumber("")
      setNewName("")
      handleNotification("New number added succesfully!",true)
    })
    .catch(error => {
      handleNotification(error.response.data.error)
    })
    }
  }

const changeNumber = (numberObject) =>{
  const samePerson = persons.filter(person => person.name === numberObject.name)
  const id = samePerson[0].id
  numberService.replaceNumber(id, numberObject)
  .then(returnedPerson => {
    setPersons(persons.map(person => person.name !== numberObject.name ? person : returnedPerson))
    setNewNumber("")
    setNewName("")
    handleNotification("Number replaced succesfully!",true)
    })
  .catch(error =>{
    handleNotification("The number no longer exists on the server!", false)
    setNewNumber("")
    setNewName("")
    setPersons(persons.filter(person => person.id !== id))
    })
}

  const deleteNumber = (event) =>{
    event.preventDefault()
    if(window.confirm(`Are you sure you want to delete ${event.target.name}?`)){
      numberService.removeNumber(event.target.id)
      .then(response =>
        numberService.getAllNumbers()
        .then(numbers => {
          setPersons(numbers)
          handleNotification("Number deleted succesfully!",true)
          }
          ))
      
    } else{
      return
    }

  }

  const handleNotification = (message, type) =>{
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() =>{
      setNotificationType(type)
      setNotificationMessage("")
    },5000)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} success = {notificationType} />
      
      <p>
        <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter} 
        />
      </p>
      <h2>Add a new</h2>
      
      <PersonForm 
      addNumber={addNumber} 
      newName = {newName} 
      handleNewName = {handleNewName}
      newNumber = {newNumber} 
      handleNewNumber = {handleNewNumber}
      />

      <h2>Numbers</h2>
      <PersonList filteredPersons={filteredPersons} deleteNumber = {deleteNumber}/>
    </div>
  )

}

export default App