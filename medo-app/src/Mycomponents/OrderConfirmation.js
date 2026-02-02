import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./delivery.css";

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderId = state?.orderId || null;
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem("healio_orders") || "[]");
  const order = orders.find((o) => o.id === orderId) || null;

  // mark as confirmed (update localStorage)
  const confirm = () => {
    if (!order) return;
    const updated = orders.map((o) => o.id === orderId ? { ...o, status: "Confirmed" } : o);
    localStorage.setItem("healio_orders", JSON.stringify(updated));
    navigate("/"); // go home after confirm
  };

  if (!order) {
    return (
      <div className="delivery-page">
        <div className="delivery-container narrow">
          <h3>Order not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-page">
      <div className="delivery-container narrow">
        <div className="confirm-card">
          <h2>✅ Payment Confirmed</h2>
          <p>Your order <strong>{order.id}</strong> is confirmed. Estimated delivery: <strong>2 - 4 days</strong>.</p>

          <div className="order-summary">
            <h4>{order.item.name}</h4>
            <div className="summary-row"><span>Total</span><strong>₹ {order.amount}</strong></div>
            <div className="summary-row"><span>Delivery to</span><span>{order.customer.name}</span></div>
          </div>

          <div className="order-actions">
            <button className="btn-place" onClick={confirm}>Finish & Go Home</button>
            <button className="btn-secondary" onClick={() => navigate("/orders")}>View Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}
