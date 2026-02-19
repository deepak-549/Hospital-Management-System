import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { billId, totalAmount } = state;

  const [paymentMode, setPaymentMode] = useState("");
  const [upiId, setUpiId] = useState("");

  const handlePayment = async () => {
    if (paymentMode === "UPI" && !upiId) {
      alert("Enter UPI ID");
      return;
    }

    await axiosInstance.post(
      `/payments/${billId}`,
      {
        paymentMode,
        upiId
      }
    );

    alert("Payment Successful");
    navigate("/dashboard");
  };

  return (
    <div className="payment-page">
      <h2>Payment</h2>

      <h3>Total Amount: ₹{totalAmount}</h3>

      <select
        value={paymentMode}
        onChange={e => setPaymentMode(e.target.value)}
      >
        <option value="">Select Payment Method</option>
        <option value="CASH">Cash</option>
        <option value="UPI">UPI</option>
      </select>

      {paymentMode === "UPI" && (
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={e => setUpiId(e.target.value)}
        />
      )}

      <button onClick={handlePayment}>
        Confirm Payment
      </button>
    </div>
  );
}

export default Payment;
