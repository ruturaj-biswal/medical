import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./delivery.css";

export default function PlaceOrder() {
  const { state } = useLocation();
  const item = state?.item || null;
  const navigate = useNavigate();

  // form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "UPI",
  });
  const [error, setError] = useState("");

  // calculate amount
  const amount = item ? item.price : 0;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // simple validation
    if (!form.name || !form.phone || !form.address) {
      setError("Please fill all required fields.");
      return;
    }

    // create an order
    const order = {
      id: "ORD" + Date.now(),
      item,
      amount,
      customer: form,
      status: "Placed",
      createdAt: new Date().toISOString(),
    };

    // save to localStorage (orders list)
    const existing = JSON.parse(localStorage.getItem("healio_orders") || "[]");
    existing.unshift(order);
    localStorage.setItem("healio_orders", JSON.stringify(existing));

    // go to OrderPlaced page with order id
    navigate("/order-placed", { state: { orderId: order.id } });
  };

  return (
    <div className="delivery-page">
      <div className="delivery-container narrow">
        <h2 className="delivery-title">Checkout — Place Your Order</h2>

        {!item ? (
          <div className="muted">No item selected. Please go back and choose a medicine.</div>
        ) : (
          <>
            <div className="checkout-card">
              <div>
                <h4>{item.name}</h4>
                <p className="muted">{item.desc}</p>
              </div>
              <div className="checkout-price">₹ {amount}</div>
            </div>

            <form className="order-form" onSubmit={handlePlaceOrder}>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (10 digits)" />
              <textarea name="address" value={form.address} onChange={handleChange} placeholder="Delivery address" rows="3" />
              <label className="label-inline">Payment method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                <option>UPI</option>
                <option>Card</option>
                <option>Cash on Delivery</option>
              </select>

              {error && <div className="form-error">{error}</div>}

              <div className="order-actions">
                <button type="submit" className="btn-place">Place Order</button>
                <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
