from typing import Union

from fastapi import FastAPI, Form, File, UploadFile
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

import tensorflow as tf
import numpy as np

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
  # load model
  model = load_model('model.tf')

  # check model info
  print(model.summary())

  return {"Hello": "World"}

@app.post("/detect")
async def detect_deepfake(file: UploadFile = File(...)):
  im = Image.open(file.file)

  input_arr = tf.keras.utils.img_to_array(im)

  input_arr = np.array([input_arr])

  model = load_model('model.tf')

  prediction = model.predict(input_arr)

  prediction_list = prediction.tolist()

  return { "file": file, "prediction": prediction_list }