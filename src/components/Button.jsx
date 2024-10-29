const Button = ({ children }) => {
    return(
        <button className="bg-[#2a2a2a] rounded-full hover:bg-[#363636] p-2 font-[700] text-xs pr-3 pl-3">{children}</button>
    );
}

export default Button;