type Props = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
}
export const Button = ({title, onClickHandler,disabled}: Props) => {
    return (
        <button onClick={onClickHandler} disabled={disabled}>{title}</button>
    );
};

