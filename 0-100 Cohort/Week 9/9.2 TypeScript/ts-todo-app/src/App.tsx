import './App.css'

function App() {
  return (
    <>
      <Todos task='Go to gym' desc="this is gym description" done={true}/>
    </>
  )
}
interface TodoProp{
  task:string,
  desc:string,
  done:boolean
}
function Todos(props:TodoProp){
  return <>
    <h2>{props.task}</h2>
    <p>{props.desc}</p>
    { props.done ? <p>Task Completed</p> : <p>Task Is Not Completed</p>}
  </>
}


export default App
