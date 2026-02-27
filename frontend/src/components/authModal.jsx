import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaYoutube } from "react-icons/fa";
import { signInSuccess } from '../redux/userSlice';

export default function AuthModal({ isOpen, onClose }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock user data for demonstration
        const mockUser = {
            name: formData.name || "Alex Chen",
            email: formData.email,
            handle: (formData.name || "AlexChen").toLowerCase().replace(/\s/g, ''),
        };

        dispatch(signInSuccess(mockUser));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white sm:bg-black/50">
            {/* Container */}
            <div className="bg-white w-full max-w-[450px] sm:rounded-xl sm:border border-gray-200 p-8 sm:p-10 flex flex-col items-center">

                {/* Logo and Header */}
                <div className="flex items-center gap-1 mb-2">
                    <FaYoutube size={32} className="text-red-600" />
                    <span className="font-bold text-2xl tracking-tighter text-black">YouTube</span>
                </div>

                <h2 className="text-2xl font-normal text-gray-900 mb-2">
                    {isSignUp ? "Create your Account" : "Sign in"}
                </h2>
                <p className="text-base text-gray-700 mb-8">
                    to continue to YouTube
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-blue-600 font-medium hover:text-blue-700 transition"
                        >
                            {isSignUp ? "Sign in instead" : "Create account"}
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition"
                        >
                            Next
                        </button>
                    </div>
                </form>

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