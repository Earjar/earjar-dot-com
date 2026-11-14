from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routes.payment_routes import payment_route
from routes.health import health_route
from dotenv import load_dotenv
from classes.logger import CustomLogger
import os, uvicorn, aiomysql

print(f"Railway injected PORT={os.getenv('PORT')}", flush=True)

load_dotenv()

custom_logger = CustomLogger()
CLIENT_ORIGINS = os.getenv("CLIENT_ORIGINS", [])

DB_NAME = os.getenv("DB_NAME")
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT", 4000))

@asynccontextmanager
async def lifespan(app: FastAPI):
    db_pool: aiomysql.Pool | None = None
    
    try:
        custom_logger.info(f"Connecting to DB at {DB_HOST}:{DB_PORT} ...")
        db_pool = await aiomysql.create_pool(
            user=DB_USERNAME,
            password=DB_PASSWORD,
            db=DB_NAME,
            host=DB_HOST,
            port=DB_PORT,
            minsize=1,
            maxsize=5,
            autocommit=True,   # recommended for TiDB
            ssl=True           # true for ssl context if using TiDB Cloud
        )
        custom_logger.info("DB pool created successfully.")
        app.state.db_pool = db_pool
        yield

    except Exception as exc:
        custom_logger.exception(str(exc))
        raise
    
    finally:
        if db_pool:
            db_pool.close()
            await db_pool.wait_closed()

app = FastAPI(title="Earjar", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CLIENT_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(health_route)
app.include_router(payment_route, prefix="/payment")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8080))
    )
