from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "hireme.db")

# ---------- DATABASE ----------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Init DB
conn = get_db()
conn.execute("""
CREATE TABLE IF NOT EXISTS hire_requests(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 budget TEXT NOT NULL,
 message TEXT NOT NULL,
 time DATETIME DEFAULT CURRENT_TIMESTAMP
)
""")
conn.commit()
conn.close()

# ---------- API : SEND MESSAGE ----------
@app.route("/send", methods=["POST"])
def send():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        budget = data.get("budget")
        message = data.get("message")

        if not all([name, email, budget, message]):
            return jsonify({"status": "error", "msg": "Invalid input"}), 400

        conn = get_db()
        conn.execute(
            "INSERT INTO hire_requests(name,email,budget,message) VALUES(?,?,?,?)",
            (name, email, budget, message)
        )
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "msg": "Message saved successfully"})

    except Exception as e:
        print("SERVER ERROR:", e)
        return jsonify({"status": "error", "msg": "Server error"}), 500


# ---------- ADMIN API ----------
@app.route("/admin/messages")
def admin_messages():
    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM hire_requests ORDER BY time DESC"
    ).fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])


# ---------- HEALTH CHECK ----------
@app.route("/")
def home():
    return "Backend is running"


# ---------- RUN (RENDER FIX) ----------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
