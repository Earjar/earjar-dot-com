import traceback
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from classes.logger import CustomLogger

load_dotenv()

custom_logger = CustomLogger()
payment_route = APIRouter()

@payment_route.post("/process")
async def process_payment():
    try:
        return JSONResponse({
            "success": True,
            "message": "Payment processed",
            "data": []
        }, status_code=200)
    
    except Exception:
        traceback.print_exc()
        return JSONResponse({
            "success": False,
            "message": "Failed to process payment",
            "data": []
        }, status_code=500)