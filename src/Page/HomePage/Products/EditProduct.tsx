import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from './../../../components/auth/ThemeContext';  // استيراد السياق للتحكم بالوضع المظلم

// تعريف واجهة المنتج
interface Product {
    id: string;
    image: File | string;
    name: string;
    price: string;
}

export default function EditProduct() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>({
        id: "",
        image: "",
        name: "",
        price: "",
    });

    const { theme } = useTheme();  // استخدام السياق لمعرفة الوضع الحالي

    useEffect(() => {
        // عرض معلومات المنتج
        if (id) {
            axios.get(`https://vica.website/api/items/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setProduct({
                    id: response.data.id,
                    name: response.data.name,
                    price: response.data.price,
                    image: response.data.image,
                });
            })
            .catch((error) => {
                console.error("Failed to fetch product data:", error)
                toast.error("Failed to load product data.")
            });
        }
    }, [id, token]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("name", product.name)
        formData.append("price", product.price)
        formData.append("_method", "PUT") // إضافة method 
        if (product.image instanceof File) {
            formData.append("image", product.image)
        }

        axios.post(`https://vica.website/api/items/${id}`, formData, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            toast.success("Product updated successfully");
            console.log(response.data);
            setTimeout(() => {
                navigate('/Home/Products')
            }, 3000)
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to update product")
        });
    };

    return (
        <form onSubmit={handleSubmit} className={`px-6 pt-8 flex justify-between ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
            <div className={`flex flex-col gap-5 w-2/4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <h1 className="text-2xl font-extrabold mt-2">
                    Edit Product
                </h1>
                <h2 className="text-xl font-semibold">
                    Enter Name
                </h2>
                <input
                    value={product.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setProduct({ ...product, name: e.target.value })
                    }
                    className={`pl-4 h-10 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-slate-200 text-black'} border-solid border-slate-300 border-2`}
                    required
                    placeholder="Enter Product Name"
                />

                <h2 className="text-xl font-semibold">
                    Enter Price
                </h2>
                <input
                    value={product.price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setProduct({ ...product, price: e.target.value })
                    }
                    className={`pl-4 h-10 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-slate-200 text-black'} border-solid border-slate-300 border-2`}
                    required
                    type="number"
                    placeholder="Enter Product Price"
                />

                <button className="w-52 h-14 rounded-2xl text-lg font-bold text-white bg-blue-500">
                    Update
                </button>
            </div>
            <div className={`border-dashed border-2 w-80 h-80 bg-gray-100 border-blue-400 justify-center items-center flex ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                <div className="relative z-10">
                    <h1 className="text-4xl relative ml-16 text-blue-500">
                        <i className="fa-solid fa-arrow-up-from-bracket z-10"></i>
                    </h1>
                    <h1 className="">Upload Product Image</h1>
                </div>
                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setProduct({ ...product, image: e.target.files![0] })
                    }
                    className="right-0 absolute z-10 opacity-0 cursor-pointer"
                    type="file"
                />
            </div>
        </form>
    );
}
