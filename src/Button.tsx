type Props = {
    title: string
    onClickHandler?: () => void
    disabled?: boolean
    className?: string
}
export const Button = ({title, onClickHandler,disabled,className}: Props) => {
    return (
        <button onClick={onClickHandler} disabled={disabled} className={className}>{title} </button>
    );
};

