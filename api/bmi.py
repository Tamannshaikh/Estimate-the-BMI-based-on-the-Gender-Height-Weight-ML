from http.server import BaseHTTPRequestHandler
import json
import os

# Load and transform data once at module level (reused across warm invocations)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "backend", "data", "BMI_Full_Predictions.json")

with open(DATA_PATH, "r", encoding="utf-8") as f:
    raw = json.load(f)

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

DATA_JSON = json.dumps(DATA).encode("utf-8")


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.end_headers()
        self.wfile.write(DATA_JSON)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.end_headers()

    def log_message(self, format, *args):
        pass  # suppress default logging noise
