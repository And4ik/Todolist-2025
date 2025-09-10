import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button.tsx";

type Props = {
    createItemTitle: (newTitle: string) => void
    maxTitleLength: number
}

export const CreateItemForm = ({createItemTitle,maxTitleLength}: Props) => {
    const [itemTitle, setItemTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            createItemTitle(trimmedTitle)
            setItemTitle("")
        } else {
            setError("Title is required")
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            createItemHandler()
        }
    }

    const isAddBtnDisabled = itemTitle === "" || itemTitle.length > maxTitleLength
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={itemTitle}
                placeholder={`max ${maxTitleLength} charters`}
                onChange={changeTaskTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
            />
            <Button title="+" onClickHandler={createItemHandler}
                    disabled={isAddBtnDisabled}/>
            {error && <div className={"error-message"}>{error}</div>}

            {itemTitle && itemTitle.length <= maxTitleLength && <div>max {maxTitleLength} charters</div>}
            {itemTitle.length > maxTitleLength && <div style={{color: "red"}}>over charters</div>}
        </div>
    );
};

