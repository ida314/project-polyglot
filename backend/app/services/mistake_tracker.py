# backend/app/service/mistake_tracker.py
import json
from datetime import datetime
from typing import List, Dict
from app.models.schemas import Mistake

class MistakeTracker:
    def __init__(self):
        self.storage_path = "data/mistakes/"
    
    async def log_mistake(
        self,
        user_id: str,
        message: str,
        mistake_info: Dict
    ):
        """Store mistake information for a user"""
        mistake = Mistake(
            timestamp=datetime.now().isoformat(),
            user_message=message,
            mistake_type=mistake_info.get("mistake_type", "unknown"),
            topic=mistake_info.get("topic", "general"),
            context=mistake_info.get("explanation", "")
        )
        
        # Store in JSON file (placeholder for database)
        user_file = f"{self.storage_path}{user_id}.json"
        try:
            with open(user_file, 'r') as f:
                mistakes = json.load(f)
        except:
            mistakes = []
        
        mistakes.append(mistake.dict())
        
        with open(user_file, 'w') as f:
            json.dump(mistakes, f)
    
    async def get_user_mistakes(
        self,
        user_id: str,
        limit: int = 10
    ) -> List[Mistake]:
        """Retrieve user's recent mistakes"""
        user_file = f"{self.storage_path}{user_id}.json"
        try:
            with open(user_file, 'r') as f:
                mistakes = json.load(f)
            return [Mistake(**m) for m in mistakes[-limit:]]
        except:
            return []
