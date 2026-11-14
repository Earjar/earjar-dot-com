from typing import Any, List
from datetime import datetime, timedelta, timezone
from classes.logger import CustomLogger
import pytz

sa_timezone = pytz.timezone('Africa/Johannesburg')
custom_logger = CustomLogger()

# converting
def utc_to_localtime(dt: Any) -> str:
    """Convert UTC datetime string or object to Africa/Johannesburg and return friendly format."""
    if isinstance(dt, str):
        try:
            dt = datetime.fromisoformat(dt.replace("Z", "+00:00"))
            
        except ValueError:
            return dt

    if isinstance(dt, datetime):
        if dt.tzinfo is None:
            dt = pytz.utc.localize(dt)
        local_dt = dt.astimezone(sa_timezone)
        return local_dt.strftime("%B %d %Y at %H:%M:%S")

    return dt

def localtime_to_aware(dt: Any) -> datetime | None:
    """ this is for inserting into postgres """
    try:
        if isinstance(dt, datetime):
            if dt.tzinfo is None:
                # Assume UTC, then you can offset if needed
                return dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)

        elif isinstance(dt, str):
            normalized = dt.strip()
            if normalized.endswith("Z"):
                normalized = normalized[:-1] + "+00:00"
            parsed = datetime.fromisoformat(normalized)
            if parsed.tzinfo is None:
                return parsed.replace(tzinfo=timezone.utc)
            return parsed.astimezone(timezone.utc)

        return None

    except (ValueError, AttributeError) as e:
        custom_logger.exception(f"[localtime_to_aware] Failed on value={repr(dt)}, error={e}")
        raise

def datetime_to_str(dt: datetime | None) -> str | None:
    """ USE THIS, for dates being sent to frontend, the other utc_to_localtime seems to fail for JSON """
    try:
        if isinstance(dt, datetime):
            return dt.isoformat()

        elif isinstance(dt, str):
            str_dt = datetime.strptime(dt, "%Y-%m-%dT%H:%M:%SZ")
            return str_dt.isoformat()

        return None

    except ValueError:
        raise