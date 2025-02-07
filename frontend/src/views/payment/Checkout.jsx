import React, { useState } from "react";
import Header from "../partials/Header";
import apiInstance from "../../utils/axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useUserData from "../../plugin/useUserData";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const user_id = useUserData()?.user_id;
    const navigate = useNavigate();
    const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    const handlePaypalSuccess = async (details) => {
        try {
            const { data } = await apiInstance.post(
                "/payment/paypal-success/",
                {
                    orderID: details.id, // PayPal order ID
                    userId: user_id,
                }
            );
            if (data.success) {
                // navigate("/payment-success/");
                navigate("/payment-success/", { state: { invoice: data.invoice } });
            }
        } catch (error) {
            console.error("PayPal payment failed", error);
            // alert("Payment failed. Please try again.");
            navigate("/payment-cancel/");
        }
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Upgrade to Premium
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Left Section: Plan Details */}
                    <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Premium Plan
                        </h2>
                        <p className="text-white text-lg mb-6">
                            Unlock all the advanced features and tools to
                            enhance your experience:
                        </p>
                        <ul className="space-y-4 text-white text-base">
                            <li>✅ Access exclusive content and tools</li>
                            <li>✅ Unlimited likes, follows, and comments</li>
                            <li>✅ Join meetings with video and audio calls</li>
                            <li>✅ Priority support and premium updates</li>
                        </ul>
                        <div className="text-4xl font-bold text-white mt-8">
                            $9.99
                            <span className="text-lg font-medium">/month</span>
                        </div>
                    </div>

                    {/* Right Section: Payment Options */}
                    <div className="p-10 flex flex-col justify-center items-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Payment Options
                        </h2>
                        <p className="text-gray-600 text-center mb-6">
                            Choose a payment method below to upgrade your plan
                            and start enjoying premium features.
                        </p>
                        <div className="space-y-6 w-full max-w-md">
                            <PayPalScriptProvider
                                options={{
                                    "client-id": paypalClientId,
                                }}
                            >
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: "9.99", // Premium plan cost
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) =>
                                        actions.order
                                            .capture()
                                            .then(handlePaypalSuccess)
                                    }
                                    onError={(err) =>
                                        console.log("PayPal Error", err)
                                    }
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
