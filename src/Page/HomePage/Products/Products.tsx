import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearch } from './../../../components/SearchContext';

// تعريف نوع الـ Product
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

export default function Products() {
    const navigate = useNavigate()
    const [data, setData] = useState<Product[]>([])
    const [filteredData, setFilteredData] = useState<Product[]>([]) 
    const token = localStorage.getItem("token")

    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")
    const { searchQuery } = useSearch()  // الحصول على قيمة البحث من الـ Context

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [theme]);

    const changeUrl = () => {
        navigate("/Home/CreateProduct")
    };

    const [updateProduct, setUpdateProduct] = useState<Product | null>(null)

    // ============== عرض المنتجات ========== //
    useEffect(() => {
        axios.get("https://vica.website/api/items", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            setData(res.data);
            localStorage.setItem('Products', JSON.stringify(res.data))
        })
        .catch(error => console.log(error))
    }, [token])

    // ============فلترة المنتجات (searchQuery) ========== //
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredData(data)
        } else {
            const filtered = data.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase())  
            );
            setFilteredData(filtered)
        }
    }, [data, searchQuery])

    // ============== تعديل المنتجات ========== //
    const editPage = (id: number) => {
        axios.get(`https://vica.website/api/items/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(result => {
            setUpdateProduct(result.data);
            navigate(`/Home/EditProduct/${id}`)
        })
        .catch(err => console.log(err))
    }

    // ============== حذف المنتجات ========== //
    const deleteItem = (id: number) => {
        axios.delete(`https://vica.website/api/items/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(() => {
            const updatedData = data.filter((product) => product.id !== id)
            setData(updatedData);
            toast.success("Product Deleted");
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to delete product")
        })
    }

    // ============== إضافة المنتج إلى المفضلة ========== //
    const [favorites, setFavorites] = useState<Product[]>([]);

    const addToFavorite = (id: number) => {
        axios.get(`https://vica.website/api/items/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(result => {
            setFavorites([...favorites, result.data]);
            toast.success("Added To Favorite");
            localStorage.setItem('favorites', JSON.stringify([...favorites, result.data]))
        })
        .catch(err => console.log(err))
    }

    // ============== إضافة المنتج إلى لائحة الطلبات ========== //
    const [orderList, setOrderList] = useState<Product[]>([])

    const addToOrderList = (id: number) => {
        axios.get(`https://vica.website/api/items/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(result => {
            setOrderList([...orderList, result.data])
            toast.success("Added To Orderlist")
            localStorage.setItem('orderlist', JSON.stringify([...orderList, result.data]))
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={`h-screen`}>
            <div className="flex justify-between">
                <h1 className={`text-2xl font-extrabold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    All Products
                </h1>
                <button 
                    onClick={changeUrl}
                    className="cursor-pointer w-64 flex gap-4 justify-center items-center h-12 rounded-md mb-5 text-white bg-blue-500">
                    <i className="fa-solid fa-plus"></i>Create Product
                </button>
            </div>
    
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {filteredData.map((element) => (
                    <div key={element.id}
                        className={`mx-3 mt-2 ${theme === 'dark' ? ' text-white' : ' text-white'} 
                            rounded-2xl shadow-lg w-full md:w-72 flex flex-col shadow-gray-400 gap-3 justify-center items-center text-center relative`}>
                        <img className="w-2/4" src={element.image_url} alt={element.name} />
                        <div className="flex flex-col items-start w-full pl-3 gap-2">
                            <h1 className={`font-bold  text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
                                {element.name}
                            </h1>
                            <h1 className={`font-semibold text-lg ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                $ {element.price}
                            </h1>
                        </div>
                        <div className="flex justify-between w-full px-4 pb-2">
                            <button
                                onClick={() => editPage(element.id)}
                                className="bg-gray-600 rounded-2xl w-32 h-9 text-base font-medium flex items-center justify-center gap-2  hover:bg-blue-500 hover:text-white">
                                <i className="fa-regular fa-pen-to-square"></i>
                                Edit Product
                            </button>
                            <button onClick={() => deleteItem(element.id)} className="text-2xl text-gray-500 hover:animate-bounce hover:text-red-700">
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                        <div className="w-full flex justify-between absolute top-0 px-3 pt-3">
                            <button onClick={() => addToFavorite(element.id)} className="text-2xl text-gray-500 favorite hover:animate-bounce hover:text-blue-500">
                                <i className="fa-regular fa-heart"></i>
                            </button>
                            <button onClick={() => addToOrderList(element.id)} className="text-2xl text-gray-500 hover:animate-bounce hover:text-blue-500">
                                <i className="fa-solid fa-list-ul"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
