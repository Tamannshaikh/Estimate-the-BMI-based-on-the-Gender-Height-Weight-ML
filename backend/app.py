from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ---------- LOAD JSON ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "BMI_Full_Predictions.json")

with open(DATA_PATH, "r", encoding="utf-8") as f:
    raw = json.load(f)

# ---------- TRANSFORM DATA FOR FRONTEND ----------
DATA = []
for d in raw:
    height = float(d["Height"])
    weight = float(d["Weight"])
    bmi = round(weight / ((height / 100) ** 2), 1)

    DATA.append({
        "gender": "Male" if str(d["Gender"]) == "0" or d["Gender"] == "Male" else "Female",
        "height": height,
        "weight": weight,
        "bmi": bmi,
        "index": int(d["Predicted_Index"])
    })

# ---------- TEST ROUTE ----------
@app.route("/")
def home():
    return "BMI API is running successfully!"

# ---------- NEW API (FOR analysis_v2) ----------
@app.route("/api/bmi")
def api_bmi():
    return jsonify(DATA)

# ---------- OLD API (SAFE – OPTIONAL) ----------
@app.route("/api/bmi-data")
def api_old():
    return jsonify(DATA)

# ---------- RUN ----------
if __name__ == "__main__":
    app.run(debug=True)
