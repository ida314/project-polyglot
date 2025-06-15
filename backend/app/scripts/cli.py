import time
import requests

API_URL = "http://localhost:8000"

HEADERS = {

}

def send_chat(message: str, language: str = "pt", level: str = "A2"):
    payload = {
        "message": message,
        "language": language,
        "level": level,
    }
    response = requests.post(f"{API_URL}/api/chat", json=payload, headers=HEADERS)
    return response.json()

def get_review(message: str, language: str = "pt"):
    payload = {
        "message": message,
        "language": language,
    }
    response = requests.post(f"{API_URL}/review", json=payload, headers=HEADERS)
    return response.json()

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in {"quit", "exit"}:
            break

        # Chat endpoint
        chat_response = send_chat(user_input)
        print("AI:", chat_response.get("response", "[No response]"))

        # Review endpoint
        review_response = get_review(user_input)
        print("Review:", review_response.get("corrections", "[No corrections]"))