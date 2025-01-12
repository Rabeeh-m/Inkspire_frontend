import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-yellow-50 min-h-screen flex flex-col items-center justify-center py-10 px-4">
            <div className="relative">
                <div className="bg-yellow-400 rounded-full w-48 h-48 animate-ping absolute top-0 left-0"></div>
                <div className="bg-yellow-400 rounded-full w-48 h-48 animate-ping absolute top-0 right-0"></div>
            </div>
            <div className="relative z-10 text-center">
                <div className="bg-white rounded-lg shadow-xl p-10">
                    <div className="text-6xl font-bold text-yellow-400 mb-4 animate-bounce">
                        🎉
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Thank you for your purchase. Your premium features are
                        now active!
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-black text-yellow-400 hover:text-white hover:bg-gray-800 transition-all px-8 py-3 rounded-full text-lg font-semibold shadow-md"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
