import { useState } from "react"
import singupbg from "./../../../public/assets/img/Login.png"
import Uimg from "./../../../public/assets/img/user.png"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

export default function SignUp() {

    
        const navigate = useNavigate()
        const ToLogin = ()=>{
        navigate("/")
    }
  interface UserData {
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_image: string | File;
  }

  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    setUserData({ ...userData, profile_image: e.target.files[0] });
    }
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const formData = new FormData();

    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);
    formData.append("user_name", userData.user_name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("password_confirmation", userData.password_confirmation);

        if (userData.profile_image) {
        formData.append("profile_image", userData.profile_image);
        }

        axios.post("https://vica.website/api/register", formData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => {
            console.log(result);
            localStorage.setItem("token", result.data.data.token);
            localStorage.setItem("user", JSON.stringify(result.data.data.user));
            toast.success("Created successfully!", { position: "top-right", autoClose: 3000 });

            setTimeout(() => {
                navigate('/Home');
            }, 3000); 
        })
        .catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
        });
    };
    
    return (
        <div className="flex justify-center items-center ">
                      <ToastContainer />
      <img src={singupbg} alt="" className=" h-screen " />
      <div className="bg-white px-6 py-8 rounded-3xl shadow-lg  sm:w-4/5 md:w-3/5 lg:w-3/5  absolute">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <p className="text-center text-gray-600 mb-4">Create an account to continue</p>
        <form onSubmit={handleSubmit} className="">
          <div className="flex  gap-6">
            <div className="mb-4 w-full">
              <label className="text-sm font-medium text-gray-700">First Name:</label>
              <input onChange={handleInputChange} type="text" name="first_name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="First Name" />
            </div>
            <div className="mb-4 w-full">
              <label className="text-sm font-medium text-gray-700">Last Name:</label>
              <input onChange={handleInputChange} type="text" name="last_name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Last Name" />
            </div>
            <div className="mb-4 w-full">
              <label className="text-sm font-medium text-gray-700">User Name:</label>
              <input onChange={handleInputChange} type="text" name="user_name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Username" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email address:</label>
            <input onChange={handleInputChange} type="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="example@gmail.com" />
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="mb-4 w-full">
              <label className="text-sm font-medium text-gray-700">Password:</label>
              <input onChange={handleInputChange} type="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="********" />
            </div>
            <div className="mb-6 w-full">
              <label className="text-sm font-medium text-gray-700">Confirm Password:</label>
              <input onChange={handleInputChange} type="password" name="password_confirmation" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="********" />
            </div>
          </div>
          <div className="relative flex flex-col gap-3 ">
            <label className="block text-sm font-medium text-gray-700">Profile Image:</label>
            <input onChange={handleImageChange} className="relative w-20 overflow-hidden z-10 top-5 opacity-0 cursor-pointer" type="file" />
            <img className="relative z-0 bottom-12 w-20" src={Uimg} alt="" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <a onClick={ToLogin} className= " cursor-pointer text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>

      
    );
}

