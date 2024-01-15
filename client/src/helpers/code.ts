export const CODE = `
from google.colab import files

uploaded = files.upload()

!pip install -q kaggle
!mkdir -p ~/.kaggle
!cp kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json

!ls -lha ~/.kaggle

!kaggle datasets download -d manjilkarki/deepfake-and-real-images

!unzip -q /content/deepfake-and-real-images.zip

import matplotlib.pyplot as plt
import numpy as np
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.callbacks import LearningRateScheduler
from tensorflow.keras.constraints import MaxNorm
from tensorflow.keras.utils import plot_model
from tensorflow.keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout, BatchNormalization
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
import seaborn as sns
from tensorflow.keras.regularizers import l1_l2
from sklearn.utils import class_weight
from PIL import Image

train_dir = '/content/Dataset/Train'
test_dir = '/content/Dataset/Test'
validation_dir = '/content/Dataset/Validation'

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

for images, labels in train_data.take(1):
  # Visualiza las primeras 'n' imágenes
  n = 5
  plt.figure(figsize=(20, 20))
  for i in range(n):
      ax = plt.subplot(1, n, i + 1)
      plt.imshow(images[i].numpy().astype("uint8"))
      # Suponiendo que tienes dos clases y la etiqueta [1, 0] corresponde a 'Fake' y [0, 1] a 'Real'
      label = 'Fake' if np.argmax(labels[i].numpy()) == 0 else 'Real'
      print(np.argmax(labels[i].numpy()) == 0,np.argmax(labels[i].numpy()))
      plt.title("Class: " + label)
      plt.axis("off")
  plt.show()

def normalize_image(image, label):
    # Normaliza los píxeles de la imagen al rango [0, 1]
    image = tf.cast(image, tf.float32) / 255.0
    return image, label

# Aplica la función de normalización a los conjuntos de datos
train_data = train_data.map(normalize_image)
validation_data = validation_data.map(normalize_image)
test_data = test_data.map(normalize_image)

model1 = Sequential([
    # Primera capa convolucional
    Conv2D(filters=32, kernel_size=(11,11), strides=(4,4), activation='relu', input_shape=(256,256,3), kernel_constraint=MaxNorm(3)),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2,2)),
    Dropout(0.25),

    # Segunda capa convolucional
    Conv2D(filters=64, kernel_size=(5,5), strides=(1,1), activation='relu', padding="same", kernel_constraint=MaxNorm(3)),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2,2)),
    Dropout(0.25),

    # Tercera capa convolucional
    Conv2D(filters=128, kernel_size=(3,3), strides=(1,1), activation='relu', padding="same", kernel_constraint=MaxNorm(3)),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2,2)),
    Dropout(0.25),

    # Cuarta capa convolucional - reduciendo el tamaño del kernel
    Conv2D(filters=256, kernel_size=(3,3), strides=(1,1), activation='relu', padding="same", kernel_constraint=MaxNorm(3)),
    BatchNormalization(),
    MaxPooling2D(pool_size=(2,2)),
    Dropout(0.25),

    # Aplanar la salida para las capas densas
    Flatten(),

    # Capa densa
    Dense(1024, activation='relu', kernel_constraint=MaxNorm(3)),
    Dropout(0.5),

    # Capa de salida
    Dense(2, activation='softmax')  # Softmax para clasificación binaria
])

model1.summary()

plot_model(model1,show_shapes=True,to_file='cnn_structur.png')

# Parámetros iniciales
epochs = 20
initial_lrate = 0.01

# Crear el optimizador SGD sin el parámetro decay
sgd = SGD(learning_rate=initial_lrate, momentum=0.9, nesterov=False)

# Función para calcular el decaimiento de la tasa de aprendizaje
def decay(epoch, lrate):
    return initial_lrate / (1 + decay_rate * epoch)

decay_rate = initial_lrate / epochs
lrate_scheduler = LearningRateScheduler(lambda epoch: decay(epoch, initial_lrate))

# Compilar el modelo
model1.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

history = model1.fit(train_data, validation_data=validation_data, epochs=epochs, callbacks=[lrate_scheduler])

fig = plt.figure()
plt.plot(history.history['loss'], color='teal', label='loss')
plt.plot(history.history['val_loss'], color='orange', label='val_loss')
fig.suptitle('Loss', fontsize=20)
plt.legend(loc="upper left")
plt.show()

fig = plt.figure()
plt.plot(history.history['accuracy'], color='teal', label='accuracy')
plt.plot(history.history['val_accuracy'], color='orange', label='val_accuracy')
fig.suptitle('Accuracy', fontsize=20)
plt.legend(loc="upper left")
plt.show()

test_accuracy = model1.evaluate(test_data)

predicted_probs = model1.predict(test_data, verbose=1)
predicted_labels = np.argmax(predicted_probs, axis=1)
test_labels = [labels for _ , labels in test_data]
test_labels = np.concatenate(test_labels, axis=0)
test_labels_0 = np.argmax(test_labels,axis=1)
cm = confusion_matrix(test_labels_0, predicted_labels)
accuracy = accuracy_score(test_labels_0, predicted_labels)
cm, accuracy

class_names = ['Real', 'Fake']
report = classification_report(test_labels_0, predicted_labels, target_names=class_names)
print(report)

plt.figure(figsize=(3, 2))
class_names = ['Real', 'Fake']
heatmap = sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=True, yticklabels=True)

heatmap.set_xticklabels(class_names, rotation=45, ha='right')
heatmap.set_yticklabels(class_names, rotation=0)


plt.xlabel('Predicted Labels')
plt.ylabel('True Labels')
plt.title('Confusion Matrix')


plt.show()

model1.save('mi_modelo_entrenado.tf')

`;
