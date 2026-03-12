import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaYoutube } from "react-icons/fa";
import { signInSuccess } from '../redux/userSlice';
import axios from 'axios';

/**
 * AuthModal Component: Handles user authentication (Sign In / Sign Up).
 * Syncs the local user state with the Redux global store upon successful auth.
 */
export default function AuthModal({ isOpen, onClose }) {
    // Toggle between Sign In (false) and Sign Up (true) modes
    const [isSignUp, setIsSignUp] = useState(false);

    // Consolidated state for all authentication inputs
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const dispatch = useDispatch();

    // Do nothing if the modal is hidden
    if (!isOpen) return null;

    /**
     * Submits authentication data to the backend API.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dynamically select the API endpoint based on the current mode
        const url = isSignUp
            ? 'http://localhost:5000/api/auth/signup'
            : 'http://localhost:5000/api/auth/signin';

        axios.post(url, formData)
            .then((response) => {
                // Update the Redux store with the full response (user data + token)
                dispatch(signInSuccess(response.data));

                // Close the modal upon success
                onClose();
            })
            .catch((error) => {
                // THIS IS GETTING TRIGGERED.
                console.error(error);
                alert("User not found !, try to SignUp instead !");
                setIsSignUp(true);
            });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white sm:bg-black/50">
            {/* Main Modal Container */}
            <div className="bg-white w-full max-w-[450px] sm:rounded-xl sm:border border-gray-200 p-8 sm:p-10 flex flex-col items-center">

                {/* Brand Logo Header */}
                <div className="flex items-center gap-1 mb-2">
                    <FaYoutube size={32} className="text-red-600" />
                    <span className="font-bold text-2xl tracking-tighter text-black">YouTube</span>
                </div>

                <h2 className="text-2xl font-normal text-gray-900 mb-2">
                    {isSignUp ? "Sign up and create your Channel" : "Sign in and create your Channel"}
                </h2>
                <p className="text-base text-gray-700 mb-8">
                    to continue to YouTube
                </p>

                {/* Authentication Form */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    {/* Username field is only required/visible in Sign Up mode */}
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <div className="flex justify-between items-center mt-6">
                        {/* Toggle button to switch between modes */}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-blue-600 font-medium hover:text-blue-700 transition"
                        >
                            {isSignUp ? "Already have an account?" : "Create account"}
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
                        >
                            Next
                        </button>
                    </div>
                </form>

                {/* Close/Cancel Trigger */}
                <button
                    onClick={onClose}
                    className="mt-8 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}