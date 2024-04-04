import asyncio
import base64
from math import floor
import os
import time
from uuid import uuid4
import cv2
import tensorflow as tf
import keras
from keras.preprocessing import image
import threading
from werkzeug.datastructures import FileStorage 
from .dataService import makeDir, removeDatabaseCamera, saveDatabaseCamera, saveDatabasePrediction

MAIN_UPLOAD_PATH = os.getenv('MAIN_UPLOAD_PATH')
SUB_VIDEO_PATH = os.getenv('SUB_VIDEO_PATH')
SUB_IMAGE_PATH = os.getenv('SUB_IMAGE_PATH')

VIDEO_PATH = os.path.join(MAIN_UPLOAD_PATH, SUB_VIDEO_PATH)
IMAGE_PATH = os.path.join(MAIN_UPLOAD_PATH, SUB_IMAGE_PATH)

batch_size = 100
img_height = 250
img_width = 250

default_model = 'model/best_model.h5'

def checkTensorflowVersion():
  return tf.__version__

def load_Model(file_path=default_model):
  loaded_model = keras.models.load_model(f'{file_path}')
  return loaded_model

loaded_model = load_Model()

async def process_image_for_frontend(image_path):
  image = cv2.imread(image_path)
  
  resized_image = cv2.resize(image, (img_width, img_height))

  retval, buffer = cv2.imencode('.jpg', resized_image)
  image_base64 = base64.b64encode(buffer).decode('utf-8')

  return image_base64

async def captureImagePerSec(video_path:str, output_dir:str):
  cap = cv2.VideoCapture(video_path)
  fps = int(cap.get(cv2.CAP_PROP_FPS))
  frame_count = 0
  success = True
  imagelist = []
  makeDir(output_dir)
  while success:
    success, frame = cap.read()
    if frame_count % fps == 0:
      filename = f"frame_{frame_count // fps}.jpg"
      image_path = os.path.join(output_dir, filename)
      cv2.imwrite(image_path, frame)
      # image_process = await process_image_for_frontend(output_dir + f'/{filename}')
      image = {
        "filename": filename,
        "image_path": image_path,
        "sec": frame_count // fps
      }
      imagelist.append(image)
    frame_count += 1

  cap.release()
  return imagelist

async def predictImage(img_path):
  img = image.load_img(img_path, target_size=(img_height, img_width))
  img_array = image.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0)
  
  async def predict_async(img_array):
    return loaded_model.predict(img_array)
  
  prediction_task = asyncio.create_task(predict_async(img_array))
  predict_result = await prediction_task  # Make prediction asynchronous
  
  percentage = {
    'accident': f'{predict_result[0][0]*100:.2f}',
    'nonaccident': f'{predict_result[0][1]*100:.2f}'
  }
  
  return percentage

async def predictVideo(file_name: str, onlyAccident: bool):
  camera_id = file_name.split('.')[0]
  video_path = os.path.join(VIDEO_PATH, file_name)
  image_output_dir = os.path.join(IMAGE_PATH, camera_id)
  results = []
  
  imagelist = await captureImagePerSec(video_path, image_output_dir)
  
  for image in imagelist:
    img_path = image['image_path']
    predict_result = await predictImage(img_path)
    result = {
        **predict_result,
        'sec': image['sec'],
        'imageURL': f'images/{camera_id}/{image["filename"]}'
        }
    if not onlyAccident:
      results.append(result)
    elif predict_result['accident'] > predict_result['nonaccident']:
      results.append(result)
  return results

status = {}

def predictImageForStreaming(img_path):
  img = image.load_img(img_path, target_size=(img_height, img_width))
  img_array = image.img_to_array(img)
  img_array = tf.expand_dims(img_array, 0)
 
  predict_result = loaded_model.predict(img_array) 
  
  percentage = {
    'accident': f'{predict_result[0][0]*100:.2f}',
    'nonaccident': f'{predict_result[0][1]*100:.2f}'
  }
  
  return percentage

def stopPredictStreaming(camera_id: str):
  status[camera_id] = False

def predictStreaming(camera_id: str, camera_name: str, url: str):
  image_output_dir = os.path.join(IMAGE_PATH, camera_id)
  
  saveDatabaseCamera(
    camera_id=camera_id,
    camera_name=camera_name,
    address=url
    )
  
  def capture():
    index = 0
    cap = cv2.VideoCapture(url)  # Open video capture

    if not cap.isOpened():
      print(f"Error opening video capture for {url}")
      return  # Exit loop if opening fails

    status[camera_id] = True
    print("status", camera_id, status[camera_id])

    while status[camera_id]:
      ret, frame = cap.read()

      if not ret:
        print("Error capturing frame")
        break

      filename = f"frame_{floor(time.time())}.jpg"
      image_path = os.path.join(image_output_dir, filename)
      cv2.imwrite(image_path, frame)

      predict_result = predictImageForStreaming(image_path)
      imageURL = f'images/{camera_id}/{filename}'
      if float(predict_result['accident']) > float(predict_result['nonaccident']):
        index += 1
        saveDatabasePrediction(str(uuid4()), camera_id, imageURL, predict_result['accident'], predict_result['nonaccident'], floor(time.time()))
      time.sleep(1)
    
    print("Number of prediction in Accident from", camera_id, "has", index, "image")
    removeDatabaseCamera(camera_id)
    del status[camera_id]
    cap.release()  # Release video capture resources

  # capture_task = asyncio.create_task(capture_loop())
  task = threading.Thread(target=capture)
  task.start()
  
def changeModelPredict(model_file:FileStorage):
  os.makedirs("data/model",exist_ok=True)
  model_path = f'data/model/{model_file.filename}'
  model_file.save(model_path)
  global loaded_model
  try:
    loaded_model = load_Model(model_path)
    return True
  except:
    return False