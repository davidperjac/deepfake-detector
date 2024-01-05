export const CODE = `from google.colab import files

uploaded = files.upload()

!pip install -q kaggle

!mkdir -p ~/.kaggle
!cp kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json

!ls -lha ~/.kaggle

!kaggle datasets download -d manjilkarki/deepfake-and-real-images

!unzip /content/deepfake-and-real-images.zip

import matplotlib.pyplot as plt
# import numpy as np
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.python.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D
from tensorflow.keras.models import Sequential

train_dir = '/content/Dataset/Train'
test_dir = '/content/Dataset/Test'
validation_dir = '/content/Dataset/Validation'

def normalize_image(image, labels):
  image = tf.cast(image, tf.float32) / 255.0
  return image, labels

IMG_SIZE = (256, 256)

train_data = tf.keras.preprocessing.image_dataset_from_directory(train_dir,
                                                                 label_mode = 'categorical',
                                                                 batch_size = 32,
                                                                 image_size= IMG_SIZE)

validation_data = tf.keras.preprocessing.image_dataset_from_directory(validation_dir,
                                                                 label_mode = 'categorical',
                                                                 batch_size = 32,
                                                                 image_size= IMG_SIZE)

test_data = tf.keras.preprocessing.image_dataset_from_directory(test_dir,
                                                                 label_mode = 'categorical',
                                                                 batch_size = 32,
                                                                 image_size= IMG_SIZE,
                                                                shuffle = False)

train_data = train_data.map(normalize_image)
validation_data = validation_data.map(normalize_image)
test_data = test_data.map(normalize_image)

model_CNN = Sequential([

    # Conv2D(filters = 512 , kernel_size=3, padding = 'valid', input_shape = (256, 256, 3), activation= 'relu'),
    # tf.keras.layers.MaxPooling2D(),
    # tf.keras.layers.BatchNormalization(),

    Conv2D(filters = 8, kernel_size = 5,input_shape = (256, 256, 3), activation= 'relu'),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.BatchNormalization(),

    Conv2D(filters= 16, kernel_size=4, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Dropout(0.2),

    Conv2D(filters= 32, kernel_size=3, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.BatchNormalization(),

    Conv2D(filters= 64, kernel_size=2, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.BatchNormalization(),

    Conv2D(filters= 128, kernel_size=1, activation='relu'),
    tf.keras.layers.MaxPooling2D(),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Dropout(0.2),

    Flatten(),
    tf.keras.layers.Dropout(0.3),
    Dense(units = 64, activation = 'softmax'),
    Dense(units = 20, activation = 'softmax'),
    Dense(units = 2, activation = 'softmax')])

model_CNN.compile(optimizer = tf.keras.optimizers.Adam(),
                loss = 'BinaryCrossentropy',
                metrics=['accuracy'])

hist = model_CNN.fit(train_data,
                    epochs = 50,
                    validation_data = validation_data,
                    validation_steps = int(0.5 * len(validation_data))
                    )
`;
