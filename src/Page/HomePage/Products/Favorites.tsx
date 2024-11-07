import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from './../../../components/auth/ThemeContext';


interface Product {
  id: string;
  name: string;
  price: string;
  image_url: string;
}

export default function Favorites() {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")

  const [product, setProduct] = useState<Product[]>([])

  // جلب بيانات المنتج من لوكال ستوريج
  useEffect(() => {
    const ProductData = localStorage.getItem('favorites')
    if (ProductData) {
      const productInfo: Product[] = JSON.parse(ProductData)
      setProduct(productInfo);
    }
  }, [])

  const DeletItemFromFavorite = (id: string) => {
    const ProductData = product.filter(product => product.id !== id)
    setProduct(ProductData)
    localStorage.setItem('favorites', JSON.stringify(ProductData))
    toast.success("Product Deleted From Favorite")
  }

  return (
    <div className="">
        <div className="pl-7 pt-5 text-2xl font-extrabold">
            <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Favorite</h1>
        </div>
        <div className="flex flex-wrap pt-4">
            {product.map((item) => (
                <div
                    key={item.id}
                    className={`mx-3 mt-2 ${theme === 'light' ? 'text-black bg-gray-90' : 'bg-gray-50 text-gray-500'} 
                    rounded-2xl shadow-lg w-full md:w-72 flex flex-col shadow-gray-400 gap-3 justify-center items-center text-center relative`}>
                    <img className="w-2/4" src={item.image_url} alt={item.name} />
                    <div className="flex flex-col items-start w-full pl-3 gap-2">
                        <h1 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>{item.name}</h1>
                        <h1 className={`font-semibold text-lg ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                            $ {item.price}
                        </h1>
                    </div>
                    <button
                        onClick={() => DeletItemFromFavorite(item.id)}
                        className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-500'} hover:text-red-500`}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            ))}
        </div>
    </div>
);

}
