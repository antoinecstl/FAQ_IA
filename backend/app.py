import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
from typing import Optional

# Récupérer la clé OpenAI depuis la variable d'environnement
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class ChatRequest(BaseModel):
    text: str
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatRequest):
    prompt = chat_request.text.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Le champ text est vide.")

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Tu es un assistant chatbot qui répond de manière concise et informative."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=200
        )

        generated_text = completion.choices[0].message.content.strip()
        return ChatResponse(response=generated_text)

    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=500, detail=f"Erreur OpenAI: {str(e)}")
