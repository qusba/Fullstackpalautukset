const Course = ({course}) =>{

    const Header = ({course}) => {
        return (
          <div>
            <h2>{course.name}</h2>
          </div>
        )
      }
    
    const Content = ({content}) => {
        return(
        <div>
          {content.parts.map(part => <Part key = {part.id} part = {part.name} exercises = {part.exercises}/>)}
        </div>
        )
        }
    
    const Part = ({part,exercises}) => {
        return(
          <p>
            {part} {exercises}
          </p>
        )
      }
    
    const Total = ({course}) => {
        return (
          <b>
            total of {course.parts.reduce((sum,part) => sum + part.exercises,0)} exercises
          </b>
        )
      }
    
    return(
      <div>
      <Header course = {course}/>
      <Content content = {course}/>
      <Total course = {course}/>
      </div>
    )
  }

export default Course
  
  
  
