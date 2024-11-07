    import axios from "axios";
    import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
    import { toast } from "react-toastify";

    interface Product {
    id: string;
    image: File | null;
    name: string;
    price: string;
    }

    export default function CreateProduct() {
        const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        id: "",
        image: null,
        name: "",
        price: "",
    });

    // State to store the preview image URL
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(product);

        const token = localStorage.getItem("token");
        if (!product.name) {
        toast.warning("Please Write Product Name");
        return;
        }
        if (!product.price) {
        toast.warning("Please Write Product Price");
        return;
        }
        if (!product.image) {
        toast.warning("Please select an Image");
        return;
        }

        // إعداد البيانات في `FormData` لإرسالها إلى الـ API
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("image", product.image);

        axios.post("https://vica.website/api/items", formData, {
            headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => {
            console.log(result);
            toast.success("Product Created Successfully")
            setTimeout(() => {
                navigate('/Home/Products');
            }, 3000)
        })
        .catch((error) => {
            console.log(error)
            toast.error("Failed to create product")
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProduct({ ...product, image: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        }
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="px-4 sm:px-6 pt-8 flex flex-col md:flex-row justify-between gap-6"
        >
        <div className="flex flex-col gap-5 w-full md:w-2/4">
            <h1 className=" text-2xl font-extrabold text-gray-500 mt-2">Create Product</h1>
            <h2 className="text-xl font-semibold text-gray-500">Product Name :</h2>
            <input
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            value={product.name}
            className=" pl-4 h-10 rounded-xl bg-slate-200 border-solid border-slate-300 border-2"
            required
            placeholder="Enter Product Name"
            />
            <h2 className=" text-xl font-semibold text-gray-500">Product Price :</h2>
            <input
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            value={product.price}
            className=" pl-4 h-10 rounded-xl bg-slate-200 border-solid border-slate-300 border-2"
            type="number"
            placeholder="Enter Product Price"
            />
            <button
            type="submit"
            className="w-full md:w-52 h-14 rounded-2xl text-lg font-bold text-white bg-blue-500"
            >
            Create
            </button>
        </div>
        <div className="border-dashed border-2 w-full md:w-80 h-80 bg-gray-100 border-blue-400 flex justify-center items-center relative">
            <div className="text-center">
            <h1 className="text-4xl text-blue-500 mb-2">
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </h1>
            <h1 className="text-gray-500">Upload Product Image</h1>
            </div>
            <input
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            />
            
            {/* Display image preview if available */}
            {imagePreview && (
            <img
                src={imagePreview}
                alt="Product Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
            )}
        </div>
        </form>
    );
    }
