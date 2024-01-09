from typing import Union

from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/detect")
async def detect_deepfake(file: UploadFile = Form(...)):
    print(file)
    return { "file": file }