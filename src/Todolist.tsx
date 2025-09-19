import {FilterValues} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button, IconButton, Box} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {boxSx, getListItemSx} from "./Todolist.styles.ts";

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
        : <List disablePadding>
            {tasks.map((t) => {
                const deleteTaskHandler = () => {
                    deleteTask(t.id, todolistId)
                }
                return (
                    <ListItem key={t.id} disablePadding sx={getListItemSx(t.isDone)}>
                        <Box sx={boxSx}>
                            <Checkbox
                                color={"primary"}
                                size={"small"}
                                checked={t.isDone}
                                onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked, todolistId)}/>
                            <EditableSpan
                                //classes={!t.isDone ? "is-done" : ""}
                                value={t.title}
                                changeItemTitle={(newTitle: string) => changeTaskTitle(t.id, newTitle, todolistId)}/>
                            <IconButton
                                size="small"
                                color={'secondary'}
                                onClick={deleteTaskHandler}>
                                <DeleteOutlineIcon fontSize={"small"}/>
                            </IconButton>
                        </Box>
                    </ListItem>
                )
            })}
        </List>

    return (
        <div className="todolist">
            <h3>
                <EditableSpan value={title}
                                   changeItemTitle={(newTitle: string) => changeTodolistTitle(newTitle, todolistId)}/>
                    <IconButton
                        size="small"
                        color={'secondary'}
                        onClick={() => deleteTodolist(todolistId)}>
                        <DeleteOutlineIcon/>
                    </IconButton>
            </h3>

            <CreateItemForm createItemTitle={createTaskHandler} maxTitleLength={15}/>
            {tasksList}
            <Box sx={boxSx}>
                <Button
                    size={"small"}
                    disableElevation //убирает тень
                    color={filter === "all" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => changeTodolistFilter("all", todolistId)}>
                    All
                </Button>
                <Button
                    size={"small"}
                    disableElevation
                    variant="contained"
                    color={filter === "active" ? "secondary" : "primary"}
                    onClick={() => changeTodolistFilter("active", todolistId)}>
                    Active
                </Button>
                <Button
                    size={"small"}
                    disableElevation
                    variant="contained"
                    color={filter === "completed" ? "secondary" : "primary"}
                    onClick={() => changeTodolistFilter("completed", todolistId)}>
                    Completed
                </Button>
            </Box>
        </div>
    );
};

