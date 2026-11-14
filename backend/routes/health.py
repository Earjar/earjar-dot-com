from fastapi import APIRouter
from fastapi.responses import JSONResponse

health_route = APIRouter()

@health_route.get("/")
async def get_health():
    return JSONResponse({
        "success": True, "message": "Server is up and running :)", "data": []
    }, status_code=200)