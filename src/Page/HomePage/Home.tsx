import { useNavigate, useLocation } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom';
import { toast } from "react-toastify";
import { useTheme } from './../../components/auth/ThemeContext';
import { useState, useEffect } from "react";
import { useSearch } from './../../components/SearchContext';  

export default function Home() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme()
    const location = useLocation();
    const [user, setUser] = useState<any>(null)

    const { searchQuery, setSearchQuery } = useSearch()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const [activePage, setActivePage] = useState<string>("")

    useEffect(() => {
        if (location.pathname.includes("Products")) {
            setActivePage("products")
        } else if (location.pathname.includes("Favorites")) {
            setActivePage("favorites")
        } else if (location.pathname.includes("OrderLists")) {
            setActivePage("orderlists")
        }
    }, [location]);

    function LogOut() {
        if (localStorage.getItem('token') && localStorage.getItem('user')) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            toast.success('LogOut Successfully')
            navigate('/');
        }
    }

    return (
        <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
            <nav className={`w-60 p-6 flex flex-col gap-44 border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="text-2xl font-bold text-blue-500 mb-8">
                    Dash<span className="text-black">Stack</span>
                </div>
                <ul className="flex flex-col gap-4 mb-auto">
                    <li className={`flex gap-4 items-center font-semibold cursor-pointer text-lg hover:text-blue-500 
                        ${activePage === "products" ? "border-solid pl-9 rounded-l-xl rounded-r-3xl transition-all duration-300 border-l-4 border-blue-500 text-blue-500" : ""}`} >
                        <Link to="/Home/Products" className="text-xl cursor-pointer hover:text-blue-500">Products</Link>
                    </li>
                    <li className={`flex gap-4 items-center font-semibold cursor-pointer text-lg hover:text-blue-500 
                        ${activePage === "favorites" ? "border-solid pl-9 rounded-l-xl rounded-r-3xl transition-all duration-300 border-l-4 border-blue-500 text-blue-500" : ""}`} >
                        <Link to="/Home/Favorites" className="text-xl cursor-pointer hover:text-blue-500">Favorites</Link>
                    </li>
                    <li className={`flex gap-4 items-center font-semibold cursor-pointer text-lg hover:text-blue-500 
                        ${activePage === "orderlists" ? "border-solid pl-9 rounded-l-xl rounded-r-3xl transition-all duration-300 border-l-4 border-blue-500 text-blue-500" : ""}`} >
                        <Link to="/Home/OrderLists" className="text-xl cursor-pointer hover:text-blue-500">Order Lists</Link>
                    </li>
                </ul>
                <button onClick={LogOut} className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Logout
                </button>
            </nav>

            <div className="flex-1 flex flex-col">
                <header className={`flex items-center justify-between p-4 ${theme === 'dark' ? ' text-gray-900' : 'bg-gray-50'}`}>
                    <input
                        type="text"
                        placeholder="Search a Product ..."
                        className="text-black rounded-xl border-solid border-2 w-2/5 pl-8 h-9"
                        value={searchQuery}  // تعيين القيمة من الـ Context
                        onChange={(e) => setSearchQuery(e.target.value)}  
                    />
                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="flex items-center gap-3">
                                <img src={user.profile_image_url} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                <div className="text-sm">
                                    <div className="flex gap-1">
                                        <p className="text-gray-500">{user.first_name}</p>
                                        <p className="text-gray-500">{user.last_name}</p>
                                    </div>
                                    <p className="text-gray-500">{user.user_name}</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="cursor-pointer text-2xl">
                            <button
                                onClick={toggleTheme}
                                className={`text-black text-2xl ${theme === 'dark' ? ' text-gray-50' : 'text-gray-500'}`}
                            >
                                {theme === 'dark' ? (
                                    <i className="fas fa-sun"></i>  
                                ) : (
                                    <i className="fas fa-moon"></i>  
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                <div className={`p-6 overflow-auto ${theme === 'dark' ? ' text-gray-900' : 'bg-gray-50'}`}>
                    {location.pathname === "/Home" ? (
                        <p className="text-gray-500 text-4xl text-center mt-52">Please select from menu</p>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
        </div>
    )
}
