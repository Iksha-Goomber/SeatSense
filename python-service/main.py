"""Optional SeatSense prediction microservice. Run with: uvicorn main:app --reload"""
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import math

app = FastAPI(title="SeatSense Prediction API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=False, allow_methods=["*"], allow_headers=["*"])

class ForecastRequest(BaseModel):
    hour: int = Field(ge=0, le=23)
    day_of_week: int = Field(ge=0, le=6)
    capacity: int = Field(default=54, ge=1, le=10000)

@app.get("/health")
def health():
    return {"status": "ok", "service": "SeatSense Prediction API"}

@app.post("/predict")
def predict(payload: ForecastRequest):
    h = payload.hour
    morning = math.exp(-((h - 10) / 2.1) ** 2) * 0.48
    afternoon = math.exp(-((h - 15) / 3) ** 2) * 0.68
    evening = math.exp(-((h - 19) / 2.2) ** 2) * 0.32
    day_factor = 0.68 if payload.day_of_week in (0, 6) else (0.78 if payload.day_of_week == 5 else 1.0)
    occupancy = min(0.96, max(0.12, (0.16 + morning + afternoon + evening) * day_factor))
    available = round(payload.capacity * (1 - occupancy))
    return {"available": available, "occupancy_percent": round(occupancy * 100), "confidence": 72,
            "label": "Very busy" if occupancy > .78 else "Moderately busy" if occupancy > .58 else "Good availability",
            "generated_at": datetime.utcnow().isoformat() + "Z", "model": "baseline-demand-curve"}
