// component mounted and unmounted 
import { useEffect, useState } from 'react'
import "./App.css";

// What are hooks ?
// Hooks are a feature introduced in React 16.8 that allow you to use state 
// and other React features without writing a class. They are functions that 
// let you "hook into" React state and lifecycle features from function components.


// function App() {
//   const [render, setRender] = useState(true);

//   useEffect(() => {
//     setInterval(() => {
//       setRender(r => !r);
//     }, 5000)
//   }, []);

//   return (
//     <>
//       {render ? <MyComponent /> : <div></div>}
//     </>
//   )
// }

// function based approach 

// function MyComponent() {

// Life Cycle Event : an event that gets triggered when a life cycle of an event gets changed, i.e. mount/unmount
//  useEffect its used for this, it lets us to hook to the component.

//   useEffect(() => {   
//     console.error("component mounted");

//     return () => {
//       console.log("component unmounted");
//     };
//   }, []);

//   return <div>
//     From inside my component
//   </div>
// }

// class based approach 

// class MyComponent extends React.Component{
//   componentDidMount(){
//     console.log("component mounted");
//   }
//   componentWillUnmount(){
//     console.log("component unmounted");
//   }
//   render(){
//     <div>
//      From inside my component
//   </div>
//   }
// }
// export default App


//  DATA FETCHING WITHOUT CUSTOM HOOKS

// import axios from 'axios'

// function App() {
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     axios.get("https://sum-server.100xdevs.com/todos")
//       .then(res => {
//         setTodos(res.data.todos);
//       })
//   }, [])

//   return (
//     <>
//       {todos.map(todo => <Track todo={todo} />)}
//     </>
//   )
// }

// function Track({ todo }) {
//   return <div>
//     {todo.title}
//     <br />
//     {todo.description}
//   </div>
// }

// export default App


// DATA FETCHING USIND CUSTOM DATA FECTING HOOK

// import axios from 'axios'

// CUSTOM DATA FETCHING HOOK , like for detecting that the data status : loading or loaded. 

// function useTodos(n){
//   const [todos, setTodos] = useState([])
//   const [loading, setLoading] = useState(true); // creating a loading parameter 

//   useEffect(() => {
//     calling backend after every n seconds

//     const value = setInterval(()=>{
//       axios.get("https://sum-server.100xdevs.com/todos")
//       .then(res => {
//         setTodos(res.data.todos);
//         setLoading(false);
//       })
//     },n*1000)

//     axios.get("https://sum-server.100xdevs.com/todos")
//       .then(res => {
//         setTodos(res.data.todos);
//         setLoading(false);
//     })

//     creating a clean up function 

//     return ()=>{
//       clearInterval(value)
//     }
//   }, [n])
//   return {todos,loading};
// }

// function App() {
//   const {todos,loading} = useTodos(10);
//   if(loading){
//     return <div>
//       loading...
//     </div>
//   }
//   return (
//     <>
//       {todos.map(todo => <Track todo={todo} />)}
//     </>
//   )
// }

// function Track({ todo }) {
//   return <div>
//     {todo.title}
//     <br />
//     {todo.description}
//   </div>
// }

// export default App

// CUSTOM HOOK FOR CHECKING IF YOU ARE ONLINE OR OFFLINE

// function useOnline(){
//   const [online,setOnline]= useState(window.navigator.onLine);
//   useEffect(()=>{
//     window.addEventListener("online",()=>{
//       setOnline(true);
//     })
//     window.addEventListener("offline",()=>{
//       setOnline(false);
//     })
//   },[])
//   return online;
// }

// function App(){
//   const online = useOnline();
//   return <>
  // { online ? <div> your are online </div> : <div> your are ofline </div> }
//   </>
// }
// export default App

// CUSTOM HOOK FOR MOUSE COORDINATE

// const useMousePointer = () => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     setPosition({ x: e.clientX, y: e.clientY });
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return position;
// };

// function App() {
//   const mousePointer = useMousePointer();

//   return (
//     <>
//       Your mouse position is {mousePointer.x} {mousePointer.y}
//     </>
//   )
// }

// export default App

// CUSTOM HOOK FOR CALLING A FUNCTION AFTER EVERY 'N' SECONDS

// function useInterval(fn,timeout){
//   useEffect(()=>{
//     setInterval(()=>{
//       fn()
//     },timeout);
//   },[])
// }
// function App() {
//   const [count,setCount] = useState(0);
//   useInterval(()=>{
//     setCount((prev)=>prev+1)
//   },1000)
//   return (
//     <>
//       {count}
//     </>
//   )
// }
// export default App

// CUSTOM HOOK FOR DEBOUNCING

// useDebounce

// creating a hook that debounces a CSSMathValue, given:
// 1. The value that needs to be debounced,
// 2. The interval at which the value should be debounced


function useDebounce(value,timeout){

  // const [debouncedValue,setDebouncedValue] = useState(value);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setDebouncedValue(value);
  //   },timeout)
  // },[value]);


  // return debouncedValue;

  
// additional value should update afetr the 'X' milliseconds only when the last keystroke is typed
  const [debouncedValue,setDebouncedValue] = useState(value);

  useEffect(()=>{
    // starts the clock, but if another update rolls in within 'X' milliseconds,
    // it would clear the clock and start a new one
    let timeoutNumber = setTimeout(()=>{
      setDebouncedValue(value);
    },timeout);

    // only the clock for the last thing that is getting updated remains active, 
    // rest all of the clocks gets cleared. 
    return () => {
      clearTimeout(timeoutNumber);
    }
  },[value]);

  return debouncedValue;
  
}

const SearchBar=()=>{
  const [inputValue,setInputValue]= useState('');
  const debounce = useDebounce(inputValue,500);

  // sending backend requests only when the input value changes
  // useEffect(()=>{
  //   fetch('')
  // },[debounce])

  return (
    <>
    debounced value is : {debounce}
      <input 
        type='text'
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        placeholder='Search...'
      />
    </>
  )
}
function App() {
  return (
    <>
      <SearchBar/>
    </>
  )
}
export default App