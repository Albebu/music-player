import logo from '../assets/Logo-Sebs.png'; // Import the logo image from assets

const Nav = () => {
    return(
        <>
            {/* Navigation bar */}
            <nav className="bg-[#111111] shadow-lg fixed w-full text-[#0077b6] font-semibold text-l">
                <div className="flex items-center h-16 ml-6">
                    {/* Logo on the left */}
                    <div className="flex-shrink-0">
                        <img src={logo} alt="Logo of Sebs" className="h-10 w-10" />
                    </div>
                    {/* Menu next to the logo */}
                    <div className="ml-6 flex space-x-8">
                        <a href="#settings" className="hover:text-gray-300 px-3 py-2 rounded-md">Settings</a>
                        {/* Link to settings section */}
                        <a href="#songs" className="hover:text-gray-300 px-3 py-2 rounded-md">Songs</a>
                        {/* Link to songs section */}
                        <a href="#radio" className="hover:text-gray-300 px-3 py-2 rounded-md">Radio</a>
                        {/* Link to radio section */}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav; // Export the Nav component
