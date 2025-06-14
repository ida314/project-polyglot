# backend/app/api/endpoints/review.py
from fastapi import APIRouter, Depends
from app.models.schemas import ReviewRequest, ReviewResponse
from app.services.mistake_tracker import MistakeTracker
from app.api.endpoints.auth import get_current_user

router = APIRouter()
mistake_tracker = MistakeTracker()

@router.post("/", response_model=ReviewResponse)
async def get_review_exercises(
    request: ReviewRequest,
    current_user: dict = Depends(get_current_user)
):
    """Generate review exercises based on user's mistakes"""
    user_id = current_user["user_id"]
    
    # Get user's recent mistakes
    mistakes = await mistake_tracker.get_user_mistakes(user_id, limit=20)
    
    # TODO: Generate personalized exercises based on mistakes
    # For now, return placeholder exercises
    exercises = [
        {
            "type": "fill_blank",
            "prompt": f"Complete the sentence in {request.language.value}",
            "question": "Yesterday I ___ to the store.",
            "answer": "went",
            "topic": "past tense"
        }
    ]
    
    return ReviewResponse(exercises=exercises)
