const Filter = ({newFilter,handleNewFilter}) => {
    return(
        <>
        filter shown with <input
        value = {newFilter}
        onChange = {handleNewFilter}/>
        </>
    )
}
export default Filter