import logo from '../assets/Logo-Sebs.png';

const Nav = () => {
    return(
        <>
            <nav className="bg-blue-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        {/* Logo a la izquierda */}
                        <div className="flex-shrink-0">
                            <img src={logo} alt="Logo of Sebs" className="h-10 w-10" />
                        </div>
                        {/* Menú justo al lado del logo */}
                        <div className="ml-6 flex space-x-8">
                            <a href="#settings" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Settings</a>
                            <a href="#songs" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Songs</a>
                            <a href="#radio" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Radio</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>



    );
}

export default Nav;