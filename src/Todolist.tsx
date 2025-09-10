import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


type Props = {
    todolistId: string
    title: string
    filter: FilterValues
    tasks: Task[]
    deleteTask: (taskId: Task["id"], todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: Task["isDone"], todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistFilter: (nextFilter: FilterValues, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}
export type Task = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (
    {
        todolistId,
        title,
        filter,
        tasks,
        deleteTask,
        createTask,
        changeTaskStatus,
        changeTaskTitle,
        changeTodolistFilter,
        changeTodolistTitle,
        deleteTodolist
    }: Props) => {


    const createTaskHandler = (newTaskTitle: string) => {
        createTask(newTaskTitle, todolistId)
    }


    const tasksList = tasks.length === 0
        ? <span>Your tasks list is empty</span>
        : <ul>
            {tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id, todolistId)
                }
                return (
                    <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked, todolistId)}
                        />
                        <EditableSpan
                            classes={!t.isDone ? "is-done" : ""}
                            value={t.title}
                            changeItemTitle={(newTitle:string)=> changeTaskTitle(t.id, newTitle, todolistId)}/>
                        <Button title={"x"} onClickHandler={deleteTaskHandler}></Button>
                    </li>
                )
            })}
        </ul>

    return (
        <div className="todolist">
            <h3>
                <EditableSpan value={title} changeItemTitle={(newTitle:string)=>changeTodolistTitle(newTitle, todolistId)}/>
                <Button title={"x"} onClickHandler={() => deleteTodolist(todolistId)}/>
            </h3>
            <CreateItemForm createItemTitle={createTaskHandler} maxTitleLength={15}/>
            {tasksList}
            <div>
                <Button className={filter === "all" ? "active-filter" : ""} title="All"
                        onClickHandler={() => changeTodolistFilter("all", todolistId)}/>
                <Button className={filter === "active" ? "active-filter" : ""} title="Active"
                        onClickHandler={() => changeTodolistFilter("active", todolistId)}/>
                <Button className={filter === "completed" ? "active-filter" : ""} title="Completed"
                        onClickHandler={() => changeTodolistFilter("completed", todolistId)}/>
            </div>
        </div>
    );
};

