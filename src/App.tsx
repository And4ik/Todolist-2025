import './App.css'
import {Tasks, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = "all" | "active" | "completed";
export const App = () => {
    const [tasks, setTasks] = useState<Tasks[]>([
        {id: v1(), title: "Html/Css", isDone: true},
        {id: v1(), title: "Todolist", isDone: false},
        {id: v1(), title: "useState", isDone: false},
        {id: v1(), title: "Tasks", isDone: true},
        {id: v1(), title: "className", isDone: true},
    ])

    const createTask = (title:string) => {
        const newTask:Tasks = {id : v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

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
                createTask={createTask}
            />
        </div>
    )
}


