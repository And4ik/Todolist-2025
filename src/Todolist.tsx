import {Button} from "./Button.tsx";

type Props = {
    title:string
    tasks:Tasks[]
}
export type Tasks = {
    id: number
    title:string
    isDone: boolean
}
export const Todolist = ({title, tasks}:Props) => {

    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
        {tasks.map((t) => (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
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
                <Button title="All" />
                <Button title="Active" />
                <Button title="Completed" />
            </div>
        </div>
    );
};

