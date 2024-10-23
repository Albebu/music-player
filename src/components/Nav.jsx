import logo from '../assets/Logo-Sebs.png';

const Nav = () => {
    return(
        <>
            <nav className="bg-[#111111] shadow-lg fixed w-full text-[#0077b6] font-semibold text-l">
                    <div className="flex items-center h-16 ml-6">
                        {/* Logo a la izquierda */}
                        <div className="flex-shrink-0">
                            <img src={logo} alt="Logo of Sebs" className="h-10 w-10" />
                        </div>
                        {/* Menú justo al lado del logo */}
                        <div className="ml-6 flex space-x-8">
                            <a href="#settings" className="hover:text-gray-300 px-3 py-2 rounded-md ">Settings</a>
                            <a href="#songs" className="hover:text-gray-300 px-3 py-2 rounded-md">Songs</a>
                            <a href="#radio" className="hover:text-gray-300 px-3 py-2 rounded-md">Radio</a>
                        </div>
                    </div>
            </nav>
        </>



    );
}

export default Nav;