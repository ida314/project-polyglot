# backend/app/services/openai_service.py
from openai import OpenAI
from app.config import settings
from app.models.schemas import Language, CEFRLevel
from typing import Optional, Dict, List

client = OpenAI(api_key=settings.openai_api_key)

MODEL = "gpt-3.5-turbo"

class OpenAIService:
    @staticmethod
    async def generate_response(
        message: str,
        language: Language,
        cefr_level: CEFRLevel,
        conversation_history: List[Dict],
        is_confused: bool = False
    ) -> str:
        """Generate AI response in target language"""
        
        system_prompt = f"""You are a language tutor for {language.value}. 
        IMPORTANT: You must ONLY respond in {language.value}, never in English.
        Adapt your language complexity to {cefr_level.value} level.
        Keep responses natural and conversational.
        {"The user indicated confusion. Simplify your language slightly." if is_confused else ""}
        """
        
        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(conversation_history[-10:])  # Last 10 messages for context
        messages.append({"role": "user", "content": message})
        
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=200
        )
        
        return response.choices[0].message.content
    
    @staticmethod
    async def detect_mistakes(
        message: str,
        language: Language,
        cefr_level: CEFRLevel
    ) -> Optional[Dict]:
        """Silently detect grammar/vocabulary mistakes"""
        
        system_prompt = f"""Analyze this {language.value} message for errors.
        Expected level: {cefr_level.value}.
        If errors exist, return JSON with:
        - mistake_type: "grammar" or "vocabulary"
        - topic: specific topic (e.g., "past tense", "word choice")
        - explanation: brief explanation
        If no errors, return null.
        """
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )
        
        import json
        result = json.loads(response.choices[0].message.content)
        return result if result and result != "null" else None
