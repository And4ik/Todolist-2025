import './App.css'
import {Task, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Box, Container, createTheme, CssBaseline, Grid, Paper, Switch, ThemeProvider} from "@mui/material";
import {boxSx} from "./Todolist.styles.ts";
import {NavButton} from "./NavButton.ts";
import {teal} from "@mui/material/colors";

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
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
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
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        setTasks(prev => {
            const copy = {...prev}
            delete copy[todolistId]
            return copy
        })
    }
    const createTodolist = (newTodolistTitle: string) => {
        const todolistId = v1()
        const newTodolist: Todolists = {id: todolistId, title: newTodolistTitle, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
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
            <Grid key={tl.id}>
                <Paper elevation={9}>
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTodolistTitle={changeTodolistTitle}
                        deleteTodolist={deleteTodolist}
                    /></Paper>
            </Grid>
        )
    })

    const [isLight, setIsLight] = useState(true)
    const myTheme = createTheme({
        palette: {
            primary: teal,
            secondary: teal,
            mode: isLight ? "light" : "dark"
        }

    })


    
    return (
        <div className="app">
            <ThemeProvider theme={myTheme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={boxSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <Switch onChange={()=> setIsLight(!isLight)}/>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={myTheme.palette.primary.light}>Faq</NavButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"lg"}>
                    <Grid container sx={{margin: "15px 0"}}>
                        <CreateItemForm createItemTitle={createTodolist} maxTitleLength={10}/></Grid>
                    <Grid container spacing={6}>
                        {todolistComponent}
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    )
}


