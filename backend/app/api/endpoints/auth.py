# backend/app/api/endpoints/auth.py
from fastapi import APIRouter, HTTPException, Depends, Body
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

from app.services.auth_service import AuthService
from app.models.schemas import UserProfile

router = APIRouter()
auth_service = AuthService()
security = HTTPBearer()


# ────────────────────────────────────────────
# Pydantic I/O models
# ────────────────────────────────────────────
class TokenRequest(BaseModel):
    token: str


class AuthResponse(BaseModel):
    access_token: str
    user: UserProfile


# ────────────────────────────────────────────
# Helper (shared logic)
# ────────────────────────────────────────────
def _authenticate(token: str) -> AuthResponse:
    """Verify provider token → issue JWT → return user profile."""
    user_info = auth_service.verify_google_token(token)
    if not user_info:
        raise HTTPException(status_code=401, detail="Invalid token")

    access_token = auth_service.create_access_token(user_info)
    return AuthResponse(access_token=access_token, user=UserProfile(**user_info))


# ────────────────────────────────────────────
# Public endpoints
# ────────────────────────────────────────────
@router.post("/google", response_model=AuthResponse, tags=["auth"])
async def google_auth(query_token: str):
    """
    Legacy convenience route:

    POST /api/auth/google?query_token=<id-token>
    """
    return _authenticate(query_token)


@router.post(
    "/",                       # final path: POST /api/auth  (no slash required)
    response_model=AuthResponse,
    tags=["auth"],
)
async def universal_auth(payload: TokenRequest = Body(...)):
    """
    Preferred auth route:

        POST /api/auth
        { "token": "<google-id-token>" }
    """
    return _authenticate(payload.token)


# ────────────────────────────────────────────
# Dependency – protect private routes
# ────────────────────────────────────────────
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    token = credentials.credentials
    payload = auth_service.verify_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload
