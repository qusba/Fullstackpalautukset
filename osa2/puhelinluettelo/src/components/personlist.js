import Person from './person.js'

const PersonList = ({filteredPersons, deleteNumber}) => {
    return(
        <ul>
        {filteredPersons.map(person =>
          <Person key = {person.name} person = {person} deleteNumber={deleteNumber}/>)}
      </ul>
    )
}

export default PersonList