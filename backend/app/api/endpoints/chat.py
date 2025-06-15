# backend/app/api/endpoints/chat.py
from fastapi import APIRouter, Depends, HTTPException
import openai

from app.models.schemas import ChatRequest, ChatResponse
from app.services.openai_service import OpenAIService
from app.services.mistake_tracker import MistakeTracker
from app.storage.user_store import UserStore
from app.api.endpoints.auth import get_current_user

router = APIRouter()
openai_service = OpenAIService()
mistake_tracker = MistakeTracker()
user_store = UserStore()

@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """Handle chat messages"""
    user_id = current_user["user_id"]
    
    # Get conversation history
    history = await user_store.get_conversation_history(user_id, request.session_id)
    
    # Generate AI response
    try:
        ai_response = await openai_service.generate_response(
            message=request.message,
            language=request.language,
            cefr_level=request.cefr_level,
            conversation_history=history,
            is_confused=request.is_confused
        )
    except openai.error.RateLimitError as e:
        raise HTTPException(status_code=429, detail="OpenAI rate limit exceeded.")
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {str(e)}")
    
    # Store messages
    await user_store.add_message(user_id, request.session_id, "user", request.message)
    await user_store.add_message(user_id, request.session_id, "assistant", ai_response)
    
    # Detect mistakes (silently)
    mistake_info = await openai_service.detect_mistakes(
        message=request.message,
        language=request.language,
        cefr_level=request.cefr_level
    )
    
    if mistake_info:
        await mistake_tracker.log_mistake(user_id, request.message, mistake_info)
    
    return ChatResponse(
        response=ai_response,
        session_id=request.session_id
    )
