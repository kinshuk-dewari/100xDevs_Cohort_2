
import { useState } from "react";
// 
// function App() {
//   const [count,setCount] = useState(0); 
  
//   return (
//     <div>
//       <CustomButton count = {count} setCount = {setCount}/> 
//       <CustomButton count = {count * 100 } setCount = {setCount}/>
//       <CustomButton count = {count - 1} setCount = {setCount}/> 
        
//     </div>
//   )
// }
// function CustomButton(props){
//   function onclickHandler(){
//     props.setCount(props.count+1);
//   }
//   return <button onClick={onclickHandler}>
//     Counter {props.count}
//   </button>
// }

function App() {
  const [todos, setTodos] = useState([{
    title: "Go to gym",
    description: "Go to gym from 7-9",
    completed: false
  }, {
    title: "Study DSA",
    description: "Study DSA form 9-100",
    completed: true
  }, {
    title: "Study DSA",
    description: "Study DSA form 9-100",
    completed: true
  }, ]); 

  function addTodo() {
    // [1, 2]
    // [...todos, 3] => [1, 2, 3]
    setTodos([...todos, {
      title: "new Todo",
      description: "desc of new todo"
    }])
  }

  return (
    <div>
      <button onClick={addTodo}>Add a random todo</button>
      {todos.map(function(todo) {
        return <Todo title={todo.title} description={todo.description} />
      })}

    </div>
  )
}

function Todo(props) {
  return <div>
    <h1>{props.title}</h1>
    <h2>{props.description}</h2>
  </div>
}

export default App
