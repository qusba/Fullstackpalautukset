const Person = ({person, deleteNumber}) => {
    return(
      <li>
        {person.name} {person.number} <button id={person.id} name={person.name} onClick={deleteNumber}>delete</button>
      </li>
    )
  }

export default Person
