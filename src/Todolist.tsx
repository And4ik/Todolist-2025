import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

type Props = {
    title:string
    tasks:Tasks[]
    deleteTask: (taskId:Tasks["id"]) => void
    changeFilter: (nextFilter: FilterValues) => void
}
export type Tasks = {
    id: number
    title:string
    isDone: boolean
}
export const Todolist = ({title, tasks,deleteTask,changeFilter}:Props) => {

    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
        {tasks.map((t) => (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button title={"+"} onClickHandler={()=>deleteTask(t.id)}></Button>
            </li>
        ))}
    </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div >
                <input/>
                <Button title="+" />
            </div>
            {tasksList}
            <div>
                <Button title="All" onClickHandler={()=> changeFilter("all")}/>
                <Button title="Active" onClickHandler={()=> changeFilter("active")}/>
                <Button title="Completed" onClickHandler={()=> changeFilter("completed")}/>
            </div>
        </div>
    );
};

