
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Ensure this is imported to register the autoTable function
import useUserData from "../../plugin/useUserData";


const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const invoiceData = location.state?.invoice; // Retrieve invoice data passed via state

    const email = useUserData()?.email;

    // Dummy data for demonstration (remove this when real data is passed via location.state)
    const dummyInvoice = {
        invoice_id: "INV12345",
        user_email: email,
        plan: "Premium",
        amount: 9.99,
        date: "2025-01-19",
    };
    const invoice = invoiceData || dummyInvoice;

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Invoice", 105, 20, null, null, "center");
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${invoice.invoice_id}`, 20, 40);
        doc.text(`User Email: ${invoice.user_email}`, 20, 50);
        doc.text(`Plan: ${invoice.plan}`, 20, 60);
        doc.text(`Amount: $${invoice.amount}`, 20, 70);
        doc.text(`Date: ${invoice.date}`, 20, 80);
        doc.autoTable({
            startY: 90,
            head: [["Field", "Details"]],
            body: [
                ["Invoice ID", invoice.invoice_id],
                ["User Email", invoice.user_email],
                ["Plan", invoice.plan],
                ["Amount", `$${invoice.amount}`],
                ["Date", invoice.date],
            ],
        });
        doc.save("invoice.pdf");
    };

    return (
        <div className="bg-yellow-50 min-h-screen flex flex-col items-center justify-center py-10 px-4">
            <div className="relative">
                <div className="bg-yellow-400 rounded-full w-48 h-48 animate-ping absolute top-0 left-0"></div>
                <div className="bg-yellow-400 rounded-full w-48 h-48 animate-ping absolute top-0 right-0"></div>
            </div>
            <div className="relative z-10 text-center">
                <div className="bg-white rounded-lg shadow-xl p-10 max-w-2xl">
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

                    {/* Invoice Table */}
                    <div className="bg-gray-50 rounded-lg shadow-md mt-6 p-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Invoice Details
                        </h2>
                        <table className="w-full text-left border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-bold">
                                        Field
                                    </th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-bold">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        Invoice ID
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {invoice.invoice_id}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        User Email
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {invoice.user_email}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        Plan
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {invoice.plan}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        Amount
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        ${invoice.amount}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2">
                                        Date
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {invoice.date}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Download Invoice Button */}
                    <button
                        onClick={handleDownloadInvoice}
                        className="mt-6 px-6 py-3 bg-yellow-400 text-white hover:bg-yellow-500 transition-all rounded-full font-semibold shadow-md"
                    >
                        Download Invoice
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 px-6 py-3 bg-black text-yellow-400 hover:text-white hover:bg-gray-800 transition-all rounded-full font-semibold shadow-md"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;

