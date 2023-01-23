import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAllNumbers = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNewNumber = (newNumber) => {
    const request = axios.post(baseUrl, newNumber)
    return request.then(response => response.data)
}

const removeNumber = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const replaceNumber = (id, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(response => response.data)
}

export default {getAllNumbers, addNewNumber, removeNumber, replaceNumber}