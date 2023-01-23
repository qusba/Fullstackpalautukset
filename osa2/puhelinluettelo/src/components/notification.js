const Notification = ({message, success}) => {
    if (message === ""){
        return(
            <></>
        )
    }
    if(success){
        return(
            <div className = "success">
                {message}
            </div>
        )
    }
    return(
        <div className = "error">
            {message}
        </div>
    )
}

export default Notification