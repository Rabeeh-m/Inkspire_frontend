import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import Swal from "sweetalert2";

function OTPVerification() {
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(120); // 2 minutes
    const [isResending, setIsResending] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { email, full_name, password } = location.state || {};

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleOtpChange = (e) => setOtp(e.target.value);

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("user/verify-otp/", {
                email,
                otp,
                full_name,
                password,
            });
            Swal.fire({
                icon: "success",
                title: "Verification Successful",
                text: response.data.message,
            });
            navigate("/login/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: error.response?.data?.error || "Something went wrong.",
            });
        }
    };

    const resendOtp = async () => {
        setIsResending(true);
        try {
            await axios.post("user/register/", {
                full_name,
                email,
                password,
                password2: password,
            });
            Swal.fire({
                icon: "success",
                title: "OTP Resent",
                text: "A new OTP has been sent to your email.",
            });
            setTimer(120);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Resend Failed",
                text: error.response?.data?.error || "Something went wrong.",
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    OTP Verification
                </h1>
                <p className="text-sm text-center mb-6">
                    Enter the OTP sent to your email. Time remaining:{" "}
                    <strong>{timer} seconds</strong>
                </p>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-700"
                        >
                            OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter OTP"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                        disabled={!otp}
                    >
                        Verify OTP
                    </button>
                </form>
                {timer === 0 && (
                    <button
                        onClick={resendOtp}
                        disabled={isResending}
                        className="w-full mt-4 py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none"
                    >
                        {isResending ? "Resending..." : "Resend OTP"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default OTPVerification;
