from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# =====================================================================
# ✅ EMAIL CONFIGURATION
# =====================================================================
app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME="munabiswal955@gmail.com",
    MAIL_PASSWORD="fnazvueuxkyquliw",  # Gmail App Password
    MAIL_DEFAULT_SENDER=("Health.io", "munabiswal955@gmail.com")
)

mail = Mail(app)

# =====================================================================
# ✅ MYSQL DATABASE CONNECTION
# =====================================================================
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",   # 👉 your MySQL password
        database="healthio"
    )
    cursor = db.cursor(dictionary=True)
    print("✅ MySQL Connected Successfully")
except Exception as e:
    print("❌ MySQL Connection Error:", e)

# Create users table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
)
""")
db.commit()

cursor.execute("""
CREATE TABLE IF NOT EXISTS password_reset (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    otp VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
db.commit()

@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")

    # Check if email exists
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"success": False, "error": "Email not found"}), 404

    # Generate OTP
    import random
    otp = str(random.randint(100000, 999999))

    # Save OTP in DB
    cursor.execute("INSERT INTO password_reset (email, otp) VALUES (%s, %s)", (email, otp))
    db.commit()

    # Send OTP
    msg = Message(
        subject="Your Password Reset OTP",
        recipients=[email],
        body=f"Your OTP is: {otp}\nThis OTP is valid for 10 minutes."
    )
    mail.send(msg)

    return jsonify({"success": True, "message": "OTP sent to your email"}), 200

@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")

    cursor.execute("SELECT * FROM password_reset WHERE email=%s AND otp=%s ORDER BY created_at DESC LIMIT 1",
                   (email, otp))
    record = cursor.fetchone()

    if not record:
        return jsonify({"success": False, "error": "Invalid OTP"}), 400

    return jsonify({"success": True}), 200

@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("new_password")

    cursor.execute("UPDATE users SET password=%s WHERE email=%s", (new_password, email))
    db.commit()

    return jsonify({"success": True, "message": "Password updated successfully"}), 200


# =====================================================================
# ✅ SIGNUP API
# =====================================================================
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data["email"]
    password = data["password"]

    # Check if user already exists
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    if cursor.fetchone():
        return jsonify({"success": False, "error": "Email already exists"}), 400

    # Insert new user
    cursor.execute(
        "INSERT INTO users (email, password) VALUES (%s, %s)",
        (email, password)
    )
    db.commit()

    return jsonify({"success": True, "message": "Account created"}), 200



# =====================================================================
# ✅ LOGIN API
# =====================================================================
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    # Check credentials
    cursor.execute(
        "SELECT * FROM users WHERE email=%s AND password=%s",
        (email, password)
    )
    user = cursor.fetchone()

    if user:
        return jsonify({"success": True}), 200

    return jsonify({"success": False, "error": "Invalid Email or Password"}), 401



# =====================================================================
# 🔵 CONTACT FORM EMAIL
# =====================================================================
@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.json

        msg = Message(
            subject=f"📩 New Contact Message from {data.get('name')}",
            recipients=["munabiswal955@gmail.com"],
            body=f"""
New Contact Message:

Name: {data.get("name")}
Email: {data.get("email")}
Subject: {data.get("subject")}

Message:
{data.get("message")}
"""
        )
        mail.send(msg)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("Contact Error:", e)
        return jsonify({"success": False, "error": str(e)}), 500



# =====================================================================
# 🔵 DOCTOR APPOINTMENT EMAIL
# =====================================================================
@app.route("/book-appointment", methods=["POST"])
def book_appointment():
    try:
        data = request.json

        msg_admin = Message(
            subject=f"🩺 New Appointment Booking — {data.get('doctor')}",
            recipients=["munabiswal955@gmail.com"],
            body=f"""
New Appointment Booking:

Doctor: {data.get('doctor')}
Patient: {data.get('patient_name')}
Email: {data.get('email')}
Date: {data.get('date')}
Time: {data.get('time')}

Notes:
{data.get('notes')}
"""
        )
        mail.send(msg_admin)

        msg_patient = Message(
            subject="Your Appointment is Confirmed ✔",
            recipients=[data.get("email")],
            body=f"""
Hello {data.get('patient_name')},

Your appointment with Dr. {data.get('doctor')} is confirmed.

Date: {data.get('date')}
Time: {data.get('time')}

Thank you for using Health.io 💙
"""
        )
        mail.send(msg_patient)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("Appointment Error:", e)
        return jsonify({"success": False, "error": str(e)}), 500



