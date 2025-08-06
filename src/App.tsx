import './App.css'
import {Tasks, Todolist} from "./Todolist.tsx";
import {useState} from "react";

export type FilterValues = "all" | "active" | "completed";
export const App = () => {
    const [tasks, setTasks] = useState<Tasks[]>([
        {id: 1, title: "Html/Css", isDone: true},
        {id: 2, title: "Todolist", isDone: false},
        {id: 3, title: "useState", isDone: false},
        {id: 4, title: "Tasks", isDone: true},
        {id: 5, title: "deleteTask", isDone: false},
        {id: 6, title: "className", isDone: true},
    ])
    const deleteTask = (taskId: Tasks["id"]) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValues>("all")

    const changeFilter = (nextFilter: FilterValues) => {
        setFilter(nextFilter)
    }

    let filteredTasks = tasks
    if (filter === "active"){
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed"){
        filteredTasks = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="app">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}


