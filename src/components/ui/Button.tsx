interface IButton {
    text: string;
}

const Button = ({ text }: IButton) => {
    return (
        <button
            type="submit"
            className="w-full bg-sky-700 rounded text-white p-4"
        >
            {text}
        </button>
    );
};

export { Button };
