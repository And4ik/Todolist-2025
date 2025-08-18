import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type Props = {
    title:string
    tasks:Task[]
    deleteTask: (taskId:Task["id"]) => void
    changeFilter: (nextFilter: FilterValues) => void
    createTask: (title:string) => void
    changeTaskStatus:(taskId: string, newStatus: Task["isDone"]) => void
    filter: FilterValues
}
export type Task = {
    id: string
    title:string
    isDone: boolean
}
export const Todolist = ({title, tasks,deleteTask,changeFilter,createTask,changeTaskStatus,filter}:Props) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle)
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createTaskHandler()
        }
    }
    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
        {tasks.map((t) =>{
            const deleteTaskHandler = () => {
                deleteTask(t.id)
            }
            return (
                <li key={t.id} className={!t.isDone ? "is-done":""}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={(e)=> changeTaskStatus(t.id, e.currentTarget.checked)}
                        className={error ? "error" :""}
                    />
                    <span>{t.title}</span>
                    <Button title={"+"} onClickHandler={deleteTaskHandler}></Button>

                </li>
            )
        })}
    </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div >
                <input
                    value={taskTitle}
                    placeholder={"max 15 charters"}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button title="+"  onClickHandler={createTaskHandler} disabled={taskTitle === "" || taskTitle.length > 15}/>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            {taskTitle && taskTitle.length <= 15 && <div>max 15 charters</div>}
            {taskTitle.length  > 15 && <div style={{color: "red"}}>over charters</div>}
            {tasksList}
            <div>
                <Button className={filter === "all" ? "active-filter" : ""} title="All" onClickHandler={()=> changeFilter("all")}/>
                <Button className={filter === "active" ? "active-filter" : ""} title="Active" onClickHandler={()=> changeFilter("active")}/>
                <Button className={filter === "completed" ? "active-filter" : ""} title="Completed" onClickHandler={()=> changeFilter("completed")}/>
            </div>
        </div>
    );
};

