import { useNavigate } from "react-router";
import loginimg from "./../../../public/assets/img/Login.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";

function Login() {
    const navigate = useNavigate()
    
    const ToSignUp = () => {
        navigate("/SignUp")
    };

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!email) {
            toast.warning("Email is required", { position: "top-right", autoClose: 3000 })
            return;
        }
        if (!password) {
            toast.warning("Password is required", { position: "top-right", autoClose: 3000 })
            return;
        }

        axios.post('https://vica.website/api/login', {
            email: email,
            password: password
        })
        .then((result) => {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user))
            toast.success("Login successful!", { position: "top-right", autoClose: 3000 })

            setTimeout(() => {
                navigate('/Home');
            }, 3000); 
        })
        .catch((err) => {
            console.log(err)
            toast.error("Please check your email or password", { position: "top-right", autoClose: 3000 })
        });
    };

    return (
        <div className="flex items-center justify-center">
            <ToastContainer />
            <img className="h-screen" src={loginimg} alt="" />
            <div className="bg-white p-8 rounded-lg shadow-lg md:w-2/5 w-3/4 h-3/4 flex flex-col justify-center absolute">
                <h2 className="text-2xl font-bold text-center mb-6">Login to Account</h2>
                <p className="text-center text-gray-600 mb-4">Please enter your email and password to continue</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h1 className="block text-sm font-medium text-gray-700">Email address:</h1>
                        <input onChange={handleEmail} type="email" value={email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Raeed123@gmail.com" />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-sm font-medium text-gray-700">Password:</h1>
                        <input onChange={handlePassword} type="password" value={password} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="********" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Sign In
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Don't have an account? <a onClick={ToSignUp} className="text-blue-500 hover:underline cursor-pointer">Create Account</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
