import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-red-50 min-h-screen flex flex-col items-center justify-center py-10 px-4">
            <div className="relative">
                {/* Animated Background Rings */}
                <div className="bg-red-400 rounded-full w-48 h-48 animate-ping absolute -top-10 left-10"></div>
                <div className="bg-red-400 rounded-full w-48 h-48 animate-ping absolute -top-10 right-10"></div>
            </div>
            <div className="relative z-10 text-center">
                <div className="bg-white rounded-lg shadow-xl p-10">
                    <div className="text-6xl font-bold text-red-500 mb-4 animate-bounce">
                        ❌
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Payment Canceled
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Your payment could not be processed. Please try again.
                    </p>
                    <button
                        onClick={() => navigate("/upgrade/")}
                        className="bg-black text-red-400 hover:text-white hover:bg-gray-800 transition-all px-8 py-3 rounded-full text-lg font-semibold shadow-md"
                    >
                        Back to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
