# backend/app/services/auth_service.py
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional
from app.config import settings
from google.auth.transport import requests
from google.oauth2 import id_token

class AuthService:
    @staticmethod
    def verify_google_token(token: str) -> Optional[dict]:
        """Verify Google OAuth token and extract user info"""
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                settings.google_client_id
            )
            
            return {
                "user_id": idinfo["sub"],
                "email": idinfo["email"],
                "name": idinfo.get("name", ""),
                "picture": idinfo.get("picture", "")
            }
        except ValueError:
            return None
    
    @staticmethod
    def create_access_token(data: dict) -> str:
        """Create JWT access token"""
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(hours=24)
        to_encode.update({"exp": expire})
        
        return jwt.encode(
            to_encode,
            settings.jwt_secret,
            algorithm="HS256"
        )
    
    @staticmethod
    def verify_jwt_token(token: str) -> Optional[dict]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=["HS256"]
            )
            return payload
        except JWTError:
            return None
