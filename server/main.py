from PIL import Image
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Form, File, UploadFile

import numpy as np
import tensorflow as tf

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
async def detect_deepfake(file: UploadFile = File(...)):
  im = Image.open(file.file)

  input_arr = tf.keras.utils.img_to_array(im)

  input_arr = np.array([input_arr])

  model = load_model('model.tf')

  prediction = model.predict(input_arr)

  prediction_list = prediction.tolist()

  return { "prediction": prediction_list }