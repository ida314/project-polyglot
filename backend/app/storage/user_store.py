# backend/app/storage/user_store.py
import json
import os
from typing import List, Dict
from datetime import datetime

class UserStore:
    def __init__(self):
        self.storage_path = "data/conversations/"
        os.makedirs(self.storage_path, exist_ok=True)
    
    async def add_message(
        self,
        user_id: str,
        session_id: str,
        role: str,
        content: str
    ):
        """Add message to conversation history"""
        file_path = f"{self.storage_path}{user_id}_{session_id}.json"
        
        try:
            with open(file_path, 'r') as f:
                messages = json.load(f)
        except:
            messages = []
        
        messages.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        
        with open(file_path, 'w') as f:
            json.dump(messages, f)
    
    async def get_conversation_history(
        self,
        user_id: str,
        session_id: str
    ) -> List[Dict]:
        """Get conversation history"""
        file_path = f"{self.storage_path}{user_id}_{session_id}.json"
        
        try:
            with open(file_path, 'r') as f:
                messages = json.load(f)
            return [{"role": m["role"], "content": m["content"]} for m in messages]
        except:
            return []
