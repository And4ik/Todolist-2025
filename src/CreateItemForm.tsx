import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {boxSx} from "./Todolist.styles.ts";

type Props = {
    createItemTitle: (newTitle: string) => void
    maxTitleLength: number
}

export const CreateItemForm = ({createItemTitle, maxTitleLength}: Props) => {
    const [itemTitle, setItemTitle] = useState("")
    const [error, setError] = useState(false)

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            createItemTitle(trimmedTitle)
        } else {
            setError(true)
        }
        setItemTitle("")
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemTitle(e.currentTarget.value)
    }
    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createItemHandler()
        }
    }

    const isAddBtnDisabled = itemTitle === "" || itemTitle.length > maxTitleLength
    return (
        <div>
            <Box sx={boxSx}><TextField variant={"outlined"} size={"small"}
                          error={error}
                          label={"Enter a title"}
                          helperText={error && "Title must be valid"}
                          value={itemTitle}
                          onChange={changeTaskTitleHandler}
                          onKeyDown={createTaskOnEnterHandler}
            />
                <IconButton onClick={createItemHandler} disabled={isAddBtnDisabled}>
                    <AddCircleOutlineIcon/>
                </IconButton></Box>
            {itemTitle && itemTitle.length <= maxTitleLength && <div>max {maxTitleLength} charters</div>}
            {itemTitle.length > maxTitleLength && <div style={{color: "red"}}>over charters</div>}
        </div>
    );
};

