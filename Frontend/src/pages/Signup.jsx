import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        
        e.preventDefault();
        try {

            await axios.post("http://localhost:3002/auth/signup", {
                userName: UserName,
                password: Password,
            });

            navigate("/login");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Try again.");
        }
    };

    return (
        <section className="flex items-center justify-center h-screen bg-gradient-to-r from-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96">
                <h2 className="text-2xl font-bold text-white text-center">Create Account</h2>
                <p className="text-gray-400 text-sm text-center mb-6">Join us today</p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-semibold">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-gray-400 outline-none"
                            placeholder="Enter your username"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-semibold">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-gray-400 outline-none"
                            placeholder="Create a password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-300 font-semibold hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Signup;