# =====================================================================
# 🔵 MEDICINE ORDER EMAIL
# =====================================================================
@app.route("/order-medicine", methods=["POST"])
def order_medicine():
    try:
        data = request.json

        msg_admin = Message(
            subject=f"🛒 New Medicine Order — {data.get('medicine')}",
            recipients=["munabiswal955@gmail.com"],
            body=f"""
New Medicine Order:

Customer: {data.get("name")}
Email: {data.get("email")}
Phone: {data.get("phone")}

Medicine: {data.get("medicine")}
Price: ₹{data.get("price")}

Delivery Address:
{data.get("address")}
"""
        )
        mail.send(msg_admin)

        msg_customer = Message(
            subject="Your Medicine Order is Confirmed ✔",
            recipients=[data.get("email")],
            body=f"""
Hello {data.get("name")},

Your order is placed successfully.

➡ Medicine: {data.get("medicine")}
➡ Price: ₹{data.get("price")}

We will deliver soon.
Health.io Team 💙
"""
        )
        mail.send(msg_customer)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("Medicine Order Error:", e)
        return jsonify({"success": False, "error": str(e)}), 500



# =====================================================================
# 🔵 HEALTH CHECKUP EMAIL
# =====================================================================
@app.route("/book-checkup", methods=["POST"])
def book_checkup():
    try:
        data = request.json

        msg_admin = Message(
            subject=f"🧪 New Checkup Booking — {data.get('name')}",
            recipients=["munabiswal955@gmail.com"],
            body=f"""
New Preventive Health Checkup Booking:

Name: {data.get("name")}
Email: {data.get("email")}
Phone: {data.get("phone")}

Package: {data.get("package")}
Date: {data.get("date")}
Time: {data.get("time")}
Payment: {data.get("payment_method")}

Notes:
{data.get("notes")}
"""
        )
        mail.send(msg_admin)

        msg_patient = Message(
            subject="Your Health Checkup is Confirmed ✔",
            recipients=[data.get("email")],
            body=f"""
Hello {data.get("name")},

Your health checkup package is confirmed.

Package: {data.get("package")}
Date: {data.get("date")}
Time: {data.get("time")}

Regards,
Health.io Team
"""
        )
        mail.send(msg_patient)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("Checkup Booking Error:", e)
        return jsonify({"success": False, "error": str(e)}), 500



# =====================================================================
# 🔵 THERAPY BOOKING EMAIL
# =====================================================================
@app.route("/book-therapy", methods=["POST"])
def book_therapy():
    try:
        data = request.json

        admin_msg = Message(
            subject=f"🧠 Therapy Booking — {data.get('patient_name')} with {data.get('counsellor')}",
            recipients=["munabiswal955@gmail.com"],
            body=f"""
Patient: {data.get("patient_name")}
Email: {data.get("email")}
Phone: {data.get("phone")}

Counsellor: {data.get("counsellor")}
Date: {data.get("date")}
Time: {data.get("time")}

Notes:
{data.get("notes")}
"""
        )
        mail.send(admin_msg)

        patient_msg = Message(
            subject="Your Therapy Session is Confirmed ✔",
            recipients=[data.get("email")],
            body=f"""
Hello {data.get("patient_name")},

Your therapy session is confirmed.

Counsellor: {data.get("counsellor")}
Date: {data.get("date")}
Time: {data.get("time")}

Stay strong 💙
Health.io Mental Wellness Team
"""
        )
        mail.send(patient_msg)

        return jsonify({"success": True}), 200

    except Exception as e:
        print("Therapy Booking Error:", e)
        return jsonify({"success": False, "error": str(e)}), 500



# =====================================================================
# START SERVER
# =====================================================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)