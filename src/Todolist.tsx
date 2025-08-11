import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type Props = {
    title:string
    tasks:Tasks[]
    deleteTask: (taskId:Tasks["id"]) => void
    changeFilter: (nextFilter: FilterValues) => void
    createTask: (title:string) => void
}
export type Tasks = {
    id: string
    title:string
    isDone: boolean
}
export const Todolist = ({title, tasks,deleteTask,changeFilter,createTask}:Props) => {
    const [taskTitle, setTaskTitle] = useState("")

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle("")
    }

    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setTaskTitle(e.currentTarget.value)
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
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
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
            </div>
            {taskTitle && taskTitle.length <= 15 && <div>max 15 charters</div>}
            {taskTitle.length  > 15 && <div style={{color: "red"}}>over charters</div>}
            {tasksList}
            <div>
                <Button title="All" onClickHandler={()=> changeFilter("all")}/>
                <Button title="Active" onClickHandler={()=> changeFilter("active")}/>
                <Button title="Completed" onClickHandler={()=> changeFilter("completed")}/>
            </div>
        </div>
    );
};

