import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from './../../../components/auth/ThemeContext';


interface OrderList {
  id: string;
  name: string;
  price: string;
  image_url: string;
}

export default function OrderList() {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

  const [OrderList, setOrderList] = useState<OrderList[]>([]);

  // جلب بيانات المنتج من لوكال ستوريج
  useEffect(() => {
    const ProductData = localStorage.getItem('orderlist')
    if (ProductData) {
      const productInfo: OrderList[] = JSON.parse(ProductData)
      setOrderList(productInfo);
    }
  }, [])

  const DeletItemFromFavorite = (id: string) => {
    const OrderListData = OrderList.filter(OrderList => OrderList.id !== id)
    setOrderList(OrderListData)
    localStorage.setItem('orderlist', JSON.stringify(OrderListData)); //تحديث لوكال ستوريج
    toast.success("Product Deleted From OrderList")
  }

    return (
        <div className="">
        <div className="pl-7 pt-5 text-2xl font-extrabold">
            <h1>Favorite</h1>
        </div>
        <div className="flex flex-wrap">
            {OrderList.map((item) => (
            <div
                key={item.id}
                className={`mx-3 mt-2 ${theme === 'light' ? 'text-black bg-gray-90' : 'bg-gray-50 text-white'} 
                    rounded-2xl shadow-lg w-full md:w-72 flex flex-col shadow-gray-400 gap-3 justify-center items-center text-center relative`}>
                <img className="w-2/4" src={item.image_url} alt={item.name} />
                <div className="flex flex-col items-start w-full pl-3 gap-2">
                <h1 className="font-bold text-xl">{item.name}</h1>
                <h1 className="font-semibold text-lg text-blue-600">$ {item.price}</h1>
                </div>
                <button
                onClick={() => DeletItemFromFavorite(item.id)}
                className="text-2xl "
                >
                <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}
