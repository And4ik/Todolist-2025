import {useState} from 'react';
import {TextField} from "@mui/material";

type Props = {
    value: string
    changeItemTitle: (newTitle: string) => void
    classes?: string
}

export const EditableSpan = ({value, changeItemTitle,classes}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    return (
        <>
            {isEditMode
                ? <TextField
                     variant={"standard"}

                    value={title}
                    autoFocus
                    onBlur={() => {
                        setIsEditMode(false)
                        changeItemTitle(title)
                    }}
                    onChange={(e) => setTitle(e.currentTarget.value)
                }
                />
                : <span className={classes} onDoubleClick={() => setIsEditMode(true)}>{value}</span>}

        </>
    );
};
//autoFocus- при переходе в инпут курсор автоматически появляется в input
//onBlur - обработчик срабатывает при потере фокуpса