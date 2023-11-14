# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows access from the frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This class defines the structure of the request body for creating a comic.
class ComicCreationRequest(BaseModel):
    prompt: str
    title: str

# This function simulates the image generation process.
async def generate_image(prompt: str):
    # Simulate image generation delay
    await asyncio.sleep(2)  # This is where the real model would process the prompt
    return "image_data_here"

@app.post("/create-comic")
async def create_comic(comic_request: ComicCreationRequest):
    # Simulate text generation and image generation
    generated_text = f"Generated text based on the prompt: {comic_request.prompt}"
    generated_image_data = await generate_image(comic_request.prompt)

    return {
        "title": comic_request.title,
        "text": generated_text,
        "image": generated_image_data
    }
