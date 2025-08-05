import './App.css'
import {Tasks, Todolist} from "./Todolist.tsx";

export const App = () => {

  const tasks_1:Tasks[] = [
    {id:1, title: "Html/Css", isDone: true},
    {id:2, title: "Js", isDone: false},
  ]

  const tasks_2:Tasks[] = [
    {id:4, title: "Bread", isDone: false},
    {id:5, title: "Milk", isDone: true},
    {id:6, title: "Meat", isDone: false},
  ]
  return (
      <div className="app">
        <Todolist title="What to learn" tasks={tasks_1} />
        <Todolist title="What to buy" tasks={tasks_2}/>
      </div>
  )
}


