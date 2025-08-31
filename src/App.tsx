import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = "all" | "active" | "completed";

type Todolists = {
    id: string
    title: string
    filter: FilterValues
}
type TasksState = {
    [key: string]: Task[]
}
export const App = () => {


    const todolistId_1 = v1!()
    const todolistId_2 = v1!()

    const [todolists, setTodolists] = useState<Todolists[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"}
    ])


    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: v1(), title: "Html/Css", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "useState", isDone: true},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Cheeps", isDone: false},
            {id: v1(), title: "Cars", isDone: false},

        ]
    })
    const changeTaskStatus = (taskId: string, newStatus: Task["isDone"], todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)})
    }
    const createTask = (title: string, todolistId: string) => {
        const newTask: Task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const deleteTask = (taskId: Task["id"], todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const changeTodolistFilter = (nextFilter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: nextFilter} : tl))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        setTasks(prev => {
            const copy = { ...prev }
            delete copy[todolistId]
            return copy
        })
    }

    const todolistComponent = todolists.map(tl => {
        let filteredTasks = tasks[tl.id]
        if (tl.filter === "active") {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                changeTodolistFilter={changeTodolistFilter}
                deleteTodolist={deleteTodolist}
            />
        )
    })

    return (
        <div className="app">
            {todolistComponent}
        </div>
    )
}


