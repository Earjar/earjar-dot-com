import boto3
import mimetypes
import os
from dotenv import load_dotenv

load_dotenv()

s3 = boto3.client(
    service_name="s3",
    endpoint_url=os.getenv("BUCKET_ENDPOINT"),
    aws_access_key_id=os.getenv("BUCKET_API_KEY_ID"),
    aws_secret_access_key=os.getenv("BUCKET_SECRET_ACCESS_KEY"),
    region_name="auto",
)

BUCKET_NAME = os.getenv("BUCKET_NAME")
ALLOWED_TYPES = {"audio/mpeg", "audio/wav", "video/mp4"}

def fix_all_content_types():
    paginator = s3.get_paginator("list_objects_v2")
    for page in paginator.paginate(Bucket=BUCKET_NAME):
        for obj in page.get("Contents", []):
            key = obj["Key"]
            content_type, _ = mimetypes.guess_type(key)
            
            if content_type not in ALLOWED_TYPES:
                print(f"Skipping {key} — {content_type}")
                continue

            if not content_type:
                print(f"Skipping {key} — could not guess content type")
                continue
            
            print(f"Fixing {key} → {content_type}")
            s3.copy_object(
                Bucket=BUCKET_NAME,
                CopySource={"Bucket": BUCKET_NAME, "Key": key},
                Key=key,
                ContentType=content_type,
                MetadataDirective="REPLACE",
            )

fix_all_content_types()