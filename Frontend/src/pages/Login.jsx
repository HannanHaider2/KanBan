import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../context/tokenContext";
import { loginUser } from "../service/Service";
function Login() {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(TokenContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(UserName, Password);
            login(data.accessToken);
            alert("Login successful");
            navigate("/app");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Try again.");
        }
    };

    return (
        <section className="flex items-center justify-center h-screen bg-gradient-to-br from-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 text-white border border-gray-700">
                <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-sm text-center mb-6">Login to continue</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-gray-500 outline-none text-white shadow-md"
                            placeholder="Enter your username"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-gray-500 outline-none text-white shadow-md"
                            placeholder="Enter your password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-gray-300 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Login;
