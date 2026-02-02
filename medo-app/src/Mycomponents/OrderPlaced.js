import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./delivery.css";

export default function OrderPlaced() {
  const { state } = useLocation();
  const orderId = state?.orderId || null;
  const navigate = useNavigate();

  // fetch order from localStorage
  const orders = JSON.parse(localStorage.getItem("healio_orders") || "[]");
  const order = orders.find((o) => o.id === orderId) || null;

  if (!order) {
    return (
      <div className="delivery-page">
        <div className="delivery-container narrow">
          <h3>Order not found</h3>
          <p className="muted">Maybe the order expired or you navigated here directly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-page">
      <div className="delivery-container narrow">
        <div className="placed-card">
          <h2>🎉 Order Placed</h2>
          <p>Your order <strong>{order.id}</strong> has been placed successfully.</p>

          <div className="order-summary">
            <h4>{order.item.name}</h4>
            <p className="muted">{order.item.desc}</p>
            <div className="summary-row"><span>Total</span><strong>₹ {order.amount}</strong></div>
            <div className="summary-row"><span>Delivery to</span><span>{order.customer.name}</span></div>
            <div className="summary-row"><span>Phone</span><span>{order.customer.phone}</span></div>
            <div className="summary-row"><span>Address</span><span>{order.customer.address}</span></div>
          </div>

          <div className="order-actions">
            {/* simulate payment / confirm */}
            <button className="btn-place" onClick={() => navigate("/order-confirmation", { state: { orderId: order.id } })}>
              Confirm & Pay
            </button>
            <button className="btn-secondary" onClick={() => navigate("/orders")}>My Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}
