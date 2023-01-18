import './styles/global.css'

import { Habit } from "./components/Habit";

function App() {

  return (
    <div>
        <Habit completed={2}/>
        <Habit completed={3}/>
        <Habit completed={8}/>
        <Habit completed={6}/>
        <Habit completed={10}/>
        <Habit completed={23}/>
        <Habit completed={11}/>
    </div>
  )
}

export default App
