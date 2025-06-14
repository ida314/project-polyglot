import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    google_client_id: str
    google_client_secret: str
    jwt_secret: str
    database_path: str = "data/polyglot.db"
    
    class Config:
        env_file = ".env"

settings = Settings()
