import boto3
import os
import io
from dotenv import load_dotenv

load_dotenv()

BUCKET_NAME = os.getenv("BUCKET_NAME", "#")
BUCKET_API_KEY_ID = os.getenv("BUCKET_API_KEY_ID", "#")
BUCKET_SECRET_ACCESS_KEY = os.getenv("BUCKET_SECRET_ACCESS_KEY", "#")
BUCKET_ENDPOINT = os.getenv("BUCKET_ENDPOINT", "#")
PUBLIC_BUCKET_URL = os.getenv("PUBLIC_BUCKET_URL", "")

s3 = boto3.client(
    service_name="s3",
    endpoint_url=BUCKET_ENDPOINT,
    aws_access_key_id=BUCKET_API_KEY_ID,
    aws_secret_access_key=BUCKET_SECRET_ACCESS_KEY,
    region_name="auto",
)
def get_file_url(filename: str, expires_in: int = 3600) -> str:
    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": BUCKET_NAME, "Key": filename},
        ExpiresIn=expires_in
    )
    
def upload_file(file: bytes, filename: str, content_type: str | None = "application/octet-stream"):
    s3.upload_fileobj(
        io.BytesIO(file),
        BUCKET_NAME,
        filename,
        ExtraArgs={"ContentType": content_type}
    )
    return f"{PUBLIC_BUCKET_URL}/{filename}"