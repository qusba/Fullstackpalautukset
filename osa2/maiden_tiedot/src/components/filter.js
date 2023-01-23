const Filter = ({filter,handleNewFilter}) => {
    return(
        <div>
        find countries <input
        value = {filter}
        onChange = {handleNewFilter}/>
      </div>
    )
}
export default Filter