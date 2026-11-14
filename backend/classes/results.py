from dataclasses import dataclass
from typing import Generic, TypeVar, Optional, Any

T = TypeVar('T')

@dataclass
class Result(Generic[T]):
    success: bool
    data: Optional[T] = None
    message: Optional[str] = None
    error: Optional[Any] = None
    
    @classmethod
    def passed(cls, data: Optional[T] = None, message: str = "Successful") -> "Result[T]":
        return cls(success=True, data=data, message=message)
    
    @classmethod
    def failed(cls, data: Optional[T] = None, message: str = "Failed", error: Optional[Any] = None) -> "Result[T]":
        return cls(success=False, data=data, message=message, error=error)