## Kamve Space - Backend

- Stack -> Python FastAPI

Each backend template includes a `/routes` folder and uses the same structured response format for consistency.

### API Response Format

#### Success Response
```json
JSONResponse({
    "success": true,
    "message": "Operation successful.",
    "data": YOUR_DATA
}, status_code=200)
```

#### Failed Response
```json
JSONResponse({
    "success": false,
    "message": "An error occurred.",
    "data": []
}, status_code=500)
```

### Example Routes

`/routes/test_routes.py`
```python
import traceback
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/test")
def test_conn():
    some_value = True

    try:
        if some_value == False:
            raise HTTPException(status_code=400, detail="Some Value has to be True")
        
        return JSONResponse({
            "success": True,
            "message": "Some Value Is Correct",
            "data": []
        }, status_code=200)

    except HTTPException:
        raise

    except Exception:
        traceback.print_exc()
        return JSONResponse({
            "success": False,
            "message": "An unexpected error occured testing the connection",
            "data": []
        }, status_code=500)
```

`main.py`
```python
from fastapi import FastAPI
from routes.test_routes import router as test_router

app = FastAPI()
app.include_router(test_router, "/")
```