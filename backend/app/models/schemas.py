#backend/app/models/schemas.py
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class CEFRLevel(str, Enum):
    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"
    C2 = "C2"

class Language(str, Enum):
    SPANISH = "Spanish"
    FRENCH = "French"
    GERMAN = "German"
    ITALIAN = "Italian"
    PORTUGUESE = "Portuguese"
    CHINESE = "Chinese"
    JAPANESE = "Japanese"
    ENGLISH = "English"

class ChatRequest(BaseModel):
    message: str
    language: Language
    cefr_level: CEFRLevel
    session_id: str
    is_confused: bool = False

class ChatResponse(BaseModel):
    response: str
    session_id: str

class Mistake(BaseModel):
    timestamp: str
    user_message: str
    mistake_type: str
    topic: str
    context: str

class UserProfile(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str]

class ReviewRequest(BaseModel):
    language: Language
    cefr_level: CEFRLevel
    limit: int = 5

class ReviewResponse(BaseModel):
    exercises: List[dict]
