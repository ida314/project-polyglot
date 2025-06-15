# backend/app/api/endpoints/auth.py
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.services.auth_service import AuthService
from app.models.schemas import UserProfile

router = APIRouter()
auth_service = AuthService()
security = HTTPBearer()

@router.post("/google")
async def google_auth(token: str):
    """Authenticate with Google OAuth token"""
    user_info = auth_service.verify_google_token(token)
    
    if not user_info:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Create JWT token
    access_token = auth_service.create_access_token(user_info)
    
    return {
        "access_token": access_token,
        "user": UserProfile(**user_info)
    }

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    return {"user_id":"test_user"}
    '''
    """Get current authenticated user"""
    token = credentials.credentials
    payload = auth_service.verify_jwt_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return payload

'